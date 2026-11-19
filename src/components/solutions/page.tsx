import PageMotion from '@/components/common/page-motion';

import SolutionsCTASection from './cta-section';
import SolutionsHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import OurStatsSection from './our-stats';
import TheProblemSection from './the-problem';
import ThisIsntJustEligibilitySection from './this-isnt-just-eligibility';

export const SolutionsPage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <SolutionsHeroSection />
      {/* Keep adjacent surfaces together while the comparison holds its position. */}
      <div data-solution-sequence data-motion-scene="comparison" data-scene-mode="pending">
        <div data-scene-sticky>
          <TheProblemSection />
          <HowWaterlabsClosesSection />
          <OurStatsSection />
          <ThisIsntJustEligibilitySection />
          <SolutionsCTASection />
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
