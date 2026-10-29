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
      <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-[#042849] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Desktop Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/images/ROI/cta-section/img_bg_pre_footer.png"
            alt=""
            fill
            className="object-cover object-right"
          />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
          <Image
            src="/images/ROI/cta-section/img_bg_pre_footer_mobile (1).png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Content Container (Frame 21: max-w-[1320px] mx-auto) */}
        <div className="relative z-10 mx-auto w-full max-w-[1320px]">
          {/* Mobile / Tablet layout (< lg) */}
          <div className="flex flex-col items-start gap-[20px] lg:hidden">
            <h2 className="type-h3 max-w-[873px] tracking-[-0.01em]">
              <span className="text-aqua-mint block">Bring us one function.</span>
              <span className="text-white">
                Prior authorization, eligibility, denials. Whichever is costing you the most.
              </span>
            </h2>

            <div className="shrink-0 self-start pt-[4px]">
              <Link href="/contact-us" className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Get a demo
                </CTA>
              </Link>
            </div>
          </div>

          {/* Desktop layout (>= lg) */}
          <div className="hidden flex-col items-start lg:flex">
            <h2 className="type-h3 tracking-[-0.01em]">
              <span className="text-aqua-mint block">Bring us one function.</span>
              <span className="block text-white">Prior authorization, eligibility, denials.</span>
              <span className="flex items-center gap-[100px] xl:gap-[130px]">
                <span className="text-white">Whichever is costing you the most.</span>
                <Link href="/contact-us" className="inline-block shrink-0 font-normal not-italic">
                  <CTA variant="dark-bg" as="span">
                    Get a demo
                  </CTA>
                </Link>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICtaBanner;
