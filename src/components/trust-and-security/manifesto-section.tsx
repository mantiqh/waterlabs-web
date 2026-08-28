'use client';

import React from 'react';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#9A84E3] overflow-hidden p-0 m-0">
      {/* 
        White Card with Top-Right curve:
        - Desktop: rounded-tr-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tr-[30px], py-[40px] px-[20px]
        - The top-right curve reveals the exact matching bottom gradient color (#9A84E3) 
          from the Hero Banner above seamlessly with zero split lines.
      */}
      <div className="w-full bg-white rounded-tr-[30px] lg:rounded-tr-[60px] py-[40px] px-[20px] lg:py-[80px] lg:px-[32px] xl:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col justify-center">

          {/* Main Statement Text */}
          <h2 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[36px] xl:text-[48px] leading-[32px] sm:leading-[36px] lg:leading-[44px] xl:leading-[56px] tracking-[-0.01em]">
            <span className="text-[#2A2A2A]">
              Most AI vendors fumble this conversation. Here&apos;s our version:{' '}
            </span>
            <span className="text-[#A9B2BC]">
              your patient data stays in your environment, is never copied to us, never stored with us. Our agents do the work in the moment, and then the trace is gone. We keep the lesson, not the patient.
            </span>
          </h2>

        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
