import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Mail, 
  IdCard, 
  ChevronLeft, 
  Sparkles, 
  Award,
  BookOpen
} from 'lucide-react';

// Import foto profil
import dosenImg from '../assets/profile/dosen.png';
import kikiImg from '../assets/profile/kiki.png';

/**
 * Data Biodata Tim BuddyTalk
 * Catatan: Nilai string yang kosong ("") sengaja dikosongkan terlebih dahulu sesuai permintaan.
 * Anda dapat mengisi nama, NIM/NIDN, prodi, dll di bawah ini kapan saja.
 */
const PROFILE_MEMBERS = [
  {
    id: 'dosen',
    roleTag: 'Dosen Pembimbing',
    tagColor: 'bg-emerald-500 text-white border-emerald-600',
    headerGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    accentColor: '#059669',
    badgeIcon: Award,
    image: dosenImg,
    altText: 'Foto Dosen Pembimbing',
    name: 'Dr. Sulistyani Puteri Ramadhani, S.Pd., M.Pd.',
    idLabel: 'NIDN',
    idValue: '0329039101',
    prodi: 'PGSD',
    instansi: 'Universitas Trilogi',
    peran: 'Dosen Pembimbing',
    email: 'sulistyani@trilogi.ac.id',
    bio: '' // Silakan isi bio / kutipan singkat
  },
  {
    id: 'pengembang',
    roleTag: 'Pengembang / Peneliti',
    tagColor: 'bg-blue-600 text-white border-blue-700',
    headerGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    accentColor: '#2563eb',
    badgeIcon: GraduationCap,
    image: kikiImg,
    altText: 'Foto Pengembang Aplikasi',
    name: 'RIZQIYAH FITRI NUR ALIFAH',
    idLabel: 'NIM',
    idValue: '22117010',
    prodi: 'PGSD',
    instansi: 'Universitas Trilogi',
    peran: 'Pengembang Media Pembelajaran',
    email: 'rizqiyahfitri6@gmail.com',
    bio: '' // Silakan isi bio / kutipan singkat
  }
];

export default function ProfilePage({ onHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full pb-10"
    >
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-[#315588] hover:text-blue-700 shadow-sm border border-slate-200 text-xs md:text-sm font-extrabold cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#315588]" strokeWidth={2.5} />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Tim BuddyTalk</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#315588] tracking-tight mb-2"
            style={{ fontFamily: '"Kent", "Quicksand", sans-serif' }}
          >
            Profil Pengembang & Pembimbing
          </h1>
        </motion.div>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base font-semibold max-w-2xl mx-auto">
          Mengenal tim di balik perancangan dan pengembangan media pembelajaran interaktif <span className="text-[#315588] font-bold">Buddy</span><span className="text-[#ef4444] font-bold">Talk</span>.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {PROFILE_MEMBERS.map((member, index) => {
          const BadgeIcon = member.badgeIcon;
          
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-slate-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Subtle Decorative Gradient Bar */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${member.headerGradient.replace('/10', '').replace('/5', '') || 'from-blue-500 to-indigo-600'}`} 
                   style={{ backgroundColor: member.accentColor }} 
              />

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Photo & Role Section */}
                <div className="flex flex-col items-center text-center mb-5">
                  <div className="relative mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                    {/* Photo Frame */}
                    <div className="w-48 sm:w-52 h-60 sm:h-64 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-4 ring-slate-100 bg-slate-50 flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.altText}
                        className="w-full h-full object-cover object-top select-none"
                        loading="lazy"
                      />
                    </div>

                    {/* Role Pill Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-md border ${member.tagColor}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{member.roleTag}</span>
                      </span>
                    </div>
                  </div>

                  {/* Name (Header) */}
                  <div className="mt-2 w-full">
                    {member.name ? (
                      <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                        {member.name}
                      </h2>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-100 border border-dashed border-slate-300 text-slate-400 font-bold text-sm sm:text-base">
                          (Nama Lengkap Belum Diisi)
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />

                {/* Biodata Details List */}
                <div className="space-y-3 my-4 flex-1">
                  {/* Field: ID (NIDN/NIP atau NIM) */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <IdCard className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{member.idLabel}</span>
                    </div>
                    <div>
                      {member.idValue ? (
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{member.idValue}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">—</span>
                      )}
                    </div>
                  </div>

                  {/* Field: Program Studi */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Program Studi</span>
                    </div>
                    <div>
                      {member.prodi ? (
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{member.prodi}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">—</span>
                      )}
                    </div>
                  </div>

                  {/* Field: Perguruan Tinggi / Instansi */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Instansi / Kampus</span>
                    </div>
                    <div>
                      {member.instansi ? (
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{member.instansi}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">—</span>
                      )}
                    </div>
                  </div>

                  {/* Field: Peran */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <Briefcase className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Peran Proyek</span>
                    </div>
                    <div>
                      {member.peran ? (
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{member.peran}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">—</span>
                      )}
                    </div>
                  </div>

                  {/* Field: Email / Kontak */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Email / Kontak</span>
                    </div>
                    <div>
                      {member.email ? (
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{member.email}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic font-medium">—</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio / Catatan Singkat Box */}
                <div className="mt-2">
                  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-dashed border-slate-200 p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Biodata / Deskripsi Singkat</span>
                    </div>
                    {member.bio ? (
                      <p className="text-slate-700 text-xs leading-relaxed italic">
                        "{member.bio}"
                      </p>
                    ) : (
                      <p className="text-slate-400 text-xs italic">
                        (Biodata singkat belum diisi)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
