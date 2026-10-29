import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export interface RevenueImpactSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const RevenueImpactSection = ({
  eyebrow = 'Revenue Impact Calculator',
  heading = 'See what your revenue cycle really costs you, and what it could return.',
  description = 'Answer a few questions in under 60 seconds to quantify the financial impact of agentic AI on your operations, then get a free assessment from one of our experts.',
  ctaText = 'Calculate your savings',
  ctaLink = '/roi',
}: RevenueImpactSectionProps) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F4F6F9 0%, #FFFFFF 100%)',
      }}
    >
      {/* 
        Curved Container (Figma node 7487-16840 desktop, 7487-17231 mobile):
        - Desktop: width min(100vw-60px, 50vw+660px) aligning to 1320px content grid right edge
        - Mobile: w-full
        - Corner radii: rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] (kept untouched)
        - Background: linear-gradient(336.01deg, #63CCB7 1.87%, #0F68D6 62.61%) with texture overlay
      */}
      <div
        className="relative mr-auto w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] lg:w-[min(calc(100vw-60px),calc(50vw+660px))] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-[80px] lg:pr-[60px] lg:pl-[max(60px,calc((100vw-1320px)/2))]"
        style={{
          background: 'linear-gradient(155deg, #0A60AF 0%, #0F68D6 30%, #168BB6 65%, #46D4B0 100%)',
        }}
      >
        <div className="relative z-10 flex w-full max-w-[1260px] flex-col items-start justify-between gap-[32px] lg:flex-row lg:items-center lg:gap-[40px]">
          {/* =========================================================
              LEFT COLUMN: Eyebrow + Heading + Body + CTA Button
             ========================================================= */}
          <div className="flex w-full flex-col items-start gap-[20px] lg:max-w-[696px] lg:flex-1">
            {/* Tag / Eyebrow */}
            <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
              <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">{eyebrow}</span>
            </div>

            {/* Title & Description */}
            <div className="flex w-full flex-col gap-[12px] lg:gap-[20px]">
              <h2 className="type-h2 max-w-[696px] tracking-[-0.01em] text-white">{heading}</h2>
              <p className="type-body-xxs max-w-[696px] tracking-[0.01em] text-[#F4F6F9]">
                {description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-[4px] lg:pt-[8px]">
              <Link href={ctaLink}>
                <CTA variant="dark-bg">{ctaText}</CTA>
              </Link>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Tablet Artwork Preview Card
             ========================================================= */}
          <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:h-[340px] lg:h-[360px] lg:w-[42%] xl:h-[422px] xl:w-[524px]">
            <Image
              src="/images/home/revenue-impact-calculator/desktop/img_roi_calculator.png"
              alt="Revenue Impact Calculator"
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 42vw, 524px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueImpactSection;
