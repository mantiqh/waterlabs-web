import React from 'react';

import SolutionsCTASection from './cta-section';
import SolutionsHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import OurStatsSection from './our-stats';
import TheProblemSection from './the-problem';
import ThisIsntJustEligibilitySection from './this-isnt-just-eligibility';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <SolutionsHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <OurStatsSection />
      <ThisIsntJustEligibilitySection />
      <SolutionsCTASection />
    </div>
  );
};

export default SolutionsPage;
