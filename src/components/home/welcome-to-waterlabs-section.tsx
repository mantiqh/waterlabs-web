'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { CTA } from '@/components/CTA';
import { mountWordHighlight } from '@/lib/motion/motion';

const FIRST_PHRASE = 'We transform your RCM workflows with intelligent';
const REMAINING_WORDS = [
  'AI',
  'agents',
  'that',
  'learn,',
  'execute,',
  'and',
  'continuously',
  'improve,',
  'delivering',
  'better',
  'outcomes',
  'across',
  'every',
  'stage',
  'of',
  'RCM.',
  'Our',
  'agents',
  'work',
  'directly',
  'within',
  'your',
  'current',
  'systems,',
  'removing',
  'any',
  'tech',
  'integration',
  'headaches',
  'and',
  'IT',
  'backlogs.',
  'You',
  'deploy',
  'in',
  '14',
  'days',
  'with',
  'zero',
  'upfront',
  'friction,',
  'and',
  'billing',
  'starts',
  'only',
  'once',
  'your',
  'agents',
  'are',
  'actively',
  'processing',
  'work.',
];

export interface WelcomeToWaterlabsSectionProps {
  tag?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const WelcomeToWaterlabsSection = ({
  tag = 'Welcome to Waterlabs',
  ctaText = 'About us',
  ctaLink = '/about-us',
}: WelcomeToWaterlabsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    return mountWordHighlight(sectionRef.current);
  }, []);

  return (
    <section
      data-home-section="welcome"
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-br-[30px] bg-gradient-to-b from-[#0454CA] from-50% to-[#FFFFFF] to-50% lg:rounded-none"
    >
      {/* 
        Container (Welcome to Waterlabs):
        Desktop (Figma node 7487-16553):
          - Width: 1440px / stretch, Height: 508px
          - Padding: outer 0 60px, inner 80px 0 (py-[80px] px-[60px])
          - Background: #F4F6F9
          - Border radius: 0px 60px 60px 0px (rounded-tr-[60px] rounded-br-[60px])
        Mobile (Figma node 7487-17041):
          - Width: 402px, Height: 442px
          - Padding: 40px 20px
          - Background: #F4F6F9
          - Border radius: 0px 30px 30px 0px (rounded-tr-[30px] rounded-br-[30px])
      */}
      <div className="flex min-h-[442px] w-full items-center justify-center rounded-tr-[30px] rounded-br-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] lg:min-h-[508px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Content wrapper: 362px x 362px on mobile (gap 12px), 1092px x 348px on desktop (gap 20px) */}
        <div className="mx-auto flex w-full max-w-[362px] flex-col items-center gap-[12px] text-center lg:max-w-[1092px] lg:gap-[20px]">
          {/* Eyebrow Tag: Status dot + Welcome to Waterlabs */}
          <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
            <span
              data-motion-reveal="scramble"
              data-motion-trigger="section"
              data-motion-start="top 70%"
              className="type-body-xxs tracking-[0.01em] text-[#7D8690]"
            >
              {tag}
            </span>
          </div>

          {/* Statement Headline: Display/H5 (General Sans) */}
          <p className="type-h5 w-full max-w-[362px] text-center tracking-[-0.01em] lg:max-w-[1092px]">
            {/* First phrase starts active in dark #2A2A2A */}
            <span className="font-normal text-[#2A2A2A] transition-colors duration-300">
              {FIRST_PHRASE}{' '}
            </span>

            {/* Remaining words illuminate on scroll from #D7DCE2 to #2A2A2A. */}
            {REMAINING_WORDS.map((word, idx) => (
              <span key={`word-${idx}`} data-motion-word className="inline text-[#2A2A2A]">
                {word}{' '}
              </span>
            ))}
          </p>

          {/* Actions / CTA Button: About us */}
          <div className="flex flex-col items-center">
            <Link href={ctaLink} aria-label={ctaText}>
              <CTA data-motion-reveal="fade" data-motion-magnetic variant="light-bg" as="span">
                {ctaText}
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeToWaterlabsSection;
