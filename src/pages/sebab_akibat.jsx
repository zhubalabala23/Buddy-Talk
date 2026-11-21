import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Lightbulb, Megaphone, ArrowRight, ChevronLeft, Check, MessageSquareHeart, Layers } from 'lucide-react';

// Mascot image
import karakterCowo from '../assets/images/charachters_landingpage/karakter_cowo.webp';

// Sebab-Akibat WebP assets (Page 1 & 2)
import sebabImg from '../assets/images_sebab_akibat/sebab.webp';
import akibatImg from '../assets/images_sebab_akibat/akibat.webp';
import pahamiContohImg from '../assets/images_sebab_akibat/pahami_contoh.webp';
import contohKarenaImg from '../assets/images_sebab_akibat/contoh_karena.webp';
import contohSehinggaImg from '../assets/images_sebab_akibat/contoh_sehingga.webp';

// Page 3: Contoh Lain dalam Kehidupan Sehari-hari assets
import contohNinaImg from '../assets/images_sebab_akibat/contoh_nina.webp';
import contohSitiImg from '../assets/images_sebab_akibat/contoh_siti.webp';
import contohDoniImg from '../assets/images_sebab_akibat/contoh_doni.webp';
import contohRaniImg from '../assets/images_sebab_akibat/contoh_rani.webp';
import contohBeniImg from '../assets/images_sebab_akibat/contoh_beni.webp';
import contohDikaImg from '../assets/images_sebab_akibat/contoh_dika.webp';

export default function SebabAkibat({ onHome, onComplete }) {
  // State for dividing into 3 pages as requested
  const [currentPage, setCurrentPage] = useState(1); // 1, 2, 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-7xl mx-auto px-2 py-3 space-y-4 font-sans"
    >
      {/* Outer Cyan Rounded Frame matching reference image */}
      <div className="bg-[#0099ff] p-3 md:p-4 rounded-[2.5rem] shadow-2xl space-y-4 border-4 border-sky-300/40">
        
        {/* Top Banner Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#1e4e8c] text-white p-3 md:px-6 md:py-3.5 rounded-3xl shadow-lg relative overflow-hidden select-none">
          {/* Left: Beranda Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className="flex items-center gap-2 bg-white text-[#1e4e8c] font-black px-4 py-2 rounded-2xl shadow hover:bg-slate-100 transition-colors shrink-0 cursor-pointer text-sm self-start md:self-auto"
          >
            <Home className="w-5 h-5 text-[#1e4e8c]" />
            <span>Beranda</span>
          </motion.button>

          {/* Center: Banner Title */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 bg-blue-900/40 px-5 py-1 rounded-full border border-blue-300/30">
              <BookOpen className="w-5 h-5 text-amber-300" />
              <h1 className="text-xl md:text-2xl font-black tracking-wide uppercase">
                MATERI PEMBELAJARAN
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-blue-100 mt-1">
              Pelajari materi berikut sebelum kamu menyelesaikan Buddy Challenge!
            </p>
          </div>

          {/* Right side placeholder */}
          <div className="hidden md:block w-28 shrink-0"></div>
        </div>

        {/* Dynamic Multi-page Content */}
        <AnimatePresence mode="wait">
          {/* HALAMAN 1 (Exact design from the reference image) */}
          {currentPage === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch"
            >
              {/* CARD 1: Mengenal Kalimat Majemuk Sebab-Akibat */}
              <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-base md:text-lg font-black text-[#1e3a8a]">
                    Mengenal Kalimat Majemuk Sebab-Akibat
                  </h2>
                </div>

                {/* Explanation Text */}
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-semibold">
                  Kalimat sebab-akibat menceritakan dua kejadian yang saling berhubungan. Kejadian pertama disebut <span className="text-blue-600 font-extrabold">sebab</span>, yaitu hal yang membuat sesuatu terjadi. Kejadian kedua disebut <span className="text-blue-600 font-extrabold">akibat</span>, yaitu hal yang terjadi karena sebab itu.
                </p>

                {/* Cause -> Effect Visual Diagram */}
                <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-around gap-4">
                  {/* Cause Box */}
                  <div className="flex flex-col items-center text-center bg-white p-2 rounded-2xl border border-blue-200 shadow-sm w-full sm:w-56 overflow-hidden">
                    <div className="w-full bg-amber-50/50 rounded-xl overflow-hidden border border-amber-200 flex items-center justify-center p-1">
                      <img
                        src={sebabImg}
                        alt="Sebab: Belajar dengan giat"
                        className="w-full h-auto max-h-56 object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Blue Arrow */}
                  <div className="text-blue-500 font-black text-3xl hidden sm:block shrink-0">➔</div>
                  <div className="text-blue-500 font-black text-3xl block sm:hidden shrink-0">↓</div>

                  {/* Effect Box */}
                  <div className="flex flex-col items-center text-center bg-white p-2 rounded-2xl border border-blue-200 shadow-sm w-full sm:w-56 overflow-hidden">
                    <div className="w-full bg-emerald-50/50 rounded-xl overflow-hidden border border-emerald-200 flex items-center justify-center p-1">
                      <img
                        src={akibatImg}
                        alt="Akibat: Mendapat nilai bagus"
                        className="w-full h-auto max-h-56 object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Note with Yellow Lightbulb */}
                <div className="bg-sky-50/80 border border-sky-100 p-3 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
                  <p className="leading-snug">
                    Kita menggunakan sebab dan akibat menggunakan kata penghubung <span className="font-extrabold text-[#1e3a8a]">sebab-akibat</span>, yaitu <span className="text-amber-800 bg-amber-200/90 px-2.5 py-0.5 rounded-lg font-black inline-block shadow-xs">karena</span> dan <span className="text-emerald-800 bg-emerald-200/90 px-2.5 py-0.5 rounded-lg font-black inline-block shadow-xs">sehingga</span>.
                  </p>
                </div>
              </div>

              {/* CARD 2: Kata Penghubung Sebab-Akibat */}
              <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Header & Mascot speech bubble */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 text-white p-2.5 rounded-2xl shadow-sm">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <h2 className="text-base md:text-lg font-black text-[#1e3a8a]">
                      Kata Penghubung Sebab-Akibat
                    </h2>
                  </div>

                  {/* Mascot with Speech Bubble */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-sky-100 border border-sky-200 text-sky-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      Yuk, pahami contoh-contohnya!
                    </div>
                    <img src={pahamiContohImg} alt="Yuk pahami contohnya" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
                  </div>
                </div>

                {/* Floating Badges: Karena & Sehingga (Effect Melayang on Hover) */}
                <div className="flex justify-center gap-4 py-1">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.07, 
                      boxShadow: "0 18px 25px -4px rgba(245, 158, 11, 0.45), 0 8px 10px -6px rgba(245, 158, 11, 0.2)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#fef3c7] hover:bg-[#fde68a] border-2 border-[#fcd34d] text-[#b45309] text-base md:text-xl font-black px-8 md:px-12 py-2.5 rounded-2xl shadow-sm cursor-pointer select-none transition-colors"
                  >
                    karena
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.35 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.07, 
                      boxShadow: "0 18px 25px -4px rgba(34, 197, 94, 0.45), 0 8px 10px -6px rgba(34, 197, 94, 0.2)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#dcfce7] hover:bg-[#bbf7d0] border-2 border-[#86efac] text-[#15803d] text-base md:text-xl font-black px-8 md:px-12 py-2.5 rounded-2xl shadow-sm cursor-pointer select-none transition-colors"
                  >
                    sehingga
                  </motion.div>
                </div>

                {/* 3 Numbered Sentence Examples */}
                <div className="space-y-2.5">
                  {/* Example 1 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm mt-0.5">
                      1
                    </span>
                    <div className="text-xs font-semibold leading-relaxed">
                      <p className="text-slate-800 font-extrabold text-sm">
                        Andi lupa membawa payung, <span className="text-emerald-600 font-black">sehingga</span> ia kehujanan di jalan.
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-bold text-blue-600">Sebab:</span> Andi lupa membawa payung. &nbsp;|&nbsp; <span className="font-bold text-emerald-600">Akibat:</span> Andi kehujanan di jalan.
                      </p>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm mt-0.5">
                      2
                    </span>
                    <div className="text-xs font-semibold leading-relaxed">
                      <p className="text-slate-800 font-extrabold text-sm">
                        Ibu memasak sayur bayam <span className="text-amber-600 font-black">karena</span> adik suka makan sayur itu.
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-bold text-amber-600">Sebab:</span> adik suka makan sayur itu. &nbsp;|&nbsp; <span className="font-bold text-blue-600">Akibat:</span> Ibu memasak sayur bayam.
                      </p>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm mt-0.5">
                      3
                    </span>
                    <div className="text-xs font-semibold leading-relaxed">
                      <p className="text-slate-800 font-extrabold text-sm">
                        Bima selalu berkata jujur, <span className="text-emerald-600 font-black">sehingga</span> teman-temannya percaya kepadanya.
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-bold text-blue-600">Sebab:</span> Bima berkata jujur. &nbsp;|&nbsp; <span className="font-bold text-emerald-600">Akibat:</span> teman-temannya percaya kepadanya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* HALAMAN 2 (Sesuai referensi gambar) */}
          {currentPage === 2 && (
            <motion.div
              key="page-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
            >
              {/* CARD 1 (Left): Kata Penghubung Sebab-Akibat (8 kolom) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-[#7c3aed] text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <MessageSquareHeart className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h2 className="text-lg md:text-xl font-black text-[#1e3a8a]">
                      Kata Penghubung Sebab-Akibat
                    </h2>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-semibold">
                    Kata penghubung sebab-akibat digunakan untuk menghubungkan klausa atau kalimat yang menunjukkan hubungan sebab dan akibat.
                  </p>
                </div>

                {/* 2 Sub-cards: Karena & Sehingga */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch pt-1">
                  {/* Sub-card 1: Karena */}
                  <div className="bg-[#fffbeb]/70 border-2 border-amber-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="space-y-2.5">
                      {/* Badge Karena */}
                      <div className="bg-[#fef08a] border border-[#fde047] text-[#854d0e] font-black text-sm md:text-base py-1.5 px-6 rounded-xl text-center shadow-xs">
                        Karena
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                        Digunakan untuk menyatakan <span className="font-extrabold text-slate-900">sebab</span> atau alasan.
                      </p>

                      {/* Tag Contoh */}
                      <div className="inline-block bg-amber-500 text-white text-[11px] font-black px-3.5 py-0.5 rounded-full shadow-xs">
                        Contoh:
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-1.5 text-xs md:text-[13px] font-semibold text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>Aku tidak masuk sekolah <span className="font-extrabold text-slate-900">karena</span> sakit.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>Ririn tidak ikut lomba <span className="font-extrabold text-slate-900">karena</span> belum siap.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Image */}
                    <div className="w-full bg-white rounded-xl overflow-hidden border border-amber-200/70 shadow-xs mt-2 flex items-center justify-center">
                      <img
                        src={contohKarenaImg}
                        alt="Contoh Karena: Aku tidak masuk sekolah karena sakit"
                        className="w-full h-auto object-cover max-h-48"
                      />
                    </div>
                  </div>

                  {/* Sub-card 2: Sehingga */}
                  <div className="bg-[#f0fdf4]/70 border-2 border-emerald-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="space-y-2.5">
                      {/* Badge Sehingga */}
                      <div className="bg-[#bbf7d0] border border-[#86efac] text-[#166534] font-black text-sm md:text-base py-1.5 px-6 rounded-xl text-center shadow-xs">
                        Sehingga
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                        Digunakan untuk menyatakan <span className="font-extrabold text-slate-900">akibat</span> atau hasil dari suatu peristiwa.
                      </p>

                      {/* Tag Contoh */}
                      <div className="inline-block bg-emerald-600 text-white text-[11px] font-black px-3.5 py-0.5 rounded-full shadow-xs">
                        Contoh:
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-1.5 text-xs md:text-[13px] font-semibold text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>Ia belajar dengan giat <span className="font-extrabold text-slate-900">sehingga</span> nilainya naik.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>Hujan deras <span className="font-extrabold text-slate-900">sehingga</span> jalan menjadi licin.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Image */}
                    <div className="w-full bg-white rounded-xl overflow-hidden border border-emerald-200/70 shadow-xs mt-2 flex items-center justify-center">
                      <img
                        src={contohSehinggaImg}
                        alt="Contoh Sehingga: Ia belajar dengan giat sehingga nilainya naik"
                        className="w-full h-auto object-cover max-h-48"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2 (Right): Tips Buddy (4 kolom) */}
              <div className="lg:col-span-4 bg-[#fffef7] rounded-3xl p-5 md:p-6 shadow-md border-2 border-amber-200/80 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" />
                  <h2 className="text-lg md:text-xl font-black text-[#1e3a8a]">
                    Tips Buddy
                  </h2>
                </div>

                {/* 4 Checklist Items */}
                <div className="space-y-4 my-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Perhatikan kata penghubung yang digunakan, yaitu <span className="font-extrabold text-[#1e3a8a]">karena</span> dan <span className="font-extrabold text-[#1e3a8a]">sehingga</span>.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Coba pahami dulu hubungan antara dua kejadian dalam kalimat.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Tentukan mana yang menjadi <span className="font-extrabold text-[#1e3a8a]">sebab</span> dan mana yang menjadi <span className="font-extrabold text-[#1e3a8a]">akibat</span>.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Latihan lagi dengan contoh yang ada di halaman ini ya, Buddy!
                    </p>
                  </div>
                </div>

                {/* Mascot & Speech Bubble */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <div className="relative bg-white border-2 border-sky-400 text-[#1e3a8a] text-xs md:text-sm font-black px-4 py-1.5 rounded-full shadow-sm">
                    <span>Kamu pasti bisa!</span>
                  </div>
                  <img
                    src={karakterCowo}
                    alt="Buddy"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm shrink-0"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* HALAMAN 3 (Sesuai referensi gambar: Contoh Lain dalam Kehidupan Sehari-hari) */}
          {currentPage === 3 && (
            <motion.div
              key="page-3"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
            >
              {/* CARD 1 (Left): Contoh Lain dalam Kehidupan Sehari-hari (9 kolom) */}
              <div className="lg:col-span-9 bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[#7c3aed] text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Layers className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-[#1e3a8a]">
                    Contoh Lain dalam Kehidupan Sehari-hari
                  </h2>
                </div>

                {/* Grid 6 Contoh: 2 baris x 3 kolom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 items-stretch">
                  {/* Contoh 1: Nina */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-purple-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        1
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohNinaImg}
                          alt="Nina tidur terlalu larut"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Nina tidur terlalu larut, <span className="text-blue-600 font-extrabold">sehingga</span> ia bangun kesiangan.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">tidur terlalu larut.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">bangun kesiangan.</span>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 2: Siti */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-amber-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        2
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohSitiImg}
                          alt="Siti menyiram tanaman setiap pagi"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Siti menyiram tanaman setiap pagi, <span className="text-blue-600 font-extrabold">sehingga</span> tanamannya tumbuh subur.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">menyiram tanaman setiap pagi.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">tanaman tumbuh subur.</span>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 3: Doni */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-purple-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        3
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohDoniImg}
                          alt="Doni makan makanan bergizi"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Doni makan makanan bergizi, <span className="text-blue-600 font-extrabold">sehingga</span> ia menjadi sehat.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">makan makanan bergizi.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">menjadi sehat.</span>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 4: Rani */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-purple-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        4
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohRaniImg}
                          alt="Rani belajar dengan rajin"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Rani belajar dengan rajin, <span className="text-blue-600 font-extrabold">sehingga</span> ia mendapatkan nilai bagus.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">belajar dengan rajin.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">mendapatkan nilai bagus.</span>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 5: Beni */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-purple-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        5
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohBeniImg}
                          alt="Beni tidak membawa payung saat hujan"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Beni tidak membawa payung saat hujan, <span className="text-blue-600 font-extrabold">sehingga</span> bajunya basah.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">tidak membawa payung saat hujan.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">bajunya basah.</span>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 6: Dika */}
                  <div className="bg-white border-2 border-slate-100/90 hover:border-purple-200 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md transition-all">
                    {/* Top Row: Number badge + Illustration */}
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        6
                      </span>
                      <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-0.5">
                        <img
                          src={contohDikaImg}
                          alt="Dika memakai helm saat bersepeda"
                          className="w-full h-auto max-h-24 object-contain"
                        />
                      </div>
                    </div>

                    {/* Sentence */}
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Dika memakai helm saat bersepeda, <span className="text-blue-600 font-extrabold">sehingga</span> kepalanya terlindungi.
                    </p>

                    {/* Sebab - Akibat badges */}
                    <div className="space-y-1 pt-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#059669] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Sebab:
                        </span>
                        <span className="truncate">memakai helm saat bersepeda.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#0284c7] text-white font-black px-1.5 py-0.5 rounded text-[10px] tracking-wide shrink-0">
                          Akibat:
                        </span>
                        <span className="truncate">kepala terlindungi.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2 (Right): Tips Buddy (3 kolom) */}
              <div className="lg:col-span-3 bg-[#fffef8] rounded-3xl p-5 md:p-6 shadow-md border-2 border-amber-200/80 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" />
                  <h2 className="text-lg md:text-xl font-black text-[#1e3a8a]">
                    Tips Buddy
                  </h2>
                </div>

                {/* 4 Checklist Items */}
                <div className="space-y-4 my-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Perhatikan alasan terjadinya suatu peristiwa.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Cari tahu apa yang terjadi akibat peristiwa tersebut.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Perhatikan penggunaan kata penghubung <span className="font-extrabold text-[#1e3a8a]">karena</span> dan <span className="font-extrabold text-[#1e3a8a]">sehingga</span>.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                      Coba temukan sendiri bagian sebab dan akibat dari setiap contoh!
                    </p>
                  </div>
                </div>

                {/* Mascot & Speech Bubble */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <div className="relative bg-white border-2 border-sky-400 text-[#1e3a8a] text-xs md:text-sm font-black px-4 py-1.5 rounded-full shadow-sm text-center">
                    <span>Semangat belajar!</span>
                  </div>
                  <img
                    src={karakterCowo}
                    alt="Buddy"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm shrink-0"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bilah Navigasi Bawah (3 Halaman Materi) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        {/* Left: Indicator Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
            {currentPage}
          </div>
          <div className="text-xs font-bold text-slate-600">
            <span className="block text-slate-400 font-extrabold uppercase text-[10px]">Materi Sebab-Akibat</span>
            <span>Halaman {currentPage} dari 3</span>
          </div>
        </div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-105'
                  : currentPage > page
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Right: Prev & Next Action Buttons */}
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-extrabold text-xs md:text-sm rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          )}

          {currentPage < 3 ? (
            <button
              onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs md:text-sm rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Lanjut ke Halaman {currentPage + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onComplete || onHome}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2 active:scale-95 shadow-emerald-200"
            >
              <span>Lanjut ke Halaman Materi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
