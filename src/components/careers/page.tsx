import React from 'react';

import CareersCTASection from './cta-section';
import CareersHeroSection from './hero-section';
import WeAreHiringSection from './we-are-hiring';
import WhatWeDoMattersSection from './what-we-do-matters';
import { CareersOpenRolesData, WhereYouWouldFitSection } from './where-you-would-fit';
import WhoThrivesHereSection from './who-thrives-here';

export type CareersPageData = CareersOpenRolesData;

interface CareersPageProps {
  data?: CareersPageData | null;
}

export const CareersPage: React.FC<CareersPageProps> = ({ data }) => {
  return (
    <main>
      <CareersHeroSection />
      <WhatWeDoMattersSection />
      <WeAreHiringSection />
      <WhoThrivesHereSection />
      <WhereYouWouldFitSection data={data} />
      <CareersCTASection />
    </main>
  );
};

export default CareersPage;
