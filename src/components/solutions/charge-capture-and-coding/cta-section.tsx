import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const ChargeCaptureCTASection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
      }}
    >
      {/*
        CTA Banner Section:
        - Outer: gradient #FFFFFF → #111111
        - Inner: #0F68D6, border-radius: 0 30px 30px 30px (desktop) / 0 30px 30px 0 (mobile)
        - Desktop: padding 60px, gap 20px
        - Mobile: padding 40px 20px, gap 24px
      */}
      <div className="bg-electric-blue w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[50px] lg:rounded-bl-[30px] lg:px-[60px] lg:py-[60px]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Heading */}
          <h2 className="type-h2 max-w-[1148px] text-white">
            Discover how this works on <br className="hidden lg:block" />
            your coding queue.
          </h2>

          {/* CTA Button */}
          <div className="shrink-0">
            <Link href="/contact-us">
              <CTA variant="dark-bg">Get a Demo</CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargeCaptureCTASection;
