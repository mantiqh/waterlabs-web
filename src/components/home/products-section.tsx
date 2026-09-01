'use client';

import Image from 'next/image';
import React from 'react';

import { CTA } from '@/components/CTA';

export const ProductsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#01191E] lg:bg-[#0E7FA8]">

      {/* Top White Section - Products */}
      <div className="w-full bg-white rounded-bl-[40px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[60px] lg:py-[100px] flex justify-center">
        <div className="w-full max-w-[1320px] flex flex-col lg:flex-row gap-[40px] lg:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] items-start">

          {/* Left Heading - Sticky Pin Animation on Desktop */}
          <div className="w-full lg:w-[300px] xl:w-[380px] 2xl:w-[440px] shrink-0 min-w-0 lg:sticky lg:top-[120px] self-start">
            <h2 className="type-h2">
              <span className="text-[#111111] lg:block">Two products. </span>
              <span className="text-[#111111] lg:block">One system. </span>
              <span className="text-electric-blue lg:block">Every stage of the cycle.</span>
            </h2>
          </div>

          {/* Right Products Stack */}
          <div className="flex flex-col gap-[32px] lg:gap-[20px] w-full lg:flex-1 min-w-0 max-w-[853px]">

            {/* Product 1: HIMER AI OS */}
            <div className="flex flex-col gap-[16px] lg:gap-[16px] w-full">
              <div className="w-full relative rounded-[20px] overflow-hidden aspect-[16/9] lg:aspect-[853/460] bg-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <Image
                  src="/images/home/products-images/img_himer_ai_os.png"
                  alt="HIMER AI OS"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 853px"
                  className="object-cover"
                />
              </div>

              {/* Desktop Layout: Left Title+Desc (gap 16px), Right Full CTA */}
              <div className="hidden lg:flex flex-row items-end justify-between w-full gap-[20px] xl:gap-[32px]">
                <div className="flex flex-col gap-[16px] flex-1 min-w-0 max-w-[646px]">
                  <h5 className="type-h5 text-[#2A2A2A]">
                    HIMER AI OS
                  </h5>
                  <p className="type-body-s text-[#2A2A2A]">
                    Orchestrate and build through commands. Just describe your task.
                  </p>
                </div>
                <CTA variant="light-bg" className="shrink-0">
                  Explore HIMER
                </CTA>
              </div>

              {/* Mobile/Tablet Layout: Title in Electric Blue, Description + Circular Arrow Button */}
              <div className="flex lg:hidden flex-col gap-[8px] w-full pt-[4px]">
                <h6 className="type-h6 text-electric-blue">
                  HIMER AI OS
                </h6>
                <div className="flex flex-row items-end justify-between gap-[16px]">
                  <p className="type-body-xxs text-[#111111] flex-1">
                    Orchestrate and build through commands. Just describe your task.
                  </p>
                  <button
                    type="button"
                    aria-label="Explore HIMER"
                    className="w-[36px] h-[36px] rounded-full bg-electric-blue flex items-center justify-center text-white shrink-0 focus:outline-none"
                  >
                    <svg width="10" height="15" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[15px]">
                      <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor" />
                      <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2: CurieCode */}
            <div className="flex flex-col gap-[16px] lg:gap-[20px] w-full">
              <div className="w-full relative rounded-[20px] overflow-hidden aspect-[16/9] lg:aspect-[853/460] bg-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <Image
                  src="/images/home/products-images/img_curiecode.png"
                  alt="CurieCode"
                  fill
                  sizes="(max-width: 1024px) 100vw, 853px"
                  className="object-cover"
                />
              </div>

              {/* Desktop Layout: Left Title+Desc (gap 16px), Right Full CTA */}
              <div className="hidden lg:flex flex-row items-end justify-between w-full gap-[20px] xl:gap-[32px]">
                <div className="flex flex-col gap-[16px] flex-1 min-w-0 max-w-[614px]">
                  <h5 className="type-h5 text-[#000000]">
                    CurieCode
                  </h5>
                  <p className="type-body-s text-[#2A2A2A]">
                    Optimize reimbursements through automated, intelligent coding.
                  </p>
                </div>
                <CTA variant="light-bg" className="shrink-0">
                  Explore CurieCode
                </CTA>
              </div>

              {/* Mobile/Tablet Layout: Title in Electric Blue, Description + Circular Arrow Button */}
              <div className="flex lg:hidden flex-col gap-[8px] w-full pt-[4px]">
                <h6 className="type-h6 text-electric-blue">
                  CurieCode
                </h6>
                <div className="flex flex-row items-end justify-between gap-[16px]">
                  <p className="type-body-xxs text-[#111111] flex-1">
                    Optimize reimbursements through automated, intelligent coding.
                  </p>
                  <button
                    type="button"
                    aria-label="Explore CurieCode"
                    className="w-[36px] h-[36px] rounded-full bg-electric-blue flex items-center justify-center text-white shrink-0 focus:outline-none"
                  >
                    <svg width="10" height="15" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[15px]">
                      <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor" />
                      <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
