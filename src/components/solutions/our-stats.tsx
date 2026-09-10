'use client';

import Image from 'next/image';
import React from 'react';

export const OurStatsSection: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180.75deg, #1C5265 -2.97%, #FFFFFF 101.15%)',
      }}
    >
      {/*
        Our Stats + Human in the Loop Section:
        - Outer: gradient #1C5265 → #FFFFFF
        - Inner: white bg, border-radius: 0 60px 60px 0 (right-side rounding)
        - Desktop: padding 80px 60px, gap 60px
        - Mobile: padding 40px 20px, gap 32px
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[40px] lg:gap-[60px]">

          {/* ── OUR STATS ── */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            {/* Section Heading */}
            <h3 className="type-h3 text-electric-blue">Our Stats</h3>

            {/* Stats Card */}
            <div className="w-full bg-ghost-white rounded-[20px] p-[20px] md:p-[32px] lg:p-[40px] flex flex-col lg:flex-row gap-[24px] lg:gap-[40px]">
              {/* Stat 1 */}
              <div className="flex-1 flex flex-col gap-[8px] lg:gap-[12px]">
                <h3 className="type-h3 text-black">4 days to 1 day</h3>
                <p className="type-body-xs text-charcoal">verification turnaround</p>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] lg:w-[1px] lg:h-auto bg-light-gray" />

              {/* Stat 2 */}
              <div className="flex-1 flex flex-col gap-[8px] lg:gap-[12px]">
                <h3 className="type-h3 text-black">75%</h3>
                <p className="type-body-xxs text-charcoal">faster in a behavioral health deployment.</p>
              </div>
            </div>
          </div>

          {/* ── HUMAN IN THE LOOP ── */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-[32px]">
            {/* Left: Text Content */}
            <div className="w-full lg:flex-1 lg:max-w-[644px] flex flex-col justify-center gap-[16px] lg:gap-[20px]">
              <h3 className="type-h3 text-[#111111]">
                <span className="text-[#0F68D6]">Human in the loop,</span> by design
              </h3>
              <p className="type-body-xs text-[#111111] max-w-[644px]">
                When coverage is ambiguous, our agents route it to your team instead of guessing. Coordination of benefits issues, unclear plans, or patients needing a conversation about what they owe are handled. The payer response and verification history arrive attached.
              </p>
            </div>

            {/* Right: Image */}
            <div className="w-full lg:flex-1 lg:max-w-[644px]">
              {/* Desktop Image (644x309 aspect ratio, entire image visible) */}
              <div className="hidden lg:block relative w-full aspect-[644/309] rounded-[30px_10px_30px_30px] overflow-hidden">
                <Image
                  src="/images/solutions/human-in-the-loop/img_human_in_the_loop.png"
                  alt="Human reviewing ambiguous coverage verification results"
                  fill
                  priority
                  sizes="(max-width: 1440px) 50vw, 644px"
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile / Tablet Image (362x156 aspect ratio, entire image visible) */}
              <div className="block lg:hidden relative w-full aspect-[362/156] rounded-[20px_10px_20px_20px] overflow-hidden">
                <Image
                  src="/images/solutions/human-in-the-loop/img_human_in_the_loop_mobile%20(1).png"
                  alt="Human reviewing ambiguous coverage verification results"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 644px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStatsSection;
