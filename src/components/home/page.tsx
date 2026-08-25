import React from 'react';

import BrandSlider from './brand-slider';
import CarouselSection from './carousel-section';
import EligibilitySection from './eligibility';
import FeaturesSection from './features-section';
import Hero from './hero';
import { ProductsSection } from './products-section';
import TestimonialsSection from './testimonials-section';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <CarouselSection />
      <BrandSlider />
      <ProductsSection />
      <EligibilitySection />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  );
};

export default HomePage;
