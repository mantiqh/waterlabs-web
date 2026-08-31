'use client';

import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Study the Work',
    day: 'Day 1–7',
    dayVariant: 'active',
    desc: 'You show us your process. We learn and integrate.',
    isPrimary: true,
  },
  {
    num: '02',
    title: 'Develop and Deploy the Agents',
    day: 'Day 8 - 21',
    dayVariant: 'outline',
    desc: (
      <>
        We develop our agents to mirror your customized needs.
        <br className="hidden sm:block" />
        Agents start working in your environment.
      </>
    ),
    isPrimary: false,
  },
  {
    num: '03',
    title: 'Bill on Day',
    day: 'Day 22 →',
    dayVariant: 'outline',
    desc: 'We invoice after our agents are live in your system.',
    isPrimary: false,
  },
];

export const BillingSection: React.FC = () => {
  return (
    <section 
      className="relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #91C6F2 50%, #003AA5 50%)',
      }}
    >
      {/* 
        The main white card is 100% full width (w-full) across the screen.
        The rounded-tl-[60px] and rounded-bl-[60px] cut into the top (#91C6F2) and bottom (#111111) background colors only at the very corner tips.
        There is NO blue side column.
      */}
      <div className="w-full bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] py-[60px] lg:py-[80px] lg:px-[60px]">
        
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[40px] lg:gap-[56px]">

          {/* Top Header Block */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-[24px] lg:gap-[60px]">
            {/* Left Tag */}
            <div className="lg:w-[320px] shrink-0 pt-[8px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"></div>
                <span className="type-body-xxs text-[#7D8690]">
                  Proven before you pay.
                </span>
              </div>
            </div>

            {/* Right Heading & Subheading */}
            <div className="flex-1 flex flex-col gap-[16px] lg:gap-[20px]">
              <h2 className="type-h2">
                <span className="text-electric-blue">Our billing model allows you flexibility.</span>
                <br />
                <span className="text-[#111111]">We charge you when our AI is live in your environment.</span>
              </h2>
              <p className="type-body-s text-[#4B5563]">
                No development fee. No software license. We charge after it works.
              </p>
            </div>
          </div>

          {/* Content Area: Steps on Left, Gradient Box on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-[48px] items-stretch">

            {/* Left Steps List (7 columns on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {steps.map((step, idx) => (
                <div 
                  key={`step-${idx}`}
                  className={`py-[24px] lg:py-[28px] ${
                    idx === 0 
                      ? 'border-b border-[#0F68D6]' 
                      : idx < steps.length - 1 
                        ? 'border-b border-gray-200' 
                        : ''
                  }`}
                >
                  {/* Desktop Layout (with large number on left) */}
                  <div className="hidden lg:flex items-start gap-[28px]">
                    <span className={`type-h2 !leading-[1] shrink-0 w-[72px] ${
                      step.num === '01' ? 'text-electric-blue' : 'text-[#111111]'
                    }`}>
                      {step.num}
                    </span>
                    <div className="flex-1 flex flex-col gap-[8px]">
                      <div className="flex items-center justify-between gap-[16px]">
                        <h3 className="type-h6 text-[#111111]">
                          {step.title}
                        </h3>
                        <span className={`type-body-xxs !font-normal px-[16px] py-[5px] rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tr-none shrink-0 ${
                          step.dayVariant === 'active'
                            ? 'bg-[#91C6F2] text-[#111111]'
                            : 'bg-white border border-[#91C6F2] text-[#111111]'
                        }`}>
                          {step.day}
                        </span>
                      </div>
                      <p className="type-body-xxs text-[#111111]">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Layout (Tag on top, Electric Blue title, no number) */}
                  <div className="flex lg:hidden flex-col gap-[12px]">
                    <div className="flex items-center">
                      <span className={`type-caption px-[12px] py-[4px] rounded-tl-[12px] rounded-bl-[12px] rounded-br-[12px] rounded-tr-none ${
                        step.dayVariant === 'active'
                          ? 'bg-[#91C6F2] text-[#111111]'
                          : 'bg-white border border-[#91C6F2] text-[#111111]'
                      }`}>
                        {step.day}
                      </span>
                    </div>
                    <h3 className="type-h5 text-electric-blue">
                      {step.title}
                    </h3>
                    <p className="type-body-xxs text-[#111111]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Dark Gradient Card (5 columns on desktop) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div 
                className="w-full max-w-[427px] h-auto lg:h-[436px] rounded-[24px] p-[24px] sm:p-[32px] lg:p-[40px] flex flex-col justify-center items-start lg:items-center text-left lg:text-center gap-[20px] sm:gap-[24px] lg:gap-[36px] shadow-[0_12px_36px_rgba(4,40,73,0.18)]"
                style={{
                  background: 'linear-gradient(137.1deg, #042849 29.61%, #0A60AF 99.37%)',
                }}
              >
                <span className="type-h5 text-left lg:text-center text-white">
                  No development fee
                </span>
                <span className="type-h5 text-left lg:text-center text-white">
                  No software license
                </span>
                <span className="type-h5 text-left lg:text-center text-white lg:max-w-[280px]">
                  You pay only when agents are live
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BillingSection;
