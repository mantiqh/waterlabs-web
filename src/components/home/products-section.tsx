'use client';

import Image from 'next/image';
import React from 'react';

import { CTA } from '@/components/CTA';

export const ProductsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#01191E] lg:bg-[#0E7FA8]">
      
      {/* Top White Section - Products */}
      <div className="w-full bg-white rounded-bl-[40px] lg:rounded-bl-[60px] px-[20px] lg:px-[60px] py-[60px] lg:py-[100px] flex justify-center">
        <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
          
          {/* Left Heading - Sticky Pin Animation on Desktop */}
          <div className="w-full lg:w-[440px] shrink-0 lg:sticky lg:top-[120px] self-start">
            <h2 className="font-primary font-normal text-[36px] sm:text-[44px] lg:text-[56px] leading-[1.15] tracking-[-0.01em]">
              <span className="text-[#111111] block">Two products.</span>
              <span className="text-[#111111] block">One system.</span>
              <span className="text-electric-blue block">Every stage of the cycle.</span>
            </h2>
          </div>

          {/* Right Products Stack */}
          <div className="flex flex-col gap-[60px] lg:gap-[80px] w-full lg:flex-1">
            
            {/* Product 1: HIMER AI OS */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="w-full relative rounded-[20px] lg:rounded-[24px] overflow-hidden aspect-[16/9] lg:aspect-[2/1] bg-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <Image 
                  src="/images/home/products-images/img_himer_ai_os.png" 
                  alt="HIMER AI OS" 
                  fill 
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-[16px] pt-[8px]">
                <div className="flex flex-col gap-[4px]">
                  <h3 className="font-primary font-normal text-[24px] lg:text-[32px] text-[#111111] leading-[1.25]">
                    HIMER AI OS
                  </h3>
                  <p className="font-secondary font-normal text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.4]">
                    Orchestrate and build through commands. Just describe your task.
                  </p>
                </div>
                <CTA variant="light-bg" className="shrink-0">
                  Explore HIMER
                </CTA>
              </div>
            </div>

            {/* Product 2: CurieCode */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="w-full relative rounded-[20px] lg:rounded-[24px] overflow-hidden aspect-[16/9] lg:aspect-[2/1] bg-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <Image 
                  src="/images/home/products-images/img_curiecode.png" 
                  alt="CurieCode" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-[16px] pt-[8px]">
                <div className="flex flex-col gap-[4px]">
                  <h3 className="font-primary font-normal text-[24px] lg:text-[32px] text-[#111111] leading-[1.25]">
                    CurieCode
                  </h3>
                  <p className="font-secondary font-normal text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.4]">
                    Optimize reimbursements through automated, intelligent medical coding.
                  </p>
                </div>
                <CTA variant="light-bg" className="shrink-0">
                  Explore CurieCode
                </CTA>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
