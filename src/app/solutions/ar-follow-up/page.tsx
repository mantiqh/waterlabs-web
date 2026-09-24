import type { Metadata } from 'next';

import ARFollowUpPage from '@/components/solutions/ar-follow-up/page';
import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('ar-follow-up');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — AR Follow-up | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Every claim followed up, including the old ones. Our agents work through the entire ledger, checking statuses, chasing payers.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('ar-follow-up');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <ARFollowUpPage />;
}
