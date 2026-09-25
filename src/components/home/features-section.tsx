'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { CTA } from '@/components/CTA';
import { DEFAULT_HOME_DATA } from '@/data/home';
import type { StatItem } from '@/types/home';

interface FeaturesSectionProps {
  tag?: string;
  heading?: string;
  headingHighlight?: string;
  description?: string;
  card1Title?: string;
  card1Description?: string;
  card1Image?: string;
  card2Title?: string;
  card2Description?: string;
  card2Image?: string;
  securityTag?: string;
  securityHeadingHighlight?: string;
  securityHeading?: string;
  securityDescription?: string;
  securityImage?: string;
  statsTag?: string;
  statsHeading?: string;
  stats?: StatItem[];
  caseStudyTitle?: string;
  caseStudySubtitle?: string;
  caseStudyImage?: string;
  caseStudyCtaText?: string;
  caseStudyCtaLink?: string;
}

const FeaturesSection = ({
  tag = DEFAULT_HOME_DATA.featuresTag,
  heading = DEFAULT_HOME_DATA.featuresHeading,
  headingHighlight = DEFAULT_HOME_DATA.featuresHeadingHighlight,
  description = DEFAULT_HOME_DATA.featuresDescription,
  card1Title = DEFAULT_HOME_DATA.card1Title,
  card1Description = DEFAULT_HOME_DATA.card1Description,
  card1Image = DEFAULT_HOME_DATA.card1Image ||
    '/images/home/features-images/img_explore_eligibility_and_benefits.png',
  card2Title = DEFAULT_HOME_DATA.card2Title,
  card2Description = DEFAULT_HOME_DATA.card2Description,
  card2Image = DEFAULT_HOME_DATA.card2Image ||
    '/images/home/features-images/img_denial_prevention.png',
  securityTag = DEFAULT_HOME_DATA.securityTag,
  securityHeadingHighlight = DEFAULT_HOME_DATA.securityHeadingHighlight,
  securityHeading = DEFAULT_HOME_DATA.securityHeading,
  securityDescription = DEFAULT_HOME_DATA.securityDescription,
  securityImage = DEFAULT_HOME_DATA.securityImage ||
    '/images/home/features-images/img_your_patient_data_never_leaves_your_environment.png',
  statsTag = DEFAULT_HOME_DATA.statsTag,
  statsHeading = DEFAULT_HOME_DATA.statsHeading,
  stats = DEFAULT_HOME_DATA.stats,
  caseStudyTitle = DEFAULT_HOME_DATA.caseStudyTitle,
  caseStudySubtitle = DEFAULT_HOME_DATA.caseStudySubtitle,
  caseStudyImage = DEFAULT_HOME_DATA.caseStudyImage ||
    '/images/home/features-images/img_60_outsourced_staff_3_in_house_managers.png',
  caseStudyCtaText = DEFAULT_HOME_DATA.caseStudyCtaText,
  caseStudyCtaLink = DEFAULT_HOME_DATA.caseStudyCtaLink,
}: FeaturesSectionProps) => {
  const statsScrollRef = useRef<HTMLDivElement>(null);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const handleStatsScroll = () => {
    const container = statsScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const distance = Math.abs(scrollLeft - cardLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveStatIndex(closestIndex);
  };

  const scrollToStat = (index: number) => {
    const container = statsScrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft - container.offsetLeft;
      container.scrollTo({ left: cardLeft, behavior: 'smooth' });
      setActiveStatIndex(index);
    }
  };

  return (
    <section className="w-full bg-[#01051A] lg:bg-[#07157D]">
      <div className="w-full bg-white rounded-tl-[40px] lg:rounded-tl-[60px] px-[20px] md:px-[40px] pt-[40px] pb-[20px] sm:pt-[60px] sm:pb-[40px] lg:px-[60px] lg:py-[80px]">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[48px] sm:gap-[64px] lg:gap-[120px]">
          {/* Row 1: Title Block (2-column layout on desktop matching Figma) */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-[16px] sm:gap-[24px] lg:gap-[60px]">
            {/* Left Tag */}
            {tag && (
              <div className="lg:w-[240px] xl:w-[360px] shrink-0 pt-[4px] lg:pt-[8px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"></div>
                  <span className="type-body-xxs text-[#7D8690]">{tag}</span>
                </div>
              </div>
            )}

            {/* Right Heading & Subheading */}
            <div className="flex-1 min-w-0 flex flex-col gap-[16px] lg:gap-[24px]">
              <h2 className="type-h2">
                <span className="text-[#111111]">{heading}</span>
                <br />
                {headingHighlight && (
                  <>
                    <span className="text-[#111111]">Or </span>
                    <span className="text-electric-blue">{headingHighlight}</span>
                  </>
                )}
              </h2>
              <p className="type-body-s text-[#4B5563] whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          {/* Row 2: Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px]">
            {/* Card 1 */}
            <div className="flex flex-col bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden justify-between">
              <div className="flex flex-col gap-[8px] p-[20px] sm:p-[24px] lg:p-[32px] pb-0 lg:pb-0">
                <h5 className="type-h5 text-electric-blue lg:text-[#042849]">
                  {card1Title}
                </h5>
                <p className="type-body-xs text-[#111111]">{card1Description}</p>
              </div>
              {card1Image && (
                <div className="w-full mt-[16px] lg:mt-[24px] overflow-hidden">
                  <Image
                    src={card1Image}
                    alt={card1Title}
                    width={1300}
                    height={574}
                    className="w-full h-auto block object-cover"
                  />
                </div>
              )}
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden justify-between">
              <div className="flex flex-col gap-[8px] p-[20px] sm:p-[24px] lg:p-[32px] pb-0 lg:pb-0">
                <h5 className="type-h5 text-electric-blue lg:text-[#042849]">
                  {card2Title}
                </h5>
                <p className="type-body-xs text-[#111111]">{card2Description}</p>
              </div>
              {card2Image && (
                <div className="w-full mt-[16px] lg:mt-[24px] overflow-hidden">
                  <Image
                    src={card2Image}
                    alt={card2Title}
                    width={1300}
                    height={574}
                    className="w-full h-auto block object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Healthcare-grade by default */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[40px] items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-[16px] lg:gap-[24px]">
              {securityTag && (
                <div className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#0F68D6] shrink-0"></div>
                  <span className="type-body-xxs text-[#7D8690]">{securityTag}</span>
                </div>
              )}
              <h3 className="type-h3">
                {securityHeadingHighlight && (
                  <span className="text-[#0F68D6]">{securityHeadingHighlight} </span>
                )}
                <span className="text-[#111111]">{securityHeading}</span>
              </h3>
              <p className="type-body-xs text-[#4B5563]">{securityDescription}</p>
            </div>

            {/* Right Image */}
            {securityImage && (
              <div className="relative w-full aspect-[1300/882] rounded-[20px] lg:rounded-[32px] overflow-hidden">
                <Image
                  src={securityImage}
                  alt={securityHeading}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Row 4: Our Stats & Case Study */}
          <div className="flex flex-col gap-[32px] lg:gap-[40px]">
            {/* Stats Header */}
            <div className="flex flex-col gap-[12px] lg:gap-[16px]">
              {statsTag && (
                <div className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"></div>
                  <span className="type-body-xxs text-[#7D8690]">{statsTag}</span>
                </div>
              )}
              <h3 className="type-h3 text-[#111111]">{statsHeading}</h3>
            </div>

            {/* Desktop 4-Column Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-[16px] xl:gap-[24px]">
              {stats.map((item, index) => (
                <div
                  key={`desktop-stat-${item._key || index}`}
                  className="flex flex-col justify-between p-[20px] xl:p-[32px] h-[280px] xl:h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 min-w-0"
                >
                  {item.icon && (
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[8px]">
                    <span className="type-h3 text-[#111111] !leading-[1]">
                      {item.stat}{' '}
                      {item.unit && (
                        <span className="type-body-l text-[#111111]">
                          {item.unit}
                        </span>
                      )}
                    </span>
                    <span className="type-body-xs text-[#4B5563]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Swipe Slider */}
            <div className="flex lg:hidden flex-col w-full gap-[20px]">
              <div
                ref={statsScrollRef}
                onScroll={handleStatsScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[16px] items-stretch [&::-webkit-scrollbar]:hidden -mx-[20px] px-[20px] md:-mx-[40px] md:px-[40px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {stats.map((item, index) => (
                  <div
                    key={`mobile-stat-${item._key || index}`}
                    className="shrink-0 snap-start w-[280px] sm:w-[320px] flex flex-col justify-between p-[28px] h-[280px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100"
                  >
                    {item.icon && (
                      <div className="relative w-[72px] h-[72px]">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-[8px]">
                      <span className="type-h4 text-electric-blue !leading-[1]">
                        {item.stat}{' '}
                        {item.unit && <span className="type-h6">{item.unit}</span>}
                      </span>
                      <span className="type-body-xxs text-[#4B5563]">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Pagination Indicators */}
              <div className="flex items-center gap-[6px] mt-[4px]">
                {stats.map((item, i) => (
                  <button
                    key={`stat-dot-${item._key || i}`}
                    type="button"
                    onClick={() => scrollToStat(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-[4px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                      activeStatIndex === i
                        ? 'w-[24px] bg-electric-blue'
                        : 'w-[8px] bg-[#91C6F2]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Case Study Banner */}
            <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              {caseStudyImage && (
                <div className="relative w-full lg:w-[50%] aspect-[650/392] lg:aspect-auto lg:h-[392px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[16px] lg:rounded-br-[32px] overflow-hidden shrink-0">
                  <Image
                    src={caseStudyImage}
                    alt={caseStudyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content Side */}
              <div className="flex flex-col justify-center items-start gap-[16px] sm:gap-[20px] lg:gap-[24px] p-[20px] sm:p-[24px] lg:p-[48px] w-full lg:w-[50%]">
                <div className="flex flex-col gap-[8px]">
                  <h5 className="type-h5 text-electric-blue lg:text-[#042849] whitespace-pre-line">
                    {caseStudyTitle}
                  </h5>
                  <p className="type-body-xs text-[#111111]">
                    {caseStudySubtitle}
                  </p>
                </div>
                <Link href={caseStudyCtaLink || '/case-studies'}>
                  <CTA variant="light-bg">{caseStudyCtaText}</CTA>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
