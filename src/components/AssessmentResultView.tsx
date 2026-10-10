import React, { useState } from 'react';
import { 
  Download, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Shield, 
  BookOpen, 
  Clock, 
  Lock, 
  MessageCircle, 
  FileCheck2 
} from 'lucide-react';
import { AssessmentResult } from '../types/assessment';
import { BRIGADE_ROLES, ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { generateAssessmentPdf } from '../utils/generatePdfReport';

interface AssessmentResultViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onReturnToSplash: () => void;
  lang: 'en' | 'ar';
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onRetake,
  onReturnToSplash,
  lang,
}) => {
  const [showDetailedAudit, setShowDetailedAudit] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [hasDownloadedPdf, setHasDownloadedPdf] = useState(false);

  const isAr = lang === 'ar';
  const primaryDef = BRIGADE_ROLES[result.primaryRole];
  const secondaryDef = BRIGADE_ROLES[result.secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[result.tertiaryRole];

  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'suppressionLead':
        return <Flame className="w-6 h-6 text-rose-400" />;
      case 'casualtyCareLead':
        return <Stethoscope className="w-6 h-6 text-emerald-400" />;
      case 'evacuationSupportLead':
        return <DoorOpen className="w-6 h-6 text-blue-400" />;
      case 'externalLiaison':
        return <Radio className="w-6 h-6 text-purple-400" />;
      default:
        return <Shield className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generateAssessmentPdf(result);
      setHasDownloadedPdf(true);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`space-y-8 max-w-5xl mx-auto pb-20 ${isAr ? 'font-arabic' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Banner / Completion Header */}
      <div className="bg-gradient-to-r from-[#0a0f1a] via-[#111a2e] to-[#0a0f1a] border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {result.timedOut ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/15 border border-rose-500/40 rounded-full text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4 text-rose-400" />
            {isAr 
              ? `انتهى الحد الزمني 20 دقيقة (${result.totalAnswered} من 25 سؤالاً)` 
              : `20-Minute Time Limit Reached (${result.totalAnswered} of 25 Questions Answered)`}
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            {isAr 
              ? `تم إكمال ${result.totalAnswered} من 25 سؤالاً سيكومترياً` 
              : `${result.totalAnswered} of 25 Psychometric Items Completed`}
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {isAr ? 'ملف تقييم الفرق التطوعية' : 'Volunteer Brigade Assessment Dossier'}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          {isAr ? (
            <>
              تصنيف الملاءمة الطبيعية للموظف <strong className="text-white">{result.student.name}</strong> (الرقم الوظيفي: <span className="font-mono text-amber-400">{result.student.studentId}</span> | تاريخ الدورة: <span className="font-mono text-slate-300">{result.student.courseDate || result.student.cohort}</span>) لتحديد الدور الأنسب في فرق الاستجابة للطوارئ بمطار الملك سلمان الدولي.
            </>
          ) : (
            <>
              Volunteer assessment and natural aptitude classification for <strong className="text-white">{result.student.name}</strong> (Employee ID: <span className="font-mono text-amber-400">{result.student.studentId}</span> | Course Date: <span className="font-mono text-slate-300">{result.student.courseDate || result.student.cohort}</span>) to discover ideal volunteer emergency response brigade placement at King Salman International Airport.
            </>
          )}
        </p>

        {/* Primary Download & Finish Action Buttons: Bleeping Yellow Button DOWNLOAD REPORT */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="relative inline-flex group">
            {/* Bleeping ping effect */}
            {!hasDownloadedPdf && (
              <span className="absolute -inset-1 rounded-2xl bg-yellow-400/80 animate-ping opacity-75 pointer-events-none" />
            )}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`relative px-8 py-4 font-black rounded-xl text-base tracking-wide flex items-center gap-3 shadow-2xl transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                hasDownloadedPdf
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-yellow-500/50 ring-4 ring-yellow-400/80 animate-pulse'
              }`}
            >
              {hasDownloadedPdf ? (
                <>
                  <FileCheck2 className="w-5 h-5 text-white" />
                  <span>
                    {downloading 
                      ? (isAr ? 'جاري تجهيز الملف...' : 'Compiling Dossier...') 
                      : (isAr ? 'تم تحميل التقرير (إعادة التحميل)' : 'REPORT DOWNLOADED (CLICK TO RE-DOWNLOAD)')}
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
                  </span>
                  <Download className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  <span>
                    {downloading 
                      ? (isAr ? 'جاري تجهيز الملف...' : 'COMPILING DOSSIER...') 
                      : (isAr ? 'تحميل التقرير' : 'DOWNLOAD REPORT')}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Locked Finish Button: Cannot finish until PDF downloaded */}
          {hasDownloadedPdf ? (
            <button
              type="button"
              onClick={onReturnToSplash}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-sm flex items-center gap-2 border border-slate-700 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isAr ? 'إنهاء وتقييم الموظف التالي' : 'Complete & Assess Next Student'}
            </button>
          ) : (
            <div className="relative group">
              <button
                disabled
                className="px-6 py-4 bg-slate-900/80 text-slate-500 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-800 cursor-not-allowed opacity-60"
              >
                <Lock className="w-4 h-4 text-amber-500/70" />
                {isAr ? 'إنهاء التقييم (مغلق)' : 'Complete Assessment (Locked)'}
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg text-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {isAr ? 'يجب تحميل تقرير الـ PDF أولاً لإنهاء التقييم.' : 'You must download the official PDF report before finishing the assessment.'}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onRetake}
            className="px-4 py-4 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            {isAr ? 'إعادة التقييم' : 'Retake Assessment'}
          </button>
        </div>
      </div>

      {/* MANDATORY WHATSAPP SUBMISSION BANNER */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-[#075e54]/30 to-emerald-950/70 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border-2 border-[#25D366]/60 flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/10">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366]/15 border border-[#25D366]/30 rounded-full text-[#25D366] text-xs font-mono font-bold uppercase tracking-wider">
                {isAr ? 'إرسال يدوي إلزامي' : 'Mandatory Manual Submission'}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {isAr 
                  ? 'إرسال ملف الـ PDF المُحمّل إلى مجموعة واتساب التدريبية' 
                  : 'Send Your Downloaded PDF to the Class WhatsApp Group'}
              </h3>

              <p className="text-emerald-200/90 text-sm font-semibold">
                {isAr
                  ? 'تنبيه إلزامي: يرجى إرسال ملف تقرير الـ PDF المُحمّل يدوياً إلى مجموعة واتساب الخاصة بالدورة التدريبية لتوثيق نتائجك وتوزيع الفرق التطوعية.'
                  : 'Mandatory instruction: Please manually send this downloaded official PDF report to your training cohort WhatsApp chat for instructor records.'}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed pt-1">
                {isAr
                  ? 'لإتمام التقييم واعتماد تسجيلك في فرق الطوارئ، يجب تحميل التقرير ثم إرساله يدوياً في محادثة مجموعة الواتساب الخاصة بدورتك.'
                  : 'To complete your evaluation and receive your official volunteer brigade badge, you must download your report using the button below and then manually share the PDF file into your cohort WhatsApp group.'}
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`w-full sm:w-auto px-7 py-3.5 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                hasDownloadedPdf
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-yellow-500/40 ring-2 ring-yellow-400/60 animate-pulse'
              }`}
            >
              {hasDownloadedPdf ? (
                <>
                  <FileCheck2 className="w-4 h-4" />
                  {downloading 
                    ? (isAr ? 'جاري التحضير...' : 'Compiling Dossier...') 
                    : (isAr ? 'تم تحميل التقرير' : 'REPORT DOWNLOADED')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {downloading 
                    ? (isAr ? 'جاري التحضير...' : 'Compiling Dossier...') 
                    : (isAr ? 'تحميل التقرير' : 'DOWNLOAD REPORT')}
                </>
              )}
            </button>
            <div className="text-[11px] text-center text-emerald-300/80 font-mono">
              {hasDownloadedPdf 
                ? (isAr ? '✓ جاهز للمشاركة اليدوية' : '✓ Ready to share manually') 
                : (isAr ? 'التحميل مطلوب أولاً' : 'Download required first')}
            </div>
          </div>
        </div>

        {/* Instructions Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-emerald-500/20 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              1
            </span>
            <span>{isAr ? 'حمّل تقرير الـ PDF على جهازك' : 'Download your official PDF report onto your device'}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              2
            </span>
            <span>{isAr ? 'افتح مجموعة واتساب التدريبية يدوياً' : 'Open your training cohort WhatsApp chat group manually'}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              3
            </span>
            <span>
              {isAr ? (
                <>أرفق ملف الـ PDF في المجموعة بالرقم الوظيفي: <strong className="text-white font-mono">{result.student.studentId}</strong></>
              ) : (
                <>Manually attach and send the downloaded PDF file with Employee ID: <strong className="text-white font-mono">{result.student.studentId}</strong></>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Role (Hero Card) */}
      <div className="bg-[#0a0f1a] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 relative shadow-xl shadow-amber-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5" />
            {isAr ? 'الدور التطوعي الأساسي الأنسب' : 'Primary Recommended Volunteer Fit'}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
              {isAr ? 'نسبة التطابق:' : 'Compatibility Score:'}
            </span>
            <span className="text-3xl font-mono font-extrabold text-amber-400">{result.primaryRoleScore}%</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl shrink-0">
            {getRoleIcon(result.primaryRole)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isAr ? primaryDef.arabicName : primaryDef.name}
            </h2>
            <p className="text-sm text-slate-300 font-medium mt-1">{primaryDef.tagline}</p>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 mb-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">{isAr ? 'الملف السلوكي الأنسب: ' : 'Ideal Volunteer Fit: '}</strong>
          {primaryDef.idealPersonality}
        </div>

        {/* Duties & Key Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              {isAr ? 'المهام التطوعية الرئيسية' : 'Core Volunteer Responsibilities'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {primaryDef.operationalDuties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {isAr ? 'السمات السلوكية الطبيعية' : 'Natural Behavioral Strengths'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {primaryDef.keyTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary & Third Role Capabilities (Two-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Secondary Role */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs uppercase font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-slate-400" />
              {isAr ? 'الدور التطوعي الاحتياطي الثاني' : 'Secondary Volunteer Brigade Fit'}
            </span>
            <span className="text-xl font-mono font-bold text-slate-200">{result.secondaryRoleScore}%</span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              {getRoleIcon(result.secondaryRole)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isAr ? secondaryDef.arabicName : secondaryDef.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{secondaryDef.tagline}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-200">
              {isAr ? 'قيمة الدعم والتدريب المتبادل:' : 'Cross-Training & Support Value:'}
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isAr
                ? 'يوفر قدرة دعم إضافية عند حاجة القسم أو الطابق لمتطوعين إضافيين أثناء التمارين أو الطوارئ الحقيقية.'
                : 'Provides essential support and backup capacity when your department or floor requires additional volunteer hands during drills or real disruptions.'}
            </p>
          </div>
        </div>

        {/* Third Role Capability */}
        <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-xs uppercase font-mono font-bold text-amber-400/90 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              {isAr ? 'القدرة التطوعية الثالثة' : 'Third Volunteer Capability'}
            </span>
            <span className="text-xl font-mono font-bold text-amber-400/90">{result.tertiaryRoleScore}%</span>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              {getRoleIcon(result.tertiaryRole)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isAr ? tertiaryDef.arabicName : tertiaryDef.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{tertiaryDef.tagline}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-200">
              {isAr ? 'المرونة في حالات الطوارئ:' : 'Emergency Agility:'}
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isAr
                ? 'يمنحك قدرة إضافية للتدخل السريع والتنسيق التكاملي في سيناريوهات الطوارئ المركبة.'
                : 'Expands your situational awareness and provides secondary operational capabilities during multi-phase incident response.'}
            </p>
          </div>
        </div>
      </div>

      {/* 25-Question Audit Matrix Toggle */}
      <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6">
        <button
          type="button"
          onClick={() => setShowDetailedAudit(!showDetailedAudit)}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-200 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            {isAr ? 'عرض مصفوفة إجابات الـ 25 سؤالاً السيكومترية' : 'View 25-Question Situational Audit Matrix'}
          </span>
          {showDetailedAudit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetailedAudit && (
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ASSESSMENT_QUESTIONS.map((q) => {
                const answer = result.answers[q.id];
                return (
                  <div key={q.id} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <span className="font-mono text-slate-400">Q{q.id}:</span>
                    <span className="font-mono font-bold text-amber-400">Opt {answer || '-'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
