import PageMotion from '@/components/common/page-motion';

import DoWorkThatMattersSection from './do-work-that-matters';
import FourThingsSection from './four-things';
import CultureHeroSection from './hero-section';
import WeBuildPeopleSection from './we-build-people';

export const CulturePage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <CultureHeroSection />
      <FourThingsSection />
      <WeBuildPeopleSection />
      <DoWorkThatMattersSection />
    </div>
  );
};

export default CulturePage;
