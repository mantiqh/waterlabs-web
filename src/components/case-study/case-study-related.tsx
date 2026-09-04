'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export interface RelatedCaseItem {
  id: string;
  title: string;
  image: string;
  href: string;
  isShorter?: boolean; // Card 2 in Figma is 288px while Cards 1 & 3 are 357px
}

const DEFAULT_RELATED_CASES: RelatedCaseItem[] = [
  {
    id: 'related-1',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '/images/case-study/common/Frame%202147203302.png',
    href: '/case-study/enterprise-rcm-automation',
    isShorter: false,
  },
  {
    id: 'related-2',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '/images/case-study/common/Frame%202147203302%20(1).png',
    href: '/case-study/multi-site-behavioral-health',
    isShorter: true,
  },
  {
    id: 'related-3',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '/images/case-study/common/Frame%202147203302%20(2).png',
    href: '/case-study/specialty-surgical-hospital',
    isShorter: false,
  },
];

interface CaseStudyRelatedProps {
  relatedCases?: RelatedCaseItem[];
}

export const CaseStudyRelated: React.FC<CaseStudyRelatedProps> = ({
  relatedCases = DEFAULT_RELATED_CASES,
}) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-white from-50% to-[#0F68D6] to-50%">
      {/* 
        Related Cases Container (Figma Specification):
        - Frame width: 1440px, background: #F4F6F9
        - border-radius: 60px 0px 0px 60px
        - padding: 0px 60px (desktop), 0px 20px (mobile)
        - Inner Frame 2147226450: padding: 80px 0px, gap: 40px
      */}
      <div className="w-full bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto py-[48px] md:py-[64px] lg:py-[80px] flex flex-col items-start gap-[32px] lg:gap-[40px]">
          
          {/* Section Heading: Display/H2 token */}
          <h2 className="type-h2 text-[#0F68D6]">
            Related Cases
          </h2>

          {/* Cards Grid: 3 columns on desktop, flex/grid on smaller screens */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[32px] items-start">
            {relatedCases.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-start gap-[16px] lg:gap-[20px] w-full"
              >
                {/* Image Card Container (Frame 2147203302)
                    - Card 1 & 3: height 357px
                    - Card 2: height 288px (matching exact Figma specifications)
                */}
                <div
                  className={`relative w-full overflow-hidden rounded-[20px] shadow-sm transition-transform duration-300 group-hover:scale-[1.01] ${
                    item.isShorter
                      ? 'h-[240px] sm:h-[260px] lg:h-[288px]'
                      : 'h-[280px] sm:h-[320px] lg:h-[357px]'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 418px"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Overlay as specified in Figma */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,104,214,0.15)] pointer-events-none" />
                </div>

                {/* Caption Text & CTA Arrow (Frame 2147226519) */}
                <div className="w-full flex flex-row items-center justify-between gap-[12px] pt-[4px]">
                  <p className="type-body-s text-[#000000] flex-1 line-clamp-2">
                    {item.title}
                  </p>

                  {/* Circular Arrow Button (Default design system CTA button) */}
                  <CTA
                    as="div"
                    variant="fill-arrow"
                    className="w-[48px] h-[48px] rounded-full shrink-0 shadow-sm group-hover:scale-105 transition-all duration-200 pointer-events-none"
                    aria-label="View related case"
                  />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudyRelated;
