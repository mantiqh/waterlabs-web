import type { Metadata } from 'next';

import ClaimSubmissionPage from '@/components/solutions/claim-submission-and-scrubbing/page';
import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('claim-submission-and-scrubbing');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Claim Submission and Scrubbing | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Claims that go out clean the first time. Our agents review each claim against payer rules before submission.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('claim-submission-and-scrubbing');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <ClaimSubmissionPage />;
}
