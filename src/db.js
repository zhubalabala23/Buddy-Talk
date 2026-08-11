import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

// Helper to convert Audio Blob to Base64 to store in Firestore
const blobToBase64 = (blob) => {
  if (!blob) return null;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

// Helper to convert Base64 back to Blob
const base64ToBlob = (base64, mimeType = 'audio/webm') => {
  if (!base64) return null;
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

export const saveStudent = async (studentData) => {
  const studentsRef = collection(db, 'buddytalk_students');
  const trimmedName = studentData.name.trim();
  const trimmedAbsen = String(studentData.absen).trim();
  
  // 1. Cek apakah Nama tersebut sudah ada di database
  const nameQuery = query(studentsRef, where("name", "==", trimmedName));
  const nameSnapshot = await getDocs(nameQuery);
  
  if (!nameSnapshot.empty) {
    const existingDoc = nameSnapshot.docs[0];
    const existingData = existingDoc.data();
    const existingId = existingDoc.id;
    
    // Jika namanya ada dan nomor absennya SAMA -> Login langsung
    if (String(existingData.absen).trim() === trimmedAbsen) {
      return { id: existingId, ...existingData, name: trimmedName, absen: trimmedAbsen };
    } 
    
    // Jika namanya ada, tapi nomor absennya BEDA:
    // Cek apakah siswa ini punya rekaman/penilaian aktif di database
    const assessmentsRef = collection(db, 'buddytalk_assessments');
    const studentAssessmentsQuery = query(assessmentsRef, where("studentId", "==", existingId));
    const studentAssessmentsSnap = await getDocs(studentAssessmentsQuery);

    if (studentAssessmentsSnap.empty) {
      // Siswa ini TIDAK punya rekaman (rekamannya sudah dihapus oleh guru / belum pernah merekam).
      // Perbarui nomor absen siswa ini ke nomor absen yang baru dimasukkan!
      const studentDocRef = doc(db, 'buddytalk_students', existingId);
      await updateDoc(studentDocRef, { absen: trimmedAbsen });
      return { id: existingId, ...existingData, name: trimmedName, absen: trimmedAbsen };
    } else {
      // Siswa ini MASIH punya rekaman aktif dengan nomor absen lain.
      throw new Error(`Maaf, nama "${trimmedName}" sudah dipakai oleh siswa lain (Absen: ${existingData.absen}). Jika ini adalah kamu, masukkan Nomor Absen yang benar (${existingData.absen}).`);
    }
  }

  // 2. Cek apakah Nomor Absen tersebut sudah dipakai orang lain
  const absenQuery = query(studentsRef, where("absen", "==", trimmedAbsen));
  const absenSnapshot = await getDocs(absenQuery);
  
  if (!absenSnapshot.empty) {
    const existingDoc = absenSnapshot.docs[0];
    const existingData = existingDoc.data();
    const existingId = existingDoc.id;

    // Cek apakah pemilik nomor absen ini punya rekaman aktif
    const assessmentsRef = collection(db, 'buddytalk_assessments');
    const studentAssessmentsQuery = query(assessmentsRef, where("studentId", "==", existingId));
    const studentAssessmentsSnap = await getDocs(studentAssessmentsQuery);

    if (studentAssessmentsSnap.empty) {
      // Pemilik absen lama tidak punya rekaman, hapus data lama yang tidak aktif tersebut
      await deleteDoc(doc(db, 'buddytalk_students', existingId));
    } else {
      throw new Error(`Nomor Absen "${trimmedAbsen}" sedang digunakan oleh siswa "${existingData.name}".`);
    }
  }

  // 3. Jika nama & absen benar-benar baru (atau data lama tanpa rekaman sudah diperbarui)
  const newStudentRef = doc(collection(db, 'buddytalk_students'));
  const newStudent = { 
    id: newStudentRef.id,
    name: trimmedName,
    absen: trimmedAbsen
  };
  await setDoc(newStudentRef, newStudent);
  return newStudent;
};

export const saveAssessment = async (assessment) => {
  const assessmentsRef = collection(db, 'buddytalk_assessments');
  
  if (assessment.studentId && assessment.studentId !== 'anonymous') {
    const q = query(
      assessmentsRef,
      where("studentId", "==", assessment.studentId),
      where("topicId", "==", assessment.topicId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("Kamu sudah mengirimkan rekaman untuk materi ini. Jika ingin mengulang, silakan minta gurumu untuk menghapusnya terlebih dahulu.");
    }
  }

  let base64Audio = null;
  if (assessment.audioBlob) {
    base64Audio = await blobToBase64(assessment.audioBlob);
  }
  
  const assessmentData = {
    ...assessment,
    audioBlob: null, // Remove the raw blob before saving to Firestore
    audioBase64: base64Audio
  };

  const docRef = await addDoc(assessmentsRef, assessmentData);
  return docRef.id;
};

export const updateAssessment = async (assessment) => {
  const docRef = doc(db, 'buddytalk_assessments', assessment.id);
  const dataToUpdate = { ...assessment };
  // Ensure we don't try to save blob
  delete dataToUpdate.audioBlob;
  
  if (assessment.id) {
     await updateDoc(docRef, dataToUpdate);
  }
};

export const getAssessments = async () => {
  const assessmentsRef = collection(db, 'buddytalk_assessments');
  const querySnapshot = await getDocs(assessmentsRef);
  return querySnapshot.docs.map(docSnapshot => {
    const data = docSnapshot.data();
    return {
      ...data,
      id: docSnapshot.id,
      // Recreate the blob so TeacherView can play it
      audioBlob: data.audioBase64 ? base64ToBlob(data.audioBase64) : null
    };
  });
};

export const getStudents = async () => {
  const studentsRef = collection(db, 'buddytalk_students');
  const querySnapshot = await getDocs(studentsRef);
  return querySnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
  }));
};

export const deleteAssessment = async (id) => {
  if (!id) return;
  const docRef = doc(db, 'buddytalk_assessments', id);
  await deleteDoc(docRef);
};

export const deleteStudentCompletely = async (studentOrId) => {
  if (!studentOrId) return;
  
  const studentId = typeof studentOrId === 'string' ? studentOrId : studentOrId.id;
  const studentName = typeof studentOrId === 'object' ? studentOrId.name : null;
  
  const assessmentsRef = collection(db, 'buddytalk_assessments');
  const studentsRef = collection(db, 'buddytalk_students');

  // 1. Hapus seluruh data penilaian / rekaman siswa dari buddytalk_assessments
  if (studentId && studentId !== 'anonymous') {
    try {
      const q = query(assessmentsRef, where("studentId", "==", studentId));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(docSnapshot => 
        deleteDoc(doc(db, 'buddytalk_assessments', docSnapshot.id))
      );
      await Promise.all(deletePromises);
    } catch (e) {
      console.error("Error deleting student assessments:", e);
    }
  }

  // 2. Hapus dokumen siswa dari buddytalk_students secara langsung berdasarkan Firestore Doc ID
  if (studentId && studentId !== 'anonymous') {
    try {
      const studentRef = doc(db, 'buddytalk_students', studentId);
      await deleteDoc(studentRef);
    } catch (e) {
      console.error("Error deleting student doc directly:", e);
    }

    // Juga hapus berdasarkan query field "id" == studentId (jika ada dokumen legacy)
    try {
      const qId = query(studentsRef, where("id", "==", studentId));
      const snapId = await getDocs(qId);
      const deleteIdPromises = snapId.docs.map(d => deleteDoc(doc(db, 'buddytalk_students', d.id)));
      await Promise.all(deleteIdPromises);
    } catch (e) {
      console.error("Error deleting student doc by id field:", e);
    }
  }

  // 3. Jika nama siswa diketahui, hapus dokumen apa pun di buddytalk_students yang bernama sama
  if (studentName) {
    try {
      const qName = query(studentsRef, where("name", "==", studentName.trim()));
      const snapName = await getDocs(qName);
      const deleteNamePromises = snapName.docs.map(d => deleteDoc(doc(db, 'buddytalk_students', d.id)));
      await Promise.all(deleteNamePromises);
    } catch (e) {
      console.error("Error deleting student doc by name:", e);
    }
  }
};

export const deleteStudentAndAssessments = async (studentId) => {
  await deleteStudentCompletely(studentId);
};

export const getStudentAssessments = async (studentId) => {
  if (!studentId) return [];
  const assessmentsRef = collection(db, 'buddytalk_assessments');
  const q = query(assessmentsRef, where("studentId", "==", studentId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => {
    const data = docSnapshot.data();
    return {
      ...data,
      id: docSnapshot.id,
      audioBlob: data.audioBase64 ? base64ToBlob(data.audioBase64) : null
    };
  });
};

export const updateStudentProgress = async (studentId, progress) => {
  if (!studentId) return;
  const studentRef = doc(db, 'buddytalk_students', studentId);
  await updateDoc(studentRef, { progress });
};

export const getStudent = async (studentId) => {
  if (!studentId) return null;
  const studentRef = doc(db, 'buddytalk_students', studentId);
  const docSnap = await getDoc(studentRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};
