import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssessments, updateAssessment, getStudents, deleteAssessment, deleteStudentAndAssessments, deleteStudentCompletely, updateStudentProgress } from '../db';
import { Play, Pause, CheckCircle2, ChevronRight, Save, LogOut, Trash2, ChevronLeft, Home, Users, FileText } from 'lucide-react';
import { topics } from '../data';

const INDICATORS = [
  {
    key: 'c1',
    name: 'Ketepatan Isi',
    desc: 'Menjelaskan sebab dan akibat yang dialami tokoh dengan tepat'
  },
  {
    key: 'c2',
    name: 'Keruntutan Penyampaian',
    desc: 'Bercerita runtut dari awal hingga akhir'
  },
  {
    key: 'c3',
    name: 'Penggunaan Bahasa dan Kata Penghubung Sebab-Akibat',
    desc: 'Menggunakan kata seperti karena, sehingga, akibatnya'
  },
  {
    key: 'c4',
    name: 'Kelancaran Berbicara',
    desc: 'Berbicara tanpa banyak jeda atau pengulangan kata'
  },
  {
    key: 'c5',
    name: 'Kepercayaan Diri',
    desc: 'Bercerita tanpa terlihat ragu-ragu atau gugup'
  }
];

export default function TeacherView({ onLogout, onHome }) {
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState({});
  const [studentsList, setStudentsList] = useState([]);
  const [activeTab, setActiveTab] = useState('assessments'); // 'assessments' | 'students'
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [criteria, setCriteria] = useState({
    c1: 4,
    c2: 4,
    c3: 4,
    c4: 4,
    c5: 4,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAssessments();
    const studentsData = await getStudents();
    
    const studentMap = {};
    studentsData.forEach(s => {
      studentMap[s.id] = s;
    });
    setStudents(studentMap);
    setStudentsList(studentsData);
    setAssessments(data);
  };

  const handleSelect = (assessment) => {
    setSelectedAssessment(assessment);
    const existing = assessment.criteria || {};
    
    // Support parsing legacy boolean criteria values (true -> 4, false -> 1)
    const parseVal = (val) => {
      if (typeof val === 'boolean') return val ? 4 : 1;
      if (typeof val === 'number' && val >= 1 && val <= 4) return val;
      return 4; // Default value if missing or invalid
    };

    setCriteria({
      c1: parseVal(existing.c1),
      c2: parseVal(existing.c2),
      c3: parseVal(existing.c3),
      c4: parseVal(existing.c4),
      c5: parseVal(existing.c5)
    });
  };

  const handleScoreChange = (key, value) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const calculateScore = () => {
    const getVal = (v) => (typeof v === 'number' && v >= 1 && v <= 4) ? v : 4;
    const s1 = (getVal(criteria.c1) / 4) * 20;
    const s2 = (getVal(criteria.c2) / 4) * 20;
    const s3 = (getVal(criteria.c3) / 4) * 20;
    const s4 = (getVal(criteria.c4) / 4) * 20;
    const s5 = (getVal(criteria.c5) / 4) * 20;
    return Math.round(s1 + s2 + s3 + s4 + s5);
  };

  const saveScore = async () => {
    if (!selectedAssessment) return;
    const score = calculateScore();
    const updated = {
      ...selectedAssessment,
      criteria,
      score,
      graded: true
    };
    
    try {
      // 1. Update the assessment in Firestore
      await updateAssessment(updated);
      
      // 2. Also update student progress map in buddytalk_students
      if (selectedAssessment.studentId && selectedAssessment.studentId !== 'anonymous') {
        const student = students[selectedAssessment.studentId];
        if (student) {
          const currentProgress = student.progress || {};
          const topicId = selectedAssessment.topicId;
          
          const updatedProgress = {
            ...currentProgress,
            [topicId]: {
              ...(currentProgress[topicId] || {}),
              score: score,
              graded: true
            }
          };
          
          await updateStudentProgress(selectedAssessment.studentId, updatedProgress);
        }
      }
      
      alert('Nilai berhasil disimpan!');
      loadData();
      setSelectedAssessment(updated); // Refresh current view
    } catch (err) {
      console.error("Gagal menyimpan nilai:", err);
      alert("Gagal menyimpan nilai ke database.");
    }
  };

  const handleDelete = async () => {
    if (!selectedAssessment) return;
    const student = students[selectedAssessment.studentId];
    const studentName = student ? student.name : 'Siswa';
    const confirmDelete = window.confirm(
      student 
        ? `Apakah Anda yakin ingin menghapus data siswa "${studentName}" dan rekamannya? Data siswa, nama, serta nomor absen akan terhapus permanen dari Firestore database.`
        : "Apakah Anda yakin ingin menghapus rekaman suara ini?"
    );
    if (confirmDelete) {
      try {
        // Hapus rekaman dari buddytalk_assessments
        await deleteAssessment(selectedAssessment.id);

        // Hapus seluruh dokumen siswa dari buddytalk_students
        if (student) {
          await deleteStudentCompletely(student);
        } else if (selectedAssessment.studentId && selectedAssessment.studentId !== 'anonymous') {
          await deleteStudentCompletely(selectedAssessment.studentId);
        }
        
        alert('Data siswa dan rekaman suara berhasil terhapus dari Firebase Firestore!');
        setSelectedAssessment(null);
        loadData();
      } catch (err) {
        console.error("Gagal menghapus data:", err);
        alert("Gagal menghapus data dari database.");
      }
    }
  };

  const handleDeleteStudent = async (student) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus data siswa "${student.name}" (Absen: ${student.absen})? Nama dan nomor absen akan terhapus permanen dari Firestore database.`
    );
    if (confirmDelete) {
      try {
        await deleteStudentCompletely(student);
        alert(`Data siswa "${student.name}" berhasil terhapus dari Firebase Firestore!`);
        if (selectedAssessment && selectedAssessment.studentId === student.id) {
          setSelectedAssessment(null);
        }
        loadData();
      } catch (err) {
        console.error("Gagal menghapus data siswa:", err);
        alert("Gagal menghapus data siswa dari database.");
      }
    }
  };

  const getTopicName = (id) => {
    const t = topics.find(topic => topic.id === id);
    return t ? t.title : id;
  };

  return (
    <div className="flex h-screen bg-[#e0f2fe] text-slate-800">
      {/* Sidebar */}
      <div className={`${selectedAssessment ? 'hidden md:block' : 'block'} w-full md:w-1/3 lg:w-80 border-r border-slate-200 bg-white overflow-y-auto flex-shrink-0 flex flex-col h-full`}>
        <div className="p-3 md:p-4 bg-[#315588] text-white sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold truncate">Halaman Penilaian</h2>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-xs md:text-sm font-bold transition-colors shadow-sm flex-shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 sticky top-[57px] md:top-[65px] z-10">
          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex-1 py-2.5 px-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'assessments'
                ? 'border-[#315588] text-[#315588] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Rekaman ({assessments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2.5 px-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'students'
                ? 'border-[#315588] text-[#315588] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Siswa ({studentsList.length})</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
          {activeTab === 'assessments' ? (
            <>
              {assessments.length === 0 && (
                <p className="p-4 text-slate-500 text-center text-sm">Belum ada rekaman.</p>
              )}
              {assessments.map(item => {
                const student = students[item.studentId];
                const isSelected = selectedAssessment?.id === item.id;
                return (
                  <div 
                    key={item.id} 
                    onClick={() => handleSelect(item)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50 border-l-4 border-[#315588]' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800">
                          {student ? `${student.name} (Absen: ${student.absen})` : 'Anonim'}
                        </h3>
                        <p className="text-sm text-slate-500">Topik: {getTopicName(item.topicId)}</p>
                      </div>
                      {item.graded && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {item.score}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {studentsList.length === 0 && (
                <p className="p-4 text-slate-500 text-center text-sm">Belum ada siswa terdaftar.</p>
              )}
              {studentsList.map(st => {
                const hasAssessment = assessments.some(a => a.studentId === st.id);
                return (
                  <div key={st.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm md:text-base">
                        {st.name} <span className="text-xs font-semibold text-slate-500">(Absen: {st.absen})</span>
                      </h3>
                      <span className={`inline-block mt-1 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold ${
                        hasAssessment ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {hasAssessment ? 'Ada Rekaman' : 'Belum Ada Rekaman'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteStudent(st)}
                      title="Hapus Data Siswa"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus</span>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${!selectedAssessment ? 'hidden md:block' : 'block'} flex-1 p-4 md:p-8 overflow-y-auto bg-[#e0f2fe]/50`}>
        
        {/* Top Action Bar (Aligned with Card) */}
        <div className="max-w-2xl mx-auto w-full flex justify-end mb-4">
        </div>

        {selectedAssessment ? (
          <div className="max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 md:gap-4 mb-6">
              <button 
                className="md:hidden p-2 rounded-full hover:bg-slate-100 flex-shrink-0" 
                onClick={() => setSelectedAssessment(null)}
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-[#315588]">Penilaian Siswa</h2>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-xl mb-6 md:mb-8">
              <p className="text-sm text-slate-500 mb-2">Suara Siswa:</p>
              {selectedAssessment.audioBlob ? (
                <audio controls src={URL.createObjectURL(selectedAssessment.audioBlob)} className="w-full h-10 md:h-14" />
              ) : (
                <p className="text-red-500">Audio tidak tersedia.</p>
              )}
            </div>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div>
                <h3 className="font-bold text-slate-700 text-sm md:text-base">Indikator (Skala 1-4, 20% per indikator):</h3>
                <div className="border-b border-slate-200 mt-2"></div>
              </div>
              
              {INDICATORS.map((ind) => {
                const currentVal = criteria[ind.key] || 4;
                return (
                  <div key={ind.key} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-slate-800 text-sm md:text-base">{ind.name}</h4>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">{ind.desc}</p>
                    <div className="flex items-center gap-6 mt-3">
                      {[4, 3, 2, 1].map((score) => {
                        const isSelected = currentVal === score;
                        return (
                          <label key={score} className="flex items-center gap-2 cursor-pointer group select-none">
                            <input
                              type="radio"
                              name={ind.key}
                              value={score}
                              checked={isSelected}
                              onChange={() => handleScoreChange(ind.key, score)}
                              className="w-4.5 h-4.5 text-[#315588] border-slate-300 focus:ring-[#315588] cursor-pointer animate-none"
                            />
                            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                              {score}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-200 gap-4">
              <div className="text-lg md:text-xl font-bold w-full md:w-auto text-center md:text-left text-slate-800">
                Total Nilai: <span className="text-[#315588]">{calculateScore()}/100</span>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={handleDelete}
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  <span>Hapus</span>
                </button>
                <button 
                  onClick={saveScore}
                  className="flex-[2] md:flex-none flex items-center justify-center px-6 py-2 bg-[#0066eb] hover:bg-[#0052bd] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p>Pilih rekaman siswa dari sidebar untuk memulai penilaian.</p>
          </div>
        )}
      </div>
    </div>
  );
}
