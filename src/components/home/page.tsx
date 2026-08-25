import React from 'react';

import BillingSection from './billing-section';
import BrandSlider from './brand-slider';
import CalculateSection from './calculate-section';
import CarouselSection from './carousel-section';
import CTASection from './cta-section';
import EligibilitySection from './eligibility';
import FeaturesSection from './features-section';
import Hero, { HeroData } from './hero';
import { ProductsSection } from './products-section';
import TestimonialsSection from './testimonials-section';

interface HomePageProps {
  data?: HeroData | null;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <main>
      <Hero data={data} />
      <CarouselSection />
      <BrandSlider />
      <ProductsSection />
      <EligibilitySection />
      <FeaturesSection />
      <TestimonialsSection />
      <CalculateSection />
      <BillingSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
