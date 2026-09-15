import DoWorkThatMattersSection from './do-work-that-matters';
import FourThingsSection from './four-things';
import CultureHeroSection from './hero-section';
import WeBuildPeopleSection from './we-build-people';

export const CulturePage = () => {
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
