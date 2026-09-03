'use client';

import React from 'react';

import DoWorkThatMattersSection from './do-work-that-matters';
import FourThingsSection from './four-things';
import CultureHeroSection from './hero-section';
import WeBuildPeopleSection from './we-build-people';

export const CulturePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <CultureHeroSection />
      <FourThingsSection />
      <WeBuildPeopleSection />
      <DoWorkThatMattersSection />
    </div>
  );
};

export default CulturePage;
