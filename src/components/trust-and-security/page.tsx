import TrustCTASection from './cta-section';
import TrustHeroSection from './hero-section';
import InteractiveSecuritySections from './interactive-security-sections';
import ManifestoSection from './manifesto-section';

export const TrustAndSecurityPage = () => {
  return (
    <main className="w-full flex flex-col">
      <TrustHeroSection />
      <ManifestoSection />
      <InteractiveSecuritySections />
      <TrustCTASection />
    </main>
  );
};

export default TrustAndSecurityPage;
