'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useMemo, useRef, useState } from 'react';

import { ChevronRight } from '@/components/CTA';
import type { BlogsPageData, SanityBlogArticle } from '@/types/blogs';

interface BlogArticle {
  id: string;
  category: string;
  tag: string;
  subTag: string;
  title: ReactNode;
  rawTitle: string;
  slug: string;
  desktopImage: string;
  mobileImage: string;
}

const BLOG_CATEGORIES = ['All', 'Features', 'Use Cases', 'Company News', 'Case Studies'] as const;

const CARDS_PER_PAGE = 6;

export interface BlogsTabsSectionProps {
  initialArticles?: SanityBlogArticle[];
  categories?: string[];
  settings?: BlogsPageData | null;
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    category: 'Features',
    tag: 'Features',
    subTag: 'Jun 26, 2025',
    title: (
      <>
        Denial Management in Revenue
        <br className="hidden md:inline" /> Cycle Management:
        <br className="hidden md:inline" /> The Complete Guide
      </>
    ),
    rawTitle: 'Denial Management in Revenue Cycle Management: The Complete Guide',
    slug: 'denial-management-revenue-cycle-management-complete-guide',
    desktopImage: '/images/blogs/tabs/img_denial_management_inrevenue.png',
    mobileImage: '/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
  },
  {
    id: '3',
    category: 'Features',
    tag: 'Features',
    subTag: 'Jun 24, 2025',
    title: (
      <>
        Autonomous Medical Coding:
        <br className="hidden md:inline" /> Accuracy, Compliance, and What
        <br className="hidden md:inline" /> Replaces Computer-Assisted
        <br className="hidden md:inline" /> Coding
      </>
    ),
    rawTitle:
      'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding',
    slug: 'autonomous-medical-coding-accuracy-compliance',
    desktopImage: '/images/blogs/tabs/img_medical_coding.png',
    mobileImage: '/images/blogs/tabs/img_medical_coding_mobile (1).png',
  },
  {
    id: '4',
    category: 'Case Studies',
    tag: 'Case Studies',
    subTag: 'Jun 23, 2025',
    title: (
      <>
        The Economics of the Revenue Cycle:
        <br className="hidden md:inline" /> Cost to Collect, KPIs, and Why Most
        <br className="hidden md:inline" /> RCM AI Never Shows ROI
      </>
    ),
    rawTitle:
      'The Economics of the Revenue Cycle: Cost to Collect, KPIs, and Why Most RCM AI Never Shows ROI',
    slug: 'economics-of-revenue-cycle-cost-to-collect-kpis',
    desktopImage: '/images/blogs/tabs/img_economics_of_revenue_cyle_mobile.png',
    mobileImage: '/images/blogs/tabs/img_economics_of_revenue_cyle_mobile (1).png',
  },
];

export const BlogsTabsSection = ({
  initialArticles,
  categories,
  settings,
}: BlogsTabsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
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
    return Array.from(BLOG_CATEGORIES);
  }, [settingsCategories, categories]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const articlesList: BlogArticle[] = useMemo(() => {
    if (!initialArticles || initialArticles.length === 0) {
      return BLOG_ARTICLES;
    }
    return initialArticles
      .filter(
        (item) =>
          item.slug &&
          ![
            'testing-blog',
            'testing-blog2',
            'prior-authorization-automation-broken-process-healthcare',
          ].includes(item.slug),
      )
      .map((item, idx) => {
        const category = item.category || 'Features';
        const tag = item.tag && item.tag !== 'Lorem' ? item.tag : category;
        const formattedDate = formatDate(item.publishedAt);
        const subTag = item.subTag && item.subTag !== 'Lorem Ipsum' ? item.subTag : formattedDate;

        return {
          id: item.id || item._id || String(idx),
          category,
          tag,
          subTag,
          title: item.title,
          rawTitle: item.title,
          slug: item.slug,
          desktopImage:
            item.desktopImage || '/images/blogs/tabs/img_denial_management_inrevenue.png',
          mobileImage:
            item.mobileImage ||
            item.desktopImage ||
            '/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
        };
      });
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return articlesList.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.rawTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * CARDS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredArticles, safeCurrentPage]);

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
      <div className="w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[32px] md:gap-[40px] lg:gap-[48px]">
          {/* ========================================================================= */}
          {/* Filter & Search Bar                                                       */}
          {/* ========================================================================= */}

          {/* Desktop Filter Bar (Figma: Frame 2147226517) */}
          <div className="hidden w-full flex-row items-center justify-between gap-[32px] lg:flex">
            {/* Category Tabs */}
            <div className="flex flex-row flex-wrap items-center gap-[12px] xl:gap-[16px]">
              {categoriesList.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`body-cta h-[40px] cursor-pointer rounded-[64px] px-[16px] py-[8px] font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] text-white shadow-sm'
                        : 'bg-[#91C6F2]/[0.09] text-[#7D8690] hover:bg-[#91C6F2]/[0.18] hover:text-[#042849]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="flex h-[40px] w-[280px] items-center gap-[10px] rounded-[64px] border border-white bg-white/70 px-[16px] py-[8px] transition-all focus-within:border-[#0F68D6] focus-within:bg-white xl:w-[313px]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-[#7D8690]"
              >
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M11 11L14.5 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={settings?.searchPlaceholder || 'Search'}
                className="type-body-xs w-full border-none bg-transparent text-[#2A2A2A] outline-none placeholder:text-[#7D8690]"
              />
            </div>
          </div>

          {/* Mobile & Tablet Filter Bar (Figma: Frame 2147226778) */}
          <div className="flex w-full flex-col gap-[16px] lg:hidden">
            {/* Top Search & Filter by Row */}
            <div className="flex w-full flex-row items-center gap-[12px]">
              {/* Search Input */}
              <div className="flex h-[39px] flex-1 items-center gap-[8px] rounded-[12px_6px_12px_12px] border border-transparent bg-white px-[12px] focus-within:border-[#0F68D6]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-[#042849]"
                >
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M11 11L14.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={settings?.searchPlaceholder || 'Search'}
                  className="type-body-xxs w-full border-none bg-transparent text-[#2A2A2A] outline-none placeholder:text-[#D7DCE2]"
                />
              </div>

              {/* Filter by Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                  className="flex h-[39px] cursor-pointer items-center gap-[8px] rounded-[8px_2px_8px_8px] border border-[#F4F6F9] bg-white px-[12px]"
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
                    className="shrink-0 text-black"
                  >
                    <path
                      d="M3.5 5.25L7 8.75L10.5 5.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isFilterDropdownOpen && (
                  <div className="absolute top-[45px] right-0 z-30 w-[180px] overflow-hidden rounded-[12px] border border-[#D7DCE2] bg-white py-[6px] shadow-lg">
                    {categoriesList.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          handleCategorySelect(category);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`type-body-xxs w-full px-[14px] py-[8px] text-left transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#0F68D6]/10 font-medium text-[#0F68D6]'
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
          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-x-[32px] gap-y-[32px] lg:grid-cols-2 lg:gap-y-[40px]"
          >
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="flex w-full flex-col gap-[8px] border-b border-[#D7DCE2] pb-[20px] md:gap-[12px] md:pb-[32px]"
              >
                {/* Tag / Eyebrow (Text - Tag) */}
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <span className="type-caption text-[#7D8690]">{article.tag}</span>
                  {article.subTag && (
                    <>
                      <span className="h-[12px] w-[1px] bg-[#7D8690]/40 lg:h-[14px]" />
                      <span className="type-caption text-[#7D8690]">{article.subTag}</span>
                    </>
                  )}
                </div>

                {/* Desktop Article Layout (Side-by-side) */}
                <div className="hidden w-full flex-row items-stretch justify-between gap-[20px] md:flex">
                  {/* Left Text & CTA (Frame 2147226512) */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]">
                    <h6 className="type-h6 tracking-[-0.01em] text-black">{article.title}</h6>

                    <Link href={`/blogs/${article.slug}`} className="inline-block">
                      <div className="flex h-[44px] cursor-pointer items-center gap-[10px] rounded-[64px] border border-[#F4F6F9] bg-[rgba(214,214,214,0.21)] px-[20px] py-[10px] backdrop-blur-[12px] transition-all duration-300 hover:border-[#0F68D6]/30 hover:bg-white/60">
                        <span className="type-body-xxs font-medium text-[#2A2A2A]">
                          {settings?.readBlogButtonText || 'Read blog'}
                        </span>
                        <ChevronRight className="text-[#2A2A2A] opacity-60" />
                      </div>
                    </Link>
                  </div>

                  {/* Right Image (Frame 2147203302) */}
                  <div className="relative min-h-[144px] w-[227px] shrink-0 self-stretch overflow-hidden rounded-[20px] shadow-sm">
                    <Image
                      src={article.desktopImage}
                      alt={article.rawTitle}
                      fill
                      className="object-cover object-center"
                      sizes="227px"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                      }}
                    />
                  </div>
                </div>

                {/* Mobile Article Layout (Image Top / Title + Circular Arrow Bottom) */}
                <div className="flex w-full flex-col items-start gap-[12px] md:hidden">
                  {/* Mobile Top Image (Frame 2147203302) */}
                  <div className="relative h-[217px] w-full shrink-0 overflow-hidden rounded-[20px] shadow-sm">
                    <Image
                      src={article.mobileImage}
                      alt={article.rawTitle}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                      }}
                    />
                  </div>

                  {/* Mobile Bottom Row (Title + Circular Arrow Indicator) */}
                  <Link
                    href={`/blogs/${article.slug}`}
                    className="flex w-full flex-row items-end justify-between gap-[12px] pt-[4px]"
                  >
                    <h6 className="type-h6 flex-1 text-[18px] leading-[26px] text-black">
                      {article.title}
                    </h6>

                    {/* Circular Arrow Indicator (Fill - arrow - indicator) */}
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0F68D6] text-white shadow-sm">
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
            <div className="flex w-full flex-col items-center gap-[12px] py-[60px] text-center">
              <p className="type-body-s text-[#7D8690]">
                No articles found matching your criteria.
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
          {/* Pagination Bar (Figma: Frame 2147226742)                                  */}
          {/* ========================================================================= */}
          {filteredArticles.length > 0 && (
            <div className="flex w-full flex-row items-center justify-end gap-[16px] pt-[16px] md:gap-[24px] lg:gap-[32px]">
              {/* Previous Page Button */}
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

export default BlogsTabsSection;
