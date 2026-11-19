import PageMotion from '@/components/common/page-motion';
import type { AboutUsLeadershipData, AboutUsPageData } from '@/types/about-us';

import ComeTalkToUsSection from './come-talk-to-us';
import HeroSection from './hero-section';
import OurStorySection from './our-story';
import TheFoundersSection from './the-founders';
import TheTeamSection from './the-team';
import WhatWeAreSection from './what-we-are';
import WhatWeHoldSection from './what-we-hold';

export interface AboutUsPageProps {
  data?: AboutUsPageData | null;
}

export const AboutUsPage = ({ data }: AboutUsPageProps) => {
  const leadershipData: AboutUsLeadershipData | undefined =
    data?.leadership || (data ? { leadersTag: data.leadersTag, leaders: data.leaders } : undefined);

  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <HeroSection />
      <WhatWeAreSection />
      <OurStorySection />
      <WhatWeHoldSection />
      <TheFoundersSection />
      <TheTeamSection data={leadershipData} />
      <ComeTalkToUsSection />
    </div>
  );
};

export default AboutUsPage;
