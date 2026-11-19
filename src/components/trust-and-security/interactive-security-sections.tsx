'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import CertificationsSection from './certifications';
import DataSovereigntySection from './data-sovereignty';
import OurOwnCloudSection from './our-own-cloud';
import SecurityAndComplianceSection from './security-and-compliance';
import TopicIndicator, { topics } from './topic-indicator';

export const InteractiveSecuritySections = () => {
  const [activeTopic, setActiveTopic] = useState<string>('data-sovereignty');
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isDesktopSticky, setIsDesktopSticky] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    const targetY = isMobile ? 120 : 140;

    const ctx = gsap.context(() => {
      // 1. Mobile sentinel trigger for sticky header
      if (sentinelRef.current) {
        ScrollTrigger.create({
          trigger: sentinelRef.current,
          start: 'top 60px',
          onToggle: (self) => setIsSticky(self.isActive),
        });
      }

      // 2. Desktop sticky indicator state
      const sectionEl = document.getElementById('interactive-security-sections');
      if (sectionEl) {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 120px',
          onToggle: (self) => setIsDesktopSticky(self.isActive),
        });
      }

      // 3. Section boundary tracking without layout thrashing
      topics.forEach((topic) => {
        const el = document.getElementById(topic.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: `top ${targetY}px`,
          end: `bottom ${targetY}px`,
          onToggle: (self) => {
            if (self.isActive) setActiveTopic(topic.id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTopic = (id: string) => {
    setActiveTopic(id);
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -115 : -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="interactive-security-sections" className="relative w-full">
      {/* 
        =============================================================================
        DESKTOP STICKY INDICATOR OVERLAY
        - Matches outer px-[20px] lg:px-[32px] xl:px-[60px] and inner max-w-[1320px] mx-auto
        - Pinned at top-[120px] on the left side (260px on lg, 305px on xl)
        - Aligned with the exact left boundary of ManifestoSection ("Most AI vendors...")
        - Ends at bottom-[40px] lg:bottom-[80px] to align bottom edge with Certifications white card
        - Spans across Data Sovereignty -> Our Own Cloud -> Security & Compliance -> Certifications
        =============================================================================
      */}
      <div className="pointer-events-none absolute top-0 bottom-[60px] left-0 z-30 hidden w-full px-[60px] lg:bottom-[100px] lg:block">
        <div className="mx-auto h-full w-full max-w-[1320px]">
          <aside
            className={`pointer-events-auto sticky top-[120px] w-[305px] transition-all duration-300 ease-in-out ${
              isDesktopSticky ? 'pt-0' : 'pt-0 lg:pt-[40px]'
            }`}
          >
            <TopicIndicator activeTopic={activeTopic} onSelectTopic={scrollToTopic} />
          </aside>
        </div>
      </div>

      {/* Sentinel for detecting when mobile topic indicator hits sticky position */}
      <div ref={sentinelRef} className="pointer-events-none block h-[1px] w-full lg:hidden" />

      {/* 
        =============================================================================
        MOBILE / TABLET STICKY INDICATOR BAR
        - When unscrolled: sits inside page padding as rounded card
        - When scrolled: expands to full width (px-0) with border-y directly below fixed navbar
        =============================================================================
      */}
      <div
        className={`sticky top-[60px] z-40 block w-full transition-all duration-300 lg:hidden ${
          isSticky
            ? 'bg-transparent px-0'
            : 'mx-auto max-w-[1320px] px-[20px] pt-[12px] pb-[8px] md:px-[40px]'
        }`}
      >
        <TopicIndicator
          activeTopic={activeTopic}
          onSelectTopic={scrollToTopic}
          isSticky={isSticky}
        />
      </div>

      {/* 
        =============================================================================
        RIGHT SECTION STACK (4 Interactive Sections)
        - 1. Data Sovereignty
        - 2. Our Own Cloud
        - 3. Security & Compliance
        - 4. Certifications
        =============================================================================
      */}
      <div className="flex w-full flex-col">
        <DataSovereigntySection />
        <OurOwnCloudSection />
        <SecurityAndComplianceSection />
        <CertificationsSection />
      </div>
    </div>
  );
};

export default InteractiveSecuritySections;
