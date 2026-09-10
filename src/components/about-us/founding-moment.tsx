'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const FoundingMomentSection: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F4F6F9 0%, #0A60AF 100%)',
      }}
    >
      {/* 
        The Founding Moment Section (Desktop: 4081-10784 / Mobile: 4081-11031):
        - Wrapper: Gradient #F4F6F9 -> #0A60AF
        - Inner Container: White background with border-radius: 60px 0 0 0 (desktop) / 30px 0 0 0 (mobile)
        - Desktop: padding 80px 60px, gap 48px
        - Mobile: padding 40px 20px, gap 20px
      */}
      <div className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[60px] pt-[40px] pb-0 px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-[32px] md:gap-[40px] lg:gap-[32px] xl:gap-[40px]">
          
          {/* Left Column (537px desktop) */}
          <div className="w-full lg:w-[42%] xl:w-[537px] shrink-0 min-w-0 flex flex-col items-start gap-[16px] lg:gap-[20px]">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                The founding moment
              </span>
            </div>

            {/* Photo Card */}
            <div className="relative w-full h-[239px] sm:h-[300px] lg:h-[290px] xl:h-[355px] rounded-[20px_10px_20px_20px] overflow-hidden bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
              <Image
                src="/images/about-us/the-founding-moment/img_kamal_raj.png"
                alt="Kamal Raj"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 537px"
              />
            </div>

            {/* Founder Info */}
            <div className="flex flex-col items-start gap-[4px] lg:gap-[8px]">
              <h3 className="type-h5 text-[#2A2A2A]">
                Kamal Raj
              </h3>
              <p className="type-body-xxs text-[#7D8690]">
                Founder President Chairman of the Board
              </p>
            </div>
          </div>

          {/* Right Column (743px desktop) */}
          <div className="w-full lg:w-[55%] xl:w-[743px] flex-1 min-w-0 flex flex-col justify-end items-start gap-[24px] lg:gap-[32px] xl:gap-[40px] lg:pt-[24px] xl:pt-[44px]">
            {/* Bio Paragraphs */}
            <div className="flex flex-col items-start gap-[20px] lg:gap-[32px]">
              <p className="type-h6 text-black leading-[26px] lg:leading-[32px]">
                Kamal Raj is a visionary technologist and healthcare innovator with over 24+ years of expertise at the intersection of artificial intelligence, revenue cycle transformation, and digital health infrastructure. As the Founder of Waterlabs AI LLC, he is redefining the future of healthcare administration through enterprise-grade AI platforms engineered for Intelligence, speed, and scalability.
              </p>

              <p className="type-body-xxs text-[#2A2A2A] leading-[20px] lg:leading-[24px]">
                Kamal holds a Master&apos;s in Information Systems and leads Waterlabs AI with a singular mission: to architect next-generation automation that drives radical efficiency across the healthcare revenue cycle. His work centers on leveraging deep learning, intelligent orchestration, and autonomous workflows to eliminate friction, reduce denials, and accelerate financial throughput across payer-provider ecosystems. Before founding Waterlabs AI, he held leadership roles in several health-tech ventures.
              </p>
            </div>

            {/* CTA Button */}
            <Link href="/philosophy" className="inline-block">
              <CTA variant="light-bg" as="div">
                Read our philosophy
              </CTA>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FoundingMomentSection;
