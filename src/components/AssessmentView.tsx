import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Check, 
  Circle,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS, AssessmentQuestion } from '../data/assessmentQuestions';
import { StudentProfile } from '../types/assessment';

interface AssessmentViewProps {
  student: StudentProfile;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onAnswerChange: (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => void;
  onSubmit: () => void;
  lang: 'en' | 'ar';
}

// Fisher-Yates array shuffler
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  answers,
  onAnswerChange,
  onSubmit,
  lang,
}) => {
  // Always shuffle question order and the options within each question on initialization
  const [shuffledQuestions] = useState<AssessmentQuestion[]>(() => {
    return shuffleArray(ASSESSMENT_QUESTIONS).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQ: AssessmentQuestion = shuffledQuestions[currentIndex] || shuffledQuestions[0];
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const isAr = lang === 'ar';

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollToTop();
    }
  };

  const jumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    scrollToTop();
  };

  const jumpToNextUnanswered = () => {
    const nextUnanswered = shuffledQuestions.findIndex((q) => !answers[q.id]);
    if (nextUnanswered !== -1) {
      setCurrentIndex(nextUnanswered);
      scrollToTop();
    }
  };

  // When user selects their choice: record answer & move to next question using seamless scroll to top
  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    onAnswerChange(currentQ.id, optionId);

    // If not the last question, auto-advance to next question with seamless scroll to top
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        scrollToTop();
      }, 160);
    } else {
      // On the last question, still smoothly scroll to top
      scrollToTop();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') isAr ? handlePrev() : handleNext();
      if (e.key === 'ArrowLeft') isAr ? handleNext() : handlePrev();
      if (['1', 'a', 'A'].includes(e.key) && currentQ.options[0]) handleSelectOption(currentQ.options[0].id);
      if (['2', 'b', 'B'].includes(e.key) && currentQ.options[1]) handleSelectOption(currentQ.options[1].id);
      if (['3', 'c', 'C'].includes(e.key) && currentQ.options[2]) handleSelectOption(currentQ.options[2].id);
      if (['4', 'd', 'D'].includes(e.key) && currentQ.options[3]) handleSelectOption(currentQ.options[3].id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, isAr]);

  const currentAnswer = answers[currentQ.id];

  // Text content based on language
  const questionText = isAr ? (currentQ.arabicQuestion || currentQ.question) : currentQ.question;
  const moduleText = isAr ? (currentQ.arabicModule || currentQ.module) : currentQ.module;

  return (
    <div className={`space-y-6 max-w-5xl mx-auto pb-16 ${isAr ? 'font-arabic' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Streamlined Distraction-Free Progress Bar Card (No user info, no edit button, no duplicate clock) */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              {isAr ? (
                <>الإجابات: <strong className="text-white mx-1">{answeredCount}</strong> من {totalQuestions}</>
              ) : (
                <>Answered: <strong className="text-white mx-1">{answeredCount}</strong> of {totalQuestions}</>
              )}
            </span>
            <span className="font-bold text-amber-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar (1 - 25 Grid) */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            {isAr ? 'موجّه الأسئلة (1 إلى 25)' : 'Question Navigator (1 to 25)'}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 
              {isAr ? 'تمت الإجابة' : 'Answered'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> 
              {isAr ? 'غير مجاب' : 'Unanswered'}
            </span>
            {answeredCount < totalQuestions && (
              <button
                type="button"
                onClick={jumpToNextUnanswered}
                className="text-amber-400 hover:text-amber-300 underline font-semibold ml-1 cursor-pointer"
              >
                {isAr ? 'السؤال التالي غير المجاب' : 'Next Unanswered'}
              </button>
            )}
          </div>
        </div>

        {/* 25 Grid Pills */}
        <div className="grid grid-cols-5 sm:grid-cols-13 md:grid-cols-25 gap-1.5">
          {shuffledQuestions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;

            let cellBg = 'bg-slate-900 text-slate-400 border-slate-800';
            if (isAnswered) cellBg = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
            if (isCurrent) cellBg = 'bg-amber-500 text-slate-950 border-white font-extrabold ring-2 ring-amber-400/50';

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => jumpToQuestion(idx)}
                className={`h-8 rounded-lg text-xs font-mono font-medium border flex items-center justify-center transition-all ${cellBg} hover:opacity-90 cursor-pointer`}
                title={isAr ? `السؤال ${idx + 1}` : `Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card (Clean, Distraction-Free, Short for Mobile) */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-xl relative">
        {/* Module Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                {moduleText}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? (
                  <>السؤال <strong className="text-white">{currentIndex + 1}</strong> من {totalQuestions}</>
                ) : (
                  <>Question <strong className="text-white">{currentIndex + 1}</strong> of {totalQuestions}</>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Question Title (Clean in selected language) */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-white leading-snug">
            {questionText}
          </h2>
        </div>

        {/* 4 Shuffled Options (Selecting seamlessly auto-advances to next question with scroll to top) */}
        <div className="space-y-3.5 mb-6">
          {currentQ.options.map((opt, optIndex) => {
            const isSelected = currentAnswer === opt.id;
            const displayLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
            const optionText = isAr ? (opt.arabicText || opt.text) : opt.text;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer relative ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800/90 text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                {/* Option Badge */}
                <div
                  className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center font-mono font-black text-sm mt-0.5 border transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {displayLetter}
                </div>

                {/* Option Text (Clean and short for mobile) */}
                <div className="space-y-1 flex-1 pr-6">
                  <div className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                    {optionText}
                  </div>

                  {isSelected && (
                    <div className="text-[10px] text-amber-400 font-mono font-semibold pt-0.5 flex items-center gap-1">
                      <Check className="w-3 h-3" /> 
                      {isAr ? 'تم الاختيار' : 'Selected'}
                    </div>
                  )}
                </div>

                {/* Right Selection Indicator */}
                <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} sm:top-5 ${isAr ? 'sm:left-5' : 'sm:right-5'}`}>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-amber-400 fill-amber-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} /> 
            {isAr ? 'السابق' : 'Previous'}
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {isAr 
              ? `السؤال ${currentIndex + 1} من ${totalQuestions}` 
              : `Question ${currentIndex + 1} of ${totalQuestions}`}
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
            >
              {isAr ? 'التالي' : 'Next'} 
              <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/40 ring-2 ring-yellow-400/60 animate-pulse hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
            >
              {isAr ? 'تحميل التقرير' : 'DOWNLOAD REPORT'} 
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
