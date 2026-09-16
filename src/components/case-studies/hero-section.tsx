'use client';

import Link from 'next/link';
import { useState } from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

interface SlideItem {
  tag: string;
  date: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageMobile: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    tag: 'Article',
    date: 'Jun 26, 2025',
    title: 'Notes from the revenue cycle',
    description: 'Product updates, industry insight, and how we think about the work.',
    href: '/case-study/multi-state-rural-health-system',
    image: '/images/case-study-main-page/hero-section/img_banner_card.png',
    imageMobile: '/images/case-study-main-page/hero-section/img_banner_card_mobile.png',
  },
  {
    tag: 'Case Study',
    date: 'Aug 14, 2025',
    title: 'Multi-State Rural Health System',
    description: 'How 100 autonomous agents cleared backlog and reduced denials by 68%.',
    href: '/case-study/multi-state-rural-health-system',
    image: '/images/case-study-main-page/hero-section/img_banner_card.png',
    imageMobile: '/images/case-study-main-page/hero-section/img_banner_card_mobile.png',
  },
  {
    tag: 'Case Study',
    date: 'Sep 02, 2025',
    title: 'Enterprise RCM Automation at Scale',
    description: 'Scaling touchless revenue cycle operations across 40+ hospitals.',
    href: '/case-study/enterprise-rcm-automation',
    image: '/images/case-study-main-page/hero-section/img_banner_card.png',
    imageMobile: '/images/case-study-main-page/hero-section/img_banner_card_mobile.png',
  },
];

export const CaseStudiesHeroSection = () => {
  const [activeIndex] = useState(0);

  // Carousel controls (commented out while controls are hidden)
  // const isFirst = activeIndex === 0;
  // const isLast = activeIndex === HERO_SLIDES.length - 1;
  // const handlePrev = () => {
  //   if (isFirst) return;
  //   setActiveIndex((prev) => prev - 1);
  // };
  // const handleNext = () => {
  //   if (isLast) return;
  //   setActiveIndex((prev) => prev + 1);
  // };

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative w-full bg-[#F4F6F9] overflow-hidden">
      <div className="w-full bg-white rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden pt-[20px] lg:pt-[40px] px-[20px] md:px-[40px] lg:px-[60px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
        {/* Top Navbar */}
        <div className="w-full max-w-[1320px] mx-auto">
          <Navbar />
        </div>

      {/* 
        Featured Case Study Hero Card:
        - Desktop (Figma: 6291-6998): 1320px x 517px, border-radius: 40px 20px
        - Mobile (Figma: 6291-7097): 362px x 434.5px, border-radius: 20px 10px 20px 20px
        - Background: CSS background image without absolute positioning
      */}
      <div className="w-full max-w-[1320px] mx-auto mt-[24px] lg:mt-[32px] xl:mt-[40px] rounded-[20px_10px_20px_20px] lg:rounded-[40px_20px_40px_20px] overflow-hidden shadow-[0_12px_40px_rgba(4,40,73,0.08)] bg-[#042849] bg-[url('/images/case-study-main-page/hero-section/img_banner_bg_mobile.png')] lg:bg-[url('/images/case-study-main-page/hero-section/img_banner_bg.png')] bg-cover bg-left-center bg-no-repeat">
        
        {/* ========================================================================= */}
        {/* Desktop Layout (1024px+): Side-by-side (506px text / 810px image)         */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-row items-stretch justify-between w-full h-[460px] xl:h-[517px]">
          {/* Left Column: Text Content & Controls (Frame 2147203266 / 2147226509) */}
          <div className="w-full lg:w-[48%] xl:w-[506px] shrink-0 p-[32px] xl:p-[40px] flex flex-col justify-between items-start">
            <div className="flex flex-col items-start gap-[16px] xl:gap-[20px] w-full">
              {/* Tag / Eyebrow (Text - Tag) */}
              <div className="flex items-center gap-[8px]">
                <span className="type-caption text-[#D7DCE2]">{currentSlide.tag}</span>
                <span className="h-[14px] w-[1px] bg-[#D7DCE2]/40" />
                <span className="type-caption text-[#D7DCE2]">{currentSlide.date}</span>
              </div>

              {/* Title & Description (Frame 2147226509 / 2147226507) */}
              <div className="flex flex-col items-start gap-[12px] xl:gap-[16px] w-full">
                <h5 className="type-h5 text-white tracking-[-0.01em]">
                  {currentSlide.title}
                </h5>
                <p className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  {currentSlide.description}
                </p>
              </div>

              {/* CTA Button (Desktop - Fill CTA) */}
              <div className="pt-[4px]">
                <Link href={currentSlide.href} className="inline-block">
                  <CTA variant="dark-bg" as="div">
                    Read more
                  </CTA>
                </Link>
              </div>
            </div>

            {/* Bottom Controls Row: Carousel Indicators & Arrow Buttons (Arrow indicator) - Commented out for now */}
            {/* <div className="w-full flex flex-row justify-between items-center pt-[16px]">
              <div className="flex flex-row items-center gap-[5px]" role="tablist" aria-label="Slide indicators">
                {HERO_SLIDES.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  const isNear = Math.abs(idx - activeIndex) === 1 || (activeIndex === 0 && idx === HERO_SLIDES.length - 1) || (activeIndex === HERO_SLIDES.length - 1 && idx === 0);
                  const pillWidth = isActive ? 'w-[32px] bg-white' : isNear ? 'w-[16px] bg-white/20 hover:bg-white/40' : 'w-[6px] bg-white/20 hover:bg-white/40';
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-[6px] ${pillWidth} rounded-[32px] transition-all duration-300 cursor-pointer focus:outline-none`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-selected={isActive}
                      role="tab"
                    />
                  );
                })}
              </div>

              <div className="flex flex-row items-center gap-[14px]">
                <CTA
                  variant={isFirst ? 'dark-arrow' : 'dark-bg'}
                  onClick={handlePrev}
                  disabled={isFirst}
                  className={`w-[48px] h-[48px] rounded-full rotate-180 transition-all duration-300 ${
                    isFirst
                      ? 'cursor-not-allowed disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-white'
                      : 'cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] [&>svg]:text-electric-blue [@media(hover:hover)]:hover:[&>svg]:text-white'
                  }`}
                  aria-label="Previous slide"
                />

                <CTA
                  variant={isLast ? 'dark-arrow' : 'dark-bg'}
                  onClick={handleNext}
                  disabled={isLast}
                  className={`w-[48px] h-[48px] rounded-full transition-all duration-300 ${
                    isLast
                      ? 'cursor-not-allowed disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-white'
                      : 'cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] [&>svg]:text-electric-blue [@media(hover:hover)]:hover:[&>svg]:text-white'
                  }`}
                  aria-label="Next slide"
                />
              </div>
            </div> */}
          </div>

          {/* Right Column: Hero Image (Frame 2147226502) - Pure CSS background image */}
          <div
            className="w-full lg:w-[52%] xl:w-[810px] h-full shrink-0 rounded-r-[20px] lg:rounded-l-none bg-cover bg-center bg-no-repeat transition-all duration-500"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
            role="img"
            aria-label={currentSlide.title}
          />
        </div>

        {/* ========================================================================= */}
        {/* Mobile & Tablet Layout (< 1024px): Stacked Layout (Image Top / Text Bottom) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col items-start w-full">
          {/* Top Image (Frame 2147226503) */}
          <div
            className="w-full h-[235px] sm:h-[260px] rounded-[20px_10px_20px_20px] bg-cover bg-center bg-no-repeat shrink-0"
            style={{ backgroundImage: `url(${currentSlide.imageMobile})` }}
            role="img"
            aria-label={currentSlide.title}
          />

          {/* Bottom Content (Frame 2147203266 / 2147226899) */}
          <div className="w-full p-[20px] sm:p-[24px] pb-[28px] sm:pb-[36px] flex flex-col items-start gap-[16px]">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[6px]">
              <span className="type-caption text-[#D7DCE2]">{currentSlide.tag}</span>
              <span className="h-[12px] w-[1px] bg-[#D7DCE2]/40" />
              <span className="type-caption text-[#D7DCE2]">{currentSlide.date}</span>
            </div>

            {/* Title & Description (Frame 2147227105) */}
            <div className="flex flex-col items-start gap-[8px] w-full">
              <h5 className="type-h5 text-white tracking-[-0.01em]">
                {currentSlide.title}
              </h5>
              <p className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                {currentSlide.description}
              </p>
            </div>

            {/* CTA Button on mobile (Mobile - Fill CTA) */}
            <div className="pt-[4px]">
              <Link href={currentSlide.href} className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Read more
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default CaseStudiesHeroSection;
