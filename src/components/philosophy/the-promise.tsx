'use client';

import Image from 'next/image';
import React from 'react';

export const ThePromiseSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#0F68D6] from-50% to-[#0F68D6] to-50%">
      {/* 
        Top Frame Container (Figma Frame 1272628356 / Frame 11):
        - Desktop: 1440px x 801px, rounded-tl-[60px] rounded-bl-[60px], padding: 80px 60px
        - Mobile: 402px x 526.07px, rounded-tl-[30px] rounded-bl-[30px], padding: 40px 20px
        - Background: #F4F6F9 (Ghost White)
      */}
      <div className="relative w-full bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        
        {/* Abstract Background Graphic Pattern */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/images/philosophy/the-promise/img_the_promise_bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* Content Container (Max width 1320px) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[24px] lg:gap-[20px]">
          
          {/* Left Column: Heading (Frame 2147226497: 536px) */}
          <div className="w-full lg:w-[536px] shrink-0">
            <h2 className="type-h2 text-[#111111]">
              The Promise
            </h2>
          </div>

          {/* Right Column: Statement, Image & Outcome Headline (Frame 2147226496) */}
          <div className="w-full lg:w-[700px] xl:w-[764px] flex flex-col items-start gap-[20px] lg:gap-[24px]">
            
            {/* Lead Statement */}
            <p className="type-body-l text-[#042849] w-full max-w-[700px]">
              Your revenue cycle no longer controls your operations. The most complex and costly function becomes worry-free, as we take full accountability for its performance.
            </p>

            {/* Visual Image Card (Frame 2147203302: 700px x 325px desktop, 362px x 168px mobile) */}
            <div className="w-full max-w-[700px] rounded-[20px_10px_20px_20px] lg:rounded-[40px_10px_40px_10px] overflow-hidden relative border-b border-[#91C6F2]">
              <Image
                src="/images/philosophy/what-we-believe/img_the_promise.png"
                alt="The Promise Visual"
                width={1400}
                height={650}
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="w-full h-auto block"
              />
              {/* Overlay Gradient: rgba(99, 204, 183, 0) 52.42% to rgba(15, 104, 214, 0.66) 109.85% */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[52.42%] to-[#0F68D6]/[0.66] to-[109.85%] pointer-events-none" />
            </div>

            {/* Outcome Headline */}
            <p className="type-h4 text-[#0F68D6] w-full max-w-[700px]">
              <span className="lg:block">We own the outcome.</span>{' '}
              <span className="lg:block">You get your attention back.</span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ThePromiseSection;
