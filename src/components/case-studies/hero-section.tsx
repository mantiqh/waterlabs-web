'use client';

import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/common/navbar';

export const CaseStudiesHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6F9]">
      <div className="w-full overflow-hidden rounded-bl-[30px] bg-white px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pb-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Top Navbar */}
        <div className="mx-auto w-full max-w-[1320px]">
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
          className="group relative mx-auto mt-[24px] block w-full max-w-[1320px] cursor-pointer overflow-hidden rounded-[20px_10px_20px_20px] border border-[#E2E8F0]/80 bg-[#F4F6F9] text-left shadow-[0_12px_40px_rgba(4,40,73,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(4,40,73,0.12)] lg:mt-[32px] lg:rounded-[40px_20px_40px_20px] xl:mt-[40px]"
          aria-label="Read case study: How a behavioral health practice used Waterlabs to cut benefits verification from 4 days to 1."
        >
          {/* Background Decorative Graphic Elements (matching Image 2) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -bottom-[215px] left-[200px] hidden h-[440px] w-[880px] rounded-[41.88px] border border-[rgba(244,246,249,0.5)] bg-white/30 backdrop-blur-[9.2px] lg:block" />
            <div className="absolute top-[550px] -left-[893px] hidden h-[1137px] w-[2274px] -rotate-[3.62deg] rounded-[30px] border border-white/20 lg:block" />
            <div className="absolute top-[42px] left-[82px] block h-[270px] w-[539px] rotate-[16.52deg] rounded-[30px] border border-white/25 bg-white/50 backdrop-blur-[6.6px] lg:hidden" />
          </div>

          {/* Desktop Layout (1024px+): Side-by-side (Text Left / Image Right) */}
          <div className="relative z-10 hidden min-h-[460px] w-full flex-row items-center justify-between gap-[32px] p-[36px] lg:flex xl:min-h-[517px] xl:gap-[48px] xl:p-[48px]">
            {/* Left Column: Text Content */}
            <div className="flex w-[52%] flex-col items-start justify-center gap-[16px] xl:max-w-[620px]">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                <span className="body-caption tracking-[0.01em] text-[#7D8690]">
                  Case Study · Behavioral Health
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex w-full flex-col items-start gap-[12px] xl:gap-[16px]">
                <h1 className="type-h2 text-[#111111] transition-colors group-hover:text-[#042849]">
                  How a behavioral health practice used{' '}
                  <span className="text-[#0F68D6]">
                    Waterlabs to cut benefits verification from 4 days to 1.
                  </span>
                </h1>
                <p className="type-body-xs max-w-[560px] text-[#2A2A2A]">
                  An outpatient intake operation where every new patient waited on a phone call
                  before anyone could book them in.
                </p>
              </div>
            </div>

            {/* Right Column: Hero Image Card */}
            <div className="relative aspect-[580/410] w-[48%] shrink-0 overflow-hidden rounded-tl-[10px] rounded-tr-[40px] rounded-br-[10px] rounded-bl-[40px] shadow-sm transition-transform duration-300 group-hover:scale-[1.01] xl:w-[580px]">
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
          <div className="relative z-10 flex w-full flex-col items-start lg:hidden">
            {/* Top Image */}
            <div className="rounded-b-0 relative aspect-[640/400] w-full shrink-0 overflow-hidden rounded-t-[20px] sm:h-[280px]">
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
            <div className="flex w-full flex-col items-start gap-[14px] p-[20px] sm:p-[28px]">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[6px]">
                <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#0F68D6]" />
                <span className="body-caption tracking-[0.01em] text-[#7D8690]">
                  Case Study · Behavioral Health
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex w-full flex-col items-start gap-[10px]">
                <h1 className="type-h3 sm:type-h2 text-[#111111]">
                  How a behavioral health practice used{' '}
                  <span className="text-[#0F68D6]">
                    Waterlabs to cut benefits verification from 4 days to 1.
                  </span>
                </h1>
                <p className="type-body-xs text-[#2A2A2A]">
                  An outpatient intake operation where every new patient waited on a phone call
                  before anyone could book them in.
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
