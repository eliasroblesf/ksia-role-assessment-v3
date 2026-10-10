/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KSIA Fire & ERT Brigade Personality & Role Assessment
 * King Salman International Airport Emergency Response Directorate
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Clock,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';
import { AssessmentView } from './components/AssessmentView';
import { AssessmentResultView } from './components/AssessmentResultView';
import { StudentProfile, AssessmentResult } from './types/assessment';
import { calculateAssessmentResult } from './utils/assessmentScoring';
import { ASSESSMENT_QUESTIONS } from './data/assessmentQuestions';

type AppPhase = 'SPLASH' | 'ASSESSMENT' | 'RESULT';

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('SPLASH');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Exact 20-minute timer (1200 seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(1200);
  const timerIntervalRef = useRef<any>(null);

  // Auto-submit when time expires (at exactly 0)
  const handleTimeExpired = () => {
    if (!studentProfile) return;

    const computedResult = calculateAssessmentResult(studentProfile, answers);
    computedResult.timedOut = true;
    computedResult.timeSpentSeconds = 1200;

    setResult(computedResult);
    setPhase('RESULT');
    scrollToTop();
  };

  // 20-Minute Countdown Clock
  useEffect(() => {
    if (phase === 'ASSESSMENT') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [phase, answers, studentProfile]);

  // Seamless scroll to top whenever screen phase changes
  useEffect(() => {
    scrollToTop();
  }, [phase]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start Assessment from Splash Screen
  const handleStartFromSplash = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setAnswers({});
    setResult(null);
    setTimeRemaining(1200);
    setPhase('ASSESSMENT');
    scrollToTop();
  };

  // Quick-Fill Demo (Activated only via Code 2809)
  const handleQuickFillDemo = (profile: StudentProfile) => {
    setStudentProfile(profile);
    const demoAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {};
    const samplePattern: ('A' | 'B' | 'C' | 'D')[] = ['A', 'C', 'D', 'B', 'A'];

    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      demoAnswers[q.id] = samplePattern[idx % samplePattern.length];
    });

    setAnswers(demoAnswers);
    const computedResult = calculateAssessmentResult(profile, demoAnswers);
    computedResult.timeSpentSeconds = 1200 - timeRemaining;
    setResult(computedResult);
    setPhase('RESULT');
    scrollToTop();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Option selection
  const handleAnswerChange = (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Submit and calculate results
  const handleSubmitAssessment = () => {
    if (!studentProfile) return;
    const computedResult = calculateAssessmentResult(studentProfile, answers);
    computedResult.timeSpentSeconds = 1200 - timeRemaining;
    setResult(computedResult);
    setPhase('RESULT');
    scrollToTop();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Retake current student assessment
  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setTimeRemaining(1200);
    setPhase('ASSESSMENT');
    scrollToTop();
  };

  // Return to Splash for next student
  const handleReturnToSplash = () => {
    setStudentProfile(null);
    setAnswers({});
    setResult(null);
    setTimeRemaining(1200);
    setPhase('SPLASH');
    scrollToTop();
  };

  const isLowTime = timeRemaining <= 300; // 5 minutes or less
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#05080f] text-slate-200 selection:bg-amber-500/30 ${isAr ? 'font-arabic' : ''}`}>
      <OfflineIndicator />

      {/* Main Top Header */}
      <header className="border-b border-slate-800 bg-[#0a0f1a] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-500 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
              {isAr ? 'تقييم فرق طوارئ مطار الملك سلمان' : 'KSIA ERT BRIGADE ASSESSMENT'}
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.18em]">
              {isAr ? 'مطار الملك سلمان الدولي' : 'King Salman International Airport'}
            </p>
          </div>
        </div>

        {/* Header Right: UPPER SIDE SINGLE 20-MINUTE TIMER & ARABIC LANGUAGE SWITCH ICON */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active 20-Minute Timer in Upper Right: ONLY ONE TIMER IN THE SCREEN */}
          {phase === 'ASSESSMENT' && (
            <div
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border font-mono transition-all ${
                isLowTime
                  ? 'bg-rose-950/50 border-rose-500/60 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
                  : 'bg-slate-900 border-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
              }`}
            >
              <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400' : 'text-amber-400'}`} />
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs sm:text-sm font-black tracking-widest">
                  {formatTimer(timeRemaining)}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400">
                  {isAr ? 'الحد 20 دقيقة' : '20:00 Limit'}
                </span>
              </div>
            </div>
          )}

          {/* Top Right Corner Arabic Language Icon / Switch */}
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-slate-900 hover:bg-slate-800 border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all shadow-sm cursor-pointer"
            title={isAr ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            aria-label={isAr ? 'Switch to English' : 'Switch to Arabic'}
          >
            <Languages className="w-4 h-4 text-amber-400" />
            <span className={isAr ? 'font-sans font-bold' : 'font-arabic font-bold'}>
              {isAr ? 'English' : 'العربية'}
            </span>
          </button>

          <PWAInstallButton />
        </div>
      </header>

      {/* Main Content Body */}
      <main className="p-4 sm:p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {/* 1. SPLASH SCREEN (Screen 0) */}
          {phase === 'SPLASH' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <SplashScreen
                onStart={handleStartFromSplash}
                onQuickFillDemo={handleQuickFillDemo}
                lang={lang}
              />
            </motion.div>
          )}

          {/* 2. 25-QUESTION PSYCHOMETRIC ASSESSMENT SCREEN (Screen 1) */}
          {phase === 'ASSESSMENT' && studentProfile && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <AssessmentView
                student={studentProfile}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onSubmit={handleSubmitAssessment}
                lang={lang}
              />
            </motion.div>
          )}

          {/* 3. RESULT & ACCREDITATION DOSSIER SCREEN (Screen 2) */}
          {phase === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <AssessmentResultView
                result={result}
                onRetake={handleRetake}
                onReturnToSplash={handleReturnToSplash}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 bg-[#070b13] py-4 px-6 text-center text-xs text-slate-500 font-mono">
        King Salman International Airport (KSIA) | Volunteer Brigade Assessment | 20-Minute Timed Evaluation
      </footer>
    </div>
  );
}
