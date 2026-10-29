import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const TrustCTASection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-[#DBE2F0] p-0">
      {/* 
        Main Dark CTA Card with top-right curve:
        - Desktop: Frame 1272628356 (width: 1440px, height: 444px, padding: 80px 60px, rounded-tr-[80px])
        - Mobile: padding: 40px 20px, rounded-tr-[30px] rounded-br-none, min-h-[350px]
        - Top-right curve reveals the #DBE2F0 background from the Certifications section.
      */}
      <div className="relative flex min-h-[350px] w-full flex-col justify-center overflow-hidden rounded-tr-[30px] rounded-br-none bg-[#000000] px-[20px] py-[40px] md:px-[40px] lg:h-[444px] lg:rounded-tr-[80px] lg:px-[60px] lg:py-[80px]">
        {/* Desktop Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/images/trust-and-security/cta-section/img_trust_cta_desktop.png"
            alt="Trust & Security CTA Desktop Background"
            fill
            priority
            className="object-cover object-right"
          />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
          <Image
            src="/images/trust-and-security/cta-section/cta-mobile.png"
            alt="Trust & Security CTA Mobile Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content Container (Frame 21: max-w 1320px, height 284px on desktop) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[28px] lg:flex-row lg:items-end lg:gap-[40px]">
          {/* Left Text Block (Frame 2147203251: width 873px, height 284px) */}
          <div className="flex w-full flex-col items-start justify-center gap-[16px] lg:w-[873px] lg:gap-[20px]">
            {/* Frame 17: Tagline */}
            <div className="flex max-w-full flex-row items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
              <span className="type-body-xxs tracking-[0.01em] text-white">
                Don&apos;t just automate your revenue cycle. Apply intelligence to it.
              </span>
            </div>

            {/* Display/H3 Heading with #91C6F2 accent for "Ours has answers." */}
            <h2 className="type-h3 tracking-[-0.01em]">
              <span className="text-white">
                Your security team
                <br />
                probably has questions.
                <br />
              </span>
              <span className="text-[#91C6F2]">Ours has answers.</span>
            </h2>

            {/* Subtext */}
            <p className="type-body-s max-w-[873px] text-[#F4F6F9]">
              Send us your questionnaire, your review,
              <br className="hidden sm:inline" /> your hardest questions. Or{' '}
              <Link
                href="mailto:security@waterlabs.ai"
                className="transition-colors hover:text-white"
              >
                contact us here
              </Link>
              .
            </p>
          </div>

          {/* Frame 3 / Frame 7: Right CTA Action Button (Blue pill with white text & light blue arrow) */}
          <div className="shrink-0 self-start pt-[8px] lg:self-end lg:pt-0">
            <Link href="mailto:security@waterlabs.ai">
              <CTA variant="light-bg">Talk to our security team</CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustCTASection;
