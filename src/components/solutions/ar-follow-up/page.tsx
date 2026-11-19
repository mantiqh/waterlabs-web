import PageMotion from '@/components/common/page-motion';

import ARFollowUpCTASection from './cta-section';
import ARFollowUpHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustARSection from './this-isnt-just-ar';

export const ARFollowUpPage = () => {
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
