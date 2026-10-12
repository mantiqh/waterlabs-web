import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const CTASection = ({
  eyebrow = 'Start Automation with any Functional area of RCM',
  heading = 'Hand us the areas draining the most margin: prior authorization, eligibility, denials, or the whole cycle at once. You pick the pace.',
  ctaText = 'Schedule a Demo',
  ctaLink = '/contact-us',
}: CTASectionProps) => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* 
        Curved Container (Figma node 7487-16986 desktop, 7487-17280 mobile):
        - Desktop: 1440x388, padding 60px, gap 48px, border-radius 0 60px 0 0
        - Mobile: 402x415, padding 40px 20px, gap 24px, border-radius 0 30px 30px 0 (preserved as rounded-tr)
      */}
      <div className="relative w-full min-h-[415px] lg:min-h-[388px] lg:h-[388px] rounded-tr-[30px] lg:rounded-tr-[60px] p-[40px_20px] lg:p-[60px] flex flex-col justify-end overflow-hidden">
        {/* Background Desktop */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/home/cta-section/desktop/bg_start_automation.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Background Mobile */}
        <div className="block lg:hidden absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/home/cta-section/mobile/bg_start_automation (1).png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container (1320x268 desktop, 362x270 mobile) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col gap-[12px] lg:gap-[20px]">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
            <span className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
              {eyebrow}
            </span>
          </div>

          {/* Heading + Action Button */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[20px]">
            <h2 className="type-h3 tracking-[-0.01em] text-white max-w-[873px]">
              {heading}
            </h2>

            <div className="shrink-0">
              <Link href={ctaLink}>
                <CTA
                  variant="dark-bg"
                  className="h-[38px] px-[12px] lg:h-[44px] lg:px-[20px]"
                >
                  {ctaText}
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
