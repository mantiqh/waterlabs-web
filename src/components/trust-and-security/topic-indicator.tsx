'use client';

import { useEffect, useRef } from 'react';

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
  isSticky?: boolean;
}

export const TopicIndicator = ({
  activeTopic,
  onSelectTopic,
  isSticky = false,
}: TopicIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(
        `[data-topic-id="${activeTopic}"]`,
      ) as HTMLElement;
      if (activeButton) {
        const container = containerRef.current;
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
        DESKTOP STICKY TOPIC INDICATOR (Figma Frame 1272628343)
        - Width: 305px, Height: 384px, Padding: 32px 24px, Gap: 20px
        - Background: #F4F6F9 with backdrop-blur-[20px]
        - Border Radius: 16px
        - Typography: type-body-m (24px/32px Inter)
        =============================================================================
      */}
      <div className="hidden h-[384px] w-[305px] flex-row items-center rounded-[16px] border border-white/60 bg-[#F4F6F9] p-[32px_24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-[20px] lg:flex">
        <nav className="flex h-[320px] w-[257px] flex-col items-start justify-center gap-[32px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            return (
              <div key={topic.id} className="flex w-full flex-col">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`type-body-m w-full cursor-pointer pb-[16px] text-left whitespace-nowrap transition-colors duration-200 ${
                    isActive ? 'text-electric-blue' : 'text-midnight-blue hover:text-electric-blue'
                  }`}
                >
                  {topic.label}
                </button>

                {/* Divider Line (Vector 3, 6, 5: width 257px, border: 1px solid) */}
                <div
                  className={`h-[0px] w-full border-t transition-colors duration-300 ${
                    isActive ? 'border-electric-blue' : 'border-[#D7DCE2]'
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
        - When NOT sticky (isSticky === false):
          rounded-[16px] bg-[#F4F6F9] border border-[#D7DCE2]/50 py-[14px] px-[20px]
        - When sticky (isSticky === true):
          rounded-none w-full bg-white/95 backdrop-blur-[20px] border-y border-[#D7DCE2] py-[12px] px-[20px] md:px-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        =============================================================================
      */}
      <div
        ref={containerRef}
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
              className={`type-body-m shrink-0 cursor-pointer whitespace-nowrap transition-all duration-200 ${
                isSticky ? 'border-b-2 pb-[4px]' : 'pb-[2px]'
              } ${
                isActive
                  ? `text-electric-blue font-medium ${isSticky ? 'border-electric-blue' : ''}`
                  : `text-midnight-blue opacity-80 ${isSticky ? 'border-transparent' : ''}`
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
