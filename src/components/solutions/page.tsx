import SolutionsCTASection from './cta-section';
import SolutionsHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import OurStatsSection from './our-stats';
import TheProblemSection from './the-problem';
import ThisIsntJustEligibilitySection from './this-isnt-just-eligibility';

export const SolutionsPage = () => {
  return (
    <div className="flex w-full flex-col">
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
