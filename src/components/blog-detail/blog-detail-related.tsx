'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

export interface RelatedBlogItem {
  id: string;
  title: string;
  image: string;
  href: string;
  isShorter?: boolean; // Card 2 in Figma is 288px while Cards 1 & 3 are 357px
}

export const DEFAULT_RELATED_BLOGS: RelatedBlogItem[] = [
  {
    id: 'related-denial-management',
    title: 'Denial Management in Revenue Cycle Management:The Complete Guide',
    image: '/images/blogs/tabs/img_denial_management_inrevenue.png',
    href: '/blogs/denial-management-revenue-cycle-management-complete-guide',
    isShorter: false,
  },
  {
    id: 'related-prior-auth',
    title: 'Prior Authorization Automation: Fixing the Most Broken Process in Healthcare',
    image: '/images/blogs/tabs/img_prior_authorization.png',
    href: '/blogs/prior-authorization-automation-broken-process-healthcare',
    isShorter: true,
  },
  {
    id: 'related-medical-coding',
    title: 'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding',
    image: '/images/blogs/tabs/img_medical_coding.png',
    href: '/blogs/autonomous-medical-coding-accuracy-compliance',
    isShorter: false,
  },
];

interface BlogDetailRelatedProps {
  relatedBlogs?: RelatedBlogItem[];
}

export const BlogDetailRelated: React.FC<BlogDetailRelatedProps> = ({
  relatedBlogs = DEFAULT_RELATED_BLOGS,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('[data-blog-card]') as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 12; // 12px gap matching Figma
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(relatedBlogs.length - 1, newIndex)));
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('[data-blog-card]') as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 12; // 12px gap matching Figma
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 
        Related Blogs Container (Figma Specifications):
        - Desktop (Figma: 5915-17085): 1440px x 721px, padding: 0px 60px, background: #F4F6F9, border-radius: 60px 0px 0px 60px
        - Mobile (Figma: 5915-17476): 402px x 554px, padding: 40px 20px, background: #F4F6F9, border-radius: 30px 0px 0px 30px
      */}
      <div className="w-full bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto py-[40px] md:py-[64px] lg:py-[80px] flex flex-col items-start gap-[20px] lg:gap-[40px]">
          
          {/* Section Heading: Display/H2 token */}
          <h2 className="type-h2 text-[#0F68D6]">
            Related Blogs
          </h2>

          {/* =================================================================
              DESKTOP: 3-column Grid (Figma Frame 2147226524: 1320px x 461px)
             ================================================================= */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-[32px] items-start w-full">
            {relatedBlogs.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-start gap-[16px] lg:gap-[20px] w-full"
              >
                {/* Image Card Container (Frame 2147203302)
                    - Card 1 & 3: height 357px
                    - Card 2: height 288px (matching staggered Figma design)
                */}
                <div
                  className={`relative w-full overflow-hidden rounded-[20px] shadow-sm transition-transform duration-300 group-hover:scale-[1.01] ${
                    item.isShorter
                      ? 'h-[288px]'
                      : 'h-[357px]'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 418px"
                    className="object-cover object-center"
                  />
                  {/* Exact Gradient Overlay as specified in Figma */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[20px]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                    }}
                  />
                </div>

                {/* Caption Text & CTA Arrow (Frame 2147226519) */}
                <div className="w-full flex flex-row items-center justify-between gap-[12px] pt-[4px]">
                  <p className="type-body-s text-[#000000] flex-1 line-clamp-2">
                    {item.title}
                  </p>

                  {/* Circular Arrow Button */}
                  <CTA
                    as="div"
                    variant="fill-arrow"
                    className="w-[48px] h-[48px] rounded-full shrink-0 shadow-sm pointer-events-none group-hover:scale-105 transition-all duration-200"
                    aria-label="View related blog"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* =================================================================
              MOBILE / SMALL SCREENS: Horizontal Carousel (Figma Frame 2147227056)
              - Card Image: Width 362px max, Height 309px, Radius 20px (Figma spec)
              - Sneak peek: Carousel bleeds to right edge showing generous 56px preview of next card
             ================================================================= */}
          <div className="flex lg:hidden flex-col items-start gap-[20px] w-full">
            {/* Scrollable container with snap that bleeds to the right edge */}
            <div
              ref={scrollContainerRef}
              onScroll={handleMobileScroll}
              className="w-[calc(100%+20px)] -mr-[20px] overflow-x-auto snap-x snap-mandatory no-scrollbar pb-[4px]"
            >
              <div className="flex flex-row items-start gap-[12px] pr-[20px]">
                {relatedBlogs.map((item) => (
                  <Link
                    key={`mobile-${item.id}`}
                    data-blog-card
                    href={item.href}
                    className="group shrink-0 snap-start flex flex-col items-start gap-[12px] w-[calc(100vw-88px)] max-w-[362px]"
                  >
                    {/* Image Frame 2147226520: Width 362px max, Height 309px, Radius 20px */}
                    <div
                      className="relative w-full h-[309px] overflow-hidden rounded-[20px] shadow-sm shrink-0 bg-gray-100"
                      style={{ borderRadius: '20px', transform: 'translateZ(0)' }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 362px, 362px"
                        className="object-cover object-center rounded-[20px]"
                      />
                      {/* Gradient Overlay matching Figma */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-[20px]"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                        }}
                      />
                    </div>

                    {/* Frame 2147226519: Title Text + Arrow Button row */}
                    <div className="w-full flex flex-row items-center justify-between gap-[8px]">
                      <p className="type-body-s text-[#000000] flex-1 line-clamp-2">
                        {item.title}
                      </p>
                      <CTA
                        as="div"
                        variant="fill-arrow"
                        className="w-[48px] h-[48px] rounded-full shrink-0 shadow-sm pointer-events-none"
                        aria-label="View related blog"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Carousel indicators matching Figma specs */}
            <div className="flex flex-row items-center gap-[5px] pt-[4px]">
              {relatedBlogs.map((_, idx) => {
                const isActive = activeIndex === idx;
                let widthClass = 'w-[16px]';
                if (isActive) {
                  widthClass = 'w-[32px]';
                } else if ((activeIndex === 0 && idx === 2) || (activeIndex === 2 && idx === 0)) {
                  widthClass = 'w-[6px]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`Go to related blog slide ${idx + 1}`}
                    className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer ${widthClass} ${
                      isActive ? 'bg-[#0F68D6]' : 'bg-[#0F68D6]/20 hover:bg-[#0F68D6]/40'
                    }`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogDetailRelated;
