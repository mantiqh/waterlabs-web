'use client';

import Image from 'next/image';
import React from 'react';

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export const ProductsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0E7FA8]">
      
      {/* Top White Section - Products */}
      <div className="w-full bg-white rounded-bl-[40px] lg:rounded-bl-[60px] px-[20px] py-[60px] lg:py-[60px] flex justify-center">
        <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
          
          {/* Left Heading */}
          <div className="w-full lg:w-[420px] shrink-0">
            <h2 className="font-primary font-normal text-[36px] lg:text-[52px] leading-[1.2] lg:leading-[1.15] tracking-[-0.01em]">
              <span className="text-[#2A2A2A] block">Two products.</span>
              <span className="text-[#2A2A2A] block">One system.</span>
              <span className="text-electric-blue block">Every stage of the cycle.</span>
            </h2>
          </div>

          {/* Right Products Stack */}
          <div className="flex flex-col gap-[40px] w-full lg:flex-1">
            
            {/* Product 1: HIMER AI OS */}
            <div className="flex flex-col gap-[16px] w-full">
              <div className="w-full relative rounded-[20px] overflow-hidden aspect-[16/9] lg:aspect-[2/1] bg-gray-100">
                <Image src="/images/home/products-images/img_himer_ai_os.png" alt="HIMER AI OS" fill className="object-cover" />
              </div>
              <div className="flex flex-row items-center justify-between w-full gap-[16px]">
                <div className="flex flex-col">
                  <h3 className="font-primary text-[24px] lg:text-[32px] text-[#2A2A2A] leading-[1.25]">HIMER AI OS</h3>
                  <p className="font-inter text-[16px] lg:text-[20px] text-[#2A2A2A] leading-[1.4]">
                    Orchestrate and build through commands. Just describe your task.
                  </p>
                </div>
                {/* CTA Desktop */}
                <button className="cursor-pointer hidden lg:flex items-center gap-[12px] px-[32px] py-[16px] bg-electric-blue text-white rounded-[64px] hover:bg-gradient-to-br hover:from-electric-blue hover:from-[50%] hover:to-aqua-mint transition-colors shrink-0">
                  <span className="font-inter font-medium text-[16px]">Explore HIMER</span>
                  <ArrowIcon />
                </button>
                {/* CTA Mobile */}
                <button className="cursor-pointer flex lg:hidden items-center justify-center w-[48px] h-[48px] bg-electric-blue text-white rounded-full hover:bg-gradient-to-br hover:from-electric-blue hover:from-[50%] hover:to-aqua-mint transition-colors shrink-0">
                  <ArrowIcon />
                </button>
              </div>
            </div>

            {/* Product 2: CurieCode */}
            <div className="flex flex-col gap-[16px] w-full">
              <div className="w-full relative rounded-[20px] overflow-hidden aspect-[16/9] lg:aspect-[2/1] bg-gray-100">
                <Image src="/images/home/products-images/img_curiecode.png" alt="CurieCode" fill className="object-cover" />
              </div>
              <div className="flex flex-row items-center justify-between w-full gap-[16px]">
                <div className="flex flex-col">
                  <h3 className="font-primary text-[24px] lg:text-[32px] text-[#2A2A2A] leading-[1.25]">CurieCode</h3>
                  <p className="font-inter text-[16px] lg:text-[20px] text-[#2A2A2A] leading-[1.4]">
                    Optimize reimbursements through automated, intelligent medical coding.
                  </p>
                </div>
                {/* CTA Desktop */}
                <button className="cursor-pointer hidden lg:flex items-center gap-[12px] px-[32px] py-[16px] bg-electric-blue text-white rounded-[64px] hover:bg-gradient-to-br hover:from-electric-blue hover:from-[50%] hover:to-aqua-mint transition-colors shrink-0">
                  <span className="font-inter font-medium text-[16px]">Explore CurieCode</span>
                  <ArrowIcon />
                </button>
                {/* CTA Mobile */}
                <button className="cursor-pointer flex lg:hidden items-center justify-center w-[48px] h-[48px] bg-electric-blue text-white rounded-full hover:bg-gradient-to-br hover:from-electric-blue hover:from-[50%] hover:to-aqua-mint transition-colors shrink-0">
                  <ArrowIcon />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;
