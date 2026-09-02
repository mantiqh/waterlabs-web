'use client';

import React from 'react';

import PhilosophyCTASection from './cta-section';
import PhilosophyHeroSection from './hero-section';
import HowThatShowsUpSection from './how-that-shows-up';
import ThePromiseSection from './the-promise';
import WhatWeBelieveSection from './what-we-believe';
import WhyWeStartedWaterlabsSection from './why-we-started-waterlabs';

export const PhilosophyPage: React.FC = () => {
  return (
    <main className="w-full flex flex-col">
      <PhilosophyHeroSection />
      <WhyWeStartedWaterlabsSection />
      <WhatWeBelieveSection />
      <HowThatShowsUpSection />
      <ThePromiseSection />
      <PhilosophyCTASection />
    </main>
  );
};

export default PhilosophyPage;
