import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';
import { sanityFetch } from '@/sanity/lib/fetch';
import { contactUsPageQuery } from '@/sanity/lib/queries';
import type { ContactUsPageData } from '@/types/contact-us';

/**
 * Fetches contact us page configuration from Sanity CMS,
 * with full fallback to local static data if unpublished or unavailable.
 */
export async function fetchContactUsPageSettings(): Promise<ContactUsPageData> {
  try {
    const data = await sanityFetch<Partial<ContactUsPageData> | null>({
      query: contactUsPageQuery,
      tags: ['contactUsPage'],
      revalidate: 60,
    });

    if (data) {
      return {
        // 01 · Hero Section
        heroHeading: data.heroHeading || DEFAULT_CONTACT_US_DATA.heroHeading,
        heroHeadingHighlight:
          data.heroHeadingHighlight ?? DEFAULT_CONTACT_US_DATA.heroHeadingHighlight,
        heroSubheading: data.heroSubheading || DEFAULT_CONTACT_US_DATA.heroSubheading,
        heroCtaText: data.heroCtaText || DEFAULT_CONTACT_US_DATA.heroCtaText,
        heroCtaLink: data.heroCtaLink || DEFAULT_CONTACT_US_DATA.heroCtaLink,
        heroImageDesktop:
          data.heroImageDesktop || DEFAULT_CONTACT_US_DATA.heroImageDesktop,
        heroImageMobile:
          data.heroImageMobile || DEFAULT_CONTACT_US_DATA.heroImageMobile,

        // 02 · Operating Info & Locations
        locations:
          Array.isArray(data.locations) && data.locations.length > 0
            ? data.locations.map((loc, idx) => ({
                _key: loc._key || `loc-${idx}`,
                tag: loc.tag || '',
                title: loc.title || 'Waterlabs Inc.',
                address: loc.address || '',
                email: loc.email || 'info@waterlabs.ai',
                hours: loc.hours || '',
                buttonText: loc.buttonText || 'Get Directions',
                href: loc.href || '#',
              }))
            : DEFAULT_CONTACT_US_DATA.locations,
        operatingInfoBgImage:
          data.operatingInfoBgImage || DEFAULT_CONTACT_US_DATA.operatingInfoBgImage,

        // 03 · Contact Form
        formTag: data.formTag ?? DEFAULT_CONTACT_US_DATA.formTag,
        formHeading: data.formHeading || DEFAULT_CONTACT_US_DATA.formHeading,
        formImage: data.formImage || DEFAULT_CONTACT_US_DATA.formImage,
        orgTypeOptions:
          Array.isArray(data.orgTypeOptions) && data.orgTypeOptions.length > 0
            ? data.orgTypeOptions
            : DEFAULT_CONTACT_US_DATA.orgTypeOptions,
        newsletterHeading:
          data.newsletterHeading ?? DEFAULT_CONTACT_US_DATA.newsletterHeading,
        consentText: data.consentText ?? DEFAULT_CONTACT_US_DATA.consentText,
        disclaimerText: data.disclaimerText ?? DEFAULT_CONTACT_US_DATA.disclaimerText,
        submitButtonText:
          data.submitButtonText || DEFAULT_CONTACT_US_DATA.submitButtonText,

        // 04 · CTA Section
        ctaHeading: data.ctaHeading || DEFAULT_CONTACT_US_DATA.ctaHeading,
        ctaHeadingHighlight:
          data.ctaHeadingHighlight ?? DEFAULT_CONTACT_US_DATA.ctaHeadingHighlight,
        ctaButtonText: data.ctaButtonText || DEFAULT_CONTACT_US_DATA.ctaButtonText,
        ctaButtonLink: data.ctaButtonLink || DEFAULT_CONTACT_US_DATA.ctaButtonLink,
        ctaBackgroundImageDesktop:
          data.ctaBackgroundImageDesktop ||
          DEFAULT_CONTACT_US_DATA.ctaBackgroundImageDesktop,
        ctaBackgroundImageMobile:
          data.ctaBackgroundImageMobile ||
          DEFAULT_CONTACT_US_DATA.ctaBackgroundImageMobile,

        // 05 · SEO
        metaTitle: data.metaTitle || DEFAULT_CONTACT_US_DATA.metaTitle,
        metaDescription:
          data.metaDescription || DEFAULT_CONTACT_US_DATA.metaDescription,
      };
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch contact us page settings:', error);
  }

  return DEFAULT_CONTACT_US_DATA;
}
