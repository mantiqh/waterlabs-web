import type { Metadata } from 'next';

import CaseStudiesPage from '@/components/case-studies/page';
import { fetchAllCaseStudies, fetchCaseStudiesPageSettings } from '@/sanity/lib/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies | Waterlabs AI',
  description:
    'Explore real-world results and case studies from health systems and enterprise RCM teams using Waterlabs.',
};

export const revalidate = 60;

export default async function Page() {
  const [caseStudies, pageSettings] = await Promise.all([
    fetchAllCaseStudies(),
    fetchCaseStudiesPageSettings(),
  ]);

  return <CaseStudiesPage caseStudies={caseStudies} pageSettings={pageSettings} />;
}
