import { 
  ASSESSMENT_QUESTIONS, 
  RoleScores, 
  CompetencyScores, 
  BRIGADE_ROLES 
} from '../data/assessmentQuestions';
import { StudentProfile, AssessmentResult } from '../types/assessment';

export function calculateAssessmentResult(
  student: StudentProfile,
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>
): AssessmentResult {
  const roleRaw: RoleScores = {
    suppressionLead: 0,
    casualtyCareLead: 0,
    evacuationSupportLead: 0,
    externalLiaison: 0,
  };

  const compRaw: CompetencyScores = {
    decisiveness: 0,
    physicalReadiness: 0,
    traumaComposure: 0,
    crowdControl: 0,
    communicationProtocol: 0,
  };

  let totalAnswered = 0;

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const chosenOptionId = answers[q.id];
    if (!chosenOptionId) return;

    totalAnswered++;
    const chosenOption = q.options.find((o) => o.id === chosenOptionId);
    if (!chosenOption) return;

    // Accumulate role points
    if (chosenOption.roleWeights) {
      Object.entries(chosenOption.roleWeights).forEach(([role, weight]) => {
        if (role in roleRaw) {
          const key = role as keyof RoleScores;
          roleRaw[key] = (roleRaw[key] || 0) + (weight || 0);
        }
      });
    }

    // Accumulate competency points
    if (chosenOption.competencies) {
      Object.entries(chosenOption.competencies).forEach(([comp, weight]) => {
        const key = comp as keyof CompetencyScores;
        compRaw[key] = (compRaw[key] || 0) + (weight || 0);
      });
    }
  });

  // Calculate maximum potential raw points to normalize percentages
  // Find highest possible raw score for each role across all questions
  const maxPossibleRole: RoleScores = {
    suppressionLead: 0,
    casualtyCareLead: 0,
    evacuationSupportLead: 0,
    externalLiaison: 0,
  };

  const maxPossibleComp: CompetencyScores = {
    decisiveness: 0,
    physicalReadiness: 0,
    traumaComposure: 0,
    crowdControl: 0,
    communicationProtocol: 0,
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    (Object.keys(maxPossibleRole) as (keyof RoleScores)[]).forEach((role) => {
      const maxInQ = Math.max(0, ...q.options.map((o) => o.roleWeights[role] || 0));
      maxPossibleRole[role] += maxInQ;
    });

    (Object.keys(maxPossibleComp) as (keyof CompetencyScores)[]).forEach((comp) => {
      const maxInQ = Math.max(0, ...q.options.map((o) => o.competencies[comp] || 0));
      maxPossibleComp[comp] += maxInQ;
    });
  });

  // Role percentage computation
  const allRoleScores = {} as Record<keyof RoleScores, { raw: number; percentage: number }>;
  (Object.keys(roleRaw) as (keyof RoleScores)[]).forEach((role) => {
    const raw = Math.max(0, roleRaw[role]);
    const max = maxPossibleRole[role] || 100;
    const percentage = Math.min(100, Math.round((raw / max) * 100));
    allRoleScores[role] = { raw, percentage };
  });

  // Competency percentage computation
  const competencies = {} as Record<keyof CompetencyScores, { raw: number; percentage: number }>;
  (Object.keys(compRaw) as (keyof CompetencyScores)[]).forEach((comp) => {
    const raw = Math.max(0, compRaw[comp]);
    const max = maxPossibleComp[comp] || 100;
    const percentage = Math.min(100, Math.round((raw / max) * 100));
    competencies[comp] = { raw, percentage };
  });

  // Sort roles by percentage descending
  const sortedRoles = (Object.keys(allRoleScores) as (keyof RoleScores)[]).sort(
    (a, b) => allRoleScores[b].percentage - allRoleScores[a].percentage
  );

  const primaryRole = sortedRoles[0];
  const primaryRoleScore = allRoleScores[primaryRole].percentage;

  const secondaryRole = sortedRoles[1];
  const secondaryRoleScore = allRoleScores[secondaryRole].percentage;

  const tertiaryRole = sortedRoles[2];
  const tertiaryRoleScore = allRoleScores[tertiaryRole].percentage;

  const primaryDef = BRIGADE_ROLES[primaryRole];
  const secondaryDef = BRIGADE_ROLES[secondaryRole];
  const tertiaryDef = BRIGADE_ROLES[tertiaryRole];

  // Determine tactical strengths based on highest-scoring competencies and primary role profile
  const strengths: string[] = [];
  const developmentAreas: string[] = [];

  const competencyStrengthMap: Record<keyof CompetencyScores, string> = {
    decisiveness: 'Decisiveness & Rapid Action: Clear, fast personal commitment to take sensible action during office alerts.',
    physicalReadiness: 'Practical & Physical Initiative: Hands-on confidence to isolate hazards, clear obstructions, and check physical safety.',
    traumaComposure: 'Composure Around Injury & Human Care: Calm presence near distress, comforting shocked colleagues, and applying basic first aid.',
    crowdControl: 'Floor Guidance & Orderly Movement: Confident vocal direction, stairwell guiding, and systematic office sweeps.',
    communicationProtocol: 'Communication Clarity & Reporting: Concise, accurate information sharing, verifying facts, and keeping attendance logs.',
  };

  const competencyDevelopmentMap: Record<keyof CompetencyScores, string> = {
    decisiveness: 'Decision-Making Under Pressure: Practice trusting your instincts and taking prompt action without second-guessing.',
    physicalReadiness: 'Workplace Hazard Familiarity: Practice identifying electrical and fire risks during building safety walk-throughs.',
    traumaComposure: 'Basic First Aid & CPR Orientation: Build confidence in foundational CPR and personal care techniques.',
    crowdControl: 'Floor Marshalling Techniques: Practice guiding colleague movement and preventing doorway bottlenecks in drills.',
    communicationProtocol: 'Structured Reporting Protocols: Practice formulating quick, factual emergency updates to facilities and security.',
  };

  // Sort competencies from highest to lowest
  const sortedCompetencies = (Object.keys(competencies) as (keyof CompetencyScores)[]).sort(
    (a, b) => competencies[b].percentage - competencies[a].percentage
  );

  // Guarantee 3 complete, rich tactical strengths
  strengths.push(`Natural Volunteer Specialty (${primaryDef.name}): ${primaryDef.keyTraits[0]} with focus on ${primaryDef.tagline.toLowerCase()}.`);
  strengths.push(competencyStrengthMap[sortedCompetencies[0]]);
  strengths.push(competencyStrengthMap[sortedCompetencies[1]]);

  // Guarantee 3 complete development priorities
  developmentAreas.push(competencyDevelopmentMap[sortedCompetencies[4]]);
  developmentAreas.push(competencyDevelopmentMap[sortedCompetencies[3]]);
  developmentAreas.push(`Introductory Brigade Foundation: Recommended intro workshop in ${primaryDef.recommendedTrainingPath[0]}.`);

  let synergyAnalysis = `Primary volunteer aptitude strongly aligns with ${primaryDef.name} (${primaryRoleScore}%), demonstrating ${primaryDef.tagline.toLowerCase()}.`;

  synergyAnalysis += ` As a complementary secondary profile, candidate demonstrates notable capability in ${secondaryDef.name} (${secondaryRoleScore}%), providing crucial support and backup during building incidents.`;

  synergyAnalysis += ` Furthermore, candidate demonstrates strong Third Role Capability in ${tertiaryDef.name} (${tertiaryRoleScore}%), ensuring versatile personal flexibility and cross-functional support during workplace emergencies.`;

  return {
    student,
    completedAt: new Date().toISOString(),
    answers,
    primaryRole,
    primaryRoleScore,
    secondaryRole,
    secondaryRoleScore,
    tertiaryRole,
    tertiaryRoleScore,
    allRoleScores,
    competencies,
    totalAnswered,
    strengths,
    developmentAreas,
    synergyAnalysis,
  };
}
