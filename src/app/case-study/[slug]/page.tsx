import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import CaseStudyContent from '@/components/case-study/case-study-content';
import CaseStudyCTA from '@/components/case-study/case-study-cta';
import CaseStudyHero from '@/components/case-study/case-study-hero';
import CaseStudyRelated, { RelatedCaseItem } from '@/components/case-study/case-study-related';
import {
  fetchAllCaseStudySlugs,
  fetchCaseStudyBySlug,
  fetchRelatedCaseStudies,
} from '@/sanity/lib/case-studies';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return fetchAllCaseStudySlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Waterlabs AI',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: `${caseStudy.title} | Waterlabs AI`,
    description: caseStudy.subtitle,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Resolve related cases: use curated ones from CMS if configured, otherwise fallback to automatic 3 case studies
  let relatedCases: RelatedCaseItem[] = [];

  if (caseStudy.relatedCases && caseStudy.relatedCases.length > 0) {
    relatedCases = caseStudy.relatedCases.map((item, idx) => ({
      id: item.id || item.slug || `related-${idx}`,
      title: item.title,
      image: item.image || item.heroImage || '/images/case-study/common/Frame%202147203302.png',
      href: item.href || (item.slug ? `/case-study/${item.slug}` : '#'),
      isShorter: idx === 1,
    }));
  } else {
    const relatedStudies = await fetchRelatedCaseStudies(caseStudy.slug, 3);
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
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyContent caseStudy={caseStudy} />
      <CaseStudyRelated
        heading={caseStudy.relatedCasesHeading}
        relatedCases={relatedCases}
      />
      <CaseStudyCTA {...caseStudy.cta} />
    </div>
  );
}

