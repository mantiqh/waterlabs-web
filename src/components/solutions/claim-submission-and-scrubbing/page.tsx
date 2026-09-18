import ClaimSubmissionCTASection from './cta-section';
import ClaimSubmissionHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustClaimSubmissionSection from './this-isnt-just-claim-submission';

export const ClaimSubmissionPage = () => {
  return (
    <div className="w-full flex flex-col">
      <ClaimSubmissionHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustClaimSubmissionSection />
      <ClaimSubmissionCTASection />
    </div>
  );
};

export default ClaimSubmissionPage;
