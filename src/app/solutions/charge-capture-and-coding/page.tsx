import type { Metadata } from 'next';

import ChargeCapturePage from '@/components/solutions/charge-capture-and-coding/page';
import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('charge-capture-and-coding');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Charge Capture and Coding | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Every charge captured. Every code supported. Our agents read the documentation, assign the codes, and check them against payer rules.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('charge-capture-and-coding');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <ChargeCapturePage />;
}
