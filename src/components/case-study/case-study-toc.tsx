'use client';

import React, { useEffect, useRef } from 'react';

export interface TOCItem {
  id: string;
  label: string;
}

export const CASE_STUDY_TOPICS: TOCItem[] = [
  { id: 'the-client', label: 'The Client' },
  { id: 'the-challenge', label: 'The Challenge' },
  { id: 'what-waterlabs-did', label: 'What Waterlabs did' },
  { id: 'the-results', label: 'The Results' },
  { id: 'the-outcomes', label: 'The Outcomes' },
  { id: 'the-bottom-line', label: 'The Bottom Line' },
];

interface CaseStudyTOCProps {
  activeTopic: string;
  onSelectTopic: (id: string) => void;
  topics?: TOCItem[];
  isSticky?: boolean;
}

export const CaseStudyTOC: React.FC<CaseStudyTOCProps> = ({
  activeTopic,
  onSelectTopic,
  topics = CASE_STUDY_TOPICS,
  isSticky = false,
}) => {
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active topic into view on mobile
  useEffect(() => {
    if (mobileContainerRef.current) {
      const activeButton = mobileContainerRef.current.querySelector(
        `[data-topic-id="${activeTopic}"]`
      ) as HTMLElement;
      if (activeButton) {
        const container = mobileContainerRef.current;
        const scrollLeft =
          activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeTopic]);

  return (
    <>
      {/* 
        =============================================================================
        DESKTOP STICKY TOC CARD (Figma Frame 1272628344)
        - Width: 305px, Height: 448px (or min-h / natural height)
        - Padding: 32px 24px, Gap: 20px
        - Background: #F4F6F9 with backdrop-blur-[20px]
        - Border Radius: 16px
        - Border: 1px solid rgba(255, 255, 255, 0.6)
        =============================================================================
      */}
      <div className="hidden lg:flex flex-col w-[305px] p-[32px_24px] bg-[#F4F6F9] backdrop-blur-[20px] rounded-[16px] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <nav className="flex flex-col justify-start items-start w-full gap-[20px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            const isLast = index === topics.length - 1;

            return (
              <div key={topic.id} className="flex flex-col w-full">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full text-left type-body-xxs tracking-[0.01em] pb-[16px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0F68D6] font-medium'
                      : 'text-[#2A2A2A] hover:text-[#0F68D6] font-normal'
                  }`}
                >
                  {topic.label}
                </button>

                {/* Divider Line */}
                {!isLast && (
                  <div
                    className={`w-full h-[0px] border-t transition-colors duration-300 ${
                      isActive ? 'border-[#0F68D6]' : 'border-[#D7DCE2]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* 
        =============================================================================
        MOBILE / TABLET HORIZONTAL INDICATOR
        - When NOT sticky (isSticky === false):
          rounded-[16px] bg-[#F4F6F9] border border-[#D7DCE2]/50 py-[14px] px-[20px]
        - When sticky (isSticky === true):
          rounded-none w-full bg-white/95 backdrop-blur-[20px] border-y border-[#D7DCE2] py-[12px] px-[20px] md:px-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        =============================================================================
      */}
      <div
        ref={mobileContainerRef}
        className={`flex lg:hidden w-full overflow-x-auto no-scrollbar gap-[20px] scroll-smooth transition-all duration-300 ${
          isSticky
            ? 'bg-white/95 backdrop-blur-[20px] rounded-none py-[12px] px-[20px] md:px-[40px] border-y border-[#D7DCE2] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-[#F4F6F9] rounded-[16px] py-[14px] px-[20px] border border-[#D7DCE2]/50'
        }`}
      >
        {topics.map((topic) => {
          const isActive = activeTopic === topic.id;

          return (
            <button
              key={`mob-${topic.id}`}
              data-topic-id={topic.id}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              className={`shrink-0 type-body-xs transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSticky ? 'pb-[6px] border-b-2' : 'pb-[2px]'
              } ${
                isActive
                  ? `text-[#0F68D6] font-medium ${isSticky ? 'border-[#0F68D6]' : ''}`
                  : `text-[#2A2A2A] opacity-80 ${isSticky ? 'border-transparent' : ''}`
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

export default CaseStudyTOC;
