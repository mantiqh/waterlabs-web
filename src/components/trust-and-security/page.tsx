import PageMotion from '@/components/common/page-motion';

import TrustCTASection from './cta-section';
import TrustHeroSection from './hero-section';
import InteractiveSecuritySections from './interactive-security-sections';
import ManifestoSection from './manifesto-section';

export const TrustAndSecurityPage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <TrustHeroSection />
      <ManifestoSection />
      <InteractiveSecuritySections />
      <TrustCTASection />
    </div>
  );
};

export default TrustAndSecurityPage;
