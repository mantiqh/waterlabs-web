import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const PhilosophyCTASection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50% p-0">
      {/* 
        Top Frame Container (Figma Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 288px, background #0F68D6, rounded-tr-[60px] rounded-br-[60px], padding: 60px
        - Mobile: 402px x 246px, background #0F68D6, rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px
      */}
      <div className="flex w-full items-center overflow-hidden rounded-tr-[30px] rounded-br-[30px] rounded-bl-[0px] bg-[#0F68D6] px-[20px] py-[40px] md:px-[40px] md:py-[48px] lg:h-[240px] lg:rounded-tr-[20px] lg:rounded-br-[0px] lg:rounded-bl-[20px] lg:px-[60px] lg:py-0">
        {/* Content Container (Frame 21: max-w-[1320px]) */}
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Text Block */}
          <div className="flex flex-col gap-[8px] lg:gap-[12px]">
            <h2 className="sm:type-h2 text-[23px] leading-[29px] tracking-[-0.01em] text-white min-[375px]:text-[25px] min-[375px]:leading-[31px] sm:leading-[60px]">
              See what Waterlabs would do <br className="hidden md:block" />
              on your numbers.
            </h2>
          </div>

          {/* CTA Button */}
          <div className="flex shrink-0 items-center">
            <Link href="/contact-us" className="inline-block">
              <CTA variant="dark-bg" as="div">
                GET A DEMO
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyCTASection;
