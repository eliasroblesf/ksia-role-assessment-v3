import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../types/assessment';
import { BRIGADE_ROLES } from '../data/assessmentQuestions';

export function generateAssessmentPdf(result: AssessmentResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const primaryDef = BRIGADE_ROLES[result.primaryRole];
  const secondaryDef = BRIGADE_ROLES[result.secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[result.tertiaryRole];

  // Colors
  const gold = [196, 155, 109]; // #C49B6D
  const darkNavy = [10, 15, 26]; // #0A0F1A
  const slateText = [51, 65, 85];
  const mutedText = [100, 116, 139];
  const emerald = [16, 185, 129];
  const borderGrey = [226, 232, 240];

  const drawHeader = (pageNumber: number, totalPages: number) => {
    // Header dark bar
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pageWidth, 22, 'F');

    // Gold accent stripe
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(0, 22, pageWidth, 1.5, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('KING SALMAN INTERNATIONAL AIRPORT (KSIA)', margin, 10);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 225);
    doc.text('EMERGENCY RESPONSE TEAM (ERT) | VOLUNTEER BRIGADE ASSESSMENT', margin, 16);

    // Document ID / Ref on right
    doc.setFontSize(7);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('DOC REF: KSIA-ERT-2026', pageWidth - margin, 10, { align: 'right' });
    doc.setTextColor(200, 210, 225);
    doc.text(`DATE: ${new Date(result.completedAt).toLocaleDateString()} | VOLUNTEER ASSESSMENT`, pageWidth - margin, 16, { align: 'right' });

    // Footer
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text('CONFIDENTIAL - KSIA CRISIS READINESS & VOLUNTEER BRIGADE ASSESSMENT', margin, pageHeight - 8);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: Executive Profile & Role Placements
  // ==========================================
  drawHeader(1, 3);

  let y = 29;

  // Title block
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('VOLUNTEER BRIGADE ASSESSMENT DOSSIER', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('25-Item Psychometric Discovery & Natural Aptitude Fit for Volunteer Brigade Roles', margin, y);
  y += 6;

  // Candidate Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 23, 2, 2, 'FD');

  const metaY = y + 5.5;
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('EMPLOYEE NAME:', margin + 4, metaY);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.name || 'KSIA Staff', margin + 35, metaY);

  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE ID NUMBER:', margin + 95, metaY);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.studentId || 'N/A', margin + 136, metaY);

  const metaY2 = y + 12;
  doc.setFont('helvetica', 'bold');
  doc.text('COURSE DATE:', margin + 4, metaY2);
  doc.setFont('helvetica', 'normal');
  doc.text(result.student.courseDate || result.student.cohort || 'DD/MM/YY', margin + 35, metaY2);

  doc.setFont('helvetica', 'bold');
  doc.text('EVALUATION TIME:', margin + 95, metaY2);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(result.completedAt).toLocaleTimeString(), margin + 130, metaY2);

  const metaY3 = y + 18;
  doc.setFont('helvetica', 'bold');
  doc.text('ITEMS COMPLETED:', margin + 4, metaY3);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.totalAnswered} of 25 Psychometric Items`, margin + 36, metaY3);

  doc.setFont('helvetica', 'bold');
  doc.text('CLASSIFICATION STATUS:', margin + 95, metaY3);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('VERIFIED FOR VOLUNTEER BRIGADE FIT', margin + 135, metaY3);

  y += 26;

  // MANDATORY WHATSAPP SUBMISSION BANNER (Official Callout Box)
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.setDrawColor(34, 197, 94); // emerald-500
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(21, 128, 61); // emerald-700
  doc.text('[MANDATORY INSTRUCTION] MANUALLY SHARE REPORT TO CLASS WHATSAPP GROUP', margin + 4, y + 4.5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(22, 101, 52); // emerald-800
  doc.text('Please manually send this downloaded official PDF report to your training cohort WhatsApp chat for instructor records.', margin + 4, y + 8.8);

  y += 15;

  // PRIMARY ROLE HERO CARD
  doc.setFillColor(254, 252, 246); // Warm gold tint
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, contentWidth, 47, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin + 4, y + 4, 52, 5.5, 1, 1, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PRIMARY VOLUNTEER FIT', margin + 6, y + 8);

  // Score Pill on Right
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(pageWidth - margin - 38, y + 4, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`MATCH: ${result.primaryRoleScore}%`, pageWidth - margin - 21, y + 8.5, { align: 'center' });

  // Role Name
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(primaryDef.name, margin + 4, y + 15.5);

  // Tagline
  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(primaryDef.tagline, margin + 4, y + 20.5);

  // Profile text
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const primaryBio = doc.splitTextToSize(primaryDef.idealPersonality, contentWidth - 8);
  doc.text(primaryBio, margin + 4, y + 25.5);

  // Key Responsibilities bulleted
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('Core Volunteer Responsibilities:', margin + 4, y + 33.5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.7);
  primaryDef.operationalDuties.slice(0, 3).forEach((duty, idx) => {
    doc.text(`• ${duty}`, margin + 6, y + 38 + idx * 3.5);
  });

  y += 51;

  // SECONDARY ROLE CARD
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 33, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(71, 85, 105);
  doc.roundedRect(margin + 4, y + 3.5, 54, 5.5, 1, 1, 'F');
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SECONDARY / CROSS-TRAIN FIT', margin + 6, y + 7.4);

  // Score Pill on Right
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(pageWidth - margin - 38, y + 3.5, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(`MATCH: ${result.secondaryRoleScore}%`, pageWidth - margin - 21, y + 8, { align: 'center' });

  // Secondary Role Name
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(secondaryDef.name, margin + 4, y + 14.5);

  // Tagline
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(secondaryDef.tagline, margin + 4, y + 19);

  // Secondary summary
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const secondaryBio = doc.splitTextToSize(secondaryDef.idealPersonality, contentWidth - 8);
  doc.text(secondaryBio, margin + 4, y + 23.5);

  // Cross functional benefit
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.text('Support & Backup Value:', margin + 4, y + 29.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Provides valuable secondary assistance when your floor requires extra volunteer hands during drills or events.`, margin + 37, y + 29.5);

  y += 37;

  // THIRD ROLE CAPABILITY CARD
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 33, 2, 2, 'FD');

  // Badge Tag
  doc.setFillColor(30, 58, 138); // Blue
  doc.roundedRect(margin + 4, y + 3.5, 50, 5.5, 1, 1, 'F');
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('THIRD BRIGADE CAPABILITY', margin + 6, y + 7.4);

  // Score Pill on Right
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(pageWidth - margin - 38, y + 3.5, 34, 6.5, 1, 1, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(`MATCH: ${result.tertiaryRoleScore}%`, pageWidth - margin - 21, y + 8, { align: 'center' });

  // Tertiary Role Name
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(tertiaryDef.name, margin + 4, y + 14.5);

  // Tagline
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text(tertiaryDef.tagline, margin + 4, y + 19);

  // Tertiary summary
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  const tertiaryBio = doc.splitTextToSize(tertiaryDef.idealPersonality, contentWidth - 8);
  doc.text(tertiaryBio, margin + 4, y + 23.5);

  // Auxiliary readiness benefit
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.text('Auxiliary Adaptability:', margin + 4, y + 29.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Demonstrates personal flexibility to step up across departments whenever unexpected situations arise.`, margin + 35, y + 29.5);

  // ==========================================
  // PAGE 2: Tactical Matrix & Core Competencies
  // ==========================================
  doc.addPage();
  drawHeader(2, 3);
  y = 30;

  // Title: 4 Brigade Roles
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('4-ROLE VOLUNTEER BRIGADE COMPATIBILITY MATRIX', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Compatibility distribution across the 4 King Salman International Airport emergency volunteer brigade paths:', margin, y);
  y += 7;

  // 4 Roles Bar Charts
  const rolesList: (keyof typeof BRIGADE_ROLES)[] = [
    'suppressionLead',
    'casualtyCareLead',
    'evacuationSupportLead',
    'externalLiaison',
  ];

  rolesList.forEach((key) => {
    const roleDef = BRIGADE_ROLES[key];
    const scoreObj = result.allRoleScores[key];
    const pct = scoreObj ? scoreObj.percentage : 0;
    const isPrimary = key === result.primaryRole;
    const isSecondary = key === result.secondaryRole;
    const isTertiary = key === result.tertiaryRole;

    // Role row container
    doc.setFillColor(isPrimary ? 254 : (isSecondary ? 248 : (isTertiary ? 245 : 255)), isPrimary ? 250 : 250, isPrimary ? 240 : 252);
    doc.setDrawColor(isPrimary ? gold[0] : borderGrey[0], isPrimary ? gold[1] : borderGrey[1], isPrimary ? gold[2] : borderGrey[2]);
    doc.roundedRect(margin, y, contentWidth, 12, 1, 1, 'FD');

    // Role name + badges
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(roleDef.name, margin + 4, y + 5);

    if (isPrimary) {
      doc.setFillColor(gold[0], gold[1], gold[2]);
      doc.roundedRect(margin + 80, y + 1.8, 22, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('PRIMARY FIT', margin + 82, y + 5);
    } else if (isSecondary) {
      doc.setFillColor(100, 116, 139);
      doc.roundedRect(margin + 80, y + 1.8, 26, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('SECONDARY FIT', margin + 82, y + 5);
    } else if (isTertiary) {
      doc.setFillColor(30, 58, 138);
      doc.roundedRect(margin + 80, y + 1.8, 26, 4.5, 1, 1, 'F');
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('3RD CAPABILITY', margin + 81.5, y + 5);
    }

    // Bar background
    const barX = margin + 110;
    const barWidth = 50;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, y + 4, barWidth, 4, 1, 1, 'F');

    // Filled bar
    if (pct > 0) {
      if (isPrimary) doc.setFillColor(gold[0], gold[1], gold[2]);
      else if (isSecondary) doc.setFillColor(71, 85, 105);
      else if (isTertiary) doc.setFillColor(37, 99, 235);
      else doc.setFillColor(148, 163, 184);

      doc.roundedRect(barX, y + 4, (barWidth * pct) / 100, 4, 1, 1, 'F');
    }

    // Percentage text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${pct}%`, margin + 165, y + 7.5);

    // Standard subtitle
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text(roleDef.standards[0], margin + 4, y + 9.5);

    y += 14;
  });

  y += 4;

  // 5 CORE BEHAVIORAL COMPETENCIES
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('PSYCHOMETRIC & CRISIS APTITUDE PROFILE', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Evaluation of behavioral capabilities tested across 25 situational discovery dilemmas:', margin, y);
  y += 8;

  const competenciesList = [
    { key: 'decisiveness', label: 'Decisiveness & Rapid Action', desc: 'Ability to establish rapid personal focus without hesitation during office alerts' },
    { key: 'physicalReadiness', label: 'Practical & Physical Initiative', desc: 'Readiness to take hands-on action, isolate hazards, and clear pathways' },
    { key: 'traumaComposure', label: 'Composure Around Injury & Human Care', desc: 'Calmness near distress, soothing anxious colleagues, and basic first aid care' },
    { key: 'crowdControl', label: 'Floor Guidance & Orderly Movement', desc: 'Directing panic-free evacuation and systematic floor room checks' },
    { key: 'communicationProtocol', label: 'Communication Clarity & Reporting', desc: 'Clear reporting, sharing verified facts, and maintaining attendance logs' },
  ] as const;

  competenciesList.forEach((comp) => {
    const compScore = result.competencies[comp.key];
    const pct = compScore ? compScore.percentage : 0;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.roundedRect(margin, y, contentWidth, 11, 1, 1, 'FD');

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(comp.label, margin + 4, y + 4.5);

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text(comp.desc, margin + 4, y + 8.5);

    // Bar background
    const barX = margin + 115;
    const barWidth = 45;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, y + 3.5, barWidth, 4, 1, 1, 'F');

    // Filled bar with color code
    if (pct >= 70) doc.setFillColor(emerald[0], emerald[1], emerald[2]);
    else if (pct >= 50) doc.setFillColor(gold[0], gold[1], gold[2]);
    else doc.setFillColor(239, 68, 68);

    doc.roundedRect(barX, y + 3.5, (barWidth * pct) / 100, 4, 1, 1, 'F');

    // Percentage
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(`${pct}%`, margin + 165, y + 7);

    y += 13;
  });

  y += 5;

  // TWO COLUMN BOXES: Tactical Strengths & Growth Areas
  const colWidth = (contentWidth - 6) / 2;

  // Left: Key Strengths
  doc.setFillColor(240, 253, 244); // light green
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, colWidth, 48, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 120, 75);
  doc.text('Observed Behavioral Strengths:', margin + 4, y + 6);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  let strY = y + 11;
  const strengthsToPrint = result.strengths && result.strengths.length > 0
    ? result.strengths.slice(0, 3)
    : [
        `Natural Volunteer Specialty: High intrinsic alignment with ${primaryDef.name}.`,
        'Operational Composure: Demonstrates steady judgment and readiness to step up.',
        'Team Alignment: Clear collaborative communication and support for coworkers.'
      ];

  strengthsToPrint.forEach((str) => {
    const lines = doc.splitTextToSize(`• ${str}`, colWidth - 8);
    doc.text(lines, margin + 4, strY);
    strY += lines.length * 3.3 + 1;
  });

  // Right: Growth Areas
  const rightX = margin + colWidth + 6;
  doc.setFillColor(254, 242, 242); // light red/amber
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightX, y, colWidth, 48, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('Recommended Introductory Training:', rightX + 4, y + 6);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  let devY = y + 11;
  const devToPrint = result.developmentAreas && result.developmentAreas.length > 0
    ? result.developmentAreas.slice(0, 3)
    : [
        'Introductory Workplace Safety: Participate in practical emergency drills.',
        'Basic First Aid & Life Support: Learn core CPR and personal care techniques.',
        `Targeted Brigade Foundation: Complete intro course in ${primaryDef.recommendedTrainingPath[0]}.`
      ];

  devToPrint.forEach((dev) => {
    const lines = doc.splitTextToSize(`• ${dev}`, colWidth - 8);
    doc.text(lines, rightX + 4, devY);
    devY += lines.length * 3.3 + 1;
  });

  // ==========================================
  // PAGE 3: 25-Question Audit & Official Sign-Off
  // ==========================================
  doc.addPage();
  drawHeader(3, 3);
  y = 30;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('25-ITEM PSYCHOMETRIC AUDIT & VERIFICATION', margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Candidate situational selections recorded during unprompted self-discovery flow:', margin, y);
  y += 8;

  // 25 Questions Response Grid (5 rows of 5 items)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 54, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('PSYCHOMETRIC SITUATIONAL RESPONSE AUDIT MATRIX (Q1 - Q25)', margin + 4, y + 5);

  const cellW = (contentWidth - 12) / 5;
  const cellH = 8.5;
  const startGridY = y + 8;

  for (let i = 0; i < 25; i++) {
    const qNum = i + 1;
    const row = Math.floor(i / 5);
    const col = i % 5;
    const cX = margin + 4 + col * (cellW + 1);
    const cY = startGridY + row * (cellH + 0.8);

    const chosen = result.answers[qNum];

    doc.setFillColor(chosen ? 255 : 241, chosen ? 255 : 245, chosen ? 255 : 249);
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.roundedRect(cX, cY, cellW, cellH, 1, 1, 'FD');

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.text(`Item ${qNum}:`, cX + 2, cY + 5.5);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    if (chosen) {
      doc.setTextColor(gold[0], gold[1], gold[2]);
      doc.text(`Opt ${chosen}`, cX + cellW - 12, cY + 5.5);
    } else {
      doc.setTextColor(180, 180, 180);
      doc.text('-', cX + cellW - 6, cY + 5.5);
    }
  }

  y += 60;

  // WHATSAPP SUBMISSION CERTIFICATION CALLOUT BOX
  doc.setFillColor(240, 253, 244); // light emerald
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(0.7);
  doc.roundedRect(margin, y, contentWidth, 17, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(21, 128, 61);
  doc.text('OFFICIAL WHATSAPP GROUP SUBMISSION REQUIREMENT:', margin + 4, y + 5.5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(22, 101, 52);
  doc.text('The candidate is required to manually transmit this completed PDF document directly to their course WhatsApp group.', margin + 4, y + 10);
  doc.text('Submission timestamp and Employee ID verification will be logged into the KSIA administrative volunteer roster.', margin + 4, y + 14);

  y += 22;

  // RECOMMENDED INTRODUCTORY TRAINING PATHWAY
  doc.setFillColor(254, 252, 246);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin, y, contentWidth, 23, 2, 2, 'FD');

  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('OFFICIAL KSIA VOLUNTEER BRIGADE TRAINING RECOMMENDATIONS', margin + 4, y + 5);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  primaryDef.recommendedTrainingPath.forEach((path, i) => {
    doc.text(`[Course ${i + 1}]  ${path}`, margin + 6, y + 10 + i * 4);
  });

    // Trigger download
  const cleanName = (result.student.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`KSIA_ERT_Assessment_${cleanName}.pdf`);
}
