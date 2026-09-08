'use client';

import Image from 'next/image';
import React from 'react';

const LinkedInIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#0F68D6] shrink-0 hover:opacity-80 transition-opacity"
  >
    <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.5V10H9V17ZM7.75 8.875C6.92 8.875 6.25 8.205 6.25 7.375C6.25 6.545 6.92 5.875 7.75 5.875C8.58 5.875 9.25 6.545 9.25 7.375C9.25 8.205 8.58 8.875 7.75 8.875ZM18 17H15.5V13.25C15.5 12.15 14.85 11.75 14.25 11.75C13.5 11.75 13 12.3 13 13.25V17H10.5V10H13V11C13.5 10.3 14.4 9.8 15.4 9.8C16.9 9.8 18 10.8 18 12.8V17Z" />
  </svg>
);

interface Founder {
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface Leader {
  name: string;
  title: string;
  image: string;
}

const founders: Founder[] = [
  {
    name: 'Kamal Raj',
    title: 'Founder President Chairman of the Board',
    bio: "Twenty years inside revenue cycle operations before founding Waterlabs in 2019. Built RCM systems for hospital networks across India and the US.",
    image: "/images/about-us/who's-building-this./img_kamal_raj (1).png",
  },
  {
    name: 'Jitendra Gupta',
    title: 'CEO',
    bio: 'Fifteen years building autonomous systems for healthcare. Author of the agentic-RCM architecture patents filed in 2019.',
    image: "/images/about-us/who's-building-this./img_jitendra_gupta.png",
  },
];

const leaders: Leader[] = [
  {
    name: 'Daphne Oberlander',
    title: 'Chief Revenue Officer',
    image: '/images/about-us/leadership/img_daphne_berlander.png',
  },
  {
    name: 'Sravan Aditya',
    title: 'Chief Technology Officer',
    image: '/images/about-us/leadership/img_sravan_aditya.png',
  },
  {
    name: 'Robert A. Miller',
    title: 'Chief of Strategy & Partnerships',
    image: '/images/about-us/leadership/img_robert_A._miller.png',
  },
  {
    name: 'Megha Bhouraskar',
    title: 'General Counsel',
    image: '/images/about-us/leadership/img_megha_bhouraskar.png',
  },
  {
    name: 'Nick Tombrella',
    title: 'Senior Vice President Sales',
    image: '/images/about-us/leadership/img_nick_tombrella.png',
  },
  {
    name: 'Ales Cejka',
    title: 'SVP RCM, Coding and Compliance',
    image: '/images/about-us/leadership/img_ales_cejka.png',
  },
  {
    name: 'Devanand Bangaru',
    title: 'Associate Vice President – Technology & Compliance',
    image: '/images/about-us/leadership/img_devanand_bangaru.png',
  },
  {
    name: 'Santhosh Kumar',
    title: 'Vice President – Human Resources',
    image: '/images/about-us/leadership/img_santhosh_kumar.png',
  },
  {
    name: 'Rajgopal Keshava',
    title: 'Associate Vice President',
    image: '/images/about-us/leadership/img_rajgopal_keshava.png',
  },
  {
    name: 'Sheen Patel',
    title: 'Chief of Staff & Strategic Projects Management',
    image: '/images/about-us/leadership/img_sheen_patel.png',
  },
  {
    name: 'Vinay Khot',
    title: 'Vice President – Agentic AI & Platform Engineering',
    image: '/images/about-us/leadership/img_vinay_khot.png',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F6F9] overflow-hidden">
      {/* 
        Operators, Engineers, Partners Section (Desktop: 4081-10784 / Mobile: 4081-11031):
        - Wrapper: #F4F6F9
        - Inner Container: White background with border-radius: 0 0 0 60px (desktop) / 0 0 0 30px (mobile)
        - Desktop: padding 80px 60px, gap 48px
        - Mobile: padding 40px 20px, gap 40px
      */}
      <div className="w-full bg-white rounded-bl-[30px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[40px] lg:gap-[48px]">
          
          {/* =========================================================================
              SUB-SECTION A — FOUNDERS (Who's building this.)
              ========================================================================= */}
          <div className="w-full border-b border-[#D7DCE2] pb-[32px] md:pb-[48px] lg:pb-[60px] flex flex-col lg:flex-row items-start justify-between gap-[32px] lg:gap-[20px]">
            {/* Left Header Column */}
            <div className="w-full lg:w-[538px] shrink-0 flex flex-col items-start gap-[16px] lg:gap-[20px]">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                  Who&apos;s building this.
                </span>
              </div>

              {/* Heading */}
              <h2 className="type-h2 text-black">
                Operators, Engineers, Partners.
              </h2>
            </div>

            {/* Right: Two Founder Cards */}
            <div className="w-full lg:w-[762px] flex flex-col sm:flex-row items-stretch gap-[20px]">
              {founders.map((founder, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-start gap-[16px] min-w-0"
                >
                  {/* Founder Photo */}
                  <div className="relative w-full h-[239px] sm:h-[260px] lg:h-[300px] rounded-[20px_10px_20px_20px] overflow-hidden bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 371px"
                    />
                  </div>

                  {/* Founder Details */}
                  <div className="w-full flex flex-col items-start gap-[16px] lg:gap-[24px]">
                    <div className="w-full flex flex-row items-start justify-between gap-[8px]">
                      <div className="flex flex-col items-start gap-[4px] flex-1 min-w-0">
                        <h3 className="type-h5 text-[#042849]">
                          {founder.name}
                        </h3>
                        <p className="type-body-xxs text-[#7D8690]">
                          {founder.title}
                        </p>
                      </div>
                      <div className="pt-[4px]">
                        <LinkedInIcon />
                      </div>
                    </div>

                    <p className="type-body-xxs text-[#042849] leading-[20px] lg:leading-[24px]">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              SUB-SECTION B — LEADERSHIP GRID (Frame 1272628358)
              ========================================================================= */}
          <div className="w-full flex flex-col items-start gap-[20px]">
            {/* Tag / Eyebrow (Frame 17) */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em] uppercase">
                Leadership
              </span>
            </div>

            {/* Leadership Grid: 3 columns desktop, 2 columns tablet, 1 column mobile (Frame 2147226792) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[28px] lg:gap-y-[32px] items-start">
              {leaders.map((leader, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start gap-[16px] w-full"
                >
                  {/* Leader Photo (AdobeStock_588310218 2) */}
                  <div className="relative w-full aspect-[426.67/300] lg:h-[300px] rounded-[20px_10px_20px_20px] overflow-hidden bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 719px) 100vw, (max-width: 1023px) 50vw, 427px"
                    />
                  </div>

                  {/* Leader Details (Frame 2147203206 -> Frame 1272628343) */}
                  <div className="w-full flex flex-row items-start justify-between gap-[4px]">
                    <div className="flex flex-col items-start gap-[4px] flex-1 min-w-0">
                      <h3 className="type-h5 text-[#042849]">
                        {leader.name}
                      </h3>
                      <p className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                        {leader.title}
                      </p>
                    </div>
                    {/* LinkedIn Icon Frame (Frame 2147226793) */}
                    <div className="pt-[9px] shrink-0">
                      <LinkedInIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
