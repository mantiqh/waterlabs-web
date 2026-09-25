import { DEFAULT_HOME_DATA } from '@/data/home';
import type { HomePageData } from '@/types/home';

import BillingSection from './billing-section';
import BrandSlider from './brand-slider';
import CalculateSection from './calculate-section';
import CarouselSection from './carousel-section';
import CTASection from './cta-section';
import EligibilitySection from './eligibility';
import FeaturesSection from './features-section';
import Hero from './hero';
import { ProductsSection } from './products-section';
import TestimonialsSection from './testimonials-section';

export interface HomePageProps {
  data?: HomePageData | null;
}

const HomePage = ({ data = DEFAULT_HOME_DATA }: HomePageProps) => {
  const homeData = data || DEFAULT_HOME_DATA;

  return (
    <main>
      <Hero
        data={{
          heroHeading: homeData.heroHeading,
          heroSubheading: homeData.heroSubheading,
          heroDescription: homeData.heroDescription,
          heroCtaText: homeData.heroCtaText,
          heroCtaLink: homeData.heroCtaLink,
          heroSecondaryCtaText: homeData.heroSecondaryCtaText,
          heroSecondaryCtaLink: homeData.heroSecondaryCtaLink,
          heroBackgroundImageDesktop: homeData.heroBackgroundImageDesktop,
          heroBackgroundImageMobile: homeData.heroBackgroundImageMobile,
        }}
      />
      <CarouselSection
        marqueeItems={homeData.marqueeItems}
        mobileText={homeData.marqueeMobileText}
        bannerImageDesktop={homeData.bannerImageDesktop}
        bannerImageMobile={homeData.bannerImageMobile}
      />
      <BrandSlider
        heading={homeData.brandHeading}
        headingHighlight={homeData.brandHeadingHighlight}
        brandLogos={homeData.brandLogos}
      />
      <ProductsSection
        headingPart1={homeData.productsHeadingPart1}
        headingHighlight={homeData.productsHeadingHighlight}
        product1={homeData.product1}
        product2={homeData.product2}
      />
      <EligibilitySection
        tag={homeData.eligibilityTag}
        heading={homeData.eligibilityHeading}
        subtag={homeData.eligibilitySubtag}
        subheading={homeData.eligibilitySubheading}
        diagramImage={homeData.eligibilityDiagramImage}
        description={homeData.eligibilityDescription}
        bgDesktop={homeData.eligibilityBgDesktop}
        bgMobile={homeData.eligibilityBgMobile}
      />
      <FeaturesSection
        tag={homeData.featuresTag}
        heading={homeData.featuresHeading}
        headingHighlight={homeData.featuresHeadingHighlight}
        description={homeData.featuresDescription}
        card1Title={homeData.card1Title}
        card1Description={homeData.card1Description}
        card1Image={homeData.card1Image}
        card2Title={homeData.card2Title}
        card2Description={homeData.card2Description}
        card2Image={homeData.card2Image}
        securityTag={homeData.securityTag}
        securityHeadingHighlight={homeData.securityHeadingHighlight}
        securityHeading={homeData.securityHeading}
        securityDescription={homeData.securityDescription}
        securityImage={homeData.securityImage}
        statsTag={homeData.statsTag}
        statsHeading={homeData.statsHeading}
        stats={homeData.stats}
        caseStudyTitle={homeData.caseStudyTitle}
        caseStudySubtitle={homeData.caseStudySubtitle}
        caseStudyImage={homeData.caseStudyImage}
        caseStudyCtaText={homeData.caseStudyCtaText}
        caseStudyCtaLink={homeData.caseStudyCtaLink}
      />
      <TestimonialsSection testimonials={homeData.testimonials} />
      <CalculateSection
        heading={homeData.calculateHeading}
        image={homeData.calculateImage}
      />
      <BillingSection
        tag={homeData.billingTag}
        headingHighlight={homeData.billingHeadingHighlight}
        heading={homeData.billingHeading}
        description={homeData.billingDescription}
        steps={homeData.billingSteps}
        points={homeData.billingPoints}
      />
      <CTASection
        tag={homeData.ctaTag}
        heading={homeData.ctaHeading}
        primaryButtonText={homeData.ctaPrimaryButtonText}
        primaryButtonLink={homeData.ctaPrimaryButtonLink}
        secondaryButtonText={homeData.ctaSecondaryButtonText}
        secondaryButtonLink={homeData.ctaSecondaryButtonLink}
        backgroundImage={homeData.ctaBackgroundImage}
      />
    </main>
  );
};

export default HomePage;
