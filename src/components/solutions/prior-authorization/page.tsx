import PriorAuthorizationCTASection from './cta-section';
import PriorAuthorizationHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustPriorAuthorizationSection from './this-isnt-just-prior-authorization';

export const PriorAuthorizationPage = () => {
  return (
    <div className="w-full flex flex-col">
      <PriorAuthorizationHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustPriorAuthorizationSection />
      <PriorAuthorizationCTASection />
    </div>
  );
};

export default PriorAuthorizationPage;
