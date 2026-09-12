'use client';

import Image from 'next/image';
import React from 'react';

import type { AboutUsLeadershipData, LeaderItem } from '@/types/about-us';

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

const DEFAULT_LEADERS: LeaderItem[] = [
  {
    name: 'Daphne Oberlander',
    title: 'Chief Revenue Officer',
    image: '/images/about-us/the-team/img_daphne_berlander.png',
  },
  {
    name: 'Sravan Aditya',
    title: 'Chief Technology Officer',
    image: '/images/about-us/the-team/img_sravan_aditya.png',
  },
  {
    name: 'Robert A. Miller',
    title: 'Chief of Strategy & Partnerships',
    image: '/images/about-us/the-team/img_robert_A._miller.png',
  },
  {
    name: 'Megha Bhouraskar',
    title: 'General Counsel',
    image: '/images/about-us/the-team/img_megha_bhouraskar.png',
  },
  {
    name: 'Nick Tombrella',
    title: 'Senior Vice President Sales',
    image: '/images/about-us/the-team/img_nick_tombrella.png',
  },
  {
    name: 'Ales Cejka',
    title: 'SVP RCM, Coding and Compliance',
    image: '/images/about-us/the-team/img_ales_cejka.png',
  },
  {
    name: 'Devanand Bangaru',
    title: 'Associate Vice President – Technology & Compliance',
    image: '/images/about-us/the-team/img_devanand_bangaru.png',
  },
  {
    name: 'Santhosh Kumar',
    title: 'Vice President – Human Resources',
    image: '/images/about-us/the-team/img_santhosh_kumar.png',
  },
  {
    name: 'Rajgopal Keshava',
    title: 'Associate Vice President',
    image: '/images/about-us/the-team/img_rajgopal_keshava.png',
  },
  {
    name: 'Sheen Patel',
    title: 'Chief of Staff & Strategic Projects Management',
    image: '/images/about-us/the-team/img_sheen_patel.png',
  },
  {
    name: 'Vinay Khot',
    title: 'Vice President – Agentic AI & Platform Engineering',
    image: '/images/about-us/the-team/img_vinay_khot.png',
  },
];

export interface LeadershipSectionProps {
  data?: AboutUsLeadershipData;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ data }) => {
  const leadersTag =
    data?.leadersTag && data.leadersTag.toLowerCase() !== 'leadership'
      ? data.leadersTag
      : 'The Team';
  const leaders = data?.leaders && data.leaders.length > 0 ? data.leaders : DEFAULT_LEADERS;

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
      }}
    >
      {/* 
        The Team / Leadership Section
        - Wrapper: Blue gradient showing behind bottom-left curve to connect into Come talk to us
        - Inner Container: White background with rounded bottom-left corner
      */}
      <div className="w-full bg-white rounded-bl-[30px] lg:rounded-bl-[60px] pt-[32px] pb-[40px] px-[20px] md:pt-[48px] md:pb-[60px] md:px-[40px] lg:pt-[48px] lg:pb-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col items-start gap-[20px]">
          
          {/* Tag / Eyebrow */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
            <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
              {leadersTag}
            </span>
          </div>

          {/* Leadership Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[28px] lg:gap-y-[32px] items-start">
            {leaders.map((leader, idx) => (
              <div
                key={leader._key || idx}
                className="flex flex-col items-start gap-[16px] w-full"
              >
                {/* Leader Photo */}
                <div className="relative w-full aspect-[426.67/300] xl:h-[300px] rounded-[20px_10px_20px_20px] overflow-hidden bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 719px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 300px, 427px"
                  />
                </div>

                {/* Leader Details */}
                <div className="w-full flex flex-row items-start justify-between gap-[4px]">
                  <div className="flex flex-col items-start gap-[4px] flex-1 min-w-0">
                    <h5 className="type-h5 text-[#042849]">
                      {leader.name}
                    </h5>
                    <p className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                      {leader.title}
                    </p>
                  </div>
                  {/* LinkedIn Icon */}
                  <div className="pt-[9px] shrink-0">
                    {leader.linkedinUrl ? (
                      <a
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${leader.name}'s LinkedIn profile`}
                        className="inline-flex hover:opacity-80 transition-opacity"
                      >
                        <LinkedInIcon />
                      </a>
                    ) : (
                      <LinkedInIcon />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export const TeamSection = LeadershipSection;
export const TheTeamSection = LeadershipSection;
export default LeadershipSection;
