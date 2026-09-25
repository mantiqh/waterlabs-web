import type { ContactUsPageData } from '@/types/contact-us';

export const DEFAULT_CONTACT_US_DATA: ContactUsPageData = {
  // 01 · Hero Section
  heroHeading: 'Your revenue cycle, on our numbers',
  heroHeadingHighlight: 'on our numbers',
  heroSubheading:
    'Bring us the function that is hurting most. In 15 minutes we will show you what changes, what it costs, and how quickly it goes live.',
  heroCtaText: 'Get a Demo',
  heroCtaLink: '#contact-form',
  heroImageDesktop: '/images/contact-us/hero-section/img_banner%20(3).png',
  heroImageMobile: '/images/contact-us/hero-section/img_banner_mobile.png',

  // 02 · Operating Info & Locations
  locations: [
    {
      _key: 'loc-us',
      tag: 'Operating Info - United States',
      title: 'Waterlabs Inc.',
      address: '1201 Orange Street, Suite 600,\nWilmington, DE 19801',
      email: 'info@waterlabs.ai',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
      buttonText: 'Get Directions',
      href: 'https://maps.google.com/?q=1201+Orange+Street+Suite+600+Wilmington+DE+19801',
    },
    {
      _key: 'loc-in',
      tag: 'Operating Info - India',
      title: 'Waterlabs Inc.',
      address: '19th Floor, Tower A, Brigade Signature Towers,\nBangalore, KA – 560049',
      email: 'info@waterlabs.ai',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM IST',
      buttonText: 'Get Directions',
      href: 'https://maps.google.com/?q=Brigade+Signature+Towers+Bangalore',
    },
  ],
  operatingInfoBgImage:
    '/images/contact-us/operating-info/img_abstract_contact%20us_info_section.png',

  // 03 · Contact Form
  formTag: 'Send us a message',
  formHeading: 'Contact Form',
  formImage: '/images/contact-us/contact-form/contact-form.jpg',
  orgTypeOptions: [
    'Health system',
    'Medical Group',
    'Community Health Center',
    'Outpatient Facility',
    'Hospital',
    'Other',
  ],
  newsletterHeading:
    'Stay ahead of the curve. Sign up to receive exclusive Waterlabs updates, resources, and tips.',
  consentText: 'I agree to receive other communications from Waterlabs.*',
  disclaimerText:
    'You may unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.',
  submitButtonText: 'Submit',

  // 04 · CTA Section
  ctaHeading: 'Start Building',
  ctaHeadingHighlight: 'on Waterlabs today',
  ctaButtonText: 'Start Building',
  ctaButtonLink: '/#discover',
  ctaBackgroundImageDesktop:
    '/images/contact-us/cta-section/img_start_building_waterlas_today.png',
  ctaBackgroundImageMobile:
    '/images/contact-us/cta-section/img_start_building_waterlas_today_mobile.png',

  // 05 · SEO
  metaTitle: 'Contact Us | Waterlabs AI',
  metaDescription:
    'Get in touch with Waterlabs AI. Contact us for questions, partnerships, or to learn more about our agentic AI solutions for healthcare revenue cycle management.',
};

export function getDefaultContactUsData(): ContactUsPageData {
  return DEFAULT_CONTACT_US_DATA;
}
