import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Volume2, Lightbulb, CheckCircle, Star, ArrowRight, Book, Megaphone } from 'lucide-react';

// Default characters
import karakterCowo from '../assets/images/charachters_landingpage/karakter_cowo.webp';

// New Sebab-Akibat WebP assets
import sebabImg from '../assets/images_sebab_akibat/sebab.webp';
import akibatImg from '../assets/images_sebab_akibat/akibat.webp';
import pahamiContohImg from '../assets/images_sebab_akibat/pahami_contoh.webp';
import ninaImg from '../assets/images_sebab_akibat/nina.webp';
import rakaImg from '../assets/images_sebab_akibat/raka.webp';
import sitiImg from '../assets/images_sebab_akibat/siti.webp';
import dodiImg from '../assets/images_sebab_akibat/dodi.webp';

export default function SebabAkibat({ onHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-7xl mx-auto px-2 py-3 space-y-5 font-sans"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#315588] text-white p-3 md:px-6 md:py-3.5 rounded-3xl shadow-lg relative overflow-hidden">
        {/* Left: Beranda Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHome}
          className="flex items-center gap-2 bg-white text-[#315588] font-black px-4 py-2 rounded-2xl shadow hover:bg-slate-100 transition-colors shrink-0 cursor-pointer text-sm"
        >
          <Home className="w-5 h-5 text-[#315588]" />
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

        {/* Right side placeholder (No Points, No Petunjuk as requested) */}
        <div className="hidden md:block w-28 shrink-0"></div>
      </div>

      {/* Main Grid Content - Top Row: Card 1 (Left) & Card 2 (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
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
            {/* Cause Box - Render full image without cropping text */}
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

            {/* Effect Box - Render full image without cropping text */}
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

          {/* Footer Note */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
            Kita menggabungkan sebab dan akibat menggunakan kata penghubung sebab-akibat, yaitu <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-black">karena</span> dan <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-black">sehingga</span>.
          </div>
        </div>


        {/* CARD 2: Kata Penghubung Sebab-Akibat */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 flex flex-col justify-between space-y-4 relative overflow-hidden">
          {/* Header & Mascot speech bubble */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2.5 rounded-2xl shadow-sm">
                <Megaphone className="w-5 h-5" />
              </div>
              <h2 className="text-base md:text-lg font-black text-[#1e3a8a]">
                Kata Penghubung Sebab-Akibat
              </h2>
            </div>

            {/* Girl Mascot with Speech Bubble */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                Yuk, pahami contoh-contohnya!
              </div>
              <img src={pahamiContohImg} alt="Yuk pahami contohnya" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
            </div>
          </div>

          {/* Badges: Karena & Sehingga */}
          <div className="flex justify-center gap-4">
            <span className="bg-amber-100 border-2 border-amber-300 text-amber-800 text-base md:text-lg font-black px-8 py-2 rounded-2xl shadow-sm">
              karena
            </span>
            <span className="bg-emerald-100 border-2 border-emerald-300 text-emerald-800 text-base md:text-lg font-black px-8 py-2 rounded-2xl shadow-sm">
              sehingga
            </span>
          </div>

          {/* Lightbulb Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-3">
            <div className="bg-amber-400 text-white p-1.5 rounded-full shrink-0 shadow-sm mt-0.5">
              <Lightbulb className="w-4 h-4 fill-white" />
            </div>
            <div className="text-xs font-bold text-amber-900 leading-snug">
              <p className="font-extrabold text-amber-800">Ingat ya!</p>
              <p><span className="font-black text-amber-700">"karena"</span> digunakan untuk menyatakan sebab.</p>
              <p><span className="font-black text-emerald-700">"sehingga"</span> digunakan untuk menyatakan akibat.</p>
            </div>
          </div>

          {/* 3 Numbered Sentence Examples */}
          <div className="space-y-2.5">
            {/* Example 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                1
              </span>
              <div className="text-xs font-semibold leading-relaxed">
                <p className="text-slate-800 font-extrabold text-sm">
                  Andi lupa membawa payung, <span className="text-emerald-600 font-black">sehingga</span> ia kehujanan di jalan.
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  <span className="font-bold text-blue-600">Sebab:</span> lupa membawa payung &nbsp;|&nbsp; <span className="font-bold text-emerald-600">Akibat:</span> kehujanan di jalan
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                2
              </span>
              <div className="text-xs font-semibold leading-relaxed">
                <p className="text-slate-800 font-extrabold text-sm">
                  Ibu memasak sayur bayam <span className="text-amber-600 font-black">karena</span> adik suka makan sayur itu.
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  <span className="font-bold text-amber-600">Sebab:</span> adik suka makan sayur itu &nbsp;|&nbsp; <span className="font-bold text-blue-600">Akibat:</span> Ibu memasak sayur bayam
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                3
              </span>
              <div className="text-xs font-semibold leading-relaxed">
                <p className="text-slate-800 font-extrabold text-sm">
                  Bima selalu berkata jujur, <span className="text-emerald-600 font-black">sehingga</span> teman-temannya percaya kepadanya.
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  <span className="font-bold text-blue-600">Sebab:</span> Bima berkata jujur &nbsp;|&nbsp; <span className="font-bold text-emerald-600">Akibat:</span> teman-teman percaya kepadanya
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* CARD 3: Contoh Lain dalam Kehidupan Sehari-hari (Bottom Full Width Card) */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-md border-2 border-slate-100 space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 text-white p-2.5 rounded-2xl shadow-sm">
            <Book className="w-5 h-5" />
          </div>
          <h2 className="text-base md:text-lg font-black text-[#1e3a8a]">
            Contoh Lain dalam Kehidupan Sehari-hari
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
          {/* 4 Example Sub-cards (Taking 4 out of 5 columns on desktop) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Sub-card 1: Nina */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  1
                </span>
                <p className="text-xs font-black text-slate-800 leading-snug">
                  Nina tidur terlalu larut, <span className="text-emerald-600 font-black">sehingga</span> ia bangun kesiangan.
                </p>
              </div>
              
              {/* Illustration: Nina */}
              <div className="w-full h-32 bg-indigo-50/70 rounded-xl overflow-hidden border border-indigo-100 p-1 flex items-center justify-center">
                <img src={ninaImg} alt="Nina tidur terlalu larut" className="w-full h-full object-contain rounded-lg" />
              </div>

              <div className="text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-xl border border-slate-150">
                <p><span className="font-bold text-blue-600">Sebab:</span> tidur terlalu larut</p>
                <p><span className="font-bold text-emerald-600">Akibat:</span> bangun kesiangan</p>
              </div>
            </div>

            {/* Sub-card 2: Raka */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  2
                </span>
                <p className="text-xs font-black text-slate-800 leading-snug">
                  Raka minum air putih yang cukup <span className="text-amber-600 font-black">karena</span> ia haus setelah bermain.
                </p>
              </div>
              
              {/* Illustration: Raka */}
              <div className="w-full h-32 bg-amber-50/70 rounded-xl overflow-hidden border border-amber-100 p-1 flex items-center justify-center">
                <img src={rakaImg} alt="Raka minum air putih" className="w-full h-full object-contain rounded-lg" />
              </div>

              <div className="text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-xl border border-slate-150">
                <p><span className="font-bold text-amber-600">Sebab:</span> ia haus setelah bermain</p>
                <p><span className="font-bold text-blue-600">Akibat:</span> Raka minum air putih</p>
              </div>
            </div>

            {/* Sub-card 3: Siti */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  3
                </span>
                <p className="text-xs font-black text-slate-800 leading-snug">
                  Siti menyiram tanaman setiap pagi, <span className="text-emerald-600 font-black">sehingga</span> tanamannya tumbuh subur.
                </p>
              </div>
              
              {/* Illustration: Siti */}
              <div className="w-full h-32 bg-emerald-50/70 rounded-xl overflow-hidden border border-emerald-100 p-1 flex items-center justify-center">
                <img src={sitiImg} alt="Siti menyiram tanaman" className="w-full h-full object-contain rounded-lg" />
              </div>

              <div className="text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-xl border border-slate-150">
                <p><span className="font-bold text-blue-600">Sebab:</span> menyiram tanaman setiap pagi</p>
                <p><span className="font-bold text-emerald-600">Akibat:</span> tanaman tumbuh subur</p>
              </div>
            </div>

            {/* Sub-card 4: Dodi */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  4
                </span>
                <p className="text-xs font-black text-slate-800 leading-snug">
                  Dodi rajin belajar setiap hari <span className="text-amber-600 font-black">karena</span> ingin meraih cita-citanya.
                </p>
              </div>
              
              {/* Illustration: Dodi */}
              <div className="w-full h-32 bg-purple-50/70 rounded-xl overflow-hidden border border-purple-100 p-1 flex items-center justify-center">
                <img src={dodiImg} alt="Dodi rajin belajar" className="w-full h-full object-contain rounded-lg" />
              </div>

              <div className="text-[11px] font-semibold text-slate-600 bg-white p-2 rounded-xl border border-slate-150">
                <p><span className="font-bold text-amber-600">Sebab:</span> ingin meraih cita-citanya</p>
                <p><span className="font-bold text-blue-600">Akibat:</span> Dodi rajin belajar</p>
              </div>
            </div>

          </div>

          {/* Tips Buddy Box (Taking 1 column on desktop) */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                <span>Tips Buddy</span>
              </div>

              <ul className="space-y-2.5 text-xs font-extrabold text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Perhatikan sebabnya (kenapa sesuatu terjadi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Perhatikan akibatnya (apa yang terjadi).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Hubungkan keduanya menggunakan kata "karena" atau "sehingga".</span>
                </li>
              </ul>
            </div>

            {/* Mascot & Speech Button */}
            <div className="flex flex-col items-center space-y-2 pt-2 border-t border-blue-150">
              <div className="bg-white border-2 border-blue-300 text-blue-800 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
                Kamu pasti bisa!
              </div>
              <img src={karakterCowo} alt="Buddy Boy" className="w-16 h-16 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Flow Stepper indicator */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-slate-200 shadow-sm flex items-center justify-center gap-2 md:gap-4 text-xs font-black text-slate-600 select-none overflow-x-auto">
        <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
          <BookOpen className="w-4 h-4" />
          <span>Materi</span>
        </div>
        <span className="text-slate-300">➔</span>
        <div className="flex items-center gap-1.5 opacity-60">
          <span>Buddy Challenge</span>
        </div>
        <span className="text-slate-300">➔</span>
        <div className="flex items-center gap-1.5 opacity-60">
          <Volume2 className="w-4 h-4" />
          <span>Rekam Suara</span>
        </div>
        <span className="text-slate-300">➔</span>
        <div className="flex items-center gap-1.5 opacity-60">
          <span>Kirim Rekaman</span>
        </div>
      </div>
    </motion.div>
  );
}
