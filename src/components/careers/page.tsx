'use client';

import React from 'react';

import CareersCTASection from './cta-section';
import CareersHeroSection from './hero-section';
import WeAreHiringSection from './we-are-hiring';
import WhatWeDoMattersSection from './what-we-do-matters';
import WhereYouWouldFitSection from './where-you-would-fit';
import WhoThrivesHereSection from './who-thrives-here';

export const CareersPage: React.FC = () => {
  return (
    <main>
      <CareersHeroSection />
      <WhatWeDoMattersSection />
      <WeAreHiringSection />
      <WhoThrivesHereSection />
      <WhereYouWouldFitSection />
      <CareersCTASection />
    </main>
  );
};

export default CareersPage;
