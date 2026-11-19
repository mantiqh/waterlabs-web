import type { HomePageData } from '@/types/home';

import CaseStudiesSection from './case-studies-section';
import TestimonialsSection from './client-perspective';
import CTASection from './cta-section';
import EconomicImpactSection from './economic-impact-section';
import EnterpriseSecuritySection from './enterprise-security-section';
import HeroSection from './hero-section';
import HomeMotion from './home-motion';
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
    <div
      data-home-motion
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <HomeMotion />
      <div
        data-home-scroll-progress
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-[#63CCB7]"
      />
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

      {/* Keep adjacent surfaces together while the comparison holds its position. */}
      <div data-economic-sequence data-motion-scene="comparison" data-scene-mode="pending">
        <div data-scene-sticky>
          {/* 09 · Revenue Impact Calculator */}
          <RevenueImpactSection />

          {/* 10 · The Economic Impact of Going Agentic */}
          <EconomicImpactSection />

          {/* 11 · Start Automation With Any Functional Area of RCM (CTA Section) */}
          <CTASection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
