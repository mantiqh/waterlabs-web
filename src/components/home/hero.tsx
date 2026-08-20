import React from 'react';

import { CTA } from '@/components/CTA';

import Navbar from '../common/navbar';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full px-4 md:px-6 py-4">
      <div 
        className="flex flex-col justify-between w-full min-h-[800px] rounded-[32px] rounded-br-[60px] bg-cover bg-center bg-no-repeat pt-10 pb-20 px-6 md:px-14"
        style={{ backgroundImage: "url('/images/home/hero-bg.png')" }}
      >
        <Navbar />

        {/* Hero Content Area */}
        <div className="flex flex-col lg:flex-row items-end justify-between w-full max-w-[1320px] mx-auto gap-10 lg:gap-[120px] mt-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-5 w-full max-w-[700px]">
            <div className="flex flex-row items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#91C6F2]" />
              <span className="font-primary text-[18px] text-[#D7DCE2]">
                Agentic RCM built from inside healthcare
              </span>
            </div>
            
            <h1 className="font-primary text-[48px] md:text-[68px] leading-[1.1] tracking-[-0.01em] text-white">
              Don&apos;t just automate your revenue cycle. Apply intelligence to it.
            </h1>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 w-full max-w-[450px]">
            <p className="font-primary text-[20px] leading-[1.4] text-[#F4F6F9]">
              We provide the platform that runs your revenue cycle. You measure it, we improve it.
            </p>
            
            <div className="flex flex-row flex-wrap gap-3">
              <CTA variant="light-bg">Get a demo</CTA>
              
              {/* Custom Glassmorphism CTA based on Figma */}
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[64px] border border-white bg-white/10 backdrop-blur-[24px] text-white font-secondary text-base font-medium hover:bg-white/20 transition-all">
                See how it works
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
