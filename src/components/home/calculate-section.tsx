'use client';

import Image from 'next/image';
import React from 'react';

export const CalculateSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* 
        The light blue card spans from the left screen edge (0px) to the right edge of the 1320px container (1380px total width).
        On screens >= 1440px, the inner content stays aligned with the centered 1320px container, while the right corners curve at 80px.
      */}
      <div className="w-full lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto bg-[#91C6F2] rounded-tr-[40px] rounded-br-[40px] lg:rounded-tr-[80px] lg:rounded-br-[80px] px-[20px] py-[60px] lg:pt-[80px] lg:pb-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] flex flex-col gap-[32px] lg:gap-[48px]">

        {/* Title Block */}
        <div className="w-full flex flex-col">
          <h2 className="display-h2 tracking-[-0.01em] text-[#111111]">
            Calculate what you will save.<br />
            Use your real numbers.
          </h2>
        </div>

        {/* Calculator Image / Card */}
        <div className="w-full max-w-[1260px]">
          <div className="relative w-full aspect-[2520/1149] rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/home/calculate-img/img_calcluate_what_you_will_save.png"
              alt="Calculate what you will save - ROI Estimator"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1260px"
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CalculateSection;
