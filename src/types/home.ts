export interface MarqueeItem {
  _key?: string;
  text: string;
  image?: string;
}

export interface BrandLogoItem {
  _key?: string;
  name: string;
  logo: string;
}

export interface ProductItem {
  name: string;
  description: string;
  image?: string;
  ctaText: string;
  ctaLink?: string;
}

export interface StatItem {
  _key?: string;
  icon?: string;
  stat: string;
  unit?: string;
  label: string;
}

export interface TestimonialItem {
  _key?: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface BillingStepItem {
  _key?: string;
  num: string;
  title: string;
  day: string;
  dayVariant?: 'active' | 'outline';
  desc: string;
}

export interface HomePageData {
  // 01 · Hero Section
  heroSubheading?: string;
  heroHeading: string;
  heroDescription?: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroBackgroundImageDesktop?: string;
  heroBackgroundImageMobile?: string;

  // 02 · Marquee / Video Section
  marqueeItems: MarqueeItem[];
  marqueeMobileText?: string;
  bannerImageDesktop?: string;
  bannerImageMobile?: string;

  // 03 · Trusted Brands
  brandHeading: string;
  brandHeadingHighlight?: string;
  brandLogos: BrandLogoItem[];

  // 04 · Products Section
  productsHeadingPart1: string;
  productsHeadingHighlight?: string;
  product1: ProductItem;
  product2: ProductItem;

  // 05 · Eligibility to Coding
  eligibilityTag?: string;
  eligibilityHeading: string;
  eligibilitySubtag?: string;
  eligibilitySubheading: string;
  eligibilityDiagramImage?: string;
  eligibilityDescription: string;
  eligibilityBgDesktop?: string;
  eligibilityBgMobile?: string;

  // 06 · Features & Stats
  featuresTag?: string;
  featuresHeading: string;
  featuresHeadingHighlight?: string;
  featuresDescription: string;
  card1Title: string;
  card1Description: string;
  card1Image?: string;
  card2Title: string;
  card2Description: string;
  card2Image?: string;
  securityTag?: string;
  securityHeadingHighlight?: string;
  securityHeading: string;
  securityDescription: string;
  securityImage?: string;
  statsTag?: string;
  statsHeading: string;
  stats: StatItem[];
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudyImage?: string;
  caseStudyCtaText: string;
  caseStudyCtaLink: string;

  // 07 · Testimonials
  testimonials: TestimonialItem[];

  // 08 · Calculate Section
  calculateHeading: string;
  calculateImage?: string;

  // 09 · Billing Model
  billingTag?: string;
  billingHeadingHighlight?: string;
  billingHeading: string;
  billingDescription: string;
  billingSteps: BillingStepItem[];
  billingPoints?: string[];

  // 10 · CTA Section
  ctaTag?: string;
  ctaHeading: string;
  ctaPrimaryButtonText: string;
  ctaPrimaryButtonLink: string;
  ctaSecondaryButtonText: string;
  ctaSecondaryButtonLink: string;
  ctaBackgroundImage?: string;

  // 11 · SEO
  metaTitle?: string;
  metaDescription?: string;
}
