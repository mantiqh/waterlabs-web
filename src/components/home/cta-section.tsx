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
    <section className="relative w-full overflow-hidden bg-white">
      {/* 
        Curved Container (Figma node 7487-16986 desktop, 7487-17280 mobile):
        - Desktop: 1440x388, padding 60px, gap 48px, border-radius 0 60px 0 0
        - Mobile: 402x415, padding 40px 20px, gap 24px, border-radius 0 30px 30px 0 (preserved as rounded-tr)
      */}
      <div className="relative flex min-h-[415px] w-full flex-col justify-end overflow-hidden rounded-tr-[30px] p-[40px_20px] lg:h-[388px] lg:min-h-[388px] lg:rounded-tr-[60px] lg:p-[60px]">
        {/* Background Desktop */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
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
        <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-[12px] lg:gap-[20px]">
          {/* Eyebrow / Tag */}
          <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
            <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">{eyebrow}</span>
          </div>

          {/* Heading + Action Button */}
          <div className="flex flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-end">
            <h2 className="type-h3 max-w-[873px] tracking-[-0.01em] text-white">{heading}</h2>

            <div className="shrink-0">
              <Link href={ctaLink}>
                <CTA variant="dark-bg">{ctaText}</CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
