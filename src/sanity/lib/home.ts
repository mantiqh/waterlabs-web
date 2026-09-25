import { DEFAULT_HOME_DATA } from '@/data/home';
import { sanityFetch } from '@/sanity/lib/fetch';
import { homePageQuery } from '@/sanity/lib/queries';
import type { HomePageData } from '@/types/home';

/**
 * Fetches home page configuration from Sanity CMS,
 * with full fallback to local static data if unpublished or unavailable.
 */
export async function fetchHomePageSettings(): Promise<HomePageData> {
  try {
    const data = await sanityFetch<Partial<HomePageData> | null>({
      query: homePageQuery,
      tags: ['homePage'],
      revalidate: 60,
    });

    if (data) {
      return {
        // 01 · Hero Section
        heroSubheading: data.heroSubheading ?? DEFAULT_HOME_DATA.heroSubheading,
        heroHeading: data.heroHeading || DEFAULT_HOME_DATA.heroHeading,
        heroDescription: data.heroDescription ?? DEFAULT_HOME_DATA.heroDescription,
        heroCtaText: data.heroCtaText || DEFAULT_HOME_DATA.heroCtaText,
        heroCtaLink: data.heroCtaLink || DEFAULT_HOME_DATA.heroCtaLink,
        heroSecondaryCtaText:
          data.heroSecondaryCtaText || DEFAULT_HOME_DATA.heroSecondaryCtaText,
        heroSecondaryCtaLink:
          data.heroSecondaryCtaLink || DEFAULT_HOME_DATA.heroSecondaryCtaLink,
        heroBackgroundImageDesktop:
          data.heroBackgroundImageDesktop ||
          DEFAULT_HOME_DATA.heroBackgroundImageDesktop,
        heroBackgroundImageMobile:
          data.heroBackgroundImageMobile ||
          DEFAULT_HOME_DATA.heroBackgroundImageMobile,

        // 02 · Marquee / Video Section
        marqueeItems:
          Array.isArray(data.marqueeItems) && data.marqueeItems.length > 0
            ? data.marqueeItems.map((item, idx) => ({
                _key: item._key || `mq-${idx}`,
                text: item.text,
                image: item.image || DEFAULT_HOME_DATA.marqueeItems[idx]?.image,
              }))
            : DEFAULT_HOME_DATA.marqueeItems,
        marqueeMobileText:
          data.marqueeMobileText || DEFAULT_HOME_DATA.marqueeMobileText,
        bannerImageDesktop:
          data.bannerImageDesktop || DEFAULT_HOME_DATA.bannerImageDesktop,
        bannerImageMobile:
          data.bannerImageMobile || DEFAULT_HOME_DATA.bannerImageMobile,

        // 03 · Trusted Brands
        brandHeading: data.brandHeading || DEFAULT_HOME_DATA.brandHeading,
        brandHeadingHighlight:
          data.brandHeadingHighlight ?? DEFAULT_HOME_DATA.brandHeadingHighlight,
        brandLogos:
          Array.isArray(data.brandLogos) && data.brandLogos.length > 0
            ? data.brandLogos.map((brand, idx) => ({
                _key: brand._key || `brand-${idx}`,
                name: brand.name,
                logo: brand.logo || DEFAULT_HOME_DATA.brandLogos[idx]?.logo,
              }))
            : DEFAULT_HOME_DATA.brandLogos,

        // 04 · Products Section
        productsHeadingPart1:
          data.productsHeadingPart1 || DEFAULT_HOME_DATA.productsHeadingPart1,
        productsHeadingHighlight:
          data.productsHeadingHighlight ??
          DEFAULT_HOME_DATA.productsHeadingHighlight,
        product1: {
          name: data.product1?.name || DEFAULT_HOME_DATA.product1.name,
          description:
            data.product1?.description || DEFAULT_HOME_DATA.product1.description,
          image: data.product1?.image || DEFAULT_HOME_DATA.product1.image,
          ctaText: data.product1?.ctaText || DEFAULT_HOME_DATA.product1.ctaText,
          ctaLink: data.product1?.ctaLink || DEFAULT_HOME_DATA.product1.ctaLink,
        },
        product2: {
          name: data.product2?.name || DEFAULT_HOME_DATA.product2.name,
          description:
            data.product2?.description || DEFAULT_HOME_DATA.product2.description,
          image: data.product2?.image || DEFAULT_HOME_DATA.product2.image,
          ctaText: data.product2?.ctaText || DEFAULT_HOME_DATA.product2.ctaText,
          ctaLink: data.product2?.ctaLink || DEFAULT_HOME_DATA.product2.ctaLink,
        },

        // 05 · Eligibility to Coding
        eligibilityTag:
          data.eligibilityTag ?? DEFAULT_HOME_DATA.eligibilityTag,
        eligibilityHeading:
          data.eligibilityHeading || DEFAULT_HOME_DATA.eligibilityHeading,
        eligibilitySubtag:
          data.eligibilitySubtag ?? DEFAULT_HOME_DATA.eligibilitySubtag,
        eligibilitySubheading:
          data.eligibilitySubheading || DEFAULT_HOME_DATA.eligibilitySubheading,
        eligibilityDiagramImage:
          data.eligibilityDiagramImage ||
          DEFAULT_HOME_DATA.eligibilityDiagramImage,
        eligibilityDescription:
          data.eligibilityDescription ||
          DEFAULT_HOME_DATA.eligibilityDescription,
        eligibilityBgDesktop:
          data.eligibilityBgDesktop || DEFAULT_HOME_DATA.eligibilityBgDesktop,
        eligibilityBgMobile:
          data.eligibilityBgMobile || DEFAULT_HOME_DATA.eligibilityBgMobile,

        // 06 · Features & Stats
        featuresTag: data.featuresTag ?? DEFAULT_HOME_DATA.featuresTag,
        featuresHeading:
          data.featuresHeading || DEFAULT_HOME_DATA.featuresHeading,
        featuresHeadingHighlight:
          data.featuresHeadingHighlight ??
          DEFAULT_HOME_DATA.featuresHeadingHighlight,
        featuresDescription:
          data.featuresDescription || DEFAULT_HOME_DATA.featuresDescription,
        card1Title: data.card1Title || DEFAULT_HOME_DATA.card1Title,
        card1Description:
          data.card1Description || DEFAULT_HOME_DATA.card1Description,
        card1Image: data.card1Image || DEFAULT_HOME_DATA.card1Image,
        card2Title: data.card2Title || DEFAULT_HOME_DATA.card2Title,
        card2Description:
          data.card2Description || DEFAULT_HOME_DATA.card2Description,
        card2Image: data.card2Image || DEFAULT_HOME_DATA.card2Image,
        securityTag: data.securityTag ?? DEFAULT_HOME_DATA.securityTag,
        securityHeadingHighlight:
          data.securityHeadingHighlight ??
          DEFAULT_HOME_DATA.securityHeadingHighlight,
        securityHeading:
          data.securityHeading || DEFAULT_HOME_DATA.securityHeading,
        securityDescription:
          data.securityDescription || DEFAULT_HOME_DATA.securityDescription,
        securityImage: data.securityImage || DEFAULT_HOME_DATA.securityImage,
        statsTag: data.statsTag ?? DEFAULT_HOME_DATA.statsTag,
        statsHeading: data.statsHeading || DEFAULT_HOME_DATA.statsHeading,
        stats:
          Array.isArray(data.stats) && data.stats.length > 0
            ? data.stats.map((s, idx) => ({
                _key: s._key || `stat-${idx}`,
                icon: s.icon || DEFAULT_HOME_DATA.stats[idx]?.icon,
                stat: s.stat,
                unit: s.unit,
                label: s.label,
              }))
            : DEFAULT_HOME_DATA.stats,
        caseStudyTitle:
          data.caseStudyTitle || DEFAULT_HOME_DATA.caseStudyTitle,
        caseStudySubtitle:
          data.caseStudySubtitle || DEFAULT_HOME_DATA.caseStudySubtitle,
        caseStudyImage:
          data.caseStudyImage || DEFAULT_HOME_DATA.caseStudyImage,
        caseStudyCtaText:
          data.caseStudyCtaText || DEFAULT_HOME_DATA.caseStudyCtaText,
        caseStudyCtaLink:
          data.caseStudyCtaLink || DEFAULT_HOME_DATA.caseStudyCtaLink,

        // 07 · Testimonials
        testimonials:
          Array.isArray(data.testimonials) && data.testimonials.length > 0
            ? data.testimonials.map((t, idx) => ({
                _key: t._key || `t-${idx}`,
                name: t.name,
                role: t.role,
                quote: t.quote,
                image: t.image || DEFAULT_HOME_DATA.testimonials[idx]?.image,
              }))
            : DEFAULT_HOME_DATA.testimonials,

        // 08 · Calculate Section
        calculateHeading:
          data.calculateHeading || DEFAULT_HOME_DATA.calculateHeading,
        calculateImage:
          data.calculateImage || DEFAULT_HOME_DATA.calculateImage,

        // 09 · Billing Model
        billingTag: data.billingTag ?? DEFAULT_HOME_DATA.billingTag,
        billingHeadingHighlight:
          data.billingHeadingHighlight ??
          DEFAULT_HOME_DATA.billingHeadingHighlight,
        billingHeading:
          data.billingHeading || DEFAULT_HOME_DATA.billingHeading,
        billingDescription:
          data.billingDescription || DEFAULT_HOME_DATA.billingDescription,
        billingSteps:
          Array.isArray(data.billingSteps) && data.billingSteps.length > 0
            ? data.billingSteps.map((step, idx) => ({
                _key: step._key || `step-${idx}`,
                num: step.num,
                title: step.title,
                day: step.day,
                dayVariant: step.dayVariant,
                desc: step.desc,
              }))
            : DEFAULT_HOME_DATA.billingSteps,
        billingPoints:
          Array.isArray(data.billingPoints) && data.billingPoints.length > 0
            ? data.billingPoints
            : DEFAULT_HOME_DATA.billingPoints,

        // 10 · CTA Section
        ctaTag: data.ctaTag ?? DEFAULT_HOME_DATA.ctaTag,
        ctaHeading: data.ctaHeading || DEFAULT_HOME_DATA.ctaHeading,
        ctaPrimaryButtonText:
          data.ctaPrimaryButtonText || DEFAULT_HOME_DATA.ctaPrimaryButtonText,
        ctaPrimaryButtonLink:
          data.ctaPrimaryButtonLink || DEFAULT_HOME_DATA.ctaPrimaryButtonLink,
        ctaSecondaryButtonText:
          data.ctaSecondaryButtonText ||
          DEFAULT_HOME_DATA.ctaSecondaryButtonText,
        ctaSecondaryButtonLink:
          data.ctaSecondaryButtonLink ||
          DEFAULT_HOME_DATA.ctaSecondaryButtonLink,
        ctaBackgroundImage:
          data.ctaBackgroundImage || DEFAULT_HOME_DATA.ctaBackgroundImage,

        // 11 · SEO
        metaTitle: data.metaTitle || DEFAULT_HOME_DATA.metaTitle,
        metaDescription:
          data.metaDescription || DEFAULT_HOME_DATA.metaDescription,
      };
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch home page settings:', error);
  }

  return DEFAULT_HOME_DATA;
}
