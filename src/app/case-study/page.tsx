import type { Metadata } from 'next';
import React from 'react';

import CaseStudyContent from '@/components/case-study/case-study-content';
import CaseStudyCTA from '@/components/case-study/case-study-cta';
import CaseStudyHero from '@/components/case-study/case-study-hero';
import CaseStudyRelated, { RelatedCaseItem } from '@/components/case-study/case-study-related';
import { CASE_STUDIES } from '@/data/case-studies';
import { fetchAllCaseStudies, fetchRelatedCaseStudies } from '@/sanity/lib/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies | Waterlabs AI',
  description:
    'Explore real-world results and case studies from health systems and enterprise RCM teams using Waterlabs.',
};

export const revalidate = 60;

export default async function CaseStudiesIndexPage() {
  const allStudies = await fetchAllCaseStudies();
  const primaryStudy = allStudies[0] || CASE_STUDIES[0];

  let relatedCases: RelatedCaseItem[] = [];

  if (primaryStudy.relatedCases && primaryStudy.relatedCases.length > 0) {
    relatedCases = primaryStudy.relatedCases.map((item, idx) => ({
      id: item.id || item.slug || `related-${idx}`,
      title: item.title,
      image: item.image || item.heroImage || '/images/case-study/common/Frame%202147203302.png',
      href: item.href || (item.slug ? `/case-study/${item.slug}` : '#'),
      isShorter: idx === 1,
    }));
  } else {
    const relatedStudies = await fetchRelatedCaseStudies(primaryStudy.slug, 3);
    relatedCases = relatedStudies.map((study, idx) => ({
      id: study.id,
      title: study.title,
      image: study.heroImage,
      href: `/case-study/${study.slug}`,
      isShorter: idx === 1,
    }));
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <CaseStudyHero caseStudy={primaryStudy} />
      <CaseStudyContent caseStudy={primaryStudy} />
      <CaseStudyRelated
        heading={primaryStudy.relatedCasesHeading}
        relatedCases={relatedCases}
      />
      <CaseStudyCTA {...primaryStudy.cta} />
    </div>
  );
}

