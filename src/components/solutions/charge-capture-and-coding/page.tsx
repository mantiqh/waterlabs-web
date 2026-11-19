import PageMotion from '@/components/common/page-motion';

import ChargeCaptureCTASection from './cta-section';
import ChargeCaptureHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisRunsOnCurieCodeSection from './this-runs-on-curiecode';

export const ChargeCaptureAndCodingPage = () => {
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
      <ChargeCaptureHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisRunsOnCurieCodeSection />
      <ChargeCaptureCTASection />
    </div>
  );
};

export default ChargeCaptureAndCodingPage;
