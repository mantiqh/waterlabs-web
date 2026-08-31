import React from 'react';

import { CTA } from '@/components/CTA';

import Navbar from '../common/navbar';

export interface HeroData {
  heroHeading?: string;
  heroSubheading?: string;
  heroButtonText?: string;
  heroSecondaryButtonText?: string;
  heroBackgroundImageUrl?: string;
}

interface HeroProps {
  data?: HeroData | null;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative w-full">
      <div
        className={`flex flex-col justify-between gap-[40px] lg:gap-0 w-full min-h-[581px] lg:min-h-[850px] rounded-br-[30px] lg:rounded-br-[60px] bg-cover bg-center bg-no-repeat pt-[20px] px-[20px] pb-[40px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] ${!data?.heroBackgroundImageUrl ? "bg-[url('/images/home/hero-bg-mobile.png')] lg:bg-[url('/images/home/hero-bg.png')]" : ""}`}
        style={data?.heroBackgroundImageUrl ? { backgroundImage: `url('${data.heroBackgroundImageUrl}')` } : undefined}
      >
        <Navbar />

        {/* Hero Content Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full max-w-[1320px] mx-auto gap-[20px] lg:gap-[120px]">

          {/* Left Column */}
          <div className="flex flex-col gap-[20px] w-full lg:max-w-[700px]">
            <div className="flex flex-row items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2]" />
              <span className="type-caption lg:!text-[18px] lg:!leading-[26px] text-[#D7DCE2]">
                {data?.heroSubheading || 'Agentic RCM built from inside healthcare'}
              </span>
            </div>

            <h1 className="type-h1 text-white">
              {data?.heroHeading || "Don't just automate your revenue cycle. Apply intelligence to it."}
            </h1>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[20px] lg:gap-[40px] w-full lg:max-w-[460px]">
            <p className="type-body-s text-[#F4F6F9]">
              We provide the platform that runs your revenue cycle. You measure it, we improve it.
            </p>

            <div className="flex flex-row flex-wrap items-center gap-[12px] lg:gap-[16px]">
              {/* Get a demo button */}
              <CTA variant="dark-bg">
                {data?.heroButtonText || 'Get a demo'}
              </CTA>

              {/* See how it works button */}
              <CTA variant="outline">
                {data?.heroSecondaryButtonText || 'See how it works'}
              </CTA>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
