import React, { useState } from 'react';
import { 
  Award, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Stethoscope, 
  DoorOpen, 
  Radio, 
  FileCheck, 
  KeyRound,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { StudentProfile } from '../types/assessment';
import { PasscodeModal } from './PasscodeModal';

interface SplashScreenProps {
  onStart: (profile: StudentProfile) => void;
  onQuickFillDemo: (profile: StudentProfile) => void;
  lang: 'en' | 'ar';
}

const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const MONTH_OPTIONS_EN = [
  { value: '01', label: '01 - Jan' },
  { value: '02', label: '02 - Feb' },
  { value: '03', label: '03 - Mar' },
  { value: '04', label: '04 - Apr' },
  { value: '05', label: '05 - May' },
  { value: '06', label: '06 - Jun' },
  { value: '07', label: '07 - Jul' },
  { value: '08', label: '08 - Aug' },
  { value: '09', label: '09 - Sep' },
  { value: '10', label: '10 - Oct' },
  { value: '11', label: '11 - Nov' },
  { value: '12', label: '12 - Dec' },
];

const MONTH_OPTIONS_AR = [
  { value: '01', label: '01 - يناير' },
  { value: '02', label: '02 - فبراير' },
  { value: '03', label: '03 - مارس' },
  { value: '04', label: '04 - أبريل' },
  { value: '05', label: '05 - مايو' },
  { value: '06', label: '06 - يونيو' },
  { value: '07', label: '07 - يوليو' },
  { value: '08', label: '08 - أغسطس' },
  { value: '09', label: '09 - سبتمبر' },
  { value: '10', label: '10 - أكتوبر' },
  { value: '11', label: '11 - نوفمبر' },
  { value: '12', label: '12 - ديسمبر' },
];

const YEAR_OPTIONS = [
  { value: '25', label: "'25 (2025)" },
  { value: '26', label: "'26 (2026)" },
  { value: '27', label: "'27 (2027)" },
  { value: '28', label: "'28 (2028)" },
  { value: '29', label: "'29 (2029)" },
  { value: '30', label: "'30 (2030)" },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onQuickFillDemo, lang }) => {
  const now = new Date();
  const defaultDay = String(now.getDate()).padStart(2, '0');
  const defaultMonth = String(now.getMonth() + 1).padStart(2, '0');
  const defaultYear = String(now.getFullYear()).slice(-2);

  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [courseDay, setCourseDay] = useState(defaultDay);
  const [courseMonth, setCourseMonth] = useState(defaultMonth);
  const [courseYear, setCourseYear] = useState(defaultYear);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);

  const courseDate = `${courseDay}/${courseMonth}/${courseYear}`;
  const isFormValid = fullName.trim().length > 0 && employeeId.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onStart({
      name: fullName.trim(),
      studentId: employeeId.trim(),
      courseDate,
      cohort: courseDate,
      assessorName: 'KSIA ERT Lead Evaluator',
    });
  };

  const handlePasscodeSuccess = () => {
    setIsPasscodeOpen(false);
    const demoProfile: StudentProfile = {
      name: fullName.trim() || 'Faisal Al-Otaibi',
      studentId: employeeId.trim() || 'KSIA-7419',
      courseDate,
      cohort: courseDate,
      assessorName: 'Capt. Tariq Al-Ghamdi (Lead Instructor)',
    };
    onQuickFillDemo(demoProfile);
  };

  const isAr = lang === 'ar';
  const monthOptions = isAr ? MONTH_OPTIONS_AR : MONTH_OPTIONS_EN;

  return (
    <div className={`min-h-[calc(100vh-80px)] flex items-center justify-center py-6 px-4 ${isAr ? 'font-arabic' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <PasscodeModal
        isOpen={isPasscodeOpen}
        onClose={() => setIsPasscodeOpen(false)}
        onSuccess={handlePasscodeSuccess}
      />

      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Title & Emblem Card */}
        <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

          {/* Badge & Official Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            {isAr ? 'مطار الملك سلمان الدولي' : 'King Salman International Airport'}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            {isAr 
              ? 'تقييم الفرق التطوعية' 
              : 'Volunteer Brigade Assessment'}
          </h1>

          {isAr ? (
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              تقييم سيكومتري تمهيدي مكون من 25 سؤالاً مصمم خصيصاً لموظفي <strong className="text-white">مطار الملك سلمان الدولي</strong> لاكتشاف القدرات الطبيعية والميول السلوكية عند حدوث طوارئ غير متوقعة في بيئة العمل لتحديد الدور التطوعي الأنسب: <strong className="text-white">إخماد ومكافحة الحرائق</strong>، <strong className="text-white">رعاية المصابين والإسعاف</strong>، <strong className="text-white">دعم الإخلاء</strong>، أو <strong className="text-white">التنسيق مع الجهات الخارجية</strong>.
            </p>
          ) : (
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              An introductory 25-question assessment designed specifically for <strong className="text-white">KSIA Administrative Personnel</strong>. Discover your natural instincts and behavioral abilities when stepping up in unexpected workplace disruptions to identify your ideal volunteer brigade fit: <strong className="text-white">Fire Suppression</strong>, <strong className="text-white">Casualty Care</strong>, <strong className="text-white">Evacuation Support</strong>, or <strong className="text-white">External Agency Liaison</strong>.
            </p>
          )}

          {/* 4 Roles Showcase Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-8 text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Flame className="w-4 h-4 text-rose-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">
                {isAr ? 'إخماد ومكافحة الحرائق' : 'Fire Suppression'}
              </div>
              <div className="text-[9px] text-rose-300">
                {isAr ? 'عزل المخاطر وإخماد الحرائق' : 'Primary Fire & Hazard Response'}
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Stethoscope className="w-4 h-4 text-emerald-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">
                {isAr ? 'رعاية المصابين والإسعاف' : 'Casualty Care'}
              </div>
              <div className="text-[9px] text-emerald-300">
                {isAr ? 'الإسعافات الأولية والرعاية' : 'Compassionate Initial Care'}
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <DoorOpen className="w-4 h-4 text-blue-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">
                {isAr ? 'دعم الإخلاء' : 'Evacuation Support'}
              </div>
              <div className="text-[9px] text-blue-300">
                {isAr ? 'إخلاء وتنظيم تدفق الموظفين' : 'Orderly Floor Movement'}
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <Radio className="w-4 h-4 text-purple-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white leading-tight">
                {isAr ? 'التنسيق مع الجهات الخارجية' : 'External Agency Liaison'}
              </div>
              <div className="text-[9px] text-purple-300">
                {isAr ? 'الاتصال والربط الميداني' : 'Reporting & Liaison'}
              </div>
            </div>
          </div>

          {/* Cadet Intake Form */}
          <div className="max-w-xl mx-auto bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-left shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider font-mono font-bold text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {isAr ? 'بيانات الموظف المشارك' : 'Staff Member Credentials'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {isAr ? 'المرحلة 1 من 2' : 'STEP 1 OF 2'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {isAr ? 'اسم الموظف الكامل' : 'Student Full Name'} <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'مثال: فيصل العتيبي' : 'e.g. Faisal Al-Otaibi'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {isAr ? 'الرقم الوظيفي' : 'Employee ID number'} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder={isAr ? 'مثال: KSIA-7419' : 'e.g. KSIA-7419'}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {isAr ? 'تاريخ الدورة' : 'Course date'} <span className="text-amber-400/80 font-mono text-[10px]">({courseDate})</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <select
                        value={courseDay}
                        onChange={(e) => setCourseDay(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title={isAr ? 'اليوم' : 'Day'}
                      >
                        {DAY_OPTIONS.map((d) => (
                          <option key={d} value={d} className="bg-slate-900 text-white">
                            {d}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">
                        {isAr ? 'اليوم' : 'Day'}
                      </span>
                    </div>

                    <div>
                      <select
                        value={courseMonth}
                        onChange={(e) => setCourseMonth(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title={isAr ? 'الشهر' : 'Month'}
                      >
                        {monthOptions.map((m) => (
                          <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">
                        {isAr ? 'الشهر' : 'Month'}
                      </span>
                    </div>

                    <div>
                      <select
                        value={courseYear}
                        onChange={(e) => setCourseYear(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono cursor-pointer"
                        title={isAr ? 'السنة' : 'Year'}
                      >
                        {YEAR_OPTIONS.map((y) => (
                          <option key={y.value} value={y.value} className="bg-slate-900 text-white">
                            {y.label}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[9px] uppercase font-mono text-slate-500 text-center mt-1">
                        {isAr ? 'السنة' : 'Year'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {isAr ? 'بدء تقييم الـ 25 سؤالاً' : 'Start 25-Question Assessment'}
                  <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {isAr ? 'يولد ملف تقرير رسمي (PDF) فور إتمام التقييم' : 'Generates official signed 3-page PDF dossier upon completion'}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPasscodeOpen(true)}
                    className="p-1.5 text-slate-600 hover:text-amber-400 rounded-lg hover:bg-slate-900 transition-colors"
                    aria-label="Authorization"
                  >
                    <KeyRound className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 font-mono font-bold text-sm">
              25Q
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {isAr ? 'اكتشاف سيكومتري دقيق' : 'Psychometric Discovery'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr 
                ? 'مواقف عملية واقعية تقيس ردود الفعل الطبيعية دون إيحاءات مسبقة.' 
                : 'Carefully calibrated situational dilemmas measuring natural instincts, stress response, and personal abilities without giveaway cues.'}
            </p>
          </div>

          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {isAr ? 'تحديد ملائمة ثلاثية الأدوار' : 'Triple-Role Placement'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr 
                ? 'يحدد الدور الأساسي والثانوي والثالث لمرونة عالية في حالات الطوارئ.' 
                : 'Accurately determines your Primary Role, Secondary Role, and Third Role Capability for maximum airport crisis flexibility.'}
            </p>
          </div>

          <div className="bg-[#0a0f1a] border border-slate-800 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {isAr ? 'تقرير رسمي بصيغة PDF' : 'Official PDF Dossier'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr 
                ? 'تقرير تقييم قابل للتحميل مع تذكير بالمشاركة اليدوية في مجموعة واتساب.' 
                : 'Mandatory downloadable evaluation dossier with reminder to manually share into your course WhatsApp group.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
