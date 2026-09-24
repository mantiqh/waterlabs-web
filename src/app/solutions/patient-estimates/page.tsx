import type { Metadata } from 'next';

import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import PatientEstimatesPage from '@/components/solutions/patient-estimates/page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('patient-estimates');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Patient Estimates | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Every patient knows what they owe before they arrive. Our agents generate a benefits-adjusted estimate.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('patient-estimates');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <PatientEstimatesPage />;
}
