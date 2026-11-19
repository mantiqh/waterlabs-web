import PageMotion from '@/components/common/page-motion';

import PhilosophyCTASection from './cta-section';
import PhilosophyHeroSection from './hero-section';
import HowThatShowsUpSection from './how-that-shows-up';
import ThePromiseSection from './the-promise';
import WhatWeBelieveSection from './what-we-believe';
import WhyWeStartedWaterlabsSection from './why-we-started-waterlabs';

export const PhilosophyPage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <PhilosophyHeroSection />
      <WhyWeStartedWaterlabsSection />
      {/* Keep adjacent surfaces together while the comparison holds its position. */}
      <div data-philosophy-sequence data-motion-scene="comparison" data-scene-mode="pending">
        <div data-scene-sticky>
          <WhatWeBelieveSection />
          <HowThatShowsUpSection />
          <ThePromiseSection />
          <PhilosophyCTASection />
        </div>
      </div>
    </div>
  );
};

export default PhilosophyPage;
