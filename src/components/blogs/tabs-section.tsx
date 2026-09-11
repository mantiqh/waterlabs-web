'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import { ChevronRight } from '@/components/CTA';
import type { BlogsPageData, SanityBlogArticle } from '@/types/blogs';

interface BlogArticle {
  id: string;
  category: string;
  tag: string;
  subTag: string;
  title: React.ReactNode;
  rawTitle: string;
  slug: string;
  desktopImage: string;
  mobileImage: string;
}

const BLOG_CATEGORIES = [
  'All',
  'Features',
  'Use Cases',
  'Company News',
  'Case Studies',
] as const;

export interface BlogsTabsSectionProps {
  initialArticles?: SanityBlogArticle[];
  categories?: string[];
  settings?: BlogsPageData | null;
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    category: 'Features',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    title: (
      <>
        Denial Management in Revenue<br className="hidden md:inline" />{' '}
        Cycle Management:<br className="hidden md:inline" />{' '}
        The Complete Guide
      </>
    ),
    rawTitle: 'Denial Management in Revenue Cycle Management: The Complete Guide',
    slug: 'denial-management-revenue-cycle-management-complete-guide',
    desktopImage: '/images/blogs/tabs/img_denial_management_inrevenue.png',
    mobileImage: '/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
  },
  {
    id: '2',
    category: 'Use Cases',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    title: (
      <>
        Prior Authorization Automation:<br className="hidden md:inline" />{' '}
        Fixing the Most Broken Process in<br className="hidden md:inline" />{' '}
        Healthcare
      </>
    ),
    rawTitle: 'Prior Authorization Automation: Fixing the Most Broken Process in Healthcare',
    slug: 'prior-authorization-automation-broken-process-healthcare',
    desktopImage: '/images/blogs/tabs/img_prior_authorization.png',
    mobileImage: '/images/blogs/tabs/img_prior_authorization_mobile (1).png',
  },
  {
    id: '3',
    category: 'Features',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    title: (
      <>
        Autonomous Medical Coding:<br className="hidden md:inline" />{' '}
        Accuracy, Compliance, and What<br className="hidden md:inline" />{' '}
        Replaces Computer-Assisted<br className="hidden md:inline" />{' '}
        Coding
      </>
    ),
    rawTitle: 'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding',
    slug: 'autonomous-medical-coding-accuracy-compliance',
    desktopImage: '/images/blogs/tabs/img_medical_coding.png',
    mobileImage: '/images/blogs/tabs/img_medical_coding_mobile (1).png',
  },
  {
    id: '4',
    category: 'Case Studies',
    tag: 'Lorem',
    subTag: 'Lorem Ipsum',
    title: (
      <>
        The Economics of the Revenue Cycle:<br className="hidden md:inline" />{' '}
        Cost to Collect, KPIs, and Why Most<br className="hidden md:inline" />{' '}
        RCM AI Never Shows ROI
      </>
    ),
    rawTitle: 'The Economics of the Revenue Cycle: Cost to Collect, KPIs, and Why Most RCM AI Never Shows ROI',
    slug: 'economics-of-revenue-cycle-cost-to-collect-kpis',
    desktopImage: '/images/blogs/tabs/img_economics_of_revenue_cyle_mobile.png',
    mobileImage: '/images/blogs/tabs/img_economics_of_revenue_cyle_mobile (1).png',
  },
];

export const BlogsTabsSection: React.FC<BlogsTabsSectionProps> = ({
  initialArticles,
  categories,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  const settingsCategories = settings?.categories;
  const categoriesList = useMemo(() => {
    if (settingsCategories && settingsCategories.length > 0) {
      return ['All', ...settingsCategories.filter((c) => c !== 'All')];
    }
    if (categories && categories.length > 0) {
      return ['All', ...categories.filter((c) => c !== 'All')];
    }
    return Array.from(BLOG_CATEGORIES);
  }, [settingsCategories, categories]);

  const articlesList: BlogArticle[] = useMemo(() => {
    if (!initialArticles || initialArticles.length === 0) {
      return BLOG_ARTICLES;
    }
    return initialArticles.map((item, idx) => ({
      id: item.id || item._id || String(idx),
      category: item.category || 'Features',
      tag: item.tag || 'Lorem',
      subTag: item.subTag || 'Lorem Ipsum',
      title: item.title,
      rawTitle: item.title,
      slug: item.slug,
      desktopImage: item.desktopImage || '/images/blogs/tabs/img_denial_management_inrevenue.png',
      mobileImage: item.mobileImage || item.desktopImage || '/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
    }));
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return articlesList.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.rawTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  return (
    <section
      className="relative w-full overflow-hidden p-0 m-0"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 50%, #0F68D6 50%)',
      }}
    >
      <div className="w-full bg-[#F4F6F9] rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] md:py-[60px] lg:py-[80px] px-[20px] md:px-[40px] lg:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px]">
        
        {/* ========================================================================= */}
        {/* Filter & Search Bar                                                       */}
        {/* ========================================================================= */}
        
        {/* Desktop Filter Bar (Figma: Frame 2147226517) */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-[32px] w-full">
          {/* Category Tabs */}
          <div className="flex flex-row items-center gap-[12px] xl:gap-[16px] flex-wrap">
            {categoriesList.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`h-[40px] px-[16px] py-[8px] rounded-[64px] body-cta font-medium transition-all duration-300 cursor-pointer ${
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

          {/* Search Input */}
          <div className="w-[280px] xl:w-[313px] h-[40px] bg-white/70 border border-white rounded-[64px] px-[16px] py-[8px] flex items-center gap-[10px] focus-within:bg-white focus-within:border-[#0F68D6] transition-all">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#7D8690] shrink-0"
            >
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings?.searchPlaceholder || 'Search'}
              className="w-full bg-transparent border-none outline-none type-body-xs text-[#2A2A2A] placeholder:text-[#7D8690]"
            />
          </div>
        </div>

        {/* Mobile & Tablet Filter Bar (Figma: Frame 2147226778) */}
        <div className="flex lg:hidden flex-col gap-[16px] w-full">
          {/* Top Search & Filter by Row */}
          <div className="flex flex-row items-center gap-[12px] w-full">
            {/* Search Input */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={settings?.searchPlaceholder || 'Search'}
                className="w-full bg-transparent border-none outline-none type-body-xxs text-[#2A2A2A] placeholder:text-[#D7DCE2]"
              />
            </div>

            {/* Filter by Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                className="h-[39px] px-[12px] bg-white border border-[#F4F6F9] rounded-[8px_2px_8px_8px] flex items-center gap-[8px] cursor-pointer"
              >
                <span className="type-body-xxs text-[#2A2A2A]">
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

              {/* Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 top-[45px] z-30 w-[180px] bg-white rounded-[12px] shadow-lg border border-[#D7DCE2] py-[6px] overflow-hidden">
                  {categoriesList.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-[14px] py-[8px] type-body-xxs transition-colors ${
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

        </div>

        {/* ========================================================================= */}
        {/* Blog Articles Grid (Figma: Frame 2147226515 / 2147226523)                  */}
        {/* ========================================================================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[32px] gap-y-[32px] lg:gap-y-[40px]">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="w-full border-b border-[#D7DCE2] pb-[20px] md:pb-[32px] flex flex-col gap-[8px] md:gap-[12px]"
            >
              {/* Tag / Eyebrow (Text - Tag) */}
              <div className="flex items-center gap-[6px] lg:gap-[8px]">
                <span className="type-caption text-[#7D8690]">{article.tag}</span>
                <span className="h-[12px] lg:h-[14px] w-[1px] bg-[#7D8690]/40" />
                <span className="type-caption text-[#7D8690]">{article.subTag}</span>
              </div>

              {/* Desktop Article Layout (Side-by-side) */}
              <div className="hidden md:flex flex-row items-stretch justify-between gap-[20px] w-full">
                {/* Left Text & CTA (Frame 2147226512) */}
                <div className="flex-1 min-w-0 flex flex-col items-start gap-[16px]">
                  <h6 className="type-h6 text-black tracking-[-0.01em]">
                    {article.title}
                  </h6>

                  <Link href={`/blogs/${article.slug}`} className="inline-block">
                    <div className="h-[44px] px-[20px] py-[10px] rounded-[64px] bg-[rgba(214,214,214,0.21)] border border-[#F4F6F9] backdrop-blur-[12px] flex items-center gap-[10px] cursor-pointer hover:bg-white/60 hover:border-[#0F68D6]/30 transition-all duration-300">
                      <span className="type-body-xxs text-[#2A2A2A] font-medium">
                        {settings?.readBlogButtonText || 'Read blog'}
                      </span>
                      <ChevronRight className="text-[#2A2A2A] opacity-60" />
                    </div>
                  </Link>
                </div>

                {/* Right Image (Frame 2147203302) */}
                <div className="w-[227px] shrink-0 self-stretch min-h-[144px] rounded-[20px] overflow-hidden relative shadow-sm">
                  <Image
                    src={article.desktopImage}
                    alt={article.rawTitle}
                    fill
                    className="object-cover object-center"
                    sizes="227px"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                    }}
                  />
                </div>
              </div>

              {/* Mobile Article Layout (Image Top / Title + Circular Arrow Bottom) */}
              <div className="flex md:hidden flex-col items-start gap-[12px] w-full">
                {/* Mobile Top Image (Frame 2147203302) */}
                <div className="w-full h-[217px] rounded-[20px] overflow-hidden relative shrink-0 shadow-sm">
                  <Image
                    src={article.mobileImage}
                    alt={article.rawTitle}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                    }}
                  />
                </div>

                {/* Mobile Bottom Row (Title + Circular Arrow Indicator) */}
                <Link
                  href={`/blogs/${article.slug}`}
                  className="w-full flex flex-row items-end justify-between gap-[12px] pt-[4px]"
                >
                  <h6 className="type-h6 text-black text-[18px] leading-[26px] flex-1">
                    {article.title}
                  </h6>

                  {/* Circular Arrow Indicator (Fill - arrow - indicator) */}
                  <div className="w-[34px] h-[34px] bg-[#0F68D6] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg
                      width="10"
                      height="14"
                      viewBox="0 0 13 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <path
                        d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="w-full py-[60px] text-center flex flex-col items-center gap-[12px]">
            <p className="type-body-s text-[#7D8690]">No articles found matching your criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="type-body-xxs text-[#0F68D6] underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Pagination Bar (Figma: Frame 2147226742)                                  */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-row justify-end items-center gap-[24px] lg:gap-[32px] pt-[16px]">
          <div className="flex flex-row items-center gap-[16px] md:gap-[24px] lg:gap-[32px]">
            <span className="type-body-xxs text-[#0F68D6] font-medium cursor-pointer">01</span>
            <span className="type-body-xxs text-[#7D8690] cursor-pointer hover:text-[#0F68D6] transition-colors">02</span>
            <span className="type-body-xxs text-[#7D8690] cursor-pointer hover:text-[#0F68D6] transition-colors">03</span>
            <span className="type-body-xxs text-[#7D8690] tracking-[0.2em]">....</span>
            <span className="type-body-xxs text-[#7D8690] cursor-pointer hover:text-[#0F68D6] transition-colors">20</span>
          </div>

          <button
            type="button"
            aria-label="Next page"
            className="w-[24px] h-[24px] flex items-center justify-center text-[#0F68D6] hover:opacity-75 transition-opacity cursor-pointer"
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
        </div>

      </div>
    </div>
  </section>
);
};

export default BlogsTabsSection;
