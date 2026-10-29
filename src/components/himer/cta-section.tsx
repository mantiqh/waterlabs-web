import Link from 'next/link';

import { CTA } from '@/components/CTA';
import { HIMER_FINAL_CTA_DATA } from '@/data/himer';

export const HimerCTASection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white from-40% to-[#111111] to-40%">
      {/*
        CTA Card with Top-Left and Bottom-Left Curves (Figma node 8301:11874):
        - Desktop: radii [60, 0, 0, 60], padding [40, 60, 40, 60]
        - Mobile: radii [30, 0, 0, 30], padding [40, 20, 40, 20]
        - Top-left curve reveals the white background from the section above.
        - Bottom-left curve reveals the #111111 black background connecting into Footer.
      */}
      <div className="bg-ghost-white text-gray-black w-full rounded-tl-[30px] rounded-bl-[30px] py-10 md:py-10 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-10">
        <div className="layout-container">
          <div className="flex flex-col gap-3 md:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            {/* Left Column: Headline and Description */}
            <div className="flex flex-col gap-5 lg:max-w-3xl">
              <h2 className="type-h2 text-gray-black font-normal tracking-tight max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                <span className="text-electric-blue">Bring us one function </span>
                <br className="hidden sm:inline" />
                <span>you want running itself.</span>
              </h2>
              <p className="type-body-xxs text-charcoal max-w-2xl max-md:text-sm max-md:leading-6">
                {HIMER_FINAL_CTA_DATA.subtext}
              </p>
            </div>

            {/* Right Column: Get a demo button aligned to the bottom end */}
            <div className="flex shrink-0 justify-start md:pb-1 lg:justify-end">
              <Link href={HIMER_FINAL_CTA_DATA.ctaHref}>
                <CTA variant="light-bg" size="compact-mobile" as="span">
                  <span>{HIMER_FINAL_CTA_DATA.ctaText}</span>
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerCTASection;
