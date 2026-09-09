import React from 'react';

import type { AboutUsLeadershipData, AboutUsPageData } from '@/types/about-us';

import BottomLineSection from './bottom-line';
import FoundingMomentSection from './founding-moment';
import HeroSection from './hero-section';
import LeadershipSection from './leadership';
import TestimonialsSection from './testimonials';
import WhatWeBelieveSection from './what-we-believe';
import WhosBuildingThisSection from './whos-building-this';
import WhosTrustingUsSection from './whos-trusting-us';

export interface AboutUsPageProps {
  data?: AboutUsPageData | null;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ data }) => {
  const leadershipData: AboutUsLeadershipData | undefined =
    data?.leadership || (data ? { leadersTag: data.leadersTag, leaders: data.leaders } : undefined);

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <WhosTrustingUsSection />
      <TestimonialsSection />
      <FoundingMomentSection />
      <WhosBuildingThisSection />
      <LeadershipSection data={leadershipData} />
      <WhatWeBelieveSection />
      <BottomLineSection />
    </div>
  );
};

export default AboutUsPage;
