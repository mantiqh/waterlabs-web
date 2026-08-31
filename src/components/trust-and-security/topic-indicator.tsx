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
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(
        `[data-topic-id="${activeTopic}"]`
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
      <div className="hidden lg:flex flex-row items-center w-[305px] h-[384px] p-[32px_24px] bg-[#F4F6F9] backdrop-blur-[20px] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
        <nav className="flex flex-col justify-center items-start w-[257px] h-[320px] gap-[32px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            return (
              <div key={topic.id} className="flex flex-col w-full">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full text-left type-body-m whitespace-nowrap pb-[16px] transition-colors duration-200 cursor-pointer ${isActive
                      ? 'text-electric-blue'
                      : 'text-midnight-blue hover:text-electric-blue'
                    }`}
                >
                  {topic.label}
                </button>

                {/* Divider Line (Vector 3, 6, 5: width 257px, border: 1px solid) */}
                <div
                  className={`w-full h-[0px] border-t transition-colors duration-300 ${isActive ? 'border-electric-blue' : 'border-[#D7DCE2]'
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
      <div
        ref={containerRef}
        className="flex lg:hidden w-full bg-white backdrop-blur-[20px] rounded-none py-[12px] px-[20px] md:px-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-y border-[#D7DCE2] overflow-x-auto no-scrollbar gap-[20px] scroll-smooth transition-colors duration-300"
      >
        {topics.map((topic) => {
          const isActive = activeTopic === topic.id;
          return (
            <button
              key={`mob-${topic.id}`}
              data-topic-id={topic.id}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              className={`shrink-0 type-body-m pb-[4px] border-b-2 transition-all duration-200 whitespace-nowrap cursor-pointer ${isActive
                  ? 'text-electric-blue border-electric-blue'
                  : 'text-midnight-blue border-transparent opacity-80'
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
