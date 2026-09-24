import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';
import type { ContactUsPageData } from '@/types/contact-us';

import ContactUsContactForm from './contact-form';
import ContactUsCTASection from './cta-section';
import ContactUsHeroSection from './hero-section';
import ContactUsOperatingInfo from './operating-info';

interface ContactUsPageProps {
  data?: ContactUsPageData;
}

export const ContactUsPage = ({
  data = DEFAULT_CONTACT_US_DATA,
}: ContactUsPageProps) => {
  return (
    <main className="w-full flex flex-col">
      <ContactUsHeroSection
        heading={data.heroHeading}
        headingHighlight={data.heroHeadingHighlight}
        subheading={data.heroSubheading}
        ctaText={data.heroCtaText}
        ctaLink={data.heroCtaLink}
        imageDesktop={data.heroImageDesktop}
        imageMobile={data.heroImageMobile}
      />
      <ContactUsOperatingInfo
        locations={data.locations}
        bgImage={data.operatingInfoBgImage}
      />
      <ContactUsContactForm
        tag={data.formTag}
        heading={data.formHeading}
        image={data.formImage}
        orgTypeOptions={data.orgTypeOptions}
        newsletterHeading={data.newsletterHeading}
        consentText={data.consentText}
        disclaimerText={data.disclaimerText}
        submitButtonText={data.submitButtonText}
      />
      <ContactUsCTASection
        heading={data.ctaHeading}
        headingHighlight={data.ctaHeadingHighlight}
        buttonText={data.ctaButtonText}
        buttonLink={data.ctaButtonLink}
        imageDesktop={data.ctaBackgroundImageDesktop}
        imageMobile={data.ctaBackgroundImageMobile}
      />
    </main>
  );
};

export default ContactUsPage;
