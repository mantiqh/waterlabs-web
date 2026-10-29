'use client';

import { useEffect, useRef } from 'react';

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

export interface CaseStudyTOCProps {
  activeTopic: string;
  onSelectTopic: (id: string) => void;
  topics?: TOCItem[];
  isSticky?: boolean;
}

export const CaseStudyTOC = ({
  activeTopic,
  onSelectTopic,
  topics = CASE_STUDY_TOPICS,
  isSticky = false,
}: CaseStudyTOCProps) => {
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active topic into view on mobile
  useEffect(() => {
    if (mobileContainerRef.current) {
      const activeButton = mobileContainerRef.current.querySelector(
        `[data-topic-id="${activeTopic}"]`,
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
      <div className="hidden w-[305px] flex-col rounded-[16px] border border-white/60 bg-[#F4F6F9] p-[32px_24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-[20px] lg:flex">
        <nav className="flex w-full flex-col items-start justify-start gap-[20px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            const isLast = index === topics.length - 1;

            return (
              <div key={topic.id} className="flex w-full flex-col">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`type-body-xxs w-full cursor-pointer pb-[16px] text-left tracking-[0.01em] transition-colors duration-200 ${
                    isActive
                      ? 'font-medium text-[#0F68D6]'
                      : 'font-normal text-[#2A2A2A] hover:text-[#0F68D6]'
                  }`}
                >
                  {topic.label}
                </button>

                {/* Divider Line */}
                {!isLast && (
                  <div
                    className={`h-[0px] w-full border-t transition-colors duration-300 ${
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
        className={`no-scrollbar flex w-full gap-[20px] overflow-x-auto scroll-smooth transition-all duration-300 lg:hidden ${
          isSticky
            ? 'rounded-none border-y border-[#D7DCE2] bg-white/95 px-[20px] py-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-[20px] md:px-[40px]'
            : 'rounded-[16px] border border-[#D7DCE2]/50 bg-[#F4F6F9] px-[20px] py-[14px]'
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
              className={`type-body-xs shrink-0 cursor-pointer whitespace-nowrap transition-all duration-200 ${
                isSticky ? 'border-b-2 pb-[6px]' : 'pb-[2px]'
              } ${
                isActive
                  ? `font-medium text-[#0F68D6] ${isSticky ? 'border-[#0F68D6]' : ''}`
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
