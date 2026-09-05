import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronLeft, Check, X, AlertCircle, ArrowRight, Mic, Trophy } from 'lucide-react';

// Import character portraits if available, else fallback
import bimaImg from '../assets/images/bima.webp';
import sariImg from '../assets/images/sari.webp';
import dodiImg from '../assets/images/dodi.webp';
import nadiaImg from '../assets/images/nadia.webp';
import wulanCitraImg from '../assets/images/wulan_citra.webp';

// Import Picture Sorting Challenge WebP images
import belajarBersamaImg from '../assets/image_challenge/belajar_bersama.webp';
import bergosipImg from '../assets/image_challenge/bergosip.webp';
import berkataJujurImg from '../assets/image_challenge/berkata_jujur.webp';
import bertanggungJawabImg from '../assets/image_challenge/bertanggung_jawab.webp';
import membantuTemanImg from '../assets/image_challenge/membantu_teman.webp';
import membuangSampahImg from '../assets/image_challenge/membuang_sampah.webp';
import mengembalikanBarangImg from '../assets/image_challenge/mengembalikan_barang_orang_lain.webp';
import mengembalikanDompetImg from '../assets/image_challenge/mengembalikan_dompet.webp';
import menghargaiOrangLainImg from '../assets/image_challenge/menghargai_orang_lain.webp';
import menyelesaikanTugasImg from '../assets/image_challenge/menyelesaikan_tugas.webp';
import menyontekImg from '../assets/image_challenge/menyontek.webp';
import merusakBarangImg from '../assets/image_challenge/merusak_barang.webp';

const charImages = {
  bima: bimaImg,
  sari: sariImg,
  dodi: dodiImg,
  nadia: nadiaImg,
  wulan_citra: wulanCitraImg
};

const challengesData = {
  bima: {
    title: "Sifat Jujur",
    character: "Bima",
    characterDesc: "Bima adalah anak yang selalu berkata jujur dan bertanggung jawab.",
    detective: {
      siapaAku: [
        "Aku selalu berkata apa adanya.",
        "Aku berani mengaku ketika salah.",
        "Guru dan teman mempercayaiku.",
        "Aku tidak suka berbohong.",
        "Aku bertanggung jawab atas perbuatanku."
      ],
      question: "Sifat apakah yang dimiliki tokoh di atas?",
      options: [
        { label: "Rajin", value: "rajin" },
        { label: "Jujur", value: "jujur", correct: true },
        { label: "Ramah", value: "ramah" },
        { label: "Pemberani", value: "pemberani" }
      ]
    },
    pictureSorting: {
      instruction: "Kelompokkan gambar berikut ke dalam kotak yang tepat!",
      correctLabel: "PERILAKU JUJUR",
      correctDesc: "Anak berkata apa adanya, mengaku kesalahan, atau melakukan hal yang benar.",
      incorrectLabel: "BUKAN PERILAKU JUJUR",
      incorrectDesc: "Anak berbohong, menyembunyikan kesalahan, atau melakukan hal yang tidak benar.",
      items: [
        { id: "p1", text: "Mengembalikan dompet", image: mengembalikanDompetImg, emoji: "👛", isCorrectCategory: true },
        { id: "p2", text: "Menyelesaikan tugas", image: menyelesaikanTugasImg, emoji: "📝", isCorrectCategory: true },
        { id: "p3", text: "Berkata jujur", image: berkataJujurImg, emoji: "🗣️", isCorrectCategory: true },
        { id: "p4", text: "Menyontek", image: menyontekImg, emoji: "👀", isCorrectCategory: false },
        { id: "p5", text: "Mengembalikan barang", image: mengembalikanBarangImg, emoji: "📦", isCorrectCategory: true },
        { id: "p6", text: "Bertanggung jawab", image: bertanggungJawabImg, emoji: "🛡️", isCorrectCategory: true },
        { id: "p7", text: "Membuang sampah", image: membuangSampahImg, emoji: "🗑️", isCorrectCategory: true },
        { id: "p8", text: "Belajar bersama", image: belajarBersamaImg, emoji: "📖", isCorrectCategory: true },
        { id: "p9", text: "Bergosip", image: bergosipImg, emoji: "💬", isCorrectCategory: false },
        { id: "p10", text: "Membantu teman", image: membantuTemanImg, emoji: "🤝", isCorrectCategory: true },
        { id: "p11", text: "Menghargai orang lain", image: menghargaiOrangLainImg, emoji: "🙏", isCorrectCategory: true },
        { id: "p12", text: "Merusak barang", image: merusakBarangImg, emoji: "🔨", isCorrectCategory: false }
      ]
    },
    storyPuzzle: {
      instruction: "Urutkan potongan cerita berikut dengan benar!",
      cards: [
        { id: "s1", text: "Bima tidak sengaja memecahkan vas.", emoji: "🏺", correctIndex: 0 },
        { id: "s2", text: "Bima mengaku kepada guru.", emoji: "🗣️", correctIndex: 1 },
        { id: "s3", text: "Guru memaafkan Bima karena sudah jujur.", emoji: "🙏", correctIndex: 2 },
        { id: "s4", text: "Guru semakin percaya kepada Bima.", emoji: "🤝", correctIndex: 3 },
        { id: "s5", text: "Teman-teman senang bermain dengan Bima.", emoji: "👦", correctIndex: 4 },
        { id: "s6", text: "Bima terpilih menjadi ketua kelas.", emoji: "👑", correctIndex: 5 }
      ]
    },
    buddyWords: {
      instruction: "Pilih kata-kata yang bisa kamu gunakan saat bercerita!",
      tip: "Tips: Gunakan kata-kata yang sudah kamu pilih saat menceritakan kembali kisah Buddy!",
      words: [
        { text: "berkata apa adanya", correct: true },
        { text: "mengaku", correct: true },
        { text: "dipercaya", correct: true },
        { text: "berbohong", correct: false },
        { text: "menyontek", correct: false },
        { text: "menyalahkan teman", correct: false },
        { text: "meminta maaf", correct: true },
        { text: "bertanggung jawab", correct: true },
        { text: "berani", correct: true }
      ]
    }
  },
  sari: {
    title: "Sifat Rajin",
    character: "Sari",
    characterDesc: "Sari adalah anak yang selalu belajar dengan tekun setiap hari.",
    detective: {
      siapaAku: [
        "Aku selalu datang lebih awal ke sekolah.",
        "Aku belajar sedikit demi sedikit setiap hari.",
        "Aku tidak menunggu sampai malam sebelum ulangan.",
        "Teman-teman sering bertanya pelajaran kepadaku.",
        "Guru memujiku karena tekun belajar."
      ],
      question: "Sifat apakah yang dimiliki tokoh di atas?",
      options: [
        { label: "Jujur", value: "jujur" },
        { label: "Rajin", value: "rajin", correct: true },
        { label: "Ramah", value: "ramah" },
        { label: "Pemberani", value: "pemberani" }
      ]
    },
    pictureSorting: {
      instruction: "Kelompokkan gambar berikut ke dalam kotak yang tepat!",
      correctLabel: "PERILAKU RAJIN",
      correctDesc: "Anak belajar dengan tekun, disiplin, dan bertanggung jawab terhadap tugasnya.",
      incorrectLabel: "BUKAN PERILAKU RAJIN",
      incorrectDesc: "Anak suka menunda pekerjaan, malas belajar, atau tidak bertanggung jawab terhadap tugasnya.",
      items: [
        { id: "p1", text: "Membaca buku tiap malam", emoji: "📚", isCorrectCategory: true },
        { id: "p2", text: "Datang paling pagi ke sekolah", emoji: "🏫", isCorrectCategory: true },
        { id: "p3", text: "Mengerjakan PR", emoji: "✍️", isCorrectCategory: true },
        { id: "p4", text: "Merapikan buku", emoji: "🎒", isCorrectCategory: true },
        { id: "p5", text: "Belajar bersama teman", emoji: "🧑‍🤝‍🧑", isCorrectCategory: true },
        { id: "p6", text: "Mengulang pelajaran", emoji: "🔄", isCorrectCategory: true },
        { id: "p7", text: "Bermain HP saat belajar", emoji: "📱", isCorrectCategory: false },
        { id: "p8", text: "Tidur saat guru menjelaskan", emoji: "😴", isCorrectCategory: false },
        { id: "p9", text: "Menunda mengerjakan PR", emoji: "⏳", isCorrectCategory: false },
        { id: "p10", text: "Bermain game terus", emoji: "🎮", isCorrectCategory: false },
        { id: "p11", text: "Datang terlambat", emoji: "⏰", isCorrectCategory: false },
        { id: "p12", text: "Tidak mengerjakan tugas", emoji: "❌", isCorrectCategory: false }
      ]
    },
    storyPuzzle: {
      instruction: "Urutkan potongan cerita berikut dengan benar!",
      cards: [
        { id: "s1", text: "Sari belajar setiap malam di rumah.", emoji: "🏠", correctIndex: 0 },
        { id: "s2", text: "Guru mengumumkan akan ada ulangan besok.", emoji: "📢", correctIndex: 1 },
        { id: "s3", text: "Teman-teman panik belajar semalaman.", emoji: "😰", correctIndex: 2 },
        { id: "s4", text: "Sari belajar dengan tenang menggunakan catatannya.", emoji: "🧘", correctIndex: 3 },
        { id: "s5", text: "Guru membagikan hasil ulangan. Nilai Sari salah satu yang tertinggi.", emoji: "🏆", correctIndex: 4 },
        { id: "s6", text: "Teman-teman belajar bersama Sari karena sering bertanya padanya.", emoji: "🧑‍🤝‍🧑", correctIndex: 5 }
      ]
    },
    buddyWords: {
      instruction: "Pilih kata-kata yang bisa kamu gunakan saat bercerita!",
      tip: "Tips: Gunakan kata-kata yang sudah kamu pilih saat menceritakan kembali kisah Buddy!",
      words: [
        { text: "rajin", correct: true },
        { text: "disiplin", correct: true },
        { text: "belajar setiap hari", correct: true },
        { text: "tekun", correct: true },
        { text: "membaca ulang", correct: true },
        { text: "mengerjakan tugas", correct: true },
        { text: "nilai baik", correct: true },
        { text: "membantu teman", correct: true },
        { text: "malas", correct: false },
        { text: "menunda", correct: false },
        { text: "bermain terus", correct: false },
        { text: "tidak belajar", correct: false },
        { text: "tidak mengerjakan", correct: false }
      ]
    }
  },
  dodi: {
    title: "Sifat Ramah",
    character: "Dodi",
    characterDesc: "Dodi adalah anak yang selalu menyapa, membantu, dan membuat orang lain nyaman.",
    detective: {
      siapaAku: [
        "Aku selalu menyapa orang lain terlebih dahulu.",
        "Aku senang membantu teman baru.",
        "Aku mudah berteman dengan siapa saja.",
        "Guru sering memilihku menyambut tamu.",
        "Aku membuat orang lain merasa nyaman."
      ],
      question: "Sifat apakah yang dimiliki tokoh di atas?",
      options: [
        { label: "Jujur", value: "jujur" },
        { label: "Rajin", value: "rajin" },
        { label: "Ramah", value: "ramah", correct: true },
        { label: "Pemberani", value: "pemberani" }
      ]
    },
    pictureSorting: {
      instruction: "Kelompokkan gambar berikut ke dalam kotak yang tepat!",
      correctLabel: "PERILAKU RAMAH",
      correctDesc: "Anak menyapa, membantu, menghargai, dan membuat orang lain merasa nyaman.",
      incorrectLabel: "BUKAN PERILAKU RAMAH",
      incorrectDesc: "Anak mengabaikan, mengejek, atau membuat orang lain merasa sedih.",
      items: [
        { id: "p1", text: "Menyapa satpam sekolah", emoji: "👮", isCorrectCategory: true },
        { id: "p2", text: "Menolong murid baru", emoji: "🤝", isCorrectCategory: true },
        { id: "p3", text: "Mengajak teman bermain", emoji: "⚽", isCorrectCategory: true },
        { id: "p4", text: "Tersenyum kepada teman", emoji: "😊", isCorrectCategory: true },
        { id: "p5", text: "Mengucapkan salam", emoji: "👋", isCorrectCategory: true },
        { id: "p6", text: "Membantu teman menemukan kelas", emoji: "🏫", isCorrectCategory: true },
        { id: "p7", text: "Mengejek teman", emoji: "😜", isCorrectCategory: false },
        { id: "p8", text: "Membelakangi murid baru", emoji: "😒", isCorrectCategory: false },
        { id: "p9", text: "Bertengkar", emoji: "😠", isCorrectCategory: false },
        { id: "p10", text: "Tidak mau menyapa", emoji: "🔕", isCorrectCategory: false },
        { id: "p11", text: "Bermuka marah", emoji: "😡", isCorrectCategory: false },
        { id: "p12", text: "Mengabaikan teman", emoji: "🙄", isCorrectCategory: false }
      ]
    },
    storyPuzzle: {
      instruction: "Urutkan potongan cerita berikut dengan benar!",
      cards: [
        { id: "s1", text: "Dodi menyapa satpam sekolah. Dodi selalu memberi salam setiap pagi.", emoji: "👮", correctIndex: 0 },
        { id: "s2", text: "Murid baru kebingungan membawa jadwal. Murid baru tidak tahu letak kelasnya.", emoji: "📋", correctIndex: 1 },
        { id: "s3", text: "Dodi menghampiri murid baru. Dodi bertanya apakah ia membutuhkan bantuan.", emoji: "🤝", correctIndex: 2 },
        { id: "s4", text: "Dodi mengantar murid baru menuju kelas. Mereka berbincang sepanjang perjalanan.", emoji: "🏫", correctIndex: 3 },
        { id: "s5", text: "Murid baru tersenyum dan berjabat tangan. Mereka menjadi teman.", emoji: "🧑‍🤝‍🧑", correctIndex: 4 },
        { id: "s6", text: "Guru menunjuk Dodi menyambut tamu sekolah. Guru percaya Dodi karena sikapnya yang ramah.", emoji: "👩‍🏫", correctIndex: 5 }
      ]
    },
    buddyWords: {
      instruction: "Pilih kata-kata yang bisa kamu gunakan saat bercerita!",
      tip: "Tips: Gunakan kata-kata yang sudah kamu pilih saat menceritakan kembali kisah Buddy!",
      words: [
        { text: "menyapa", correct: true },
        { text: "mengantar", correct: true },
        { text: "ramah", correct: true },
        { text: "berteman", correct: true },
        { text: "tersenyum", correct: true },
        { text: "nyaman", correct: true },
        { text: "membantu", correct: true },
        { text: "sopan", correct: true },
        { text: "mengejek", correct: false },
        { text: "marah", correct: false },
        { text: "mengabaikan", correct: false },
        { text: "bertengkar", correct: false }
      ]
    }
  },
  nadia: {
    title: "Sifat Pemberani",
    character: "Nadia",
    characterDesc: "Nadia adalah anak yang berani mencoba hal baru dan tidak mudah takut.",
    detective: {
      siapaAku: [
        "Aku tidak mudah takut mencoba hal baru.",
        "Aku berani mengambil inisiatif.",
        "Aku berani menyampaikan pendapat.",
        "Aku tidak takut berbeda pendapat.",
        "Guru memilihku sebagai wakil kelas dalam lomba pidato dan debat."
      ],
      question: "Sifat apakah yang dimiliki tokoh di atas?",
      options: [
        { label: "Jujur", value: "jujur" },
        { label: "Rajin", value: "rajin" },
        { label: "Ramah", value: "ramah" },
        { label: "Pemberani", value: "pemberani", correct: true }
      ]
    },
    pictureSorting: {
      instruction: "Kelompokkan gambar berikut ke dalam kotak yang tepat!",
      correctLabel: "PERILAKU PEMBERANI",
      correctDesc: "Anak tidak mudah takut, berani mencoba, mengambil inisiatif, dan percaya diri.",
      incorrectLabel: "BUKAN PERILAKU PEMBERANI",
      incorrectDesc: "Anak mudah takut, tidak berani mencoba, dan tidak percaya diri.",
      items: [
        { id: "p1", text: "Mengangkat tangan menjawab pertanyaan", emoji: "🙋", isCorrectCategory: true },
        { id: "p2", text: "Berani mencoba hal baru", emoji: "🔬", isCorrectCategory: true },
        { id: "p3", text: "Berani mengemukakan pendapat", emoji: "🗣️", isCorrectCategory: true },
        { id: "p4", text: "Membantu teman saat kesulitan", emoji: "🤝", isCorrectCategory: true },
        { id: "p5", text: "Menyelamatkan anak kucing", emoji: "🐱", isCorrectCategory: true },
        { id: "p6", text: "Berani berbicara di depan umum", emoji: "🎤", isCorrectCategory: true },
        { id: "p7", text: "Takut mencoba hal baru", emoji: "🫣", isCorrectCategory: false },
        { id: "p8", text: "Diam padahal tahu jawabannya", emoji: "🤫", isCorrectCategory: false },
        { id: "p9", text: "Mengejek teman", emoji: "😜", isCorrectCategory: false },
        { id: "p10", text: "Menakut-nakuti teman", emoji: "👿", isCorrectCategory: false },
        { id: "p11", text: "Menonton saja saat ada masalah", emoji: "👀", isCorrectCategory: false },
        { id: "p12", text: "Tidak berani mengemukakan pendapat", emoji: "🤐", isCorrectCategory: false }
      ]
    },
    storyPuzzle: {
      instruction: "Urutkan potongan cerita berikut dengan benar!",
      cards: [
        { id: "s1", text: "Di kelas, Nadia selalu berani mengangkat tangan menjawab pertanyaan guru.", emoji: "🙋", correctIndex: 0 },
        { id: "s2", text: "Terdengar ributan, anak kucing terjebak di dahan pohon tinggi.", emoji: "🐱", correctIndex: 1 },
        { id: "s3", text: "Nadia berlari meminta bantuan ke ruang penjaga sekolah.", emoji: "🏢", correctIndex: 2 },
        { id: "s4", text: "Nadia mengarahkan proses penyelamatan menggunakan tangga dan kain sebagai alas.", emoji: "🪜", correctIndex: 3 },
        { id: "s5", text: "Kucing berhasil diselamatkan. Teman-teman menyebutnya \"si pemberani kecil\".", emoji: "🎉", correctIndex: 4 },
        { id: "s6", text: "Nadia dipilih sekolah sebagai wakil kelas untuk lomba pidato dan debat.", emoji: "🏆", correctIndex: 5 }
      ]
    },
    buddyWords: {
      instruction: "Pilih kata-kata yang bisa kamu gunakan saat bercerita!",
      tip: "Tips: Gunakan kata-kata yang sudah kamu pilih saat menceritakan kembali kisah Buddy!",
      words: [
        { text: "berani", correct: true },
        { text: "percaya diri", correct: true },
        { text: "inisiatif", correct: true },
        { text: "mengambil tindakan", correct: true },
        { text: "menjawab pertanyaan", correct: true },
        { text: "mencoba hal baru", correct: true },
        { text: "menyelamatkan", correct: true },
        { text: "pidato", correct: true },
        { text: "debat", correct: true },
        { text: "wakil kelas", correct: true },
        { text: "takut", correct: false },
        { text: "menonton saja", correct: false },
        { text: "diam saja", correct: false },
        { text: "tidak berani", correct: false },
        { text: "menyerah", correct: false }
      ]
    }
  },
  wulan_citra: {
    title: "Persahabatan",
    character: "Wulan & Citra",
    characterDesc: "Dua sahabat yang selalu saling membantu dan peduli.",
    detective: {
      siapaAku: [
        "Aku suka menggambar",
        "Aku pendiam dan tenang",
        "Aku selalu berbagi dengan sahabatku",
        "Aku tidak ingin sahabatku sedih"
      ],
      question: "Sifat apakah yang dimiliki tokoh di atas?",
      options: [
        { label: "Jujur", value: "jujur" },
        { label: "Rajin", value: "rajin" },
        { label: "Peduli", value: "peduli", correct: true },
        { label: "Pemberani", value: "pemberani" }
      ]
    },
    pictureSorting: {
      instruction: "Kelompokkan gambar berikut ke dalam kotak yang tepat!",
      correctLabel: "PERILAKU BAIK",
      correctDesc: "Tempatkan gambar yang menunjukkan sikap persahabatan yang baik.",
      incorrectLabel: "PERILAKU TIDAK BAIK",
      incorrectDesc: "Tempatkan gambar yang menunjukkan sikap yang tidak baik.",
      items: [
        { id: "p1", text: "Membantu teman belajar", emoji: "📚", isCorrectCategory: true },
        { id: "p2", text: "Berbagi bekal dengan teman", emoji: "🍱", isCorrectCategory: true },
        { id: "p3", text: "Memberi semangat saat teman gugup", emoji: "🤝", isCorrectCategory: true },
        { id: "p4", text: "Bernyanyi bersama", emoji: "🎵", isCorrectCategory: true },
        { id: "p5", text: "Mengabaikan teman", emoji: "🙄", isCorrectCategory: false },
        { id: "p6", text: "Mengejek teman", emoji: "😜", isCorrectCategory: false },
        { id: "p7", text: "Mengerjakan tugas bersama", emoji: "✍️", isCorrectCategory: true },
        { id: "p8", text: "Tidak mau membantu teman", emoji: "🙅", isCorrectCategory: false }
      ]
    },
    storyPuzzle: {
      instruction: "Urutkan potongan cerita berikut dengan benar!",
      cards: [
        { id: "s1", text: "Wulan dan Citra adalah dua sahabat karib yang selalu bersama.", emoji: "👭", correctIndex: 0 },
        { id: "s2", text: "Citra mulai gelisah menjelang ulangan. Wulan menenangkannya.", emoji: "🧘", correctIndex: 1 },
        { id: "s3", text: "Saat Wulan tampil di depan kelas, Citra selalu memberi semangat.", emoji: "🙌", correctIndex: 2 },
        { id: "s4", text: "Citra lupa membawa bekal saat jam makan siang.", emoji: "🍱", correctIndex: 3 },
        { id: "s5", text: "Wulan membagi dua bekalnya untuk Citra tanpa diminta.", emoji: "🍱", correctIndex: 4 },
        { id: "s6", text: "Mereka semakin erat dan menjadi contoh persahabatan bagi teman-teman.", emoji: "👭", correctIndex: 5 }
      ]
    },
    buddyWords: {
      instruction: "Pilih kata-kata yang bisa kamu gunakan saat bercerita!",
      tip: "Tips: Gunakan kata-kata yang sudah kamu pilih saat menceritakan kembali kisah Buddy!",
      words: [
        { text: "bersahabat", correct: true },
        { text: "peduli", correct: true },
        { text: "membantu", correct: true },
        { text: "semangat", correct: true },
        { text: "berbagi", correct: true },
        { text: "mengabaikan", correct: false },
        { text: "menengejek", correct: false },
        { text: "bertengkar", correct: false },
        { text: "egois", correct: false },
        { text: "berselisih", correct: false }
      ]
    }
  }
};

export default function ChallengePage({ topic, onComplete, onNext, onBack, onStepComplete }) {
  const tId = topic.id || "bima";
  const data = challengesData[tId] || challengesData.bima;

  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3
  
  // State for step 1: Character Detective
  const [detectiveSelected, setDetectiveSelected] = useState(null);
  const [detectiveFeedback, setDetectiveFeedback] = useState(null); // 'success', 'error' or null

  // State for step 2: Picture Sorting
  const [sortingItems, setSortingItems] = useState([]);
  const [sortingCompleted, setSortingCompleted] = useState(false);
  const [sortingErrorFeedback, setSortingErrorFeedback] = useState(null);

  // State for step 3: Story Puzzle
  const [puzzleSlots, setPuzzleSlots] = useState([null, null, null, null, null, null]);
  const [puzzlePool, setPuzzlePool] = useState([]);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [puzzleErrorFeedback, setPuzzleErrorFeedback] = useState(null);

  // State for step 4: Buddy Words
  const [checkedWords, setCheckedWords] = useState({});
  const [wordsCompleted, setWordsCompleted] = useState(false);

  // Initial setup when topic or activeStep changes
  useEffect(() => {
    // Reset all step states
    setDetectiveSelected(null);
    setDetectiveFeedback(null);
    setSortingCompleted(false);
    setSortingErrorFeedback(null);
    setPuzzleCompleted(false);
    setPuzzleErrorFeedback(null);
    setWordsCompleted(false);

    // Initialize Step 2: Picture Sorting (shuffle items)
    if (data.pictureSorting?.items) {
      const itemsCopy = data.pictureSorting.items.map(item => ({ ...item, category: null }));
      // Shuffle items
      for (let i = itemsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
      }
      setSortingItems(itemsCopy);
    }

    // Initialize Step 3: Story Puzzle (shuffle pool)
    if (data.storyPuzzle?.cards) {
      const cardsCopy = data.storyPuzzle.cards.map(card => ({ ...card }));
      // Shuffle pool
      for (let i = cardsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
      }
      setPuzzlePool(cardsCopy);
      setPuzzleSlots([null, null, null, null, null, null]);
    }

    // Initialize Step 4: Buddy Words
    setCheckedWords({});
  }, [tId, data]);

  // Handle Detective Answer Check
  const handleSelectDetectiveOption = (option) => {
    setDetectiveSelected(option.value);
    if (option.correct) {
      setDetectiveFeedback('success');
    } else {
      setDetectiveFeedback('error');
    }
  };

  // Click handler to sort item for Step 2
  const handleSortItem = (itemId, targetCategory) => {
    setSortingErrorFeedback(null);
    const item = sortingItems.find(i => i.id === itemId);
    if (!item) return;

    // Check correctness immediately
    const isCorrectTarget = (targetCategory === 'correct' && item.isCorrectCategory) ||
                             (targetCategory === 'incorrect' && !item.isCorrectCategory);

    if (isCorrectTarget) {
      setSortingItems(prev => prev.map(i => {
        if (i.id === itemId) {
          return { ...i, category: targetCategory };
        }
        return i;
      }));
    } else {
      // Show temporary error feedback for this item
      setSortingErrorFeedback(`"${item.text}" kurang tepat dikelompokkan ke sana! Coba lagi.`);
      setTimeout(() => setSortingErrorFeedback(null), 3000);
    }
  };

  // Check if Step 2 is fully completed (all items correctly placed)
  useEffect(() => {
    if (sortingItems.length > 0) {
      const allSorted = sortingItems.every(i => i.category !== null);
      if (allSorted) {
        setSortingCompleted(true);
      }
    }
  }, [sortingItems]);

  // Click handlers for Step 3: Story Puzzle
  const handlePoolCardClick = (card) => {
    setPuzzleErrorFeedback(null);
    // Find first empty slot
    const emptyIndex = puzzleSlots.findIndex(slot => slot === null);
    if (emptyIndex !== -1) {
      const newSlots = [...puzzleSlots];
      newSlots[emptyIndex] = card;
      setPuzzleSlots(newSlots);
      setPuzzlePool(prev => prev.filter(c => c.id !== card.id));
    }
  };

  const handleSlotCardClick = (index) => {
    setPuzzleErrorFeedback(null);
    const card = puzzleSlots[index];
    if (card) {
      // Put back to pool
      setPuzzlePool(prev => [...prev, card]);
      const newSlots = [...puzzleSlots];
      newSlots[index] = null;
      setPuzzleSlots(newSlots);
    }
  };

  const checkPuzzleOrder = () => {
    // Check if slots are fully filled
    if (puzzleSlots.some(slot => slot === null)) {
      setPuzzleErrorFeedback("Lengkapi semua kotak urutan terlebih dahulu!");
      return;
    }

    // Check correct index matching
    const isCorrect = puzzleSlots.every((card, idx) => card.correctIndex === idx);
    if (isCorrect) {
      setPuzzleCompleted(true);
    } else {
      setPuzzleErrorFeedback("Urutan cerita masih belum tepat. Silakan atur kembali.");
    }
  };

  const resetPuzzle = () => {
    setPuzzleErrorFeedback(null);
    setPuzzleCompleted(false);
    setPuzzleSlots([null, null, null, null, null, null]);
    if (data.storyPuzzle?.cards) {
      const cardsCopy = data.storyPuzzle.cards.map(card => ({ ...card }));
      // Shuffle pool
      for (let i = cardsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
      }
      setPuzzlePool(cardsCopy);
    }
  };

  // Toggle words checked state in Step 4
  const handleToggleWord = (wordText, isCorrect) => {
    setCheckedWords(prev => {
      const next = { ...prev, [wordText]: !prev[wordText] };
      
      const correctWordsInChallenge = data.buddyWords.words.filter(w => w.correct).map(w => w.text);
      const incorrectWordsInChallenge = data.buddyWords.words.filter(w => !w.correct).map(w => w.text);

      const checkedKeys = Object.keys(next).filter(key => next[key] === true);
      const correctChecked = checkedKeys.filter(k => correctWordsInChallenge.includes(k));
      const incorrectChecked = checkedKeys.filter(k => incorrectWordsInChallenge.includes(k));

      // Required: at least 5 correct words, 0 incorrect words checked
      if (correctChecked.length >= 5 && incorrectChecked.length === 0) {
        setWordsCompleted(true);
      } else {
        setWordsCompleted(false);
      }

      return next;
    });
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      const completedStep = activeStep + 1; // 1, 2, or 3
      if (onStepComplete) {
        onStepComplete(completedStep);
      }
      setActiveStep(prev => prev + 1);
    } else {
      // Mark challenge progress completed (Step 4)
      if (onComplete) {
        onComplete();
      }
      // Navigate to VoiceAnswer
      if (onNext) {
        onNext();
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    } else {
      if (onBack) onBack();
    }
  };

  const progressSteps = [
    { label: "Character Detective", active: activeStep >= 0, checked: activeStep > 0 },
    { label: "Picture Sorting", active: activeStep >= 1, checked: activeStep > 1 },
    { label: "Story Puzzle", active: activeStep >= 2, checked: activeStep > 2 },
    { label: "Buddy Words", active: activeStep >= 3, checked: activeStep > 3 }
  ];

  const characterImage = charImages[tId] || charImages.bima;

  // Render Left Side Mascot Bubble Text based on activeStep
  const getMascotBubbleText = () => {
    if (activeStep === 0) {
      return "Tebak sifat tokoh utama dari petunjuk yang ada di memo ya!";
    }
    if (activeStep === 1) {
      return "Kelompokkan semua kartu perilaku baik ke kotak hijau, dan kurang baik ke kotak merah!";
    }
    if (activeStep === 2) {
      return `Klik kartu di bawah untuk mengurutkan kisah ${data.character} dari 1 sampai 6!`;
    }
    if (activeStep === 3) {
      if (wordsCompleted) {
        return "Hebat! Kamu sudah menyelesaikan semua tantangan dengan sempurna!";
      }
      return "Pilih minimal 5 kata baik yang akan membantu kamu menceritakan kisah ini nanti!";
    }
    return "";
  };

  return (
    <div className="w-full space-y-6 max-w-7xl mx-auto px-2 py-4">
      {/* 1. Header Area styled like the reference */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 select-none relative overflow-hidden">
        {/* Left: Home Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#1e3a8a] font-extrabold rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all self-start md:self-auto"
        >
          <Home className="w-4 h-4" />
          <span>Beranda</span>
        </button>

        {/* Center: Title & Subtitle */}
        <div className="text-center flex-1 space-y-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight select-none">
            <span className="text-[#315588]">BUDDY</span>{" "}
            <span className="text-orange-500">CHALLENGE</span>
          </h1>
          <p className="text-slate-500 font-extrabold text-xs md:text-sm">
            Selesaikan semua tantangan untuk membantumu siap menceritakan kembali kisah Buddy!
          </p>
        </div>

        {/* Right: Character Info Card */}
        <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-3 max-w-sm">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-200 bg-white flex-shrink-0">
            <img src={characterImage} alt={data.character} className="w-full h-full object-cover" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider block">
              Tokoh Hari Ini
            </span>
            <span className="font-extrabold text-slate-800 text-sm block">
              {data.character} ({data.title.replace("Sifat ", "")})
            </span>
            <p className="text-[10px] text-slate-500 font-bold leading-normal mt-0.5">
              {data.characterDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Challenge Step container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-8 min-h-[480px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHARACTER DETECTIVE */}
          {activeStep === 0 && (
            <motion.div
              key="step-detective"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Challenge Title */}
              <div className="text-center">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  1 · CHARACTER DETECTIVE
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mt-2">
                  Tebak sifat tokoh dari petunjuk yang diberikan!
                </h2>
              </div>

              {/* Wooden corkboard block */}
              <div className="w-full max-w-2xl bg-[#a16207]/10 border-8 border-[#78350f]/40 rounded-3xl p-6 shadow-inner relative flex flex-col md:flex-row gap-6 items-center">
                {/* Paper note card */}
                <div className="flex-1 bg-amber-50 rounded-lg p-5 shadow-lg border border-amber-100 relative rotate-[-1deg] before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:bg-red-500 before:rounded-full before:shadow-sm">
                  {/* Magnifying glass icon overlay */}
                  <span className="absolute top-3 left-3 text-amber-900/30 text-xl font-bold">🔍</span>
                  
                  <h3 className="text-center font-black text-amber-900 text-lg border-b border-amber-200/50 pb-2 mb-3">
                    SIAPA AKU?
                  </h3>
                  
                  <ul className="space-y-2">
                    {data.detective.siapaAku.map((clue, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-bold">
                        <span className="text-amber-500 mt-0.5">★</span>
                        <span>{clue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Polaroid card */}
                <div className="w-48 bg-white p-3 pb-6 rounded shadow-md rotate-[2deg] border border-slate-100 relative before:absolute before:top-1.5 before:left-1/2 before:-translate-x-1/2 before:w-2.5 before:h-2.5 before:bg-red-500 before:rounded-full before:shadow-sm flex-shrink-0 flex flex-col items-center">
                  <div className="w-full aspect-square overflow-hidden bg-slate-100 border border-slate-200 rounded">
                    <img src={characterImage} alt={data.character} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center mt-3">
                    <span className="font-black text-slate-800 text-sm uppercase tracking-wider">
                      {data.character.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="w-full max-w-xl space-y-4">
                <p className="text-center text-slate-600 font-extrabold text-sm uppercase tracking-wide">
                  {data.detective.question}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {data.detective.options.map((option) => {
                    const isSelected = detectiveSelected === option.value;
                    const isCorrect = option.correct;
                    
                    let btnStyle = "border-slate-200 bg-white text-slate-700 hover:border-blue-400";
                    let icon = null;

                    if (detectiveFeedback && isSelected) {
                      if (isCorrect) {
                        btnStyle = "border-green-500 bg-green-500 text-white font-black";
                        icon = <Check className="w-5 h-5 text-white" strokeWidth={3} />;
                      } else {
                        btnStyle = "border-red-500 bg-red-500 text-white font-black";
                        icon = <X className="w-5 h-5 text-white" strokeWidth={3} />;
                      }
                    } else if (detectiveFeedback && isCorrect) {
                      btnStyle = "border-green-500 bg-green-50 border-2 text-green-700 font-black";
                    }

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelectDetectiveOption(option)}
                        disabled={detectiveFeedback === 'success'}
                        className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 text-sm md:text-base font-extrabold transition-all duration-200 active:scale-95 cursor-pointer shadow-sm ${btnStyle}`}
                      >
                        {icon}
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Feedback Banner */}
                {detectiveFeedback === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex gap-3 text-xs md:text-sm font-bold"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>Jawaban kurang tepat! Coba ingat kembali sifat {data.character} dalam cerita.</span>
                  </motion.div>
                )}
                
                {detectiveFeedback === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex gap-3 text-xs md:text-sm font-bold"
                  >
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Luar biasa! Jawabanmu benar. {data.character} memiliki sifat {data.title.replace("Sifat ", "")}.</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PICTURE SORTING */}
          {activeStep === 1 && (
            <motion.div
              key="step-sorting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Challenge Title */}
              <div className="text-center">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  2 · PICTURE SORTING
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mt-2">
                  {data.pictureSorting.instruction}
                </h2>
              </div>

              {/* Grid of 12 small item cards */}
              <div className="w-full max-w-4xl grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {sortingItems.map((item) => {
                  const isSorted = item.category !== null;
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      className={`rounded-2xl border p-2 flex flex-col items-center justify-between aspect-square text-center shadow-sm relative transition-all duration-300 ${
                        isSorted
                          ? item.category === 'correct'
                            ? 'border-green-300 bg-green-50/50 opacity-40 scale-95'
                            : 'border-red-300 bg-red-50/50 opacity-40 scale-95'
                          : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      {isSorted && (
                        <div className={`absolute top-1 right-1 rounded-full p-0.5 text-white ${
                          item.category === 'correct' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <Check className="w-2.5 h-2.5" strokeWidth={4} />
                        </div>
                      )}

                      {item.image ? (
                        <div className="w-full flex-1 min-h-0 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center mb-1.5">
                          <img 
                            src={item.image} 
                            alt={item.text} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <span className="text-3xl md:text-4xl mt-1 select-none">{item.emoji}</span>
                      )}
                      
                      <span className="text-[10px] font-black text-slate-700 leading-tight mb-1">
                        {item.text}
                      </span>

                      {!isSorted && (
                        <div className="absolute inset-0 bg-white/95 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center gap-1.5 p-1 rounded-2xl">
                          <button
                            onClick={() => handleSortItem(item.id, 'correct')}
                            className="w-full py-1 bg-green-500 hover:bg-green-600 text-white font-black text-[9px] rounded-lg shadow-sm cursor-pointer"
                          >
                            ✔️ {data.title.replace("Sifat ", "")}
                          </button>
                          <button
                            onClick={() => handleSortItem(item.id, 'incorrect')}
                            className="w-full py-1 bg-red-500 hover:bg-red-600 text-white font-black text-[9px] rounded-lg shadow-sm cursor-pointer"
                          >
                            ❌ Bukan
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Drop Zones (Left: Correct, Right: Incorrect) */}
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Green Zone: Correct Perilaku */}
                <div className="border-2 border-dashed border-green-400 bg-green-50/5 rounded-3xl p-5 text-center min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-green-700">
                    <div className="bg-green-500 text-white p-1 rounded-full">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <span className="font-black text-sm md:text-base tracking-wider uppercase">
                      {data.pictureSorting.correctLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-extrabold max-w-sm">
                    {data.pictureSorting.correctDesc}
                  </p>

                  <span className="mt-3 text-xs font-black text-green-700 bg-green-100/50 px-3 py-1 rounded-full">
                    {sortingItems.filter(i => i.category === 'correct').length} /{" "}
                    {sortingItems.filter(i => i.isCorrectCategory).length} Kartu
                  </span>
                </div>

                {/* Red Zone: Incorrect Perilaku */}
                <div className="border-2 border-dashed border-red-400 bg-red-50/5 rounded-3xl p-5 text-center min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-red-700">
                    <div className="bg-red-500 text-white p-1 rounded-full">
                      <X className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <span className="font-black text-sm md:text-base tracking-wider uppercase">
                      {data.pictureSorting.incorrectLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-extrabold max-w-sm">
                    {data.pictureSorting.incorrectDesc}
                  </p>

                  <span className="mt-3 text-xs font-black text-red-700 bg-red-100/50 px-3 py-1 rounded-full">
                    {sortingItems.filter(i => i.category === 'incorrect').length} /{" "}
                    {sortingItems.filter(i => !i.isCorrectCategory).length} Kartu
                  </span>
                </div>
              </div>

              {sortingErrorFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex gap-3 text-xs font-bold w-full max-w-md"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 animate-bounce" />
                  <span>{sortingErrorFeedback}</span>
                </motion.div>
              )}

              {sortingCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex gap-3 text-xs md:text-sm font-bold w-full max-w-md"
                >
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Keren! Kamu berhasil mengelompokkan semua perilaku dengan benar.</span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: STORY PUZZLE */}
          {activeStep === 2 && (
            <motion.div
              key="step-puzzle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Challenge Title */}
              <div className="text-center">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  3 · STORY PUZZLE
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mt-2">
                  {data.storyPuzzle.instruction}
                </h2>
              </div>

              {/* Slot Target Boxes */}
              <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {puzzleSlots.map((slotCard, idx) => {
                  const hasCard = slotCard !== null;
                  
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shadow-inner">
                        {idx + 1}
                      </div>

                      <div
                        onClick={() => hasCard && handleSlotCardClick(idx)}
                        className={`w-full aspect-[4/5] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-between p-3 cursor-pointer ${
                          hasCard
                            ? 'border-blue-400 bg-blue-50/20 shadow-md scale-100 hover:scale-95'
                            : 'border-slate-300 bg-slate-50/30 hover:border-slate-400 flex items-center justify-center'
                        }`}
                      >
                        {hasCard ? (
                          <>
                            <span className="text-3xl md:text-4xl mt-1 select-none">{slotCard.emoji}</span>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-700 leading-tight text-center">
                              {slotCard.text}
                            </span>
                            <span className="text-[8px] font-black text-slate-400">Kembalikan</span>
                          </>
                        ) : (
                          <span className="text-slate-400 font-bold text-lg select-none">?</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shuffled pool of cards */}
              {!puzzleCompleted && (
                <div className="w-full max-w-5xl border-t border-slate-100 pt-6 space-y-3">
                  <p className="text-center text-slate-500 font-black text-xs uppercase tracking-wider">
                    Klik kartu di bawah ini untuk meletakkannya ke urutan yang kosong!
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {puzzlePool.map((card) => (
                      <motion.div
                        key={card.id}
                        layout
                        onClick={() => handlePoolCardClick(card)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="aspect-[4/5] bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-3 flex flex-col items-center justify-between text-center cursor-pointer shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="text-3xl md:text-4xl mt-1 select-none">{card.emoji}</span>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-700 leading-tight">
                          {card.text}
                        </span>
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-[10px] font-black text-slate-400 flex items-center justify-center">
                          +
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error and actions area */}
              <div className="w-full max-w-md flex flex-col items-center gap-4">
                {puzzleErrorFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex gap-3 text-xs font-bold w-full"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{puzzleErrorFeedback}</span>
                  </motion.div>
                )}

                {puzzleCompleted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex gap-3 text-xs md:text-sm font-bold w-full"
                  >
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Luar biasa! Urutan kisah {data.character} sudah 100% benar.</span>
                  </motion.div>
                )}

                <div className="flex gap-3 w-full">
                  {!puzzleCompleted && (
                    <button
                      onClick={checkPuzzleOrder}
                      disabled={puzzleSlots.some(s => s === null)}
                      className={`flex-1 font-black py-3 px-6 rounded-2xl shadow-md transition-all text-sm cursor-pointer ${
                        puzzleSlots.some(s => s === null)
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-[#315588] hover:bg-[#233f66] text-white active:scale-95'
                      }`}
                    >
                      Periksa Urutan
                    </button>
                  )}
                  
                  <button
                    onClick={resetPuzzle}
                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-sm rounded-2xl shadow-sm cursor-pointer transition-all"
                  >
                    Reset Urutan
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: BUDDY WORDS */}
          {activeStep === 3 && (
            <motion.div
              key="step-words"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Challenge Title */}
              <div className="text-center">
                <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  4 · BUDDY WORDS
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mt-2">
                  {data.buddyWords.instruction}
                </h2>
              </div>

              {/* Grid of 9 words */}
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.buddyWords.words.map((word) => {
                  const isChecked = !!checkedWords[word.text];
                  
                  let wordStyle = "border-slate-200 hover:border-blue-400 bg-white text-slate-700";
                  let checkIcon = null;

                  if (isChecked) {
                    if (word.correct) {
                      wordStyle = "border-green-400 bg-green-50 text-green-700 font-extrabold";
                      checkIcon = <Check className="w-4 h-4 text-green-600" strokeWidth={3.5} />;
                    } else {
                      wordStyle = "border-red-400 bg-red-50 text-red-700 font-extrabold";
                      checkIcon = <X className="w-4 h-4 text-red-600" strokeWidth={3.5} />;
                    }
                  }

                  return (
                    <button
                      key={word.text}
                      onClick={() => handleToggleWord(word.text, word.correct)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 text-sm md:text-base font-bold transition-all cursor-pointer shadow-sm ${wordStyle}`}
                    >
                      <span>{word.text}</span>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        isChecked 
                          ? word.correct 
                            ? 'border-green-400 bg-green-100' 
                            : 'border-red-400 bg-red-100'
                          : 'border-slate-300'
                      }`}>
                        {checkIcon}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tip Box */}
              <div className="bg-[#fef8e7] border border-amber-200 rounded-3xl p-4 flex gap-3 text-amber-800 text-xs md:text-sm max-w-xl font-bold">
                <span className="text-xl shrink-0 select-none">💡</span>
                <p className="leading-relaxed">
                  {data.buddyWords.tip}
                </p>
              </div>

              {wordsCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex gap-3 text-xs md:text-sm font-bold w-full max-w-xl"
                >
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Hebat! Kamu sudah memilih kata-kata penting yang tepat untuk menceritakan kembali kisah Buddy!</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Bottom Progress Bar & Navigation Actions */}
        <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 select-none">
          {/* Left: Mascot & status speech bubble */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border border-blue-200 text-2xl select-none">
              🐦
            </div>
            
            {/* Speech bubble style */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl px-4 py-2.5 text-xs md:text-sm font-extrabold text-slate-600 leading-tight relative before:absolute before:left-[-8px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-slate-50 before:border-l before:border-b before:border-slate-200 before:rotate-45">
              {getMascotBubbleText()}
            </div>
          </div>

          {/* Center: Steps tracker progress */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
            {progressSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isChecked = activeStep > idx;
              
              let badgeColor = "bg-slate-200 text-slate-500";
              if (isActive) badgeColor = "bg-blue-600 text-white border border-blue-500 shadow-sm font-black";
              if (isChecked) badgeColor = "bg-green-500 text-white font-black";

              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all ${badgeColor}`}
                  >
                    {isChecked ? <Check className="w-4 h-4 text-white" strokeWidth={3} /> : idx + 1}
                  </div>
                  {idx < progressSteps.length - 1 && (
                    <div className={`w-4 h-0.5 ${activeStep > idx ? 'bg-green-500' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            {activeStep > 0 && (
              <button
                onClick={handlePrevStep}
                className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-sm rounded-2xl shadow-sm cursor-pointer transition-all"
              >
                Kembali
              </button>
            )}

            {activeStep === 0 && (
              <button
                onClick={handleNextStep}
                disabled={detectiveFeedback !== 'success'}
                className={`font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  detectiveFeedback === 'success'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {activeStep === 1 && (
              <button
                onClick={handleNextStep}
                disabled={!sortingCompleted}
                className={`font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  sortingCompleted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {activeStep === 2 && (
              <button
                onClick={handleNextStep}
                disabled={!puzzleCompleted}
                className={`font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  puzzleCompleted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {activeStep === 3 && (
              <div className="flex items-center gap-2">
                {wordsCompleted && (
                  <motion.button
                    initial={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                  >
                    <Mic className="w-4 h-4" />
                    <span>LANJUT KE REKAM SUARA</span>
                  </motion.button>
                )}
                
                {wordsCompleted && (
                  <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center shadow-sm">
                    <Trophy className="w-6 h-6 text-amber-500 fill-amber-300 animate-pulse" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
