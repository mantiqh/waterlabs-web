import Image from 'next/image';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

interface ContactUsHeroSectionProps {
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  imageDesktop?: string;
  imageMobile?: string;
}

export const ContactUsHeroSection = ({
  heading = 'Your revenue cycle, on our numbers',
  headingHighlight = 'on our numbers',
  subheading = 'Bring us the function that is hurting most. In 15 minutes we will show you what changes, what it costs, and how quickly it goes live.',
  ctaText = 'Get a Demo',
  ctaLink = '#contact-form',
  imageDesktop = '/images/contact-us/hero-section/img_banner%20(3).png',
  imageMobile = '/images/contact-us/hero-section/img_banner_mobile.png',
}: ContactUsHeroSectionProps) => {
  const renderHeading = () => {
    if (headingHighlight && heading.includes(headingHighlight)) {
      const parts = heading.split(headingHighlight);
      return (
        <>
          {parts[0]}
          <span className="text-electric-blue">{headingHighlight}</span>
          {parts.slice(1).join(headingHighlight)}
        </>
      );
    }
    return heading;
  };

  return (
    <section className="relative w-full bg-white">
      {/* 
        Contact Us Hero Banner:
        - Desktop: 1440px x 550px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Mobile: 402px x 490px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient overlay on hero image with decorative glassmorphic shape
      */}
      <div className="relative flex min-h-[490px] w-full flex-col justify-between gap-[10px] rounded-bl-[30px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] lg:h-[550px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop Background */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src={imageDesktop}
              alt="Contact Us Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile/Tablet Background */}
          <div className="absolute inset-0 block lg:hidden">
            <Image
              src={imageMobile}
              alt="Contact Us Background Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Hero Content (Desktop: Frame 8 / Frame 12 / Frame 2147203284, Mobile: Bottom aligned) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-grow flex-col items-start justify-end pt-[32px] lg:justify-center">
          {/* Content Block (Mobile: gap-12, Desktop: Frame 2147226510 gap-20) */}
          <div className="flex w-full max-w-[664px] flex-col items-start gap-[12px] lg:gap-[20px]">
            {/* Heading + Subheading Stack (Frame 2147226524 gap-12) */}
            <div className="flex w-full flex-col items-start gap-[12px]">
              {/* Heading (Mobile: 32px / 40px, Desktop: type-h2, #111111) */}
              <h2 className="type-h2 tracking-[-0.01em] text-[#111111] max-md:text-[32px] max-md:leading-[40px]">
                {renderHeading()}
              </h2>
              {/* Subheading (20px / 28px, #2A2A2A) */}
              <p className="type-body-s max-w-[540px] text-[#2A2A2A] lg:max-w-[664px]">
                {subheading}
              </p>
            </div>

            {/* CTA Button */}
            <a href={ctaLink}>
              <CTA variant="light-bg">{ctaText}</CTA>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHeroSection;
