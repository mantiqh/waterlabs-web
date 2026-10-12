import type { HomePageData } from '@/types/home';

import CaseStudiesSection from './case-studies-section';
import TestimonialsSection from './client-perspective';
import CTASection from './cta-section';
import EconomicImpactSection from './economic-impact-section';
import EnterpriseSecuritySection from './enterprise-security-section';
import HeroSection from './hero-section';
import PlatformEngineSection from './platform-engine-section';
import RcmCoverageSection from './rcm-coverage-section';
import RevenueImpactSection from './revenue-impact-section';
import WelcomeToWaterlabsSection from './welcome-to-waterlabs-section';
import WhyWaterlabsSection from './why-waterlabs-section';

export interface HomePageProps {
  data?: HomePageData | null;
}

const HomePage = ({ data }: HomePageProps) => {
  return (
    <div className="w-full flex flex-col overflow-x-clip">
      {/* 01 · Hero Section */}
      <HeroSection
        heading={data?.heroHeading}
        subheading={data?.heroSubheading}
        description={data?.heroDescription}
        ctaText={data?.heroCtaText}
        ctaLink={data?.heroCtaLink}
      />

      {/* 02 · Welcome to Waterlabs */}
      <WelcomeToWaterlabsSection />

      {/* 03 · Why Waterlabs Is Different (Carousel) */}
      <WhyWaterlabsSection />

      {/* 04 · The Waterlabs Platform Engine (HIMER AI OS & CurieCode) */}
      <PlatformEngineSection />

      {/* 05 · End-to-End RCM Coverage (8 Functional Areas) */}
      <RcmCoverageSection />

      {/* 06 · Enterprise Healthcare Security */}
      <EnterpriseSecuritySection />

      {/* 07 · Proven Results with Active Clients (Case Studies Metrics) */}
      <CaseStudiesSection />

      {/* 08 · Client Perspective (Testimonials Carousel) */}
      <TestimonialsSection testimonials={data?.testimonials} />

      {/* 09 · Revenue Impact Calculator */}
      <RevenueImpactSection />

      {/* 10 · The Economic Impact of Going Agentic */}
      <EconomicImpactSection />

      {/* 11 · Start Automation With Any Functional Area of RCM (CTA Section) */}
      <CTASection />
    </div>
  );
};

export default HomePage;
