import type { CaseStudiesPageProps } from '@/types/case-study';

import CaseStudiesCTASection from './cta-section';
import CaseStudiesHeroSection from './hero-section';
import CaseStudiesTabsSection from './tabs-section';

export const CaseStudiesPage = ({
  caseStudies,
  pageSettings,
}: CaseStudiesPageProps) => {
  return (
    <div className="w-full flex flex-col">
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
