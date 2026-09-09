'use client';

import React, { useEffect, useRef, useState } from 'react';

import { CaseStudy } from '@/types/case-study';

import CaseStudyTOC, { CASE_STUDY_TOPICS } from './case-study-toc';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export const renderFormattedText = (text: string) => {
  if (!text) return null;
  // If markdown **bold** is present, parse it
  if (text.includes('**')) {
    const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#111111]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  }

  // Fallback: If starts with keyword (e.g. Operationally:, Financially:, Strategically:)
  const keywordMatch = text.match(/^(Operationally[,:]?|Financially[,:]?|Strategically[,:]?)(.*)$/s);
  if (keywordMatch) {
    return (
      <>
        <strong className="font-bold text-[#111111]">{keywordMatch[1]}</strong>
        {keywordMatch[2]}
      </>
    );
  }

  // Fallback: If starts with a colon prefix (e.g. "Daily claim surveillance: ")
  const colonMatch = text.match(/^([^:\n]+:\s*)(.*)$/s);
  if (colonMatch && colonMatch[1].length < 40) {
    return (
      <>
        <strong className="font-bold text-[#111111]">{colonMatch[1]}</strong>
        {colonMatch[2]}
      </>
    );
  }

  return text;
};

const renderResultsDetailParagraph = (text: string) => {
  if (text.includes('**')) {
    return renderFormattedText(text);
  }

  // Check known result clause splits
  const clauseSplits = [
    ', based on',
    ', so patients',
    ', so ',
    ', creating capacity',
    ', creating ',
    ', allowing ',
    ', resulting in ',
    ', including ',
  ];

  for (const clause of clauseSplits) {
    const idx = text.indexOf(clause);
    if (idx !== -1) {
      return (
        <>
          <strong className="font-bold text-[#111111]">{text.slice(0, idx + 1)}</strong>
          {text.slice(idx + 1)}
        </>
      );
    }
  }

  // Check first sentence ending with period (e.g., "$500,000 in annual labor savings.")
  const dotSentenceMatch = text.match(/^([^.\n]+(?:\.[0-9]+)?[^.\n]*\.)\s+(.*)$/s);
  if (dotSentenceMatch) {
    return (
      <>
        <strong className="font-bold text-[#111111]">{dotSentenceMatch[1]}</strong>
        {' ' + dotSentenceMatch[2]}
      </>
    );
  }

  return renderFormattedText(text);
};

const renderResultsParagraphs = (content?: string) => {
  if (!content) return null;
  const paragraphs = content.split('\n\n').filter(Boolean);
  return (
    <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] max-w-[975px]">
      {paragraphs.map((para, idx) => (
        <p key={idx} className="type-body-xs text-[#2A2A2A]">
          {renderResultsDetailParagraph(para)}
        </p>
      ))}
    </div>
  );
};

export const renderFormattedParagraphs = (content?: string) => {
  if (!content) return null;
  const paragraphs = content.split('\n\n').filter(Boolean);
  return (
    <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] max-w-[975px]">
      {paragraphs.map((para, idx) => (
        <p key={idx} className="type-body-xs text-[#2A2A2A]">
          {renderFormattedText(para)}
        </p>
      ))}
    </div>
  );
};

export const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  const [activeTopic, setActiveTopic] = useState<string>(CASE_STUDY_TOPICS[0].id);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    tags,
    clientSummary,
    statBadges,
    challenge,
    whatWaterlabsDid,
    resultsBlock,
    outcomes,
    bottomLine,
  } = caseStudy;

  // Scroll Spy Logic matching trust-and-security/interactive-security-sections.tsx with bottom detection and sticky check
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const targetY = isMobile ? 120 : 160;

      // Check if mobile indicator reached sticky top-[60px]
      if (sentinelRef.current) {
        const sentinelRect = sentinelRef.current.getBoundingClientRect();
        setIsSticky(sentinelRect.top <= 61);
      }

      // If user has scrolled near the bottom of the page, activate the last section
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomThreshold = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= bottomThreshold) {
        setActiveTopic(CASE_STUDY_TOPICS[CASE_STUDY_TOPICS.length - 1].id);
        return;
      }

      // Check sections from bottom to top to find the first section whose top has crossed targetY
      let activeId = CASE_STUDY_TOPICS[0].id;
      for (let i = CASE_STUDY_TOPICS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CASE_STUDY_TOPICS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY + 40) {
            activeId = CASE_STUDY_TOPICS[i].id;
            break;
          }
        }
      }
      setActiveTopic(activeId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to selected topic with navbar offset
  const scrollToTopic = (id: string) => {
    setActiveTopic(id);
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -115 : -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-white pb-[80px] lg:pb-[80px]">
      {/* Sentinel for detecting when mobile TOC hits sticky position */}
      <div ref={sentinelRef} className="block lg:hidden h-[1px] w-full pointer-events-none" />

      {/* 
        =============================================================================
        MOBILE / TABLET STICKY INDICATOR BAR
        - When unscrolled: sits inside page padding as rounded card
        - When scrolled: expands to full width (px-0) with border-y directly below fixed navbar
        =============================================================================
      */}
      <div
        className={`block lg:hidden sticky top-[60px] z-40 w-full transition-all duration-300 ${
          isSticky
            ? 'px-0 bg-transparent'
            : 'max-w-[1320px] mx-auto px-[20px] md:px-[40px] pt-[12px] pb-[8px]'
        }`}
      >
        <CaseStudyTOC
          activeTopic={activeTopic}
          onSelectTopic={scrollToTopic}
          isSticky={isSticky}
        />
      </div>

      <div className="w-full px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto pt-[32px] lg:pt-[80px] flex flex-col lg:flex-row items-start justify-between gap-[32px] lg:gap-[40px]">
        
          {/* 
            =============================================================================
            LEFT COLUMN: STICKY TABLE OF CONTENTS (Desktop)
            - Desktop: w-[305px] sticky top-[100px]
            =============================================================================
          */}
          <aside className="hidden lg:block w-[305px] shrink-0 sticky top-[100px] z-20">
            <CaseStudyTOC activeTopic={activeTopic} onSelectTopic={scrollToTopic} />
          </aside>

          {/* 
            =============================================================================
            RIGHT COLUMN: CASE STUDY BODY CONTENT (Frame 2147226949: 975px wide)
            =============================================================================
          */}
          <div className="w-full lg:max-w-[975px] flex-1 flex flex-col gap-[40px] lg:gap-[80px]">
            
            {/* Section 1: The Client (Frame 2147226939) */}
            <section id="the-client" className="flex flex-col items-start gap-[24px] lg:gap-[32px] scroll-mt-[120px]">
              {clientSummary && renderFormattedParagraphs(clientSummary)}

              {/* Stat Badges Row (Frame 2147226954: below text) */}
              {statBadges && statBadges.length > 0 && (
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-[12px] lg:gap-[20px] w-full">
                  {statBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-[10px] py-[12px] px-[16px] lg:p-[20px] bg-[#F4F6F9] rounded-tl-[12px] rounded-tr-[6px] rounded-br-[12px] rounded-bl-[12px]"
                    >
                      <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                      <span className="type-h6 text-[#111111] font-normal tracking-[-0.01em]">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Section 2: The Challenge (Frame 2147226741) */}
            {challenge && (
              <section id="the-challenge" className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]">
                <h3 className="type-h4 text-[#000000] font-normal tracking-[-0.01em]">
                  The Challenge
                </h3>
                {renderFormattedParagraphs(challenge)}
              </section>
            )}

            {/* Section 3: What Waterlabs did (Frame 2147226737) */}
            {whatWaterlabsDid && (
              <section id="what-waterlabs-did" className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]">
                <h3 className="type-h4 text-[#000000] font-normal tracking-[-0.01em]">
                  What Waterlabs did
                </h3>
                {renderFormattedParagraphs(whatWaterlabsDid)}
              </section>
            )}

            {/* Section 4: The Results (Frame 2147226738) */}
            {resultsBlock && (
              <section id="the-results" className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]">
                <h3 className="type-h4 text-[#000000] font-normal tracking-[-0.01em]">
                  The Results
                </h3>
                <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] w-full">
                  <div className="flex flex-col items-start gap-[8px] lg:gap-[16px]">
                    <div className="type-body-xl font-bold text-[#111111]">
                      {resultsBlock.headline}
                    </div>
                    <p className="type-body-xs text-[#2A2A2A]">
                      {renderFormattedText(resultsBlock.subheadline)}
                    </p>
                  </div>
                  {renderResultsParagraphs(resultsBlock.details)}
                </div>
              </section>
            )}

            {/* Section 5: The Outcomes (Frame 2147226739) */}
            {outcomes && (
              <section id="the-outcomes" className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]">
                <h3 className="type-h4 text-[#000000] font-normal tracking-[-0.01em]">
                  The Outcomes
                </h3>
                {renderFormattedParagraphs(outcomes)}
              </section>
            )}

            {/* Section 6: The Bottom Line (Frame 2147226740) */}
            {bottomLine && (
              <section id="the-bottom-line" className="flex flex-col items-start gap-[20px] lg:gap-[32px] scroll-mt-[120px]">
                <h3 className="type-h4 text-[#000000] font-normal tracking-[-0.01em]">
                  The Bottom Line
                </h3>
                <div className="flex flex-col items-start gap-[40px] w-full">
                  {renderFormattedParagraphs(bottomLine)}

                  {/* Filter Badges: exactly 40px below the paragraph */}
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-[12px] lg:gap-[16px]">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-[10px] px-[16px] py-[8px] rounded-full bg-[rgba(145,198,242,0.1)]"
                        >
                          <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                          <span className="type-cta text-[#2A2A2A] opacity-80">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudyContent;
