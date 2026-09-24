import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const ROICtaBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#F4F6F9_0%,#111111_100%)] lg:bg-[linear-gradient(180deg,#FFFFFF_0%,#111111_100%)]">
      {/*
        CTA Banner Section (Figma Specifications):
        - Outer: gradient #FFFFFF (desktop) / #F4F6F9 (mobile) to #111111
        - Inner Card: Frame 1272628356, rounded-tr-[30px] rounded-br-[30px], bg-[#042849]
        - Desktop: padding 80px 60px, gap 48px
        - Mobile: padding 40px 20px, gap 24px
        - Heading: "Bring us one function. Prior authorization, eligibility, denials. Whichever is costing you the most." (type-h3, #63CCB7)
        - Button: "Get a Demo" (white pill, dark text, dark arrow)
      */}
      <div className="relative w-full bg-[#042849] rounded-tr-[30px] rounded-br-[30px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px] flex flex-col justify-center overflow-hidden">
        {/* Desktop Background Image */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/ROI/cta-section/img_bg_pre_footer.png"
            alt=""
            fill
            className="object-cover object-right"
          />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="block lg:hidden absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/ROI/cta-section/img_bg_pre_footer_mobile (1).png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Content Container (Frame 21: max-w-[1320px] mx-auto) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[20px] lg:gap-[40px]">
          {/* Frame 1272628347 Heading */}
          <h2 className="type-h3 tracking-[-0.01em] max-w-[873px]">
            <span className="text-aqua-mint block">Bring us one function.</span>
            <span className="text-white">
              Prior authorization, eligibility, denials. Whichever is costing you the most.
            </span>
          </h2>

          {/* CTA Button */}
          <div className="shrink-0 self-start lg:self-end pt-[4px] lg:pt-0">
            <Link href="/contact-us" className="inline-block">
              <CTA variant="dark-bg" as="div">
                Get a demo
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICtaBanner;
