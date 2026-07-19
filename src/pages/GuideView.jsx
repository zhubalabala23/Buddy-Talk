import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight, 
  Volume2, 
  Mic, 
  Award,
  Gamepad2
} from 'lucide-react';

import bgMateri from '../assets/background_materi/background_materi.webp';

const LeafDecoration = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -right-10 -top-2" style={{ transform: 'rotate(15deg)' }}>
    <path d="M20 40 C20 40 10 30 10 20 C10 10 20 0 20 0 C20 0 30 10 30 20 C30 30 20 40 20 40 Z" fill="#4ade80" />
    <path d="M20 40 C20 40 15 30 15 20 C15 10 20 0 20 0" fill="#22c55e" opacity="0.5" />
    <path d="M20 5 L20 35" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 15 L25 10 M20 25 L25 20 M20 20 L15 15 M20 30 L15 25" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
    <circle cx="30" cy="25" r="15" fill="white" />
    <circle cx="50" cy="20" r="20" fill="white" />
    <circle cx="70" cy="25" r="15" fill="white" />
    <rect x="30" y="20" width="40" height="20" fill="white" />
  </svg>
);

const stepsData = [
  {
    number: 1,
    title: 'Pilih Topik',
    desc: 'Pilih salah satu topik cerita menarik yang ingin kamu pelajari.',
    colorClass: 'bg-white border-[#b8daff] text-[#1e40af]',
    numBg: 'bg-[#1e40af]',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    Icon: BookOpen
  },
  {
    number: 2,
    title: 'Pelajari Materi',
    desc: 'Tonton video animasi cerita sampai selesai dan pahami isi ceritanya.',
    colorClass: 'bg-white border-[#bbf7d0] text-[#166534]',
    numBg: 'bg-[#166534]',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Icon: Volume2
  },
  {
    number: 3,
    title: 'Selesaikan Challenge',
    desc: 'Kerjakan 4 langkah tantangan seru untuk mengasah pemahaman ceritamu.',
    colorClass: 'bg-white border-[#fde047] text-[#c2410c]',
    numBg: 'bg-[#ea580c]',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    Icon: Gamepad2
  },
  {
    number: 4,
    title: 'Rekam Suara',
    desc: 'Tekan tombol rekam, lalu ceritakan kembali cerita dengan bahasamu sendiri.',
    colorClass: 'bg-white border-[#b8daff] text-[#0369a1]',
    numBg: 'bg-[#0284c7]',
    iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
    Icon: Mic
  },
  {
    number: 5,
    title: 'Kirim & Dinilai',
    desc: 'Kirim rekaman suaramu agar Bapak/Ibu Guru dapat memberikan penilaian terbaik.',
    colorClass: 'bg-white border-[#bbf7d0] text-[#065f46]',
    numBg: 'bg-[#059669]',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
    Icon: Award
  }
];

export default function GuideView({ onNext }) {
  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bgMateri})`, zIndex: 0 }}
      />
      
      {/* Animated Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
        <motion.div 
          animate={{ x: ['-10vw', '120vw'] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] w-32 h-16 md:w-48 md:h-24 opacity-80">
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['-10vw', '120vw'] }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[15%] w-24 h-12 md:w-32 md:h-16 opacity-60">
          <Cloud className="w-full h-full" />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full flex flex-col items-center relative z-10 px-2 pb-4 mt-2 md:mt-4"
      >
      
      <div className="max-w-[1200px] w-full bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-xl border border-slate-100 p-4 md:p-6 lg:p-8 relative z-10 overflow-hidden">
        
        {/* Header Title */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="relative inline-flex items-center bg-[#234e8a] rounded-full px-5 py-2 md:px-8 md:py-3 shadow-md">
            <div className="bg-white rounded-full p-1.5 mr-3">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#234e8a]" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-white tracking-widest uppercase">
              Petunjuk Penggunaan
            </h1>
            <LeafDecoration />
          </div>
          <p className="mt-3 text-slate-600 font-medium text-center text-xs md:text-sm max-w-lg">
            Ikuti langkah-langkah berikut untuk belajar dan berlatih bersama BuddyTalk.
          </p>
        </div>

        {/* Steps Grid/Flex */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 lg:gap-6 relative">
          {stepsData.map((step, index) => {
            const IconComponent = step.Icon;
            return (
              <React.Fragment key={step.number}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex-1 flex flex-col items-center text-center p-3 md:p-4 lg:p-5 rounded-2xl border-2 ${step.colorClass} relative`}
                >
                  {/* Circle Number */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${step.numBg}`}>
                    {step.number}
                  </div>
                  
                  <h3 className={`mt-3 font-bold text-sm md:text-base mb-2 lg:mb-3 ${step.colorClass.split(' ').pop()}`}>
                    {step.title}
                  </h3>
                  
                  {/* Illustration Box */}
                  <div className="w-full aspect-square mb-2 lg:mb-3 relative max-w-[120px] lg:max-w-[140px] mx-auto flex items-center justify-center">
                    <motion.div 
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-md border-2 ${step.iconBg}`}
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.2} />
                    </motion.div>
                  </div>
                  
                  {/* penjelasan langkah-langkah penggunaannya  */}
                  <p className="mt-3 md:mt-4 text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
                
                {/* Arrow between steps (only on desktop) */}
                {index < stepsData.length - 1 && (
                  <div className="hidden md:flex items-center justify-center -mx-1 lg:-mx-3 z-10">
                    <ChevronRight className="w-6 h-6 text-slate-300" strokeWidth={3} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive Button */}
      {onNext && (
        <motion.div 
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-4 rounded-full bg-[#315588] text-white shadow-2xl hover:bg-[#233f66] transition-colors flex items-center justify-center animate-bounce border-4 border-white/50"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </motion.button>
        </motion.div>
      )}

    </motion.div>
    </>
  );
}
