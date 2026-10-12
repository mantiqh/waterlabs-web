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
        className="w-full lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] relative bg-cover bg-no-repeat bg-center"
        style={{
          background:
            'linear-gradient(336.01deg, #63CCB7 1.87%, #0F68D6 62.61%)',
          backgroundImage:
            "url('/images/home/revenue-impact-calculator/desktop/bg_roi_calculator.png')",
        }}
      >
        <div className="relative z-10 w-full max-w-[1260px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[32px] lg:gap-[40px]">
          
          {/* =========================================================
              LEFT COLUMN: Eyebrow + Heading + Body + CTA Button
             ========================================================= */}
          <div className="w-full lg:flex-1 lg:max-w-[696px] flex flex-col items-start gap-[20px]">
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                {eyebrow}
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-[12px] lg:gap-[20px] w-full">
              <h2 className="type-h2 tracking-[-0.01em] text-white max-w-[696px]">
                {heading}
              </h2>
              <p className="type-body-xxs tracking-[0.01em] text-[#F4F6F9] max-w-[696px]">
                {description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-[4px] lg:pt-[8px]">
              <Link href={ctaLink}>
                <CTA variant="dark-bg">
                  {ctaText}
                </CTA>
              </Link>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Tablet Artwork Preview Card
             ========================================================= */}
          <div className="relative w-full lg:w-[42%] xl:w-[524px] h-[280px] sm:h-[340px] lg:h-[360px] xl:h-[422px] rounded-[20px] overflow-hidden shrink-0 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
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

