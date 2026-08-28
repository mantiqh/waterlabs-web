'use client';

import React from 'react';

export interface TopicItem {
  id: string;
  label: string;
}

export const topics: TopicItem[] = [
  { id: 'data-sovereignty', label: 'Data Sovereignty' },
  { id: 'our-own-cloud', label: 'Our Own Cloud' },
  { id: 'security-and-compliance', label: 'Security & Compliance' },
  { id: 'certifications', label: 'Certifications' },
];

interface TopicIndicatorProps {
  activeTopic: string;
  onSelectTopic: (id: string) => void;
}

export const TopicIndicator: React.FC<TopicIndicatorProps> = ({
  activeTopic,
  onSelectTopic,
}) => {
  return (
    <>
      {/* 
        =============================================================================
        DESKTOP STICKY TOPIC INDICATOR (Figma Frame 1272628343)
        - Responsive width: 260px on lg (1024px), 305px on xl (1280px+)
        - Responsive padding: 24px 16px on lg, 32px 24px on xl
        - Background: #F4F6F9 with backdrop-blur-[20px]
        - Border Radius: 16px
        =============================================================================
      */}
      <div className="hidden lg:flex flex-row items-center w-[260px] xl:w-[305px] h-[384px] p-[24px_16px] xl:p-[32px_24px] bg-[#F4F6F9] backdrop-blur-[20px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
        <nav className="flex flex-col justify-center items-start w-full h-[320px] gap-[24px] xl:gap-[32px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            return (
              <div key={topic.id} className="flex flex-col w-full">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full text-left font-secondary font-normal text-[17px] xl:text-[21px] 2xl:text-[23px] tracking-[-0.02em] whitespace-nowrap leading-[28px] xl:leading-[32px] pb-[12px] xl:pb-[16px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0F68D6]'
                      : 'text-[#042849] hover:text-[#0F68D6]'
                  }`}
                >
                  {topic.label}
                </button>

                {/* Divider Line (Vector 3, 6, 5: width 257px, border: 1px solid) */}
                <div
                  className={`w-full h-[0px] border-t transition-colors duration-300 ${
                    isActive ? 'border-[#0F68D6]' : 'border-[#D7DCE2]'
                  } ${index === topics.length - 1 ? 'hidden' : 'block'}`}
                />
              </div>
            );
          })}
        </nav>
      </div>

      {/* 
        =============================================================================
        MOBILE / TABLET HORIZONTAL INDICATOR
        =============================================================================
      */}
      <div className="flex lg:hidden w-full bg-[#F4F6F9] backdrop-blur-[20px] rounded-[16px] py-[12px] px-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/80 overflow-x-auto no-scrollbar gap-[20px]">
        {topics.map((topic) => {
          const isActive = activeTopic === topic.id;
          return (
            <button
              key={`mob-${topic.id}`}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              className={`shrink-0 font-secondary font-normal text-[15px] sm:text-[17px] leading-[24px] sm:leading-[26px] pb-[4px] border-b-2 transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#0F68D6] border-[#0F68D6]'
                  : 'text-[#042849] border-transparent opacity-80'
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TopicIndicator;
