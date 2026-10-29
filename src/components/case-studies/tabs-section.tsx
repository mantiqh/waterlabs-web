'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import { ChevronRight } from '@/components/CTA';
import type { CaseStudiesPageData, CaseStudy } from '@/types/case-study';

export interface CaseStudyItem {
  id: string;
  category: string;
  tag: string;
  stat: string;
  subtitle: string;
  title?: string;
  slug: string;
  desktopImage: string;
  mobileImage: string;
}

export const CASE_STUDY_CATEGORIES = [
  'All',
  'Features',
  'Use Cases',
  'Company News',
  'Case Studies',
] as const;

export type CaseStudyCategory = (typeof CASE_STUDY_CATEGORIES)[number];

const CARDS_PER_PAGE = 6;

// Base 5 real case studies connecting directly to individual case study pages (Behavioral Health is featured in the hero section)
const BASE_CASE_STUDIES: Omit<CaseStudyItem, 'id'>[] = [
  {
    category: 'Features',
    tag: 'Rural Health System',
    stat: '5 to 10 days → under 24 hours',
    subtitle: '13 Clinical Specialties',
    title:
      'How a multi-state rural health system used Waterlabs to cut claim release from 10 days to under 24 hours.',
    slug: 'multi-state-rural-health-system',
    desktopImage: '/images/case-study-main-page/tabs/img_placeholder_01.png',
    mobileImage: '/images/case-study-main-page/tabs/img_placeholder_01_mobile (1).png',
  },
  {
    category: 'Use Cases',
    tag: 'Enterprise RCM',
    stat: '2 to 4 days → same day',
    subtitle: '7 Coding Disciplines',
    title: 'How a $5B enterprise RCM organization used Waterlabs to code every chart the same day.',
    slug: 'enterprise-rcm-organization',
    desktopImage: '/images/case-study-main-page/tabs/img_placeholder_02.png',
    mobileImage: '/images/case-study-main-page/tabs/img_placeholder_02_mobile (1).png',
  },
  {
    category: 'Features',
    tag: 'Physical Therapy',
    stat: '60 people → 4',
    subtitle: 'Intake Automation',
    title:
      'How a multi-site physical therapy network used Waterlabs to run intake with 4 people instead of 60.',
    slug: 'multi-site-physical-therapy-network',
    desktopImage: '/images/case-study-main-page/tabs/img_placeholder_03.png',
    mobileImage: '/images/case-study-main-page/tabs/img_placeholder_03_mobile (1).png',
  },
  {
    category: 'Case Studies',
    tag: 'Hospital Emergency Department',
    stat: '90% of coding volume handled autonomously',
    subtitle: 'High-Volume Acute Care',
    title:
      'How a hospital emergency department used Waterlabs to code 90% of encounters without a coder.',
    slug: 'hospital-emergency-department',
    desktopImage: '/images/case-study-main-page/tabs/img_placeholder_05.png',
    mobileImage: '/images/case-study-main-page/tabs/img_placeholder_05_mobile (1).png',
  },
  {
    category: 'Case Studies',
    tag: 'Multi-Specialty Practice',
    stat: 'Zero manual benefit lookups per estimate',
    subtitle: 'Cost Estimation at Booking',
    title:
      'How a multi-specialty practice used Waterlabs to give every patient a cost estimate before the visit, not after.',
    slug: 'multi-specialty-outpatient-practice',
    desktopImage: '/images/case-study-main-page/tabs/img_placeholder_06.png',
    mobileImage: '/images/case-study-main-page/tabs/img_placeholder_06_mobile (1).png',
  },
];

export interface CaseStudiesTabsSectionProps {
  initialCaseStudies?: CaseStudy[];
  categories?: string[];
  settings?: CaseStudiesPageData | null;
}

const DEFAULT_CASE_STUDIES: CaseStudyItem[] = BASE_CASE_STUDIES.map((base, idx) => ({
  ...base,
  id: String(idx + 1),
}));

export const CaseStudiesTabsSection = ({
  initialCaseStudies,
  categories,
  settings,
}: CaseStudiesTabsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const settingsCategories = settings?.categories;
  const categoriesList = useMemo(() => {
    if (settingsCategories && settingsCategories.length > 0) {
      return ['All', ...settingsCategories.filter((c) => c !== 'All')];
    }
    if (categories && categories.length > 0) {
      return ['All', ...categories.filter((c) => c !== 'All')];
    }
    return Array.from(CASE_STUDY_CATEGORIES);
  }, [settingsCategories, categories]);

  const itemsList: CaseStudyItem[] = useMemo(() => {
    if (!initialCaseStudies || initialCaseStudies.length === 0) {
      return DEFAULT_CASE_STUDIES;
    }
    return initialCaseStudies
      .filter(
        (study) =>
          study.slug !== 'regional-behavioral-health-network' &&
          study.slug !== 'behavioral-health-practice' &&
          study.id !== 'case-study-4',
      )
      .map((study, idx) => {
        const fallback = DEFAULT_CASE_STUDIES[idx % DEFAULT_CASE_STUDIES.length];

        let category = (study.cardCategory as string) || fallback.category;
        if (!category || !categoriesList.includes(category)) {
          const catLower = (study.categoryTag || '').toLowerCase();
          if (catLower.includes('rural')) category = 'Features';
          else if (catLower.includes('enterprise')) category = 'Use Cases';
          else if (catLower.includes('physical')) category = 'Features';
          else if (catLower.includes('behavioral')) category = 'Company News';
          else category = 'Case Studies';
        }

        return {
          id: study.id || String(idx + 1),
          category,
          tag:
            study.cardTag ||
            study.tags?.[0] ||
            study.categoryTag?.replace(/^Case Study · /, '') ||
            fallback.tag,
          stat: study.cardStat || study.resultsBlock?.headline || fallback.stat,
          subtitle: study.cardSubtitle || study.client?.specialties || fallback.subtitle,
          title: study.title || fallback.title,
          slug: study.slug || fallback.slug,
          desktopImage: study.desktopImage || study.heroImage || fallback.desktopImage,
          mobileImage: study.mobileImage || study.heroImage || fallback.mobileImage,
        };
      });
  }, [initialCaseStudies, categoriesList]);

  const filteredItems = useMemo(() => {
    return itemsList.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.stat.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [itemsList, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * CARDS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safeCurrentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (safeCurrentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages];
  }, [totalPages, safeCurrentPage]);

  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1);
  // };

  // const handleSearchChange = (query: string) => {
  //   setSearchQuery(query);
  //   setCurrentPage(1);
  // };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === safeCurrentPage) return;
    setCurrentPage(newPage);
    if (gridRef.current) {
      const yOffset = -120;
      const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative m-0 w-full overflow-hidden p-0"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 50%, #0F68D6 50%)',
      }}
    >
      {/* 
        Outer Container:
        - Desktop: background #F4F6F9, border-radius: 0px 60px 60px 0px (rounded-tr-[60px] rounded-br-[60px]), padding: 80px 60px
        - Mobile: background #F4F6F9, border-radius: 0px 30px 30px 0px (rounded-tr-[30px] rounded-br-[30px]), padding: 40px 20px
      */}
      <div className="w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[32px] md:gap-[40px] lg:gap-[40px]">
          {/* ========================================================================= */}
          {/* Top Filter & Search Bar - Commented out for now                           */}
          {/* ========================================================================= */}

          {/* Desktop Filter Bar (Figma: Frame 2147226517) */}
          {/* <div className="hidden lg:flex flex-row items-center justify-between gap-[32px] w-full">
            <div className="flex flex-row items-center gap-[12px] xl:gap-[16px] flex-wrap">
              {categoriesList.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`h-[40px] px-[16px] py-[8px] rounded-[64px] type-cta font-medium transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] text-white shadow-sm'
                        : 'bg-[#91C6F2]/[0.09] text-[#7D8690] hover:text-[#042849] hover:bg-[#91C6F2]/[0.18]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="w-[280px] xl:w-[313px] h-[40px] bg-white/70 border border-white rounded-[64px] px-[16px] py-[8px] flex items-center gap-[10px] focus-within:bg-white focus-within:border-[#0F68D6] transition-all">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#042849] shrink-0"
              >
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={settings?.searchPlaceholder || 'Search'}
                className="w-full bg-transparent border-none outline-none type-cta font-normal text-[#2A2A2A] placeholder:text-[#7D8690]"
              />
            </div>
          </div> */}

          {/* Mobile & Tablet Filter Bar (Figma: Frame 2147226778) */}
          {/* <div className="flex lg:hidden flex-col gap-[16px] w-full">
            <div className="flex flex-row items-center gap-[12px] w-full">
              <div className="flex-1 h-[39px] bg-white rounded-[12px_6px_12px_12px] px-[12px] flex items-center gap-[8px] border border-transparent focus-within:border-[#0F68D6]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#042849] shrink-0"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={settings?.searchPlaceholder || 'Search'}
                  className="w-full bg-transparent border-none outline-none type-caption text-[#2A2A2A] placeholder:text-[#D7DCE2]"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                  className="h-[39px] px-[12px] bg-white border border-[#F4F6F9] rounded-[8px_2px_8px_8px] flex items-center gap-[8px] cursor-pointer"
                >
                  <span className="type-caption text-[#2A2A2A]">
                    {settings?.filterByLabel || 'Filter by'}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black shrink-0"
                  >
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 top-[45px] z-30 w-[180px] bg-white rounded-[12px] shadow-lg border border-[#D7DCE2] py-[6px] overflow-hidden">
                    {categoriesList.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          handleCategorySelect(category);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-[14px] py-[8px] type-caption transition-colors cursor-pointer ${
                          selectedCategory === category
                            ? 'bg-[#0F68D6]/10 text-[#0F68D6] font-medium'
                            : 'text-[#2A2A2A] hover:bg-[#F4F6F9]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* ========================================================================= */}
          {/* Case Studies Grid (2 Columns on Desktop)                                  */}
          {/* ========================================================================= */}
          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-x-[32px] gap-y-[32px] lg:grid-cols-2 lg:gap-y-[40px]"
          >
            {paginatedItems.map((card) => (
              <div
                key={card.id}
                className="flex w-full flex-col gap-[8px] border-b border-[#D7DCE2] pb-[20px] md:gap-[12px] md:pb-[24px]"
              >
                {/* Eyebrow Tag: Blue Dot + Text - Commented out */}
                {/* <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-body-xxs text-[14px] lg:text-[16px] text-[rgba(42,42,42,0.6)] tracking-[0.01em]">
                    {card.tag}
                  </span>
                </div> */}

                {/* =================================================================== */}
                {/* Desktop Card Layout (Side-by-side)                                  */}
                {/* =================================================================== */}
                <div className="hidden w-full flex-row items-stretch justify-between gap-[20px] md:flex">
                  {/* Left Column: Title (clickable) & CTA Button */}
                  <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-[16px]">
                    <div className="flex w-full flex-col items-start gap-[12px]">
                      {/* Clickable Card Heading matching inner case study page */}
                      <Link href={`/case-study/${card.slug}`} className="group/title block w-full">
                        <h5 className="type-body-l lg:type-body-s xl:type-body-l text-[#042849] transition-colors group-hover/title:text-[#0F68D6]">
                          {card.title || card.stat}
                        </h5>
                      </Link>
                    </div>

                    <Link href={`/case-study/${card.slug}`} className="group inline-block">
                      <div className="flex h-[44px] cursor-pointer items-center gap-[10px] rounded-[64px] border border-[#F4F6F9] bg-[rgba(214,214,214,0.6)] px-[20px] py-[10px] backdrop-blur-[12px] transition-all duration-300 hover:border-[#0F68D6]/30 hover:bg-white/80">
                        <span className="type-body-xxs text-[#2A2A2A]">
                          {settings?.readStoryButtonText || 'Read the story'}
                        </span>
                        <ChevronRight className="h-[18px] w-[12px] text-[#2A2A2A] opacity-20 transition-opacity group-hover:opacity-70" />
                      </div>
                    </Link>
                  </div>

                  {/* Right Column: Image */}
                  <div className="relative h-[174px] w-[227px] shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] shadow-sm">
                    <Image
                      src={card.desktopImage}
                      alt={card.title || card.stat}
                      fill
                      className="object-cover object-center"
                      sizes="227px"
                    />
                  </div>
                </div>

                {/* =================================================================== */}
                {/* Mobile Card Layout (Stacked: Image Top / Bottom Info Row)           */}
                {/* =================================================================== */}
                <div className="flex w-full flex-col items-start gap-[12px] md:hidden">
                  {/* Top Image */}
                  <div className="relative h-[217px] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] shadow-sm">
                    <Image
                      src={card.mobileImage}
                      alt={card.title || card.stat}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>

                  {/* Bottom Row: Clickable Title on left, Circular Arrow on right */}
                  <div className="flex w-full flex-row items-end justify-between gap-[12px] pt-[4px]">
                    <Link
                      href={`/case-study/${card.slug}`}
                      className="group/mobiletitle flex flex-1 flex-col items-start gap-[8px]"
                    >
                      <h5 className="type-body-l text-[#042849] transition-colors group-hover/mobiletitle:text-[#0F68D6]">
                        {card.title || card.stat}
                      </h5>
                    </Link>

                    {/* Circular Blue Arrow Indicator (Fill - arrow - indicator) */}
                    <Link
                      href={`/case-study/${card.slug}`}
                      aria-label={settings?.readStoryButtonText || 'Read the story'}
                      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0F68D6] text-white shadow-sm transition-colors hover:bg-[#042849]"
                    >
                      <ChevronRight className="h-[14px] w-[10px] text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredItems.length === 0 && (
            <div className="flex w-full flex-col items-center gap-[12px] py-[60px] text-center">
              <p className="type-body-s text-[#7D8690]">
                No case studies found matching your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="type-body-xxs cursor-pointer text-[#0F68D6] underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* Pagination (Figma: Frame 2147226503)                                      */}
          {/* ========================================================================= */}
          {filteredItems.length > 0 && (
            <div className="flex w-full flex-row items-center justify-end gap-[16px] pt-[16px] md:gap-[24px] lg:gap-[32px]">
              {/* Prev Page Button */}
              {totalPages > 1 && (
                <button
                  type="button"
                  aria-label="Previous page"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className={`flex h-[24px] w-[24px] items-center justify-center text-[#0F68D6] transition-opacity ${
                    safeCurrentPage === 1
                      ? 'cursor-not-allowed opacity-30'
                      : 'cursor-pointer hover:opacity-75'
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M8.75 2.625L4.375 7L8.75 11.375"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              {/* Page Numbers */}
              <div className="flex flex-row items-center gap-[16px] md:gap-[24px] lg:gap-[32px]">
                {pageNumbers.map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="type-body-xxs tracking-[0.2em] text-[#7D8690] select-none"
                      >
                        ....
                      </span>
                    );
                  }

                  const isSelected = page === safeCurrentPage;
                  const pageNum = page as number;
                  return (
                    <button
                      key={`page-${pageNum}`}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`type-body-xxs cursor-pointer border-none bg-transparent p-0 transition-colors outline-none ${
                        isSelected
                          ? 'font-medium text-[#0F68D6]'
                          : 'text-[#7D8690] hover:text-[#0F68D6]'
                      }`}
                    >
                      {String(page).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              {totalPages > 1 && (
                <button
                  type="button"
                  aria-label="Next page"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className={`flex h-[24px] w-[24px] items-center justify-center text-[#0F68D6] transition-opacity ${
                    safeCurrentPage === totalPages
                      ? 'cursor-not-allowed opacity-30'
                      : 'cursor-pointer hover:opacity-75'
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M5.25 2.625L9.625 7L5.25 11.375"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesTabsSection;
