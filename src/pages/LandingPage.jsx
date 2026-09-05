import React from 'react';
import { motion } from 'framer-motion';
import bgLandingNew from '../assets/background_landingpage/background_landingpage.webp';
import burungBiru from '../assets/images/charachters_landingpage/burung_biru.webp';
import cardKiriAtas from '../assets/images/charachters_landingpage/card kiri atas.webp';
import karakterCewe from '../assets/images/charachters_landingpage/karakter_cewe.webp';
import karakterCowo from '../assets/images/charachters_landingpage/karakter_cowo.webp';
import karakterUngu from '../assets/images/charachters_landingpage/karakter_ungu.webp';
import kucing from '../assets/images/charachters_landingpage/kucing.webp';

import { 
  MessageSquare, 
  Mic, 
  Star, 
  BookOpen, 
  Lightbulb,
  GraduationCap
} from 'lucide-react';

export default function LandingPage({ onStudentStart, onTeacherStart, onScoreDashboard }) {

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-screen overflow-hidden relative select-none bg-[#bae6fd] font-sans flex items-center justify-center"
    >
      {/* Unified Background Wrapper to preserve desktop proportions and crop on mobile */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1280px] lg:w-full lg:left-0 lg:translate-x-0 pointer-events-auto z-10 overflow-hidden">
        {/* Background PNG Mockup stretched to cover the entire wrapper width */}
        <img 
          src={bgLandingNew} 
          alt="BuddyTalk Landing Page" 
          className="w-full h-full object-fill pointer-events-none absolute inset-0 -z-10"
        />

        {/* Interactive Elements and Characters Container */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          
          {/* --- DYNAMIC ASSETS & DECORATIONS --- */}

          {/* --- CLOUD ANIMATIONS --- */}
          {/* Stationary Cloud (Center, gently bobbing) */}
          <motion.div 
            className="absolute text-white/70 select-none pointer-events-none"
            style={{
              left: '44%',
              width: '12%',
              top: '3%',
              zIndex: 5,
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
              <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
            </svg>
          </motion.div>

          {/* Passing Cloud 1 */}
          <motion.div 
            className="absolute text-white/55 select-none pointer-events-none"
            style={{
              top: '4%',
              width: '9%',
              zIndex: 5,
            }}
            initial={{ x: '-15vw' }}
            animate={{ x: '105vw' }}
            transition={{
              duration: 48,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
          >
            <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
              <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
            </svg>
          </motion.div>

          {/* Passing Cloud 2 */}
          <motion.div 
            className="absolute text-white/70 select-none pointer-events-none"
            style={{
              top: '11%',
              width: '13%',
              zIndex: 5,
            }}
            initial={{ x: '-18vw' }}
            animate={{ x: '105vw' }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
              delay: 10,
            }}
          >
            <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
              <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
            </svg>
          </motion.div>

          {/* Passing Cloud 3 */}
          <motion.div 
            className="absolute text-white/45 select-none pointer-events-none"
            style={{
              top: '7%',
              width: '8%',
              zIndex: 5,
            }}
            initial={{ x: '-12vw' }}
            animate={{ x: '105vw' }}
            transition={{
              duration: 58,
              repeat: Infinity,
              ease: "linear",
              delay: 20,
            }}
          >
            <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
              <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
            </svg>
          </motion.div>

          {/* Passing Cloud 4 */}
          <motion.div 
            className="absolute text-white/65 select-none pointer-events-none"
            style={{
              top: '16%',
              width: '11%',
              zIndex: 5,
            }}
            initial={{ x: '-15vw' }}
            animate={{ x: '105vw' }}
            transition={{
              duration: 44,
              repeat: Infinity,
              ease: "linear",
              delay: 32,
            }}
          >
            <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
              <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
            </svg>
          </motion.div>

          {/* 1. Logo Card (Top Left / Centered on Mobile) */}
          <img 
            src={cardKiriAtas} 
            alt="BuddyTalk Logo" 
            className="absolute z-20 pointer-events-none drop-shadow-md animate-fade-in left-1/2 -translate-x-1/2 w-[55vw] lg:left-[-1.5%] lg:translate-x-0 lg:w-[21%] top-2 lg:top-[-1.5%]"
          />

          {/* 3. Blue Bird sitting on Left Signpost */}
          <motion.img 
            src={burungBiru}
            alt="Burung Biru"
            className="absolute z-20 pointer-events-none select-none"
            style={{
              left: '11.5%',
              width: '6.5%',
              top: '23.5%',
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 4. Left Signpost Menu Items */}
          <div 
            className="absolute z-20 flex flex-col justify-between"
            style={{
              left: '11.8%',
              width: '15.5%',
              top: '33.0%',
              height: '31.0%'
            }}
          >
            {/* Option 1: Belajar dari Cerita */}
            <div 
              className="flex items-center gap-3 bg-[#fef5ec] border-2 border-[#e9cfb3] rounded-[22px] p-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              style={{ height: '28%' }}
            >
              <div className="w-[2.4vw] h-[2.4vw] min-w-[28px] min-h-[28px] rounded-full bg-[#9c78d6] flex items-center justify-center shrink-0 shadow-inner">
                <MessageSquare className="w-[50%] h-[50%] text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-[#0f2942] leading-tight" style={{ fontSize: 'min(1.1vw, 13.5px)' }}>
                Belajar dari Cerita
              </span>
            </div>

            {/* Option 2: Latihan Berbicara */}
            <div 
              className="flex items-center gap-3 bg-[#fef5ec] border-2 border-[#e9cfb3] rounded-[22px] p-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              style={{ height: '28%' }}
            >
              <div className="w-[2.4vw] h-[2.4vw] min-w-[28px] min-h-[28px] rounded-full bg-[#50a877] flex items-center justify-center shrink-0 shadow-inner">
                <Mic className="w-[50%] h-[50%] text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-[#0f2942] leading-tight" style={{ fontSize: 'min(1.1vw, 13.5px)' }}>
                Latihan Berbicara
              </span>
            </div>

            {/* Option 3: Jadi pribadi yang lebih baik */}
            <div 
              className="flex items-center gap-3 bg-[#fef5ec] border-2 border-[#e9cfb3] rounded-[22px] p-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              style={{ height: '28%' }}
            >
              <div className="w-[2.4vw] h-[2.4vw] min-w-[28px] min-h-[28px] rounded-full bg-[#f2b331] flex items-center justify-center shrink-0 shadow-inner">
                <Star className="w-[50%] h-[50%] text-white fill-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-[#0f2942] leading-tight" style={{ fontSize: 'min(1.1vw, 13.5px)' }}>
                Jadi pribadi yang lebih baik
              </span>
            </div>
          </div>

          {/* 5. Bottom-Left Quote Board Text */}
          <div 
            className="absolute z-20 flex items-center justify-center"
            style={{
              left: '17.2%',
              width: '11.5%',
              top: '71.5%',
              height: '9.0%',
            }}
          >
            <p 
              className="font-black text-[#53321d] leading-snug text-center"
              style={{ fontSize: 'min(1.05vw, 12px)' }}
            >
              “Setiap kata baik,<br />
              adalah langkah kecil<br />
              menjadi hebat. 💖”
            </p>
          </div>

          {/* 6. Speech Bubble (Center Top) */}
          <motion.div 
            className="absolute z-20 bg-white rounded-[24px] lg:rounded-[32px] shadow-lg border-2 border-blue-100/50 p-3 lg:p-4 flex flex-col items-center justify-center text-center left-1/2 -translate-x-1/2 w-[85vw] lg:left-[27.5%] lg:translate-x-0 lg:w-[45%] top-[12%] lg:top-[7%] h-[20%] lg:h-[24%]"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Bubble pointer (tail) */}
            <div className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.05)]" />
            
            <h2 className="font-black leading-tight text-blue-900 text-sm sm:text-base lg:text-[min(2.4vw,26px)]">
              Ayo Ceritakan <span className="text-orange-500">Sifat Baikmu!</span>
            </h2>
            
            <p className="text-slate-600 font-bold mt-1 lg:mt-1.5 leading-snug text-[10px] sm:text-xs lg:text-[min(1.15vw,13px)]">
              Pilih cerita yang ingin kamu pelajari,<br className="hidden sm:inline" />
              lalu ceritakan kembali dengan bahasamu sendiri. ❤️
            </p>
          </motion.div>

          {/* 7. Main Characters (Center Path) */}
          {/* Boy Character */}
          <motion.img
            src={karakterCowo}
            alt="Karakter Cowo"
            className="absolute z-10 pointer-events-none select-none"
            style={{
              left: '31.2%',
              width: '18.5%',
              top: '32.0%',
              transformOrigin: 'bottom center',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Girl Character */}
          <motion.img
            src={karakterCewe}
            alt="Karakter Cewe"
            className="absolute z-10 pointer-events-none select-none"
            style={{
              left: '50.0%',
              width: '16.5%',
              top: '36.5%',
              transformOrigin: 'bottom center',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 2.2,
              delay: 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Cat Character */}
          <motion.img
            src={kucing}
            alt="Kucing"
            className="absolute z-10 pointer-events-none select-none"
            style={{
              left: '71.8%',
              width: '6.2%',
              top: '85.5%',
            }}
            animate={{ scaleY: [1, 1.03, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 8. Student and Teacher Login Buttons (Center Bottom) */}
          <div
            className="absolute z-20 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 left-1/2 -translate-x-1/2 w-[85vw] lg:w-[42%] top-[72%] lg:top-[78.5%] h-[15%] lg:h-[9%]"
          >
            {/* Button Masuk sebagai Siswa */}
            <motion.button
              onClick={onStudentStart}
              title="Masuk sebagai Siswa"
              className="w-full lg:flex-1 h-full bg-white border-[3px] border-[#f2b331] rounded-[16px] lg:rounded-[20px] shadow-lg flex items-center justify-center gap-2.5 cursor-pointer text-[#b45309] py-2 lg:py-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[1.8vw] lg:h-[1.8vw]" strokeWidth={2.5} />
              <span className="font-black text-xs sm:text-sm lg:text-[min(1.15vw,14.5px)]">
                Masuk sebagai Siswa
              </span>
            </motion.button>

            {/* Button Masuk sebagai Guru */}
            <motion.button
              onClick={onTeacherStart}
              title="Masuk sebagai Guru"
              className="w-full lg:flex-1 h-full bg-[#f2b331] border-[3px] border-[#f2b331] rounded-[16px] lg:rounded-[20px] shadow-lg flex items-center justify-center gap-2.5 cursor-pointer text-white py-2 lg:py-0"
              whileHover={{ scale: 1.04, backgroundColor: '#e09e25', borderColor: '#e09e25' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[1.8vw] lg:h-[1.8vw]" strokeWidth={2.5} />
              <span className="font-black text-xs sm:text-sm lg:text-[min(1.15vw,14.5px)]">
                Masuk sebagai Guru
              </span>
            </motion.button>
          </div>


          {/* 10. Bottom Tips Bar */}
          <div 
            className="absolute z-20 bg-white/95 backdrop-blur-md rounded-[20px] lg:rounded-[28px] shadow-lg border border-slate-100 flex items-center gap-2 lg:gap-3 px-4 lg:pl-6 lg:pr-16 py-1.5 lg:py-2 left-1/2 -translate-x-1/2 w-[85vw] lg:left-[22.5%] lg:translate-x-0 lg:w-[49%] top-[89.5%] lg:top-[89.2%] h-[6.5%] lg:h-[7.5%]"
          >
            {/* Tips Badge */}
            <div className="flex items-center gap-1 bg-violet-100 text-violet-700 font-extrabold px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full text-[10px] sm:text-xs border border-violet-200 shrink-0">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-300" strokeWidth={2.5} />
              <span>Tips</span>
            </div>

            {/* Tips Text */}
            <p className="text-slate-700 font-bold leading-tight text-[10px] sm:text-xs lg:text-[min(1.1vw,13px)]">
              Dengarkan, pahami, lalu ceritakan dengan percaya diri!
            </p>

            {/* 11. Purple Mic Character inside the white card (right corner) */}
            <div 
              className="absolute right-2 sm:right-3 top-[50%] -translate-y-[50%] flex items-center justify-center select-none pointer-events-none w-10 sm:w-12 h-[120%] sm:h-[140%]"
            >
              {/* Left wave */}
              <motion.div 
                className="absolute left-[-10px] hidden sm:flex items-center gap-0.5"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-0.5 h-2 bg-violet-400 rounded-full" />
                <div className="w-0.5 h-3.5 bg-violet-400 rounded-full" />
              </motion.div>

              {/* Character */}
              <motion.img 
                src={karakterUngu}
                alt="Buddy Mic"
                className="w-full h-full object-contain"
                animate={{ 
                  scaleY: [1, 1.04, 1],
                  rotate: [0, 1.5, -1.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Right wave */}
              <motion.div 
                className="absolute right-[-10px] hidden sm:flex items-center gap-0.5"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity }}
              >
                <div className="w-0.5 h-3.5 bg-violet-400 rounded-full" />
                <div className="w-0.5 h-2 bg-violet-400 rounded-full" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>


    </motion.div>
  );
}
