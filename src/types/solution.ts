export interface SolutionStep {
  title: string;
  description: string;
}

export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionFeatureCard {
  icon?: string;
  title: string;
  description: string;
}

export interface SolutionPageData {
  id: string;
  title: string;
  slug: string;
  aliases?: string[];
  navLabel?: string;
  order?: number;

  // 01 · Hero Section
  hero: {
    eyebrow?: string;
    headline: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
    heroImage?: string;
    heroImageAlt?: string;
    heroBanner?: string;
  };

  // 02 · The Problem Section
  problem: {
    tag?: string;
    headline: string;
    headlineHighlight?: string;
    description: string;
    descriptionSecondary?: string;
    quoteText?: string;
    quoteAuthor?: string;
    image?: string;
    imageAlt?: string;
  };

  // 03 · How Waterlabs Closes Section
  closes: {
    sectionTitle?: string;
    sectionTitleHighlight?: string;
    subtitle?: string;
    image?: string;
    imageAlt?: string;
    steps: SolutionStep[];
  };

  // 04 · Stats & Human in the Loop
  statsAndHuman: {
    statsTitle?: string;
    stats: SolutionStat[];
    humanHeading: string;
    humanHeadingHighlight?: string;
    humanParagraphs: string[];
    humanImage?: string;
    humanImageMobile?: string;
    humanImageAlt?: string;
  };

  // 05 · Platform (HIMER AI OS) & The Three Things
  platformAndFeatures: {
    platformEyebrow?: string;
    platformHeading?: string;
    platformDescription?: string;
    platformCtaText?: string;
    platformCtaLink?: string;
    platformImage?: string;
    platformImageMobile?: string;
    threeThingsHeading?: string;
    threeThingsHeadingHighlight?: string;
    threeThingsCards: SolutionFeatureCard[];
  };

  // 06 · CTA Section
  cta: {
    headline: string;
    buttonText: string;
    buttonLink: string;
  };

  // 07 · SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SolutionNavItem {
  label: string;
  href: string;
  order?: number;
}
