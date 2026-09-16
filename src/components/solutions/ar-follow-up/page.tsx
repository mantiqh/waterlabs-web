import ARFollowUpCTASection from './cta-section';
import ARFollowUpHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustARSection from './this-isnt-just-ar';

export const ARFollowUpPage = () => {
  return (
    <div className="w-full flex flex-col">
      <ARFollowUpHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustARSection />
      <ARFollowUpCTASection />
    </div>
  );
};

export default ARFollowUpPage;
