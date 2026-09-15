import BillingSection from './billing-section';
import BrandSlider from './brand-slider';
import CalculateSection from './calculate-section';
import CarouselSection from './carousel-section';
import CTASection from './cta-section';
import EligibilitySection from './eligibility';
import FeaturesSection from './features-section';
import Hero, { type HeroData } from './hero';
import { ProductsSection } from './products-section';
import TestimonialsSection from './testimonials-section';

export interface HomePageProps {
  data?: HeroData | null;
}

const HomePage = ({ data }: HomePageProps) => {
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
