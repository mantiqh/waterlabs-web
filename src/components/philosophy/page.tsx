'use client';

import React from 'react';

import PhilosophyHeroSection from './hero-section';
import WhyWeStartedWaterlabsSection from './why-we-started-waterlabs';

export const PhilosophyPage: React.FC = () => {
  return (
    <main className="w-full flex flex-col">
      <PhilosophyHeroSection />
      <WhyWeStartedWaterlabsSection />
    </main>
  );
};

export default PhilosophyPage;
