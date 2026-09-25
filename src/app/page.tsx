import type { Metadata } from 'next';

import HomePage from '@/components/home/page';
import { fetchHomePageSettings } from '@/sanity/lib/home';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomePageSettings();
  return {
    title:
      data.metaTitle || 'Waterlabs AI | Agentic Revenue Cycle Management',
    description:
      data.metaDescription ||
      'Agentic AI built to own your revenue cycle, not just automate it. Autonomous RCM for health systems and healthcare providers.',
  };
}

export default async function Page() {
  const data = await fetchHomePageSettings();
  return <HomePage data={data} />;
}
