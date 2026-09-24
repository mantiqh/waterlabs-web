export interface LocationItem {
  _key?: string;
  tag: string;
  title: string;
  address: string;
  email: string;
  hours: string;
  buttonText: string;
  href: string;
}

export interface ContactUsPageData {
  // 01 · Hero Section
  heroHeading: string;
  heroHeadingHighlight?: string;
  heroSubheading: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImageDesktop?: string;
  heroImageMobile?: string;

  // 02 · Operating Info & Locations
  locations: LocationItem[];
  operatingInfoBgImage?: string;

  // 03 · Contact Form
  formTag?: string;
  formHeading: string;
  formImage?: string;
  orgTypeOptions?: string[];
  newsletterHeading?: string;
  consentText?: string;
  disclaimerText?: string;
  submitButtonText?: string;

  // 04 · CTA Section
  ctaHeading: string;
  ctaHeadingHighlight?: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaBackgroundImageDesktop?: string;
  ctaBackgroundImageMobile?: string;

  // 05 · SEO
  metaTitle?: string;
  metaDescription?: string;
}
