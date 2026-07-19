import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  ClipboardCheck, 
  Target, 
  GitCommit, 
  Zap, 
  Volume2, 
  ShieldCheck 
} from 'lucide-react';

import bgMateri from '../assets/background_materi/background_materi.webp';

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
    <circle cx="30" cy="25" r="15" fill="white" />
    <circle cx="50" cy="20" r="20" fill="white" />
    <circle cx="70" cy="25" r="15" fill="white" />
    <rect x="30" y="20" width="40" height="20" fill="white" />
  </svg>
);

const rubricData = [
  { 
    aspect: "Ketepatan Isi", 
    indicator: "Sebab dan akibat disampaikan dengan tepat",
    Icon: Target,
    colorClass: "border-blue-100 bg-blue-50/40 text-blue-700 hover:border-blue-300 hover:shadow-blue-50/50",
    iconColor: "text-blue-500 bg-blue-50"
  },
  { 
    aspect: "Keruntutan", 
    indicator: "Penyampaian disampaikan dengan runtut dan logis",
    Icon: GitCommit,
    colorClass: "border-emerald-100 bg-emerald-50/40 text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-50/50",
    iconColor: "text-emerald-500 bg-emerald-50"
  },
  { 
    aspect: "Kelancaran", 
    indicator: "Berbicara dengan lancar tanpa banyak jeda",
    Icon: Zap,
    colorClass: "border-amber-100 bg-amber-50/40 text-amber-700 hover:border-amber-300 hover:shadow-amber-50/50",
    iconColor: "text-amber-500 bg-amber-50"
  },
  { 
    aspect: "Kejelasan Artikulasi", 
    indicator: "Pengucapan disampaikan dengan jelas dan mudah dipahami",
    Icon: Volume2,
    colorClass: "border-purple-100 bg-purple-50/40 text-purple-700 hover:border-purple-300 hover:shadow-purple-50/50",
    iconColor: "text-purple-500 bg-purple-50"
  },
  { 
    aspect: "Kepercayaan Diri", 
    indicator: "Berbicara dengan percaya diri tanpa ragu-ragu",
    Icon: ShieldCheck,
    colorClass: "border-rose-100 bg-rose-50/40 text-rose-700 hover:border-rose-300 hover:shadow-rose-50/50",
    iconColor: "text-rose-500 bg-rose-50"
  }
];

export default function RubricPage({ onNext, onBack }) {
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
          className="absolute top-[5%] w-32 h-16 md:w-48 md:h-24 opacity-80"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
        <motion.div 
          animate={{ x: ['-10vw', '120vw'] }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[15%] w-24 h-12 md:w-32 md:h-16 opacity-60"
        >
          <Cloud className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full flex flex-col items-center justify-center relative z-10 px-4 py-2 md:py-4 mt-2 md:mt-4"
      >
        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden p-6 md:p-8 space-y-6 md:space-y-8">
          
          {/* Header Title */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative inline-flex items-center bg-[#234e8a] rounded-full px-6 py-2.5 md:px-8 md:py-3.5 shadow-md">
              <div className="bg-white rounded-full p-1.5 mr-3">
                <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-[#234e8a]" />
              </div>
              <h1 className="text-base md:text-xl font-black text-white tracking-widest uppercase">
                RUBRIK PENILAIAN GURU
              </h1>
            </div>
            <p className="mt-4 text-slate-500 font-extrabold text-center text-xs md:text-sm max-w-lg px-4 leading-relaxed">
              Perhatikan 5 aspek penilaian berikut agar kamu mendapatkan skor terbaik saat merekam jawaban!
            </p>
          </div>

          {/* Cards List Section */}
          <div className="space-y-4">
            {rubricData.map((row, index) => {
              const IconComponent = row.Icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 p-5 rounded-3xl border-2 shadow-sm transition-all bg-white cursor-default ${row.colorClass}`}
                >
                  {/* Left Column: Aspect Title & Icon */}
                  <div className="flex items-center gap-4 w-full md:w-[35%] flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0 ${row.iconColor}`}>
                      <IconComponent className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                        Aspek {index + 1}
                      </span>
                      <h3 className="text-base font-black text-slate-800 leading-none">
                        {row.aspect}
                      </h3>
                    </div>
                  </div>

                  {/* Divider line for desktop */}
                  <div className="hidden md:block w-[1.5px] h-10 bg-slate-200/80" />

                  {/* Right Column: Indicator description */}
                  <div className="flex-1 text-left w-full">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-450 block mb-1">
                      Kriteria Kelayakan
                    </span>
                    <p className="text-sm font-extrabold text-slate-600 leading-relaxed">
                      {row.indicator}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating Interactive Buttons */}
        {/* Next Button */}
        <motion.div 
          className="fixed top-1/2 -translate-y-1/2 right-2 md:right-6 lg:right-8 z-50 flex flex-col items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-4 rounded-full bg-[#315588] text-white shadow-2xl hover:bg-[#233f66] transition-colors flex items-center justify-center animate-bounce border-4 border-white/50 cursor-pointer"
            title="Lanjut ke Video Cerita"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </motion.button>
        </motion.div>

        {/* Back Button */}
        {onBack && (
          <motion.div 
            className="fixed top-1/2 -translate-y-1/2 left-2 md:left-6 lg:left-8 z-50 flex flex-col items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-4 rounded-full bg-[#315588] text-white shadow-2xl hover:bg-[#233f66] transition-colors flex items-center justify-center animate-bounce border-4 border-white/50 cursor-pointer"
              title="Kembali ke Beranda"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
