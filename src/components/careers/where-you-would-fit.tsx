'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';

export interface JobRole {
  _key?: string;
  id?: string;
  title: string;
  experience?: string;
  category?: string;
  roleTag?: string;
  tabName?: string;
  eligibility?: string;
  link?: string;
}

export interface RoleCategory {
  _key?: string;
  tabName: string;
  roles?: JobRole[];
}

export interface CareersOpenRolesData {
  openRolesTag?: string;
  openRolesHeading?: string;
  categories?: RoleCategory[];
}

interface WhereYouWouldFitSectionProps {
  data?: CareersOpenRolesData | null;
}

export const WhereYouWouldFitSection = ({ data }: WhereYouWouldFitSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth scroll to section when navigated with #where-you-would-fit or #open-roles hash
  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (hash === '#where-you-would-fit' || hash === '#open-roles') {
        const el =
          document.getElementById('where-you-would-fit') || document.getElementById('open-roles');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (window.location.hash === '#where-you-would-fit' || window.location.hash === '#open-roles') {
      scrollToTarget();
      const t1 = setTimeout(scrollToTarget, 100);
      const t2 = setTimeout(scrollToTarget, 350);
      const t3 = setTimeout(scrollToTarget, 700);

      window.addEventListener('hashchange', scrollToTarget);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener('hashchange', scrollToTarget);
      };
    }

    window.addEventListener('hashchange', scrollToTarget);
    return () => window.removeEventListener('hashchange', scrollToTarget);
  }, []);

  const categoriesList = useMemo(() => data?.categories ?? [], [data?.categories]);

  // Derive categories dynamically from configured CMS tabs
  const filterCategories = useMemo(
    () => [
      'All Roles',
      ...categoriesList
        .map((cat) => cat.tabName?.trim())
        .filter((name): name is string => Boolean(name)),
    ],
    [categoriesList],
  );

  // Flatten all roles across all categories, tagging with parent tabName
  const allFlattenedRoles = useMemo(() => {
    const list: JobRole[] = [];
    categoriesList.forEach((cat) => {
      (cat.roles ?? []).forEach((role) => {
        list.push({
          ...role,
          tabName: cat.tabName,
        });
      });
    });
    return list;
  }, [categoriesList]);

  const currentCategory = filterCategories.includes(activeCategory) ? activeCategory : 'All Roles';

  const categoryRoles = useMemo(() => {
    if (currentCategory === 'All Roles') {
      return allFlattenedRoles;
    }
    const matchingCat = categoriesList.find((cat) => cat.tabName === currentCategory);
    return (matchingCat?.roles ?? []).map((r) => ({
      ...r,
      tabName: matchingCat?.tabName,
    }));
  }, [currentCategory, allFlattenedRoles, categoriesList]);

  const filteredJobs = useMemo(() => {
    return categoryRoles.filter((job) => {
      return (
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.eligibility && job.eligibility.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.category && job.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.roleTag && job.roleTag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.tabName && job.tabName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [categoryRoles, searchQuery]);

  const tagText = data?.openRolesTag || 'Open Roles';
  const headingText = data?.openRolesHeading || 'Where you fit';

  return (
    <section
      id="where-you-would-fit"
      className="relative m-0 w-full scroll-mt-[60px] overflow-hidden bg-gradient-to-b from-[#0F68D6] from-50% to-[#0B0B0B] to-50% p-0 lg:scroll-mt-[80px]"
    >
      <div id="open-roles" className="pointer-events-none absolute -top-[60px] lg:-top-[80px]" />
      {/* 
        White Card with left curves:
        - Top-left curve reveals Section 4's blue color (#0F68D6)
        - Bottom-left curve reveals Section 6's exact image background (#0B0B0B)
      */}
      <div className="relative w-full overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:bg-white lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[36px] lg:gap-[60px]">
          {/* Header Block: Tag + Title */}
          <div className="flex w-full flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#0F68D6] lg:h-[8px] lg:w-[8px]" />
              <span className="type-caption text-[#7D8690]">{tagText}</span>
            </div>

            {/* Title */}
            <h2 className="type-h2 tracking-[-0.01em] text-[#000000] lg:text-[#111111]">
              {headingText}
            </h2>
          </div>

          {/* Filters & Job List Container */}
          <div className="flex w-full flex-col gap-[20px] lg:gap-[40px]">
            {/* Desktop Filter Tabs (hidden on mobile) */}
            {filterCategories.length > 1 && (
              <div className="hidden flex-wrap items-center gap-[16px] lg:flex">
                {filterCategories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`type-cta cursor-pointer rounded-[64px] border-none px-[16px] py-[8px] transition-all outline-none ${
                        isActive
                          ? 'text-white shadow-sm'
                          : 'bg-[#91C6F2]/10 text-[#7D8690] hover:bg-[#91C6F2]/20'
                      }`}
                      style={
                        isActive
                          ? {
                              background:
                                'linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)',
                            }
                          : undefined
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile Filter Bar with Search Input & Custom Dropdown (hidden on desktop) */}
            <div className="relative z-20 flex w-full items-center gap-[12px] lg:hidden">
              {/* Search Input */}
              <div className="flex flex-1 items-center gap-[10px] rounded-tl-[12px] rounded-tr-[6px] rounded-br-[12px] rounded-bl-[12px] border border-transparent bg-white px-[12px] py-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-colors focus-within:border-[#91C6F2]">
                <svg
                  className="h-[14px] w-[14px] text-[#042849]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="type-caption w-full bg-transparent text-[#111111] outline-none placeholder:text-[#D7DCE2]"
                />
              </div>

              {/* Custom Role Dropdown */}
              {filterCategories.length > 1 && (
                <div ref={dropdownRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="type-caption flex cursor-pointer items-center gap-[8px] rounded-tl-[12px] rounded-tr-[4px] rounded-br-[12px] rounded-bl-[12px] border border-transparent bg-white px-[14px] py-[10px] !font-medium text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all outline-none hover:border-[#91C6F2]"
                  >
                    <span>{activeCategory}</span>
                    <svg
                      className={`h-[10px] w-[10px] text-[#111111] transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Animated Dropdown Menu List */}
                  {isDropdownOpen && (
                    <div className="animate-in fade-in zoom-in-95 absolute top-[calc(100%+6px)] right-0 z-50 flex w-[180px] flex-col gap-[2px] rounded-[14px] border border-[#EBF0F5] bg-white p-[6px] shadow-[0_12px_36px_rgba(0,0,0,0.12)] duration-150">
                      {filterCategories.map((category) => {
                        const isSelected = activeCategory === category;
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              setActiveCategory(category);
                              setIsDropdownOpen(false);
                            }}
                            className={`type-caption w-full cursor-pointer rounded-[8px] border-none px-[12px] py-[8px] text-left transition-colors outline-none ${
                              isSelected
                                ? 'bg-[#0F68D6]/10 font-medium text-[#0F68D6]'
                                : 'text-[#2A2A2A] hover:bg-[#F4F6F9]'
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Job Openings Cards List */}
            <div className="flex w-full flex-col gap-[12px] lg:gap-[20px]">
              {filteredJobs.length === 0 ? (
                <div className="flex w-full flex-col items-center justify-center gap-[12px] rounded-[16px] bg-white p-[32px] text-center lg:bg-[#F4F6F9] lg:p-[48px]">
                  <p className="type-body-m font-medium text-[#042849]">
                    {allFlattenedRoles.length === 0
                      ? 'No open roles at the moment.'
                      : `No roles found matching "${searchQuery || activeCategory}".`}
                  </p>
                  <p className="type-body-xs max-w-[480px] text-[#7D8690]">
                    We&apos;re always looking for exceptional talent. Reach out to us below or check
                    back soon!
                  </p>
                </div>
              ) : (
                filteredJobs.map((job, idx) => {
                  const isExternal = job.link?.startsWith('http');
                  const targetLink = job.link || 'mailto:careers@waterlabs.ai';

                  return (
                    <div
                      key={job._key || job.id || `${job.title}-${idx}`}
                      className="group flex w-full flex-col gap-[12px] rounded-[16px_8px_16px_16px] bg-white p-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:gap-[16px] lg:rounded-[16px] lg:bg-[#F4F6F9] lg:p-[24px] lg:shadow-none"
                    >
                      {/* Title */}
                      <h5 className="type-h5 tracking-[-0.01em] text-[#0F68D6] transition-colors group-hover:text-[#0F68D6] lg:text-[#042849]">
                        {job.title}
                      </h5>

                      {/* Metadata Row & Apply Button */}
                      <div className="flex w-full flex-row items-end justify-between gap-[16px]">
                        {/* Metadata Tags: Column on Mobile, Row on Desktop */}
                        <div className="flex flex-col gap-[6px] lg:flex-row lg:items-center lg:gap-[48px] xl:gap-[60px]">
                          {/* Experience */}
                          {job.experience && (
                            <div className="flex items-center gap-[4px] lg:gap-[8px]">
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                Experience:
                              </span>
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                {job.experience}
                              </span>
                            </div>
                          )}

                          {/* Category */}
                          {(job.category || job.roleTag) && (
                            <div className="flex items-center gap-[4px] lg:gap-[8px]">
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                Category:
                              </span>
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                {job.category || job.roleTag}
                              </span>
                            </div>
                          )}

                          {/* Eligibility */}
                          {job.eligibility && (
                            <div className="flex items-center gap-[4px] lg:gap-[8px]">
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                Eligibility:
                              </span>
                              <span className="type-body-xxs text-[#000000] lg:text-[#2A2A2A]">
                                {job.eligibility}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Apply Arrow Indicator */}
                        <Link
                          href={targetLink}
                          aria-label={`Apply for ${job.title}`}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0F68D6] text-white transition-transform hover:scale-105 lg:h-[48px] lg:w-[48px]"
                        >
                          <ChevronRight className="h-[13px] w-[9px] text-white lg:h-[18px] lg:w-[12px]" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* "Don't see a fit?" Feature Banner Card */}
          <div className="w-full max-w-[1320px] overflow-hidden rounded-[20px_10px_20px_20px] lg:rounded-[30px_10px_30px_30px]">
            {/* Desktop (lg: 1024px+, Figma #6870:15045) */}
            <div className="relative hidden min-h-[433px] w-full overflow-hidden rounded-[30px_10px_30px_30px] lg:flex">
              {/* Right Photo Background */}
              <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                  src="/images/careers/where-you-would-fit/img_dont_see_a_fit%20(1).png"
                  alt="Don't see a fit?"
                  fill
                  sizes="1320px"
                  className="object-cover object-right"
                />
              </div>

              {/* Left Aqua Mint Panel */}
              <div className="relative z-10 flex min-h-[433px] w-[539px] shrink-0 flex-col justify-center gap-[20px] overflow-hidden rounded-tl-[30px] rounded-br-[60px] bg-[#63CCB7] p-[40px]">
                {/* Subtle Sky-Blue Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[80px] -left-[80px] z-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(145,198,242,0.55)_45%,transparent_75%)] blur-[40px]"
                />

                <div className="relative z-10 flex flex-col gap-[20px]">
                  <h2 className="type-h2 text-[#042849]">Don&apos;t see a fit?</h2>
                  <p className="type-body-s max-w-[459px] text-[#111111]">
                    We make a few great hires every quarter, and the best people rarely fit a box
                    we&apos;ve already drawn. If you&apos;re exceptional and you see the mission,
                    tell us anyway.
                  </p>
                  <div className="w-fit">
                    <a href="mailto:hiring@waterlabs.ai">
                      <CTA
                        variant="dark-bg"
                        size="compact-mobile"
                        as="div"
                        className="text-[#042849] lg:text-[#042849]"
                      >
                        Write to us
                      </CTA>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet (< 1024px, Figma #6870:15351) */}
            <div className="flex w-full flex-col overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
              {/* Top Photo */}
              <div className="relative h-[222px] w-full shrink-0 sm:h-[280px]">
                <Image
                  src="/images/careers/where-you-would-fit/mobile.jpg"
                  alt="Don't see a fit?"
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover object-center"
                />
              </div>

              {/* Bottom Aqua Mint Panel */}
              <div className="relative z-10 -mt-[20px] flex w-full flex-col gap-[20px] overflow-hidden rounded-[20px_0px_20px_20px] bg-[#63CCB7] p-[24px] sm:p-[40px]">
                {/* Subtle Sky-Blue Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[60px] -left-[60px] z-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(145,198,242,0.5)_45%,transparent_75%)] blur-[32px]"
                />

                <div className="relative z-10 flex flex-col gap-[20px]">
                  <h2 className="type-h2 text-[#042849]">Don&apos;t see a fit?</h2>
                  <p className="type-body-s text-[#111111]">
                    We make a few great hires every quarter, and the best people rarely fit a box
                    we&apos;ve already drawn. If you&apos;re exceptional and you see the mission,
                    tell us anyway.
                  </p>
                  <div className="w-fit">
                    <a href="mailto:hiring@waterlabs.ai">
                      <CTA
                        variant="dark-bg"
                        size="compact-mobile"
                        as="div"
                        className="text-[#042849] lg:text-[#042849]"
                      >
                        Write to us
                      </CTA>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereYouWouldFitSection;
