'use client';

import Link from 'next/link';
import { useState } from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const HeroSection = ({
  heading,
  subheading = 'Agentic RCM built from inside healthcare',
  description,
  ctaText = 'Get a demo',
  ctaLink = '/contact-us',
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const effectiveHeading =
    !heading || heading.includes("Don't just automate")
      ? 'Maximize net revenue. Reduce cost to collect.'
      : heading;

  const effectiveDescription =
    !description || description.includes('You measure it, we improve it')
      ? 'Agentic AI across the full revenue cycle, working inside the systems your team already uses, with billing that starts only once the agents do.'
      : description;

  // Splits heading into two parts if both sentences exist:
  // Part 1 in sky blue (#91C6F2)
  // Part 2 in pure white (#FFFFFF)
  const renderHeading = (text: string) => {
    if (
      text.includes('Maximize net revenue.') &&
      (text.includes('Reduce cost to collect.') || text.includes('Reduce cost-to-collect.'))
    ) {
      return (
        <>
          <span className="block text-[#91C6F2]">Maximize net revenue.</span>
          <span className="block text-white">Reduce cost to collect.</span>
        </>
      );
    }
    const parts = text.split(/(?<=\.)\s+/);
    if (parts.length >= 2) {
      return (
        <>
          <span className="block text-[#91C6F2]">{parts[0]}</span>
          <span className="block text-white">{parts.slice(1).join(' ')}</span>
        </>
      );
    }
    return <span className="text-[#91C6F2]">{text}</span>;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6F9]">
      {/* Hero Banner Card */}
      <div
        className="relative flex min-h-[700px] w-full flex-col justify-between overflow-hidden rounded-bl-[30px] bg-cover bg-center px-[16px] pt-[20px] pb-[40px] sm:px-[20px] md:px-[40px] lg:min-h-[830px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(0, 0, 0, 0) 39.89%, rgba(0, 0, 0, 0.65) 75%, rgba(0, 0, 0, 0.85) 100%),
            linear-gradient(136.88deg, rgba(0, 0, 0, 0) 70%, #000000 100%),
            url('/images/home/hero-section/bg_banner.png')
          `,
        }}
      >
        {/* Decorative Blurred Glass Layer (Figma: vector-path) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-146px] left-[78px] z-0 h-[393px] w-[787px] rounded-[30px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[6.6px] lg:top-[61px] lg:left-[569px] lg:h-[854px] lg:w-[1708px]"
        />

        {/* Top Navbar */}
        <div className="relative z-20 w-full">
          <Navbar />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[24px] pt-[40px] lg:flex-row lg:items-end lg:gap-[32px] lg:pt-[80px]">
          {/* Left Text & CTA Block */}
          <div className="flex w-full max-w-[1235px] flex-col items-start gap-[24px] lg:gap-[40px]">
            {/* Text Stack: Eyebrow + Heading + Description */}
            <div className="flex w-full flex-col items-start gap-[12px] lg:gap-[20px]">
              {/* Eyebrow / Tag */}
              <div className="flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
                <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">{subheading}</span>
              </div>

              {/* H1 Heading & Paragraph */}
              <div className="flex w-full flex-col items-start gap-[12px] lg:gap-[20px]">
                <h1 className="type-h1 w-full max-w-[760px] tracking-[-0.01em] max-sm:tracking-[-0.025em]">
                  {renderHeading(effectiveHeading)}
                </h1>
                <p className="type-body-s max-w-[362px] text-[#F4F6F9] md:max-w-[600px] lg:max-w-[710px]">
                  {effectiveDescription}
                </p>
              </div>
            </div>

            {/* Mobile: Row with CTA Button + Pause Circle | Desktop: Button only */}
            <div className="flex w-full items-center justify-between lg:w-auto lg:justify-start">
              <Link href={ctaLink}>
                <CTA variant="light-bg">{ctaText}</CTA>
              </Link>

              {/* Video Pause Toggle Button on Mobile (aligned right on actions row) */}
              <button
                type="button"
                aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
                onClick={() => setIsPlaying((prev) => !prev)}
                className="flex h-[43px] w-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(42,42,42,0.8)] backdrop-blur-[14.4px] transition-all hover:scale-105 hover:bg-[rgba(42,42,42,0.95)] lg:hidden"
              >
                {isPlaying ? (
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.5 1V11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6.5 1V11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5"
                  >
                    <path d="M1.5 1.5L8.5 6L1.5 10.5V1.5Z" fill="#FFFFFF" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Video Pause Toggle Button on Desktop (aligned bottom right of 1320px container) */}
          <button
            type="button"
            aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
            onClick={() => setIsPlaying((prev) => !prev)}
            className="hidden h-[53px] w-[53px] shrink-0 cursor-pointer items-center justify-center self-end rounded-full bg-[rgba(42,42,42,0.8)] backdrop-blur-[14.4px] transition-all hover:scale-105 hover:bg-[rgba(42,42,42,0.95)] lg:flex"
          >
            {isPlaying ? (
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 1.5V12.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 1.5V12.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0.5"
              >
                <path d="M2 2L10 7L2 12V2Z" fill="#FFFFFF" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
