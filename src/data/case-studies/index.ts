import { CaseStudy } from '@/types/case-study';

import { caseStudy1 } from './case-study-1-rural-health';
import { caseStudy2 } from './case-study-2-enterprise-rcm';
import { caseStudy3 } from './case-study-3-physical-therapy';
import { caseStudy4 } from './case-study-4-behavioral-health';
import { caseStudy5 } from './case-study-5-emergency-department';
import { caseStudy6 } from './case-study-6-multi-specialty';

export {
  caseStudy1,
  caseStudy2,
  caseStudy3,
  caseStudy4,
  caseStudy5,
  caseStudy6,
};

export const CASE_STUDIES: CaseStudy[] = [
  caseStudy1,
  caseStudy2,
  caseStudy3,
  caseStudy4,
  caseStudy5,
  caseStudy6,
];

/**
 * Get all available case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

/**
 * Get a specific case study by slug or alias
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(
    (study) => study.slug === slug || study.aliases?.includes(slug)
  );
}

/**
 * Get related case studies excluding the current one
 */
export function getRelatedCaseStudies(currentSlug: string, count = 3): CaseStudy[] {
  return CASE_STUDIES.filter(
    (study) => study.slug !== currentSlug && !study.aliases?.includes(currentSlug)
  ).slice(0, count);
}
