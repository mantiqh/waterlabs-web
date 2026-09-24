import type { Metadata } from 'next';

import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import PriorAuthorizationPage from '@/components/solutions/prior-authorization/page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('prior-authorization');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Prior Authorization | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Prior authorization in 24 to 48 hours. Our agents manage every authorization around the clock, ensuring prompt processing.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('prior-authorization');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <PriorAuthorizationPage />;
}
