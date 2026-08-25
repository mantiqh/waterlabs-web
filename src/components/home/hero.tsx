import React from 'react';
import { CTA } from '@/components/CTA';

import Navbar from '../common/navbar';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full">
      <div 
        className="flex flex-col justify-between gap-[40px] lg:gap-0 w-full min-h-[581px] lg:min-h-[850px] rounded-br-[30px] lg:rounded-br-[60px] bg-cover bg-center bg-no-repeat pt-[20px] px-[20px] pb-[40px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] bg-[url('/images/home/hero-bg-mobile.png')] lg:bg-[url('/images/home/hero-bg.png')]"
      >
        <Navbar />
        
        {/* Hero Content Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full max-w-[1320px] mx-auto gap-[20px] lg:gap-[120px]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-[20px] w-full lg:max-w-[700px]">
            <div className="flex flex-row items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2]" />
              <span className="font-secondary font-normal text-[12px] leading-[1.33] lg:text-[18px] lg:leading-[1.44] text-[#D7DCE2]">
                Agentic RCM built from inside healthcare
              </span>
            </div>
            
            <h1 className="font-primary font-normal text-[36px] lg:text-[68px] leading-[1.33] lg:leading-[1.11] tracking-[-0.01em] text-white">
              Don&apos;t just automate your revenue cycle. Apply intelligence to it.
            </h1>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[20px] lg:gap-[40px] w-full lg:max-w-[460px]">
            <p className="font-secondary font-normal text-[16px] lg:text-[20px] leading-[1.625] lg:leading-[1.4] text-[#F4F6F9]">
              We provide the platform that runs your revenue cycle. You measure it, we improve it.
            </p>
            
            <div className="flex flex-row flex-wrap items-center gap-[12px] lg:gap-[16px]">
              {/* Get a demo button */}
              <CTA variant="dark-bg" className="!py-[10px] !px-[20px] !text-[16px] lg:!py-[10px] lg:!px-[20px] lg:!text-[16px] font-medium">
                Get a demo
              </CTA>
              
              {/* See how it works button */}
              <CTA variant="outline" className="!py-[10px] !px-[20px] !text-[16px] lg:!py-[10px] lg:!px-[20px] lg:!text-[16px] font-medium">
                See how it works
              </CTA>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
