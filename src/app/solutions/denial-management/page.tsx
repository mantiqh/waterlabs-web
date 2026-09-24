import type { Metadata } from 'next';

import DenialManagementPage from '@/components/solutions/denial-management/page';
import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('denial-management');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Denial Management | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Denials worked the day they land. Our agents read the denial, identify the cause, build the appeal, and file it.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('denial-management');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <DenialManagementPage />;
}
