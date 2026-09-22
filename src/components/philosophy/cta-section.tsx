import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const PhilosophyCTASection = () => {
  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        Top Frame Container (Figma Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 288px, background #0F68D6, rounded-tr-[60px] rounded-br-[60px], padding: 60px
        - Mobile: 402px x 246px, background #0F68D6, rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tr-[30px] rounded-bl-[0px] rounded-br-[30px] lg:rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-br-[0px] py-[40px] px-[20px] md:py-[48px] md:px-[40px] lg:py-0 lg:px-[60px] lg:h-[240px] flex items-center overflow-hidden">
        
        {/* Content Container (Frame 21: max-w-[1320px]) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[20px]">
          
          {/* Text Block */}
          <div className="flex flex-col gap-[8px] lg:gap-[12px]">
            <h2 className="type-h2 text-white tracking-[-0.01em]">
              See what Waterlabs would do
              <br />
              on your numbers.
            </h2>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 flex items-center">
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
