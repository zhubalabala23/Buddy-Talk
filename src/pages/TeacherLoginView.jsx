import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import bgGuru from '../assets/background_guru/background_guru.webp';
import cardKiriAtas from '../assets/images/charachters_landingpage/card kiri atas.webp';


export default function TeacherLoginView({ onLogin, onBack }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default PIN for teacher access
  const TEACHER_PIN = '987654';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate small network delay for UX
    setTimeout(() => {
      if (pin === TEACHER_PIN) {
        onLogin();
      } else {
        setError('PIN yang dimasukkan salah. Silakan coba lagi.');
        setPin('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image stretched to cover the entire screen */}
      <img 
        src={bgGuru} 
        alt="Teacher Login Background" 
        className="fixed inset-0 w-full h-full object-fill pointer-events-none z-0"
      />

      {/* Passing Cloud 1 */}
      <motion.div 
        className="absolute text-white/55 select-none pointer-events-none"
        style={{
          top: '8%',
          width: '10%',
          zIndex: 1,
        }}
        initial={{ x: '-15vw' }}
        animate={{ x: '105vw' }}
        transition={{
          duration: 45,
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
        className="absolute text-white/40 select-none pointer-events-none"
        style={{
          top: '18%',
          width: '14%',
          zIndex: 1,
        }}
        initial={{ x: '-20vw' }}
        animate={{ x: '105vw' }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 12,
        }}
      >
        <svg viewBox="0 0 100 50" fill="currentColor" className="w-full h-full">
          <path d="M10 30a10 10 0 0 1 10-10 12 12 0 0 1 22-5 15 15 0 0 1 28 3 10 10 0 0 1 18 10 8 8 0 0 1 0 16H10a8 8 0 0 1 0-14z" />
        </svg>
      </motion.div>

      {/* BuddyTalk Logo Card (Top Left) */}
      <img 
        src={cardKiriAtas} 
        alt="BuddyTalk Logo" 
        className="absolute z-20 pointer-events-none drop-shadow-md"
        style={{
          left: '-1.5%',
          top: '-1.5%',
          width: '21%',
          minWidth: '150px',
        }}
      />

      {/* Header with Back button positioned below the logo card */}
      <header className="absolute top-[110px] md:top-[160px] left-4 md:left-8 flex items-center z-20">
        <motion.button 
          onClick={onBack}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-[#315588] hover:bg-[#233f66] shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-[1.75rem] p-5 md:p-6 shadow-xl border border-slate-100 text-center max-w-[360px] w-full mx-4"
      >
        <div className="inline-flex p-3 rounded-full bg-slate-100 mb-4">
          <Lock className="w-6 h-6 text-slate-700" />
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-0.5">Akses Guru</h2>
        <p className="text-slate-500 text-xs mb-4">Masukkan PIN keamanan untuk mengakses halaman penilaian.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">PIN Akses</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-[#315588] focus:border-[#315588] shadow-sm"
                placeholder="Masukkan PIN..."
                maxLength={6}
                pattern="\d*"
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || pin.length < 4}
            className={`w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#315588] mt-2 ${isLoading || pin.length < 4 ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#315588] hover:bg-[#233f66]'}`}
          >
            {isLoading ? 'Verifikasi...' : <span className="flex items-center text-sm">Masuk <ArrowRight className="ml-2 w-4 h-4" /></span>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
