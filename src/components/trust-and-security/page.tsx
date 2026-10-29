import TrustCTASection from './cta-section';
import TrustHeroSection from './hero-section';
import InteractiveSecuritySections from './interactive-security-sections';
import ManifestoSection from './manifesto-section';

export const TrustAndSecurityPage = () => {
  return (
    <main className="flex w-full flex-col">
      <TrustHeroSection />
      <ManifestoSection />
      <InteractiveSecuritySections />
      <TrustCTASection />
    </main>
  );
};

export default TrustAndSecurityPage;
