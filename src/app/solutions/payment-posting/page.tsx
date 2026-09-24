import type { Metadata } from 'next';

import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import PaymentPostingPage from '@/components/solutions/payment-posting/page';
import { fetchSolutionBySlug } from '@/sanity/lib/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const solution = await fetchSolutionBySlug('payment-posting');
  return {
    title: solution?.seo?.metaTitle || 'Solutions — Payment Posting | Waterlabs AI',
    description:
      solution?.seo?.metaDescription ||
      solution?.hero.description ||
      'Every payment posted the day it lands. Our agents reconcile remittances, post payments, and route what does not balance.',
  };
}

export default async function Page() {
  const solution = await fetchSolutionBySlug('payment-posting');
  if (solution) {
    return <DynamicSolutionPage data={solution} />;
  }
  return <PaymentPostingPage />;
}
