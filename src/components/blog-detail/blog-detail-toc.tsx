'use client';

import { useEffect, useRef } from 'react';

export interface TOCItem {
  id: string;
  label: string;
}

export const BLOG_DETAIL_TOPICS: TOCItem[] = [
  { id: 'what-does-agentic-rcm-actually-mean', label: 'What does agentic RCM actually mean?' },
  {
    id: 'how-is-agentic-rcm-different-from-rpa-and-generative-ai',
    label: 'How is agentic RCM different from RPA and generative AI?',
  },
  { id: 'why-is-agentic-rcm-emerging-now', label: 'Why is agentic RCM emerging now?' },
  { id: 'what-can-agentic-rcm-do-today', label: 'What can agentic RCM do today?' },
  {
    id: 'does-agentic-rcm-replace-the-revenue-cycle-team',
    label: 'Does agentic RCM replace the revenue cycle team?',
  },
  {
    id: 'what-are-the-risks-and-limits-of-agentic-rcm',
    label: 'What are the risks and limits of agentic RCM?',
  },
  {
    id: 'where-does-data-security-fit-into-agentic-rcm',
    label: 'Where does data security fit into agentic RCM?',
  },
  {
    id: 'how-does-agentic-rcm-differ-from-a-single-ai-point-solution',
    label: 'How does agentic RCM differ from a single AI point solution?',
  },
  {
    id: 'how-does-a-health-system-start-with-agentic-rcm',
    label: 'How does a health system start with agentic RCM?',
  },
  { id: 'the-bottom-line-on-agentic-rcm', label: 'The bottom line on agentic RCM' },
];

export interface BlogDetailTOCProps {
  activeTopic: string;
  onSelectTopic: (id: string) => void;
  topics?: TOCItem[];
  isSticky?: boolean;
}

export const BlogDetailTOC = ({
  activeTopic,
  onSelectTopic,
  topics = BLOG_DETAIL_TOPICS,
  isSticky = false,
}: BlogDetailTOCProps) => {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active topic button into view on mobile & desktop
  useEffect(() => {
    // Mobile horizontal indicator auto-scroll
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

    // Desktop vertical indicator card auto-scroll
    if (desktopContainerRef.current) {
      const activeEl = desktopContainerRef.current.querySelector(
        `[data-desktop-topic-id="${activeTopic}"]`,
      ) as HTMLElement;
      if (activeEl) {
        const container = desktopContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        // If active topic is the first topic, scroll to very top
        if (topics[0]?.id === activeTopic) {
          container.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
        // If active topic is the last topic, scroll to very bottom
        else if (topics[topics.length - 1]?.id === activeTopic) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          });
        }
        // For middle topics: if near or past bottom edge, scroll down to bring it and next into view
        else if (activeRect.bottom > containerRect.bottom - 28) {
          const scrollDistance = activeRect.bottom - containerRect.bottom + 48;
          container.scrollTo({
            top: container.scrollTop + scrollDistance,
            behavior: 'smooth',
          });
        }
        // If near or past top edge, scroll up
        else if (activeRect.top < containerRect.top + 28) {
          const scrollDistance = containerRect.top - activeRect.top + 48;
          container.scrollTo({
            top: Math.max(0, container.scrollTop - scrollDistance),
            behavior: 'smooth',
          });
        }
      }
    }
  }, [activeTopic, topics]);

  return (
    <>
      {/* 
        =============================================================================
        DESKTOP STICKY TOC CARD (Figma Frame 1272628343)
        - Width: 305px, Height: 626px (with visible styled scroller)
        - Padding: 32px 24px, Gap: 20px
        - Background: #F4F6F9 with backdrop-blur-[20px]
        - Border Radius: 16px
        - Auto-scrolls so remaining items (9, 10) smoothly scroll into view as scroll progresses
        =============================================================================
      */}
      <div
        ref={desktopContainerRef}
        className="hidden h-[626px] max-h-[calc(100vh-130px)] w-[305px] flex-col overflow-y-auto rounded-[16px] border border-white/60 bg-[#F4F6F9] p-[32px_24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-[20px] [scrollbar-color:#CBD5E1_transparent] [scrollbar-width:thin] lg:flex [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1] hover:[&::-webkit-scrollbar-thumb]:bg-[#9CA3AF] [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <nav className="flex w-full flex-col items-start justify-start gap-[20px]">
          {topics.map((topic, index) => {
            const isActive = activeTopic === topic.id;
            const isLast = index === topics.length - 1;

            return (
              <div key={topic.id} data-desktop-topic-id={topic.id} className="flex w-full flex-col">
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

export default BlogDetailTOC;
