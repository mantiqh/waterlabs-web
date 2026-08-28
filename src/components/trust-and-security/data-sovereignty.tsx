'use client';

import Image from 'next/image';
import React from 'react';

export const DataSovereigntySection: React.FC = () => {
  return (
    <section 
      id="data-sovereignty" 
      className="relative w-full bg-white overflow-hidden p-0 m-0 scroll-mt-[60px]"
    >
      {/* 
        Container matching 1440px grid:
        - Desktop: px-[32px] xl:px-[60px], py-[40px] lg:py-[80px]
        - Mobile: px-[20px], py-[24px]
      */}
      <div className="w-full max-w-[1320px] mx-auto px-[20px] lg:px-[32px] xl:px-[60px] pt-[20px] lg:pt-[40px] pb-[40px] lg:pb-[80px]">
        <div className="w-full flex flex-col lg:flex-row items-start gap-[24px] xl:gap-[40px]">
          
          {/* Invisible Spacer matching Left Sidebar width (260px on lg, 305px on xl) */}
          <div className="hidden lg:block w-[260px] xl:w-[305px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Main Right Content Column (Fluid responsive max 975px) */}
          <div className="w-full lg:flex-1 min-w-0 max-w-[975px] flex flex-col gap-[36px] lg:gap-[48px]">
            
            {/* 
              Top Feature Banner Card (Figma Frame 2147203214)
              - Dimensions: max 975px x 381px
              - Border Radius: 20px 10px 20px 20px
              - Padding: 20px (mobile) / 40px (desktop)
              - Heading: General Sans, 40px / 48px, -0.01em, #FFFFFF, width: 895px, height: 96px
            */}
            <div className="relative w-full h-[320px] lg:h-[381px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#000000] p-[20px] sm:p-[28px] lg:p-[40px] flex flex-col justify-end items-start overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)] isolate">
              
              {/* Fingerprint Graphic Background */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/data-sovereignty/img_Engineered_for_rigorous_scrutiny_by_your_security_team.png"
                  alt="Fingerprint Security Analysis"
                  fill
                  priority
                  className="object-cover object-[80%_center] lg:object-right opacity-95"
                />
                {/* 90deg Linear gradient overlay for pitch black text contrast (Figma CSS) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent pointer-events-none" />
              </div>

              {/* Heading: Engineered for rigorous scrutiny by your security team (Display/H4 40px / 48px) */}
              <h2 className="relative z-10 font-primary font-normal text-[26px] sm:text-[32px] lg:text-[40px] leading-[34px] sm:leading-[40px] lg:leading-[48px] tracking-[-0.01em] text-[#FFFFFF] max-w-[320px] sm:max-w-[480px] lg:max-w-[895px]">
                Engineered for rigorous scrutiny
                <br />
                by your security team.
              </h2>
            </div>

            {/* Intro Heading + Description (Figma Design) */}
            <div className="flex flex-col gap-[12px] lg:gap-[16px]">
              <h3 className="font-primary font-normal text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[52px] leading-[38px] sm:leading-[46px] lg:leading-[52px] xl:leading-[60px] tracking-[-0.01em] text-[#0F68D6] max-w-[720px]">
                Your data stays yours. We only borrow the work.
              </h3>
              <p className="font-secondary font-normal text-[15px] sm:text-[16px] xl:text-[18px] leading-[24px] xl:leading-[26px] text-[#111111] max-w-[650px]">
                Waterlabs has a Zero-storage, Zero-retention model.
                <br className="hidden sm:inline" />
                Our agent stack runs on private infrastructure.
              </p>
            </div>

            {/* 2 Alternating Feature Cards (Figma Layout) */}
            <div className="flex flex-col gap-[36px] lg:gap-[48px] w-full">
              
              {/* Feature Card 1: We keep the lesson, not the patient (Image on Left, Text on Right) */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                  <Image
                    src="/images/trust-and-security/data-sovereignty/img_we_keep_the_lesson_not_the_patient.png"
                    alt="We keep the lesson, not the patient"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-[#042849]">
                    We keep the lesson, not the patient.
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-[#111111]">
                    Every encounter makes the system better at its job. The intelligence grows. The data itself dissolves the moment the task is complete. No storage. No retention. No secondary use.
                  </p>
                </div>
              </div>

              {/* Feature Card 2: Nothing to mishandle (Text on Left, Image on Right) */}
              <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                  <Image
                    src="/images/trust-and-security/data-sovereignty/img_nothing_to_mishandle.png"
                    alt="Nothing to mishandle"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-[#042849]">
                    Nothing to mishandle
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-[#111111]">
                    Other vendors promise to guard your data carefully. That&apos;s only as good as their worst day. Here, there is nothing to guard. Because nothing is extracted. Our data safety standards are structural.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DataSovereigntySection;
