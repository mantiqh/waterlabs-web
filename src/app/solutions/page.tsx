import type { Metadata } from 'next';

import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import SolutionsPage from '@/components/solutions/page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('eligibility-and-benefits-verification');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Eligibility & Benefits Verification | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Every patient verified before they arrive. Our agents check coverage, benefits, and patient responsibility ahead of the visit.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('eligibility-and-benefits-verification');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <SolutionsPage />;
}
