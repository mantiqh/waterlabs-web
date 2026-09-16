import DenialManagementCTASection from './cta-section';
import DenialManagementHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustDenialsSection from './this-isnt-just-denials';

export const DenialManagementPage = () => {
  return (
    <div className="w-full flex flex-col">
      <DenialManagementHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustDenialsSection />
      <DenialManagementCTASection />
    </div>
  );
};

export default DenialManagementPage;
