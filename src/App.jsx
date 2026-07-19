import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Trash2, Factory, TreePine, Droplets, Play, Pause, RotateCcw, Mic, Square, Check, Home, ChevronLeft, Volume2, ArrowRight, ClipboardList, LogOut, Menu, BookOpen, Trophy, Lock, User } from 'lucide-react';
import { topics } from './data';
import LandingPage from './pages/LandingPage';
import RegistrationView from './pages/RegistrationView';
import ClosingView from './pages/ClosingView';
import TeacherView from './pages/TeacherView';
import TeacherLoginView from './pages/TeacherLoginView';
import RubricPage from './pages/RubricPage';
import ObjectivesView from './pages/ObjectivesView';
import GuideView from './pages/GuideView';
import ScoreDashboardView from './pages/ScoreDashboardView';
import ChallengePage from './pages/ChallengePage';
import { saveAssessment, getStudentAssessments, updateStudentProgress, getStudent } from './db';
import ceweAudio from './assets/images/charachters_landingpage/karakter_cewe.webp';
import cowoImg from './assets/images/charachters_landingpage/karakter_cowo.webp';
import burungBiruImg from './assets/images/charachters_landingpage/burung_biru.webp';
import bgMateri from './assets/background_materi/background_materi.webp';
import bgLanding from './assets/background_landingpage/background_landingpage.webp';
import bgGuru from './assets/background_guru/background_guru.webp';




const iconMap = {
  Waves,
  Trash2,
  Factory,
  TreePine,
  Droplets
};

// Main App Component
export default function App() {
  const [studentInfo, setStudentInfo] = useState(() => {
    const saved = sessionStorage.getItem('buddyTalkStudent');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState(() => {
    const savedStudent = sessionStorage.getItem('buddyTalkStudent');
    const savedView = sessionStorage.getItem('buddyTalkView');
    
    // Always respect these views even if student is logged in
    if (savedView === 'landing' || savedView === 'teacher-login' || savedView === 'teacher' || savedView === 'dashboard') {
      return savedView;
    }
    
    if (savedStudent && savedView && savedView !== 'register') {
      return savedView;
    }
    return savedStudent ? 'home' : 'landing';
  });
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const saved = sessionStorage.getItem('buddyTalkTopic');
    return saved ? JSON.parse(saved) : null;
  });
  const [progress, setProgress] = useState(() => {
    const saved = sessionStorage.getItem('buddyTalkProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const refreshStudentProgress = async (studentId) => {
    if (!studentId) return;
    try {
      const studentData = await getStudent(studentId);
      if (!studentData) {
        // Student was deleted from Firestore (reset by teacher)
        sessionStorage.removeItem('buddyTalkProgress');
        sessionStorage.removeItem('buddyTalkStudent');
        sessionStorage.removeItem('buddyTalkView');
        sessionStorage.removeItem('buddyTalkTopic');
        setProgress({});
        setStudentInfo(null);
        setSelectedTopic(null);
        setView('landing');
        return;
      }
      const studentProgress = studentData.progress || {};

      const studentAssessments = await getStudentAssessments(studentId);
      const dbProgressMap = {};
      studentAssessments.forEach(a => {
        if (a.topicId) {
          dbProgressMap[a.topicId] = true;
        }
      });

      setProgress(prev => {
        const merged = {};
        
        // 1. Populate with persistent progress from Firestore student document
        Object.keys(studentProgress).forEach(topicId => {
          merged[topicId] = {
            listened: studentProgress[topicId]?.listened || false,
            answered: studentProgress[topicId]?.answered || false,
            challengeCompleted: studentProgress[topicId]?.challengeCompleted || false,
            challenge1: studentProgress[topicId]?.challenge1 || false,
            challenge2: studentProgress[topicId]?.challenge2 || false,
            challenge3: studentProgress[topicId]?.challenge3 || false,
            challenge4: studentProgress[topicId]?.challenge4 || false,
            rekamSuara: studentProgress[topicId]?.rekamSuara || false
          };
        });

        // 2. Merge current local prev progress
        Object.keys(prev).forEach(topicId => {
          merged[topicId] = {
            ...(merged[topicId] || {}),
            listened: merged[topicId]?.listened || prev[topicId]?.listened || false,
            answered: merged[topicId]?.answered || prev[topicId]?.answered || false,
            challengeCompleted: merged[topicId]?.challengeCompleted || prev[topicId]?.challengeCompleted || false,
            challenge1: merged[topicId]?.challenge1 || prev[topicId]?.challenge1 || false,
            challenge2: merged[topicId]?.challenge2 || prev[topicId]?.challenge2 || false,
            challenge3: merged[topicId]?.challenge3 || prev[topicId]?.challenge3 || false,
            challenge4: merged[topicId]?.challenge4 || prev[topicId]?.challenge4 || false,
            rekamSuara: merged[topicId]?.rekamSuara || prev[topicId]?.rekamSuara || false
          };
        });

        // 3. Ensure answered flags from DB are always correct (if in DB, answered is true)
        Object.keys(dbProgressMap).forEach(topicId => {
          if (!merged[topicId]) {
            merged[topicId] = {
              listened: false,
              answered: true,
              challengeCompleted: false,
              challenge1: false,
              challenge2: false,
              challenge3: false,
              challenge4: false,
              rekamSuara: true
            };
          } else {
            merged[topicId].answered = true;
            merged[topicId].rekamSuara = true;
          }
        });

        sessionStorage.setItem('buddyTalkProgress', JSON.stringify(merged));
        return merged;
      });
    } catch (err) {
      console.error("Error refreshing student progress:", err);
    }
  };

  useEffect(() => {
    if (studentInfo) {
      sessionStorage.setItem('buddyTalkStudent', JSON.stringify(studentInfo));
      refreshStudentProgress(studentInfo.id);
    } else {
      sessionStorage.removeItem('buddyTalkStudent');
    }
  }, [studentInfo]);

  useEffect(() => {
    // Preload heavy background WebP images to make view transitions instant
    const backgrounds = [bgLanding, bgMateri, bgGuru];
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('buddyTalkView', view);
  }, [view]);

  useEffect(() => {
    if (selectedTopic) {
      sessionStorage.setItem('buddyTalkTopic', JSON.stringify(selectedTopic));
    } else {
      sessionStorage.removeItem('buddyTalkTopic');
    }
  }, [selectedTopic]);

  const [stars, setStars] = useState(() => {
    const saved = sessionStorage.getItem('buddyTalkStars');
    return saved ? parseInt(saved, 10) : 120;
  });

  useEffect(() => {
    sessionStorage.setItem('buddyTalkStars', stars.toString());
  }, [stars]);

  const navigateTo = (newView, topic = null) => {
    const targetTopic = topic || selectedTopic;
    if (targetTopic) {
      const topicProgress = progress[targetTopic.id] || {};
      
      // Guard for Challenge Page: must have listened/watched video
      if (newView === 'challenge' && !topicProgress.listened) {
        alert("Kamu harus menonton video materi sampai selesai terlebih dahulu sebelum melanjutkan ke halaman Challenge!");
        return;
      }
      
      // Guard for Rekam Suara (Answer) Page: must have completed challenge
      if (newView === 'answer' && !topicProgress.challengeCompleted) {
        alert("Kamu harus menyelesaikan game Challenge terlebih dahulu sebelum melanjutkan ke halaman Rekam Suara!");
        return;
      }
    }

    if (topic) setSelectedTopic(topic);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh student progress from DB when going back to home
    if (newView === 'home' && studentInfo?.id) {
      refreshStudentProgress(studentInfo.id);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      sessionStorage.removeItem('buddyTalkProgress');
      sessionStorage.removeItem('buddyTalkStudent');
      sessionStorage.removeItem('buddyTalkView');
      sessionStorage.removeItem('buddyTalkTopic');
      sessionStorage.removeItem('buddyTalkStars');
      setStars(120);
      setProgress({});
      setStudentInfo(null);
      setSelectedTopic(null);
      navigateTo('landing');
    }
  };

  const markProgress = (topicId, type) => {
    setProgress(prev => {
      // Award 20 stars when challenge or answer is completed for the first time
      if ((type === 'answered' && !prev[topicId]?.answered) || 
          (type === 'challengeCompleted' && !prev[topicId]?.challengeCompleted)) {
        setStars(s => s + 20);
      }

      // Initialize with default false values if this topic progress doesn't exist yet
      const defaultState = {
        listened: false,
        challenge1: false,
        challenge2: false,
        challenge3: false,
        challenge4: false,
        rekamSuara: false
      };
      
      const currentTopicProgress = prev[topicId] ? { ...prev[topicId] } : defaultState;

      // Set the appropriate field based on type
      if (type === 'listened') {
        currentTopicProgress.listened = true;
      } else if (type === 'challenge1') {
        currentTopicProgress.challenge1 = true;
      } else if (type === 'challenge2') {
        currentTopicProgress.challenge2 = true;
      } else if (type === 'challenge3') {
        currentTopicProgress.challenge3 = true;
      } else if (type === 'challenge4' || type === 'challengeCompleted') {
        currentTopicProgress.challenge4 = true;
        currentTopicProgress.challengeCompleted = true; // Keep for compatibility
      } else if (type === 'answered') {
        currentTopicProgress.answered = true;
        currentTopicProgress.rekamSuara = true;
      }

      const nextProgress = {
        ...prev,
        [topicId]: currentTopicProgress
      };
      sessionStorage.setItem('buddyTalkProgress', JSON.stringify(nextProgress));
      
      // Persist to Firestore student document
      if (studentInfo?.id) {
        updateStudentProgress(studentInfo.id, nextProgress).catch(err => {
          console.error("Failed to sync progress to Firestore:", err);
        });
      }
      
      return nextProgress;
    });
  };


  // If in Teacher Login View
  if (view === 'teacher-login') {
    return (
      <TeacherLoginView 
        onLogin={() => navigateTo('teacher')} 
        onBack={() => navigateTo('landing')} 
      />
    );
  }

  // If in Teacher View, don't show the regular app shell
  if (view === 'teacher') {
    return (
      <div className="relative">
        <TeacherView onLogout={handleLogout} onHome={() => navigateTo('home')} />
      </div>
    );
  }

  // If in Dashboard View, don't show the regular app shell
  if (view === 'dashboard') {
    return (
      <ScoreDashboardView onBack={() => navigateTo(studentInfo ? 'home' : 'landing')} />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <LandingPage 
          key="landing" 
          onStudentStart={() => navigateTo('register')} 
          onTeacherStart={() => navigateTo('teacher-login')} 
          onScoreDashboard={() => navigateTo('dashboard')}
        />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen pb-12 relative overflow-hidden"
        >
          {/* Background Image reused from Guide */}
          <div 
            className="fixed inset-0 w-full h-full bg-no-repeat pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${bgMateri})`, zIndex: 0 }}
          />

          {/* Header */}
          {view !== 'landing' && view !== 'register' && view !== 'guide' && view !== 'closing' && view !== 'teacher' && view !== 'teacher-login' && (
            <header className="w-full max-w-6xl mx-auto px-4 pt-6 pb-2 relative z-30">
                <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-3 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left: Logo & Subtitle */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-8 flex-shrink-0">
                      <div className="absolute left-0 top-0.5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm border border-blue-600">
                        <div className="flex gap-0.5 justify-center items-center">
                          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-blue-500 rounded-bl-sm rotate-45 border-l border-b border-blue-600"></div>
                      </div>
                      <div className="absolute right-0.5 bottom-0.5 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-sm border border-orange-600">
                        <div className="flex flex-col items-center">
                          <div className="flex gap-0.5 justify-center items-center">
                            <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                            <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                          </div>
                          <div className="w-2 h-[1px] bg-white rounded-full mt-0.5"></div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-br-sm -rotate-45 border-r border-b border-orange-600"></div>
                      </div>
                    </div>
                    <div className="flex flex-col leading-tight select-none text-left">
                      <div className="text-xl font-black tracking-tight">
                        <span className="text-[#315588]">Buddy</span>
                        <span className="text-[#ef4444]">Talk</span>
                      </div>
                      <span className="hidden md:inline text-[9px] font-bold text-slate-400 tracking-wider">
                        Berbicara · Belajar · Bertumbuh
                      </span>
                    </div>
                  </div>

                  {/* Center: Navigation Pills */}
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100/50 shadow-inner">
                    <button 
                      onClick={() => navigateTo('home')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                        view === 'home' 
                          ? 'bg-white text-blue-600 border border-blue-100 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      <span className="hidden sm:inline">Beranda</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (selectedTopic) {
                          navigateTo('story', selectedTopic);
                        } else {
                          alert("Silakan pilih topik cerita terlebih dahulu di halaman Beranda untuk mulai belajar!");
                          navigateTo('home');
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                        view === 'story' || view === 'rubric'
                          ? 'bg-white text-blue-600 border border-blue-100 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Materi</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (selectedTopic) {
                          navigateTo('challenge', selectedTopic);
                        } else {
                          alert("Pilih topik cerita terlebih dahulu di Beranda!");
                          navigateTo('home');
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                        view === 'challenge' 
                          ? 'bg-white text-blue-600 border border-blue-100 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                      <span className="hidden sm:inline">Challenge</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (selectedTopic) {
                          navigateTo('answer', selectedTopic);
                        } else {
                          alert("Pilih topik cerita terlebih dahulu di Beranda!");
                          navigateTo('home');
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                        view === 'answer'
                          ? 'bg-white text-blue-600 border border-blue-100 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                      <span className="hidden sm:inline">Bicara</span>
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-extrabold text-slate-500 hover:text-red-600 transition-all cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Profil</span>
                    </button>
                  </div>

                  {/* Right: Leaderboard (Klasmen) Only */}
                  <div className="flex items-center">
                    {/* Klasmen Button */}
                    <button 
                      onClick={() => navigateTo('dashboard')}
                      className="flex items-center gap-1.5 bg-[#f8fafc] hover:bg-[#f1f5f9] active:scale-95 transition-all duration-200 border border-[#e2e8f0] px-3.5 py-1.5 rounded-2xl shadow-sm cursor-pointer select-none"
                    >
                      <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                      <span className="font-extrabold text-slate-700 text-xs md:text-sm">Klasmen</span>
                    </button>
                  </div>
                </div>
              </header>
            )}

            <main className="w-full max-w-6xl mx-auto px-4 py-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {view === 'register' && (
                  <RegistrationView 
                    key="register" 
                    onComplete={(student) => {
                      setStudentInfo(student);
                      navigateTo('guide');
                    }}
                    onBack={() => navigateTo('landing')}
                  />
                )}
                {view === 'guide' && (
                  <GuideView
                    key="guide"
                    onNext={() => navigateTo('home')}
                  />
                )}
                {view === 'objectives' && (
                  <ObjectivesView
                    key="objectives"
                    onNext={() => navigateTo('home')}
                    onBack={() => navigateTo('home')}
                  />
                )}
                {view === 'rubric' && (
                  <RubricPage
                    key="rubric"
                    onNext={() => navigateTo('story', selectedTopic)}
                    onBack={() => navigateTo('home')}
                  />
                )}

                {view === 'home' && (
                  <HomeView 
                    key="home" 
                    studentInfo={studentInfo}
                    progress={progress} 
                    onSelect={(topic) => navigateTo('rubric', topic)} 
                    onScoreDashboard={() => navigateTo('dashboard')}
                    onBack={() => navigateTo('guide')}
                  />
                )}
                {view === 'challenge' && selectedTopic && (
                  <ChallengePage 
                    key="challenge"
                    topic={selectedTopic}
                    studentInfo={studentInfo}
                    progress={progress}
                    onComplete={() => {
                      markProgress(selectedTopic.id, 'challengeCompleted');
                    }}
                    onStepComplete={(stepNum) => {
                      markProgress(selectedTopic.id, `challenge${stepNum}`);
                    }}
                    onNext={() => {
                      navigateTo('answer', selectedTopic);
                    }}
                    onBack={() => {
                      navigateTo('home');
                    }}
                  />
                )}
                {view === 'story' && selectedTopic && (
                  <StoryPlayer 
                    key="story" 
                    topic={selectedTopic} 
                    isListened={!!progress[selectedTopic.id]?.listened}
                    onComplete={() => {
                      markProgress(selectedTopic.id, 'listened');
                    }}
                    onNext={() => {
                      navigateTo('challenge', selectedTopic);
                    }}
                    onBack={() => {
                      navigateTo('rubric', selectedTopic);
                    }}
                  />
                )}
                {view === 'answer' && selectedTopic && (
                  <VoiceAnswer 
                    key="answer" 
                    topic={selectedTopic} 
                    studentInfo={studentInfo}
                    hasSubmitted={!!progress[selectedTopic.id]?.answered}
                    onFinish={() => {
                      markProgress(selectedTopic.id, 'answered');
                      navigateTo('closing');
                    }} 
                    onHome={() => navigateTo('home')}
                  />
                )}
                {view === 'closing' && (
                  <ClosingView 
                    key="closing"
                    studentInfo={studentInfo}
                    topic={selectedTopic}
                    onHome={() => navigateTo('home')}
                  />
                )}
              </AnimatePresence>
            </main>
          </motion.div>

      )}
    </AnimatePresence>
  );
}

// 1. Home View / Material Picker
function HomeView({ onSelect, progress, studentInfo, onBack }) {
  // Sparkle icons
  const SparklesLeft = () => (
    <svg width="32" height="24" viewBox="0 0 24 20" fill="none" className="text-amber-400 w-8 h-6 flex-shrink-0">
      <path d="M4 16L10 4M11 18L15 6M18 19L20 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const SparklesRight = () => (
    <svg width="32" height="24" viewBox="0 0 24 20" fill="none" className="text-amber-400 w-8 h-6 flex-shrink-0">
      <path d="M20 16L14 4M13 18L9 6M6 19L4 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-2 py-4">
      {/* Giant White Card Wrapper */}
      <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-10 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3 flex flex-col items-center select-none">
          <div className="flex items-center gap-3">
            <SparklesLeft />
            <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight">
              PILIH TOPIK CERITA
            </h2>
            <SparklesRight />
          </div>
          <p className="text-slate-500 font-extrabold text-xs md:text-sm max-w-3xl">
            Pilih cerita untuk dipelajari dan ceritakan kembali dengan bahasamu sendiri!
          </p>
        </div>

        {/* Grid of Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
        {topics.map((topic) => {
          const topicProgress = progress[topic.id] || {};
          const isCompleted = topicProgress.answered;
          
          return (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(topic)}
              className={`relative overflow-hidden rounded-3xl p-5 cursor-pointer bg-white border-2 transition-all flex flex-col justify-between h-full shadow-sm hover:shadow-md ${
                isCompleted 
                  ? 'border-green-400 shadow-green-100/50' 
                  : `border-slate-100 hover:${topic.borderColor} ${topic.shadow}`
              }`}
            >
              {/* Card Content */}
              <div className="space-y-4 flex-1 flex flex-col">
                {/* Badge Topic */}
                <div className="flex justify-center">
                  <span className={`text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-wider ${topic.badgeColor}`}>
                    {topic.number}
                  </span>
                </div>

                {/* Title */}
                <div className="text-center leading-snug">
                  <h3 className={`text-xs font-black tracking-wider uppercase ${topic.textColor}`}>{topic.title}</h3>
                  <p className="text-sm font-black text-slate-800 mt-0.5">"{topic.character}"</p>
                </div>

                {/* Image Illustration */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/60 shadow-sm flex-shrink-0">
                  <img src={topic.material.image} alt={topic.title} className="w-full h-full object-cover" />
                  {isCompleted && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                      ✓ Selesai
                    </div>
                  )}
                </div>

                {/* Description Box */}
                <div className={`p-4 rounded-2xl flex-1 flex items-center justify-center text-[11px] text-slate-700 font-extrabold leading-relaxed text-center ${topic.color}`}>
                  <p>{topic.desc}</p> 
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-4">
                <button className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${topic.badgeColor} hover:brightness-95 shadow-sm`}>
                  <ArrowRight className="w-4.5 h-4.5 text-white" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>

      {/* Bottom Lightbulb Banner with Bird Mascot & Back Button */}
      <div className="relative flex items-center gap-4 max-w-3xl mx-auto pt-4 pb-2">
        {onBack && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-4 rounded-full bg-[#315588] text-white shadow-2xl hover:bg-[#233f66] transition-colors flex items-center justify-center animate-bounce border-4 border-white/50 cursor-pointer"
              title="Kembali ke Petunjuk"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </motion.button>
          </motion.div>
        )}

        <div className="flex items-center gap-3 bg-white border border-slate-150 rounded-full pl-6 pr-12 py-3 shadow-md flex-1">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500 fill-amber-300 flex-shrink-0 animate-bounce">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C8.8 12.1 8 10.63 8 9c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.63-.8 3.1-2.15 4.1z" />
          </svg>
          <span className="text-xs md:text-sm font-black text-blue-900 leading-tight">
            Setiap cerita mengajarkan nilai baik. Yuk, pilih topik yang ingin kamu pelajari!
          </span>
        </div>
        
        {/* Mascot sitting on the right edge */}
        <div className="absolute right-2 -bottom-2.5 w-20 h-20 z-10 select-none pointer-events-none hidden md:block">
          <img src={burungBiruImg} alt="Blue Bird Mascot" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

// 2. Story / Material Player
function StoryPlayer({ topic, onComplete, onNext, onBack, isListened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [hasFinished, setHasFinished] = useState(false);
  const [activeParagraphIdx, setActiveParagraphIdx] = useState(0);
  const animFrameRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hasSeekedRef = useRef(false);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const paragraphs = topic.material.text.split('\n').filter(p => p.trim().length > 0);
  const words = paragraphs.flatMap(p => p.split(/\s+/).filter(w => w.length > 0));
  const estimatedSeconds = Math.max((words.length / 2.5), 5); // Rough estimate of 2.5 words per second

  // Calculate timing for each word based on total duration using Natural Speech Pacing
  const wordTimings = React.useMemo(() => {
    const totalTime = duration || estimatedSeconds;
    if (!totalTime || !paragraphs.length) return [];
    
    // Calculate weights to simulate natural human dictation speed and intonation
    const wordsWithData = [];
    paragraphs.forEach((p, pIdx) => {
      const pWords = p.split(/\s+/).filter(w => w.length > 0);
      pWords.forEach((word, wIdx) => {
        const isLastWordInParagraph = wIdx === pWords.length - 1;
        
        // Clean word to get actual character length
        const textLength = word.replace(/[^a-zA-Z0-9]/g, '').length;
        const weight = Math.max(textLength, 2); 
        
        // Determine pauses after the word based on punctuation
        let pauseAfter = 0;
        if (isLastWordInParagraph) {
          pauseAfter = 30; // Jeda panjang untuk akhir paragraf
        } else if (word.endsWith(',')) {
          pauseAfter = 5; // Jeda untuk koma
        } else if (/[.?!]$/.test(word)) {
          pauseAfter = 12; // Jeda normal untuk akhir kalimat (titik)
        }
        
        wordsWithData.push({ word, weight, pauseAfter, isLastWordInParagraph });
      });
    });
    
    const totalWeight = wordsWithData.reduce((acc, curr) => acc + curr.weight + curr.pauseAfter, 0);
    
    // Provide a buffer for video intro/outro (e.g., logo, music)
    const introDelay = totalTime > 15 ? 1.0 : (totalTime > 5 ? 0.5 : 0);
    const outroDelay = totalTime > 15 ? 1.5 : 0;
    const activeTime = Math.max(totalTime - introDelay - outroDelay, 5);
    
    const timings = [];
    let currentT = introDelay;
    
    wordsWithData.forEach((data, index) => {
      const speakDuration = (data.weight / totalWeight) * activeTime;
      const pauseDuration = (data.pauseAfter / totalWeight) * activeTime;
      
      timings.push({
        word: data.word,
        start: currentT,
        end: currentT + speakDuration, // Exact time word is spoken
        chunkEnd: currentT + speakDuration + pauseDuration,
        isLastWordInParagraph: data.isLastWordInParagraph,
        index
      });
      
      currentT += (speakDuration + pauseDuration);
    });
    
    return timings;
  }, [duration, words, estimatedSeconds]);

  // Group words into subtitle chunks by paragraph
  const subtitleChunks = React.useMemo(() => {
    if (!wordTimings.length) return [];
    const totalTime = duration || estimatedSeconds;
    const result = [];
    let currentChunk = [];
    
    wordTimings.forEach((wt) => {
      currentChunk.push(wt);
      
      // Create a new chunk at the end of each paragraph
      if (wt.isLastWordInParagraph || wt.index === wordTimings.length - 1) {
        // Find the start of the next chunk for a smooth transition
        const nextWordStart = wt.index < wordTimings.length - 1 ? wordTimings[wt.index + 1].start : totalTime;
        
        result.push({
          words: currentChunk,
          start: currentChunk[0].start,
          end: Math.max(currentChunk[0].start + 0.5, nextWordStart - 0.3), // Beri jeda kosong 0.3 detik sebelum paragraf baru muncul
          id: `chunk-${result.length}`
        });
        currentChunk = [];
      }
    });
    return result;
  }, [wordTimings, duration, estimatedSeconds]);

  // Find the active chunk based on currentTime
  const activeChunkIndex = subtitleChunks.findIndex(
    chunk => currentTime >= chunk.start && currentTime <= chunk.end
  );

  const activeChunk = activeChunkIndex !== -1 ? subtitleChunks[activeChunkIndex] : (currentTime < (subtitleChunks[0]?.start || 0) ? subtitleChunks[0] : null);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [topic, onComplete]);

  useEffect(() => {
    if (topic.material.videoUrl || topic.material.localVideo) return;

    let startTime;
    let pausedTime = 0;
    let lastPauseStart = 0;

    const animateProgress = (timestamp) => {
      if (topic.material.videoUrl || topic.material.localVideo) return; // Safety check inside closure
      if (!startTime) startTime = timestamp;
      
      if (!isPlaying) {
        lastPauseStart = timestamp;
      } else {
        if (lastPauseStart > 0) {
          pausedTime += (timestamp - lastPauseStart);
          lastPauseStart = 0;
        }
        
        const elapsed = (timestamp - startTime - pausedTime) / 1000;
        let percent = (elapsed / estimatedSeconds) * 100;
        
        if (percent >= 100) {
          percent = 100;
          setProgress(percent);
          setIsPlaying(false);
          setHasFinished(true);
          if (onComplete) onComplete();
          return;
        }
        setProgress(percent);
      }
      
      animFrameRef.current = requestAnimationFrame(animateProgress);
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, estimatedSeconds, topic.material.videoUrl, topic.material.localVideo, onComplete]);

  const togglePlay = () => {
    if (topic.material.videoUrl) return;

    if (isPlaying) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress > 0 && progress < 100 && !hasFinished) {
        if (videoRef.current) videoRef.current.play();
      } else {
        setProgress(0);
        
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
        setHasFinished(false);
        hasSeekedRef.current = false;
      }
      setIsPlaying(true);
    }
  };

  const replay = () => {
    if (topic.material.videoUrl) return;

    setProgress(0);
    setIsPlaying(true);
    setHasFinished(false);
    hasSeekedRef.current = false;
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleSeek = (e) => {
    if (!topic.material.localVideo || !videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(pos * 100);
    setHasFinished(false);
    hasSeekedRef.current = true;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row w-full"
    >
      {/* Left Column: Video & Controls */}
      <div className="w-full md:w-[60%] flex flex-col bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-8">
        <div className="relative aspect-[16/9] w-full bg-slate-200 rounded-xl overflow-hidden mb-6 border border-slate-200/50 shadow-inner">
          {topic.material.videoUrl ? (
            <iframe 
              src={topic.material.videoUrl} 
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; microphone" 
              title={topic.title}
            />
          ) : topic.material.localVideo ? (
            <>
              <video
                ref={videoRef}
                src={topic.material.localVideo}
                poster={topic.material.localVideo.replace('.mp4', '.jpg')}
                className="w-full h-full object-cover bg-slate-200 cursor-pointer"
                playsInline
                preload="auto"
                onClick={togglePlay}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onDurationChange={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    const ct = videoRef.current.currentTime;
                    setCurrentTime(ct);
                    let dur = videoRef.current.duration;
                    if (dur && !isNaN(dur) && dur !== Infinity) {
                      setDuration(dur);
                    }
                    if (!dur || isNaN(dur) || dur === Infinity) {
                      dur = estimatedSeconds || 1; // Fallback to avoid NaN bounce
                    }
                    const percent = (ct / dur) * 100;
                    setProgress(percent || 0);
                  }
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setProgress(100);
                  setHasFinished(true);
                  if (videoRef.current) {
                    videoRef.current.pause();
                  }
                  if (onComplete) onComplete();
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold drop-shadow-md pointer-events-none">
                {topic.title}
              </h2>
            </>
          ) : (
            <>
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: isPlaying ? 1.05 : 1 }}
                transition={{ duration: estimatedSeconds, ease: "linear" }}
                src={topic.material.image} 
                alt={topic.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold drop-shadow-md pointer-events-none">
                {topic.title}
              </h2>
            </>
          )}
        </div>

        {!topic.material.videoUrl && (
          <div className="mt-auto">
            {/* Scrubber */}
            <div 
              className="mb-4 relative h-4 flex items-center cursor-pointer group"
              onClick={handleSeek}
            >
              <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-blue-500 transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div 
                className="absolute w-3 h-3 bg-[#315588] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-4 justify-start">
              <button 
                onClick={replay}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors border-2 border-transparent hover:border-slate-300"
              >
                <RotateCcw className="w-8 h-8" />
              </button>

              <button 
                onClick={togglePlay}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-200 transition-colors border-2 border-transparent hover:border-slate-300"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </button>

              {topic.material.localVideo && (
                <div className="text-sm font-medium text-slate-600 font-mono ml-2 mt-1">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Text & Next Button */}
      <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col justify-between bg-white relative">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {topic.material.videoUrl ? (
            <div className="flex flex-col justify-between w-full h-full">
              {/* Active Paragraph Display */}
              <div className="flex-1 flex items-center justify-center min-h-0 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeParagraphIdx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="text-center w-full max-h-full overflow-y-auto"
                  >
                    <p className="text-lg md:text-xl font-bold leading-relaxed text-[#315588] px-4 select-none">
                      {paragraphs[activeParagraphIdx]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Indicators & Buttons */}
              <div className="flex flex-col items-center gap-3 pt-4 border-t border-slate-100 select-none">
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {paragraphs.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveParagraphIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeParagraphIdx === idx 
                          ? 'w-5 bg-blue-500 shadow-sm' 
                          : 'w-2 bg-slate-200 hover:bg-slate-350'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between w-full px-2">
                  <button
                    disabled={activeParagraphIdx === 0}
                    onClick={() => setActiveParagraphIdx(prev => prev - 1)}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    Sebelumnya
                  </button>

                  <span className="text-[11px] font-black text-slate-400">
                    Paragraf {activeParagraphIdx + 1} dari {paragraphs.length}
                  </span>

                  <button
                    disabled={activeParagraphIdx === paragraphs.length - 1}
                    onClick={() => setActiveParagraphIdx(prev => prev + 1)}
                    className="px-3 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-xs font-bold text-white shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    Berikutnya
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between w-full h-full">
              {/* Active Paragraph Display */}
              <div className="flex-1 flex items-center justify-center min-h-0 py-4">
                <AnimatePresence mode="wait">
                  {activeChunk && (
                    <motion.div
                      key={activeChunk.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="text-center w-full max-h-full overflow-y-auto px-4"
                    >
                      <p className="text-xl md:text-2xl font-black leading-relaxed text-[#315588] select-none">
                        {activeChunk.words.map(w => w.word).join(' ')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Indicators & Progress info */}
              {subtitleChunks.length > 0 && (
                <div className="flex flex-col items-center gap-3 pt-4 border-t border-slate-100 select-none">
                  {/* Dots indicator */}
                  <div className="flex gap-2">
                    {subtitleChunks.map((_, idx) => {
                      const currentPIdx = activeChunkIndex !== -1 ? activeChunkIndex : 0;
                      return (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentPIdx === idx 
                              ? 'w-5 bg-blue-500 shadow-sm' 
                              : 'w-2 bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <span className="text-[11px] font-black text-slate-400">
                    Paragraf {(activeChunkIndex !== -1 ? activeChunkIndex : 0) + 1} dari {subtitleChunks.length}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-100">
          {onBack ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
            </motion.button>
          ) : (
            <div />
          )}

          <motion.button
            whileHover={(hasFinished || isListened) ? { scale: 1.05 } : {}}
            whileTap={(hasFinished || isListened) ? { scale: 0.95 } : {}}
            onClick={() => {
              if (hasFinished || isListened) {
                onNext();
              } else {
                alert("Kamu harus menonton video materi sampai selesai terlebih dahulu sebelum melanjutkan ke halaman Challenge!");
              }
            }}
            className={`flex items-center text-sm font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer ${
              (hasFinished || isListened) 
                ? 'text-[#315588] bg-blue-50 hover:bg-blue-100' 
                : 'text-slate-400 bg-slate-100 cursor-not-allowed opacity-60'
            }`}
          >
            Lanjut Challenge <ArrowRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// 3. Voice Answer / Reflection Mode
function VoiceAnswer({ topic, studentInfo, onFinish, onHome, hasSubmitted }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        chunksRef.current = [];
        
        stream.getTracks().forEach(track => track.stop());
      };

      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioUrl(null);
      setAudioBlob(null);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Please allow microphone access to record your answer!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFinish = async () => {
    if (isSaving) return;
    setIsSaving(true);
    if (audioBlob) {
      try {
        await saveAssessment({
          studentId: studentInfo ? studentInfo.id : 'anonymous',
          topicId: topic.id,
          audioBlob,
          timestamp: Date.now(),
          score: null,
          graded: false
        });
      } catch (err) {
        console.error(err);
        alert(err.message || "Gagal menyimpan rekaman. Silakan coba lagi.");
        setIsSaving(false);
        return;
      }
    }
    onFinish();
  };

  if (hasSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-center max-w-2xl mx-auto relative overflow-visible"
      >
        <div className={`inline-flex p-4 rounded-full bg-yellow-100 mb-6 relative z-10`}>
          <Lock className={`w-8 h-8 text-yellow-600`} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Sudah Terisi! 🌟</h2>
        <p className="text-slate-600 mb-6 relative z-10 leading-relaxed">
          Kamu sudah mengumpulkan rekaman suara untuk topik <strong>{topic.title}</strong>.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-left text-amber-800 text-sm">
          <p className="font-semibold mb-1">Suara sudah terisi!</p>
          Minta Bapak/Ibu Guru untuk menghapus data penilaian lamamu terlebih dahulu di halaman guru. Setelah dihapus, kamu bisa merekam kembali jawaban terbaikmu di sini!
        </div>

        <div className="flex justify-center gap-4 relative z-10">
          <button 
            onClick={onHome}
            className={`px-8 py-3 rounded-full text-slate-800 font-bold shadow-md hover:-translate-y-0.5 transition-transform ${topic.color} ${topic.shadow}`}
          >
            Kembali ke Menu Utama
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 text-left max-w-2xl mx-auto relative overflow-visible min-h-[380px] flex flex-col justify-center"
    >
      <div className="sm:pr-[150px] md:pr-[200px] relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
        <div className={`inline-flex p-4 rounded-full ${topic.color} opacity-80 mb-6`}>
          <Mic className={`w-8 h-8 ${topic.textColor}`} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sekarang giliranmu!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed font-semibold text-xs md:text-sm">{topic.material.question}</p>

        {!audioUrl && (
          <div className="flex flex-col items-center sm:items-start justify-center space-y-6 my-4 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative p-8 rounded-full shadow-lg text-white transition-colors ${
                isRecording 
                  ? 'bg-red-400 shadow-red-400/50' 
                  : `${topic.color} ${topic.shadow}`
              }`}
            >
              {isRecording ? (
                <Square className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-slate-800" />
              )}
              
              {/* Pulse effect when recording */}
              {isRecording && (
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-red-400 rounded-full -z-10"
                />
              )}
            </motion.button>
            
            <p className={`font-medium ${isRecording ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
              {isRecording ? 'Merekam suara ajaibmu...' : 'Ketuk untuk merekam jawaban'}
            </p>
          </div>
        )}

        {audioUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-4 space-y-6 w-full"
          >
            <div className="bg-slate-50 p-4 rounded-2xl w-full">
              <audio src={audioUrl} controls className="w-full" />
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <button 
                disabled={isSaving}
                onClick={() => {
                  setAudioUrl(null);
                  setAudioBlob(null);
                }}
                className="px-6 py-3 rounded-full text-slate-500 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rekam ulang
              </button>
              <button 
                onClick={handleFinish}
                disabled={isSaving}
                className={`px-8 py-3 rounded-full text-slate-800 font-bold shadow-md hover:-translate-y-0.5 transition-transform ${topic.color} ${topic.shadow} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan & Selesai ✨'}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Image positioned ON the card (overlapping) */}
      <motion.img 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        src={ceweAudio} 
        alt="Audio Instructor" 
        className="absolute right-0 bottom-0 w-[140px] md:w-[220px] object-contain drop-shadow-xl pointer-events-none z-0 hidden sm:block"
      />
    </motion.div>
  );
}

// Custom Warning Modal Component for Warm-up constraint
function WarmupWarningModal({ topic, onClose, onConfirm }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 text-center relative overflow-hidden"
      >
        {/* Decorative background shape */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${topic.color} opacity-20`} />
        
        <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 mb-6 relative z-10">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10">
          Ayo Pemanasan Dulu! ⚡
        </h3>
        
        <p className="text-slate-600 mb-8 relative z-10 leading-relaxed text-sm md:text-base">
          Kamu perlu menyelesaikan tantangan <strong>Buddy Challenge (Pemanasan)</strong> untuk topik <strong>{topic.title}</strong> terlebih dahulu sebelum merekam suara atau membaca materi ini!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold transition-all text-sm"
          >
            Nanti Saja
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 rounded-2xl text-slate-800 font-extrabold shadow-md hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 ${topic.color} ${topic.shadow}`}
          >
            Mulai Pemanasan <ArrowRight className="w-4 h-4 text-slate-800" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
