import React from 'react';

import BottomLineSection from './bottom-line';
import FoundingMomentSection from './founding-moment';
import HeroSection from './hero-section';
import TeamSection from './team-section';
import TestimonialsSection from './testimonials';
import WhatWeBelieveSection from './what-we-believe';
import WhosTrustingUsSection from './whos-trusting-us';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <WhosTrustingUsSection />
      <TestimonialsSection />
      <FoundingMomentSection />
      <TeamSection />
      <WhatWeBelieveSection />
      <BottomLineSection />
    </div>
  );
};

export default AboutUsPage;
