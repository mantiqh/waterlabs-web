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
    if (text.includes('Maximize net revenue.') && (text.includes('Reduce cost to collect.') || text.includes('Reduce cost-to-collect.'))) {
      return (
        <>
          <span className="text-[#91C6F2] block">Maximize net revenue.</span>
          <span className="text-white block">Reduce cost to collect.</span>
        </>
      );
    }
    const parts = text.split(/(?<=\.)\s+/);
    if (parts.length >= 2) {
      return (
        <>
          <span className="text-[#91C6F2] block">{parts[0]}</span>
          <span className="text-white block">{parts.slice(1).join(' ')}</span>
        </>
      );
    }
    return <span className="text-[#91C6F2]">{text}</span>;
  };

  return (
    <section className="relative w-full bg-[#F4F6F9] overflow-hidden">
      {/* Hero Banner Card */}
      <div
        className="relative w-full min-h-[700px] lg:min-h-[830px] rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden flex flex-col justify-between pt-[20px] pb-[40px] px-[16px] sm:px-[20px] md:px-[40px] lg:pt-[40px] lg:pb-[80px] lg:px-[60px] bg-cover bg-center"
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
          className="pointer-events-none absolute w-[787px] h-[393px] lg:w-[1708px] lg:h-[854px] left-[78px] bottom-[-146px] lg:left-[569px] lg:top-[61px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[6.6px] rounded-[30px] z-0"
        />

        {/* Top Navbar */}
        <div className="relative z-20 w-full">
          <Navbar />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[24px] lg:gap-[32px] mt-auto pt-[40px] lg:pt-[80px]">
          {/* Left Text & CTA Block */}
          <div className="flex flex-col items-start gap-[24px] lg:gap-[40px] max-w-[1235px] w-full">
            {/* Text Stack: Eyebrow + Heading + Description */}
            <div className="flex flex-col items-start gap-[12px] lg:gap-[20px] w-full">
              {/* Eyebrow / Tag */}
              <div className="flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                  {subheading}
                </span>
              </div>

              {/* H1 Heading & Paragraph */}
              <div className="flex flex-col items-start gap-[12px] lg:gap-[20px] w-full">
                <h1 className="type-h1 max-sm:tracking-[-0.025em] tracking-[-0.01em] w-full max-w-[760px]">
                  {renderHeading(effectiveHeading)}
                </h1>
                <p className="type-body-s text-[#F4F6F9] max-w-[362px] md:max-w-[600px] lg:max-w-[710px]">
                  {effectiveDescription}
                </p>
              </div>
            </div>

            {/* Mobile: Row with CTA Button + Pause Circle | Desktop: Button only */}
            <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto">
              <Link href={ctaLink}>
                <CTA
                  variant="light-bg"
                  className="h-[38px] lg:h-[44px] px-[12px] lg:px-[20px] text-[14px] lg:text-[16px] leading-[24px]"
                >
                  {ctaText}
                </CTA>
              </Link>

              {/* Video Pause Toggle Button on Mobile (aligned right on actions row) */}
              <button
                type="button"
                aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
                onClick={() => setIsPlaying((prev) => !prev)}
                className="flex lg:hidden shrink-0 w-[43px] h-[43px] rounded-full bg-[rgba(42,42,42,0.8)] backdrop-blur-[14.4px] items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-[rgba(42,42,42,0.95)]"
              >
                {isPlaying ? (
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 1V11"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6.5 1V11"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
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
            className="hidden lg:flex shrink-0 w-[53px] h-[53px] rounded-full bg-[rgba(42,42,42,0.8)] backdrop-blur-[14.4px] items-center justify-center self-end cursor-pointer transition-all hover:scale-105 hover:bg-[rgba(42,42,42,0.95)]"
          >
            {isPlaying ? (
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 1.5V12.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 1.5V12.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
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

