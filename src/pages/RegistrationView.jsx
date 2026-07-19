import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Hash, ArrowRight, ChevronLeft } from 'lucide-react';
import { saveStudent } from '../db';
import bgRegistration from '../assets/background_registration/background_registration.webp';
import karakterCewe from '../assets/images/charachters_landingpage/karakter_cewe.webp';
import karakterCowo from '../assets/images/charachters_landingpage/karakter_cowo.webp';

// Import new registration assets
import ayunan from '../assets/images/charachters_registration/ayunan.webp';
import papanNama from '../assets/images/charachters_registration/papan_nama.webp';
import pohonKanan from '../assets/images/charachters_registration/pohon_kanan.webp';
import siswiKanan from '../assets/images/charachters_registration/siswi_kanan.webp';
import siswiKiri from '../assets/images/charachters_registration/siswi_kiri.webp';
import cardKiriAtas from '../assets/images/charachters_landingpage/card kiri atas.webp';

export default function RegistrationView({ onComplete, onBack }) {
  const [name, setName] = useState('');
  const [absen, setAbsen] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedAbsen = String(absen).trim();
    
    if (!trimmedName || !trimmedAbsen) {
      alert("Nama dan Nomor Absen tidak boleh kosong atau hanya berupa spasi!");
      return;
    }

    setIsLoading(true);
    try {
      const studentData = {
        name: trimmedName,
        absen: trimmedAbsen,
      };
      const savedStudent = await saveStudent(studentData);
      onComplete(savedStudent);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Image for Registration Page */}
      <img 
        src={bgRegistration} 
        alt="Registration Background" 
        className="fixed inset-0 w-full h-full object-fill pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* --- CLOUD ANIMATIONS --- */}
      {/* Passing Cloud 1 */}
      <motion.div 
        className="fixed text-white/55 select-none pointer-events-none"
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
        className="fixed text-white/70 select-none pointer-events-none"
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
        className="fixed text-white/45 select-none pointer-events-none"
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
        className="fixed text-white/65 select-none pointer-events-none"
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

      {/* Right Tree (fixed to top right, full height, width scales proportionally) */}
      <motion.img
        src={pohonKanan}
        alt="Pohon Kanan"
        className="fixed right-0 top-0 h-full w-auto object-contain pointer-events-none select-none z-10 hidden md:block"
        style={{ transformOrigin: 'top right' }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 80, duration: 1 }}
      />

      {/* Swing (Ayunan) hanging from Tree (aligned with Pohon Kanan) */}
      <motion.img
        src={ayunan}
        alt="Ayunan"
        className="fixed right-0 top-0 h-full w-auto object-contain pointer-events-none select-none z-10 hidden md:block"
        style={{ transformOrigin: 'top right' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 5, 0] // Gentle floating effect
        }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      {/* Boy Character */}
      <motion.img
        src={karakterCowo}
        alt="Karakter Cowo"
        className="fixed z-10 pointer-events-none select-none"
        style={{
          left: '12%',
          width: '9%',
          top: '46%',
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
        className="fixed z-10 pointer-events-none select-none"
        style={{
          left: '19%',
          width: '8%',
          top: '49%',
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

      {/* Signboard (Papan Nama) - Positioned on the right side grass area above the head of siswiKiri */}
      <motion.img
        src={papanNama}
        alt="Papan Nama"
        className="fixed z-20 pointer-events-none select-none hidden md:block right-[23%] bottom-[29%] h-[28vh] w-auto origin-bottom drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Schoolgirls sitting on the grass */}
      {/* Siswi Kiri (sitting cross-legged, writing in book) */}
      <motion.img
        src={siswiKiri}
        alt="Siswi Kiri"
        className="fixed z-20 pointer-events-none select-none left-2 bottom-2 h-[12vh] md:left-auto md:right-[26%] md:bottom-[5%] md:h-[26vh] w-auto origin-bottom"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ 
          opacity: 1, 
          scale: [1, 1.03, 1],
          y: 0 
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.5 },
          y: { duration: 0.8, delay: 0.5 },
          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
        }}
      />

      {/* Siswi Kanan (sitting cross-legged, talking) */}
      <motion.img
        src={siswiKanan}
        alt="Siswi Kanan"
        className="fixed z-20 pointer-events-none select-none right-2 bottom-2 h-[11vh] md:right-[17%] md:bottom-[4.5%] md:h-[24.5vh] w-auto origin-bottom"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ 
          opacity: 1, 
          scale: [1, 1.03, 1],
          y: 0 
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.7 },
          y: { duration: 0.8, delay: 0.7 },
          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }}
      />

      {/* 1. Logo Card (Top Left) */}
      <img 
        src={cardKiriAtas} 
        alt="BuddyTalk Logo" 
        className="fixed z-20 pointer-events-none drop-shadow-md"
        style={{
          left: '-1.5%',
          top: '-1.5%',
          width: '21%',
          minWidth: '150px',
        }}
      />

      {/* Header with Back button positioned below the logo card */}
      <header className="fixed top-[110px] md:top-[160px] left-4 md:left-8 flex items-center z-50">
        <motion.button 
          onClick={onBack}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-[#315588] hover:bg-[#233f66] shadow-md cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
      </header>

      {/* Restored Centered Card Container */}
      <div className="fixed inset-0 flex flex-col justify-center items-center p-4 z-10 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white/95 backdrop-blur-sm rounded-[1.75rem] p-5 md:p-6 shadow-xl border border-slate-100/50 text-center max-w-[360px] w-full"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-0.5">Halo, Sobat Buddy!</h2>
          <p className="text-slate-500 text-xs mb-4">Sebelum mulai berpetualang, isi data dirimu dulu ya!</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Siswa (Kelas 5)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Masukkan namamu..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Nomor Absen</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="number"
                  required
                  value={absen}
                  onChange={(e) => setAbsen(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="Nomor absen..."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2 cursor-pointer ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#315588] hover:bg-[#233f66]'}`}
            >
              {isLoading ? 'Memuat Data...' : <span className="flex items-center text-sm">Mulai Belajar <ArrowRight className="ml-2 w-4 h-4" /></span>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
