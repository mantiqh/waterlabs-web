import PageMotion from '@/components/common/page-motion';
import type { CaseStudiesPageProps } from '@/types/case-study';

import CaseStudiesCTASection from './cta-section';
import CaseStudiesHeroSection from './hero-section';
import CaseStudiesTabsSection from './tabs-section';

export const CaseStudiesPage = ({ caseStudies, pageSettings }: CaseStudiesPageProps) => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <CaseStudiesHeroSection />
      <CaseStudiesTabsSection
        initialCaseStudies={caseStudies}
        settings={pageSettings}
        categories={pageSettings?.categories}
      />
      <CaseStudiesCTASection />
    </div>
  );
};

export default CaseStudiesPage;
