'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    width="13" 
    height="19" 
    viewBox="0 0 13 19" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor"/>
    <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor"/>
  </svg>
);

const filterCategories = [
  'All Roles',
  'Engineering & AI',
  'Product & Delivery',
  'Client Success',
  'RCM & Domain',
];

const jobsData = [
  {
    id: 'python-dev',
    title: 'Python Developer – Agentic AI / Machine Learning',
    category: 'Engineering & AI',
    roleTag: 'Developer',
    experience: '3–8 years',
    eligibility: 'Agentic AI & LLMs',
    link: '#apply-python-dev',
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer – Node.js & React (Junior / Senior)',
    category: 'Engineering & AI',
    roleTag: 'Developer',
    experience: '1–3 yrs(Junior) / 5+ yrs(Senior)',
    eligibility: 'Node.js & React',
    link: '#apply-fullstack-dev',
  },
  {
    id: 'java-lead',
    title: 'Agentic AI – Java Lead',
    category: 'Engineering & AI',
    roleTag: 'Developer',
    experience: '8+ years',
    eligibility: 'Java & Agentic AI',
    link: '#apply-java-lead',
  },
];

export const WhereYouWouldFitSection: React.FC = () => {
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

  const filteredJobs = jobsData.filter((job) => {
    const matchesCategory =
      activeCategory === 'All Roles' || job.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="open-roles" 
      className="relative w-full bg-gradient-to-b from-[#0F68D6] from-50% to-[#0B0B0B] to-50% overflow-hidden p-0 m-0"
    >
      {/* 
        White Card with left curves:
        - Top-left curve reveals Section 4's blue color (#0F68D6)
        - Bottom-left curve reveals Section 6's exact image background (#0B0B0B)
      */}
      <div className="relative w-full bg-[#F4F6F9] lg:bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[36px] lg:gap-[60px]">
          
          {/* Header Block: Tag + Title */}
          <div className="w-full flex flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#7D8690] tracking-[0.01em]">
                Open Roles
              </span>
            </div>

            {/* Title */}
            <h2 className="font-primary font-normal text-[32px] lg:text-[52px] leading-[40px] lg:leading-[60px] tracking-[-0.01em] text-[#000000] lg:text-[#111111]">
              Where you would fit.
            </h2>
          </div>

          {/* Filters & Job List Container */}
          <div className="w-full flex flex-col gap-[20px] lg:gap-[40px]">
            
            {/* Desktop Filter Tabs (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-[16px] flex-wrap">
              {filterCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-[16px] py-[8px] rounded-[64px] font-secondary font-medium text-[16px] leading-[24px] transition-all cursor-pointer border-none outline-none ${
                      isActive
                        ? 'text-white shadow-sm'
                        : 'text-[#7D8690] bg-[#91C6F2]/10 hover:bg-[#91C6F2]/20'
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

            {/* Mobile Filter Bar with Search Input & Custom Dropdown (hidden on desktop) */}
            <div className="flex lg:hidden items-center gap-[12px] w-full relative z-20">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-[10px] bg-white rounded-tl-[12px] rounded-tr-[6px] rounded-br-[12px] rounded-bl-[12px] px-[12px] py-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-transparent focus-within:border-[#91C6F2] transition-colors">
                <svg
                  className="w-[14px] h-[14px] text-[#042849]"
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
                  className="w-full bg-transparent font-secondary text-[12px] text-[#111111] placeholder:text-[#D7DCE2] outline-none"
                />
              </div>

              {/* Custom Role Dropdown */}
              <div ref={dropdownRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="bg-white rounded-tl-[12px] rounded-tr-[4px] rounded-br-[12px] rounded-bl-[12px] px-[14px] py-[10px] flex items-center gap-[8px] font-secondary font-medium text-[12px] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-transparent hover:border-[#91C6F2] transition-all cursor-pointer outline-none"
                >
                  <span>{activeCategory}</span>
                  <svg
                    className={`w-[10px] h-[10px] text-[#111111] transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Animated Dropdown Menu List */}
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+6px)] right-0 w-[180px] bg-white rounded-[14px] p-[6px] shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[#EBF0F5] z-50 flex flex-col gap-[2px] animate-in fade-in zoom-in-95 duration-150">
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
                          className={`w-full text-left px-[12px] py-[8px] rounded-[8px] font-secondary text-[12px] leading-[16px] transition-colors cursor-pointer border-none outline-none ${
                            isSelected
                              ? 'bg-[#0F68D6]/10 text-[#0F68D6] font-medium'
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
            </div>

            {/* Job Openings Cards List */}
            <div className="w-full flex flex-col gap-[12px] lg:gap-[20px]">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="w-full bg-white lg:bg-[#F4F6F9] rounded-[16px_8px_16px_16px] lg:rounded-[16px] p-[16px] lg:p-[24px] flex flex-col gap-[12px] lg:gap-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group"
                >
                  {/* Title */}
                  <h3 className="font-primary font-normal text-[20px] lg:text-[32px] leading-[28px] lg:leading-[40px] tracking-[-0.01em] text-[#0F68D6] lg:text-[#042849] group-hover:text-[#0F68D6] transition-colors">
                    {job.title}
                  </h3>

                  {/* Metadata Row & Apply Button */}
                  <div className="w-full flex flex-row items-end justify-between gap-[16px]">
                    {/* Metadata Tags: Column on Mobile, Row on Desktop */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-[6px] lg:gap-[48px] xl:gap-[60px]">
                      {/* Experience */}
                      <div className="flex items-center gap-[4px] lg:gap-[8px]">
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          Experience:
                        </span>
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          {job.experience}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="flex items-center gap-[4px] lg:gap-[8px]">
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          category:
                        </span>
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          {job.roleTag}
                        </span>
                      </div>

                      {/* Eligibility */}
                      <div className="flex items-center gap-[4px] lg:gap-[8px]">
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          Eligibility:
                        </span>
                        <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#000000] lg:text-[#2A2A2A] tracking-[0.01em]">
                          {job.eligibility}
                        </span>
                      </div>
                    </div>

                    {/* Apply Arrow Indicator */}
                    <Link
                      href={job.link}
                      aria-label={`Apply for ${job.title}`}
                      className="shrink-0 w-[34px] h-[34px] lg:w-[48px] lg:h-[48px] bg-[#0F68D6] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                    >
                      <ChevronRight className="text-white scale-75 lg:scale-100" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* "Don't see a fit?" Feature Banner Card */}
          <div className="relative w-full aspect-[362/450] sm:aspect-[1320/520] lg:aspect-[1320/433] min-h-[420px] lg:min-h-[433px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[30px] lg:rounded-tr-[10px] lg:rounded-br-[30px] lg:rounded-bl-[30px] overflow-hidden flex flex-col justify-end lg:justify-stretch">
            
            {/* Background Architectural Glass Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/careers/where-you-would-fit/img_dont_see_a_fit.png"
                alt="Don't see a fit background"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1320px"
                className="object-cover object-[75%_center] lg:object-right"
              />
            </div>

            {/* Mint Green Content Card */}
            <div className="relative z-10 w-full lg:w-[48%] xl:w-[539px] h-auto lg:h-full bg-[#63CCB7] rounded-tl-[20px] rounded-tr-[0px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[30px] lg:rounded-tr-[0px] lg:rounded-br-[60px] lg:rounded-bl-[30px] p-[20px] sm:p-[28px] lg:p-[36px] xl:p-[40px] flex flex-col justify-center gap-[14px] lg:gap-[18px] xl:gap-[20px]">
              
              {/* Heading */}
              <h3 className="font-primary font-normal text-[28px] sm:text-[32px] lg:text-[40px] xl:text-[52px] leading-[1.15] tracking-[-0.01em] text-[#042849]">
                Don&apos;t see a fit?
              </h3>

              {/* Description */}
              <p className="font-secondary font-normal text-[14px] lg:text-[16px] xl:text-[20px] leading-[1.4] text-[#111111] max-w-[459px]">
                We make a few great hires every quarter, and the best people rarely fit a box we&apos;ve already drawn. If you&apos;re exceptional and you see the mission, tell us anyway.
              </p>

              {/* Write to us CTA Button from standard CTA component */}
              <div className="mt-[4px] w-fit">
                <Link href="mailto:careers@waterlabs.ai">
                  <CTA variant="dark-bg">
                    Write to us
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

export default WhereYouWouldFitSection;
