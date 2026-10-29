import HimerActivityLogSection from './activity-log-section';
import HimerClaimJourneySection from './claim-journey-section';
import HimerCTASection from './cta-section';
import HimerHeroSection from './hero-section';
import HimerLearningLoopSection from './learning-loop-section';
import HimerMemoryKnowledgeSection from './memory-knowledge-section';
import HimerMetricsSection from './metrics-section';
import HimerPlatformLifecycleSection from './platform-lifecycle-section';
import HimerPricingMeterSection from './pricing-meter-section';
import HimerTrustSecuritySection from './trust-security-section';

export const HimerPage = () => {
  return (
    <div className="himer-page flex w-full flex-col overflow-x-clip bg-white">
      {/* Track A: Platform Foundation & Clinical Journey */}
      <HimerHeroSection />
      <HimerMetricsSection />
      <HimerClaimJourneySection />
      <HimerMemoryKnowledgeSection />

      {/* Track B: Continuous Learning, Operations & Governance */}
      <HimerLearningLoopSection />
      <HimerPlatformLifecycleSection />
      <HimerActivityLogSection />
      <HimerTrustSecuritySection />
      <HimerPricingMeterSection />
      <HimerCTASection />
    </div>
  );
};

export default HimerPage;
