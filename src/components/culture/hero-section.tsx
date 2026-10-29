import Image from 'next/image';

import Navbar from '@/components/common/navbar';

export const CultureHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6F9]">
      {/* 
        Culture Hero Banner (Figma Specifications):
        - Desktop: 1440px x 653px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px, gap: 32px
        - Mobile: border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)
        - Typography Rules:
          - No manual font breakpoints; centralized typography tokens (type-h1, type-body-s, type-body-xxs)
          - No <h1> tag (semantic <h2> with type-h1)
      */}
      <div
        className="relative flex min-h-[620px] w-full flex-col justify-between gap-[24px] overflow-hidden rounded-bl-[30px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[28px] md:pb-[50px] lg:h-[653px] lg:gap-[32px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)',
        }}
      >
        {/* Background Banner Graphic */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          <Image
            src="/images/culture/hero-section/banner%20(4).png"
            alt="Culture Hero Background"
            fill
            priority
            className="object-cover object-bottom opacity-60 mix-blend-overlay"
          />
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Introduction Section (1320px x 441px) */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1320px] flex-1 flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[32px] xl:gap-[40px]">
          {/* Left Column: Introduction Content (order-2 on small screens, order-1 on desktop) */}
          <div className="order-2 flex w-full min-w-0 flex-col items-start justify-center gap-[16px] lg:order-1 lg:w-1/2 lg:gap-[20px] xl:w-[650px]">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                People &amp; Culture
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="type-h1 text-white">Built by people who stayed close to the problem.</h2>

            {/* Subtext Paragraph */}
            <p className="type-body-s max-w-[650px] leading-relaxed text-[#F4F6F9]">
              Waterlabs is a technology company with people at its center. We built our culture like
              our product, around ownership. You get clear expectations, real feedback, and room to
              do work that matters. In return, we ask one thing. Own the outcome.
            </p>
          </div>

          {/* Right Column: Introduction Image Card (order-1 on small screens, order-2 on desktop) */}
          <div className="relative order-1 h-[300px] w-full shrink-0 overflow-hidden rounded-[20px] shadow-lg sm:h-[380px] lg:order-2 lg:h-[420px] lg:w-1/2 xl:h-[441px] xl:w-[650px]">
            <Image
              src="/images/culture/hero-section/introduction_banner.png"
              alt="People at Waterlabs"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 650px"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureHeroSection;
