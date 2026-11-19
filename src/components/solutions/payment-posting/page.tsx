import PageMotion from '@/components/common/page-motion';

import PaymentPostingCTASection from './cta-section';
import PaymentPostingHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustPaymentPostingSection from './this-isnt-just-payment-posting';

export const PaymentPostingPage = () => {
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
      <PaymentPostingHeroSection />
      {/* Keep adjacent surfaces together while the comparison holds its position. */}
      <div data-solution-sequence data-motion-scene="comparison" data-scene-mode="pending">
        <div data-scene-sticky>
          <TheProblemSection />
          <HowWaterlabsClosesSection />
          <HumanInTheLoopSection />
          <ThisIsntJustPaymentPostingSection />
          <PaymentPostingCTASection />
        </div>
      </div>
    </div>
  );
};

export default PaymentPostingPage;
