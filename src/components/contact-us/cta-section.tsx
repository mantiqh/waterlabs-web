import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';
import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';

interface ContactUsCTASectionProps {
  heading?: string;
  headingHighlight?: string;
  buttonText?: string;
  buttonLink?: string;
  imageDesktop?: string;
  imageMobile?: string;
}

export const ContactUsCTASection = ({
  heading = DEFAULT_CONTACT_US_DATA.ctaHeading,
  headingHighlight = DEFAULT_CONTACT_US_DATA.ctaHeadingHighlight,
  buttonText = DEFAULT_CONTACT_US_DATA.ctaButtonText,
  buttonLink = DEFAULT_CONTACT_US_DATA.ctaButtonLink,
  imageDesktop = DEFAULT_CONTACT_US_DATA.ctaBackgroundImageDesktop ||
    '/images/contact-us/cta-section/img_start_building_waterlas_today.png',
  imageMobile = DEFAULT_CONTACT_US_DATA.ctaBackgroundImageMobile ||
    '/images/contact-us/cta-section/img_start_building_waterlas_today_mobile.png',
}: ContactUsCTASectionProps) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-ghost-white from-50% to-[#111111] to-50% overflow-hidden">
      {/* 
        Start Building CTA Section:
        - Desktop: 1440px, padding: 80px 60px, gap: 48px, border-radius: 0px 20px 20px 0px
        - Mobile: 402px, padding: 40px 20px, gap: 24px, border-radius: 0px 30px 30px 0px
        - Background: architectural image
        - Heading: "Start Building on Waterlabs today"
        - CTA: White button with dark text
      */}
      <div className="relative w-full rounded-r-[30px] lg:rounded-r-[20px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Background */}
          {imageDesktop && (
            <div className="hidden lg:block absolute inset-0">
              <Image
                src={imageDesktop}
                alt="Start Building on Waterlabs today"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          )}
          {/* Mobile Background */}
          {imageMobile && (
            <div className="block lg:hidden absolute inset-0">
              <Image
                src={imageMobile}
                alt="Start Building on Waterlabs today"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[20px]">
            {/* Heading */}
            <div className="flex flex-col justify-center items-start gap-[20px]">
              <h2 className="type-h3 tracking-[-0.01em] max-w-[873px]">
                <span className="text-white">
                  {heading}
                  {headingHighlight ? <br /> : null}
                </span>
                {headingHighlight && (
                  <span className="text-[#91C6F2]">
                    {headingHighlight}
                  </span>
                )}
              </h2>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link href={buttonLink}>
                <CTA variant="dark-bg">{buttonText}</CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsCTASection;
