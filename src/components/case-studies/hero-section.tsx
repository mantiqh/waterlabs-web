'use client';

import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/common/navbar';

export const CaseStudiesHeroSection = () => {
  return (
    <section className="relative w-full bg-[#F4F6F9] overflow-hidden">
      <div className="w-full bg-white rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden pt-[20px] lg:pt-[40px] px-[20px] md:px-[40px] lg:px-[60px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
        {/* Top Navbar */}
        <div className="w-full max-w-[1320px] mx-auto">
          <Navbar />
        </div>

        {/* 
          Featured Case Study Hero Card:
          - Behavioral Health Case Study (matching Image 2)
          - Desktop (Figma: 6291-6998): 1320px, border-radius: 40px 20px 40px 20px
          - Mobile (Figma: 6291-7097): border-radius: 20px 10px 20px 20px
          - Links directly to /case-study/regional-behavioral-health-network
        */}
        <Link
          href="/case-study/regional-behavioral-health-network"
          className="group relative block w-full max-w-[1320px] mx-auto mt-[24px] lg:mt-[32px] xl:mt-[40px] rounded-[20px_10px_20px_20px] lg:rounded-[40px_20px_40px_20px] overflow-hidden bg-[#F4F6F9] border border-[#E2E8F0]/80 shadow-[0_12px_40px_rgba(4,40,73,0.06)] hover:shadow-[0_16px_48px_rgba(4,40,73,0.12)] transition-all duration-300 text-left cursor-pointer"
          aria-label="Read case study: How a behavioral health practice used Waterlabs to cut benefits verification from 4 days to 1."
        >
          {/* Background Decorative Graphic Elements (matching Image 2) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            <div className="hidden lg:block absolute w-[880px] h-[440px] left-[200px] -bottom-[215px] rounded-[41.88px] border border-[rgba(244,246,249,0.5)] bg-white/30 backdrop-blur-[9.2px]" />
            <div className="hidden lg:block absolute w-[2274px] h-[1137px] -left-[893px] top-[550px] border border-white/20 rounded-[30px] -rotate-[3.62deg]" />
            <div className="block lg:hidden absolute w-[539px] h-[270px] left-[82px] top-[42px] bg-white/50 border border-white/25 backdrop-blur-[6.6px] rounded-[30px] rotate-[16.52deg]" />
          </div>

          {/* Desktop Layout (1024px+): Side-by-side (Text Left / Image Right) */}
          <div className="hidden lg:flex flex-row items-center justify-between w-full min-h-[460px] xl:min-h-[517px] p-[36px] xl:p-[48px] gap-[32px] xl:gap-[48px] relative z-10">
            {/* Left Column: Text Content */}
            <div className="w-[52%] xl:max-w-[620px] flex flex-col justify-center items-start gap-[16px]">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                <span className="body-caption text-[#7D8690] tracking-[0.01em]">
                  Case Study · Behavioral Health
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col items-start gap-[12px] xl:gap-[16px] w-full">
                <h1 className="type-h2 text-[#111111] group-hover:text-[#042849] transition-colors">
                  How a behavioral health practice used{' '}
                  <span className="text-[#0F68D6]">
                    Waterlabs to cut benefits verification from 4 days to 1.
                  </span>
                </h1>
                <p className="type-body-xs text-[#2A2A2A] max-w-[560px]">
                  An outpatient intake operation where every new patient waited on a phone call before anyone could book them in.
                </p>
              </div>
            </div>

            {/* Right Column: Hero Image Card */}
            <div className="w-[48%] xl:w-[580px] aspect-[580/410] relative rounded-tl-[10px] rounded-tr-[40px] rounded-br-[10px] rounded-bl-[40px] overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-[1.01]">
              <Image
                src="/images/case-study/case-study-4-behavioral/Frame%202147226953%20(3).png"
                alt="How a behavioral health practice used Waterlabs to cut benefits verification from 4 days to 1."
                fill
                priority
                sizes="(max-width: 1280px) 50vw, 580px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile & Tablet Layout (< 1024px): Stacked Layout (Image Top / Text Bottom) */}
          <div className="flex lg:hidden flex-col items-start w-full relative z-10">
            {/* Top Image */}
            <div className="relative w-full aspect-[640/400] sm:h-[280px] rounded-t-[20px] rounded-b-0 overflow-hidden shrink-0">
              <Image
                src="/images/case-study/case-study-4-behavioral/Frame%202147226953%20(3).png"
                alt="How a behavioral health practice used Waterlabs to cut benefits verification from 4 days to 1."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-center"
              />
            </div>

            {/* Bottom Content */}
            <div className="w-full p-[20px] sm:p-[28px] flex flex-col items-start gap-[14px]">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[6px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#0F68D6] shrink-0" />
                <span className="body-caption text-[#7D8690] tracking-[0.01em]">
                  Case Study · Behavioral Health
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col items-start gap-[10px] w-full">
                <h1 className="type-h3 sm:type-h2 text-[#111111]">
                  How a behavioral health practice used{' '}
                  <span className="text-[#0F68D6]">
                    Waterlabs to cut benefits verification from 4 days to 1.
                  </span>
                </h1>
                <p className="type-body-xs text-[#2A2A2A]">
                  An outpatient intake operation where every new patient waited on a phone call before anyone could book them in.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CaseStudiesHeroSection;
