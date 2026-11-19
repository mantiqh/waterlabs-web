import PageMotion from '@/components/common/page-motion';

import ClaimSubmissionCTASection from './cta-section';
import ClaimSubmissionHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustClaimSubmissionSection from './this-isnt-just-claim-submission';

export const ClaimSubmissionPage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <noscript>
        <style>{`
          [data-motion-root] { --motion-initial-visibility: visible !important; animation: none !important; }
          [data-motion-root] [data-motion-scene] { height: auto !important; }
          [data-motion-root] [data-scene-sticky] { position: static !important; }
          [data-motion-root] [data-scene-panel] { grid-row: auto !important; }
        `}</style>
      </noscript>
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
