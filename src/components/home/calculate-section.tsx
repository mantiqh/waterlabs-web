'use client';

import Image from 'next/image';
import React from 'react';

export const CalculateSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden p-0 m-0">
      {/* 
        The light blue card spans from the left screen edge (0px) attached directly to the top and bottom sections with 0 margin/padding on the left.
        - Left side: 0px (flat against the left screen edge, seamlessly attached to top/bottom curves).
        - Right side: Inset by 20px on mobile with rounded-tr-[30px] rounded-br-[30px] (80px on desktop).
      */}
      <div className="w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto bg-[#91C6F2] rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[80px] lg:rounded-br-[80px] px-[20px] md:px-[40px] py-[36px] sm:py-[48px] lg:pt-[80px] lg:pb-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] flex flex-col gap-[24px] sm:gap-[32px] lg:gap-[48px]">

        {/* Title Block */}
        <div className="w-full flex flex-col">
          <h2 className="type-h3 text-[#111111]">
            Calculate what you will save.<br />
            Use your real numbers.
          </h2>
        </div>

        {/* Calculator Image / Card */}
        <div className="w-full max-w-[1260px]">
          <div className="relative w-full aspect-[2520/1149] rounded-[16px] sm:rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
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
