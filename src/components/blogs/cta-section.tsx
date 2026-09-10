'use client';

import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const BlogsCTASection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        CTA Banner Card (Figma: Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 140px, padding: 40px 60px, gap: 20px, background: #0F68D6, border-radius: 30px 0 0 30px
        - Mobile: 402px x 174px, padding: 40px 20px, gap: 24px, background: #0F68D6, border-radius: 30px 0 0 30px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tl-[30px] rounded-bl-[30px] rounded-tr-0 rounded-br-0 px-[20px] md:px-[40px] lg:px-[60px] py-[40px] lg:py-0 lg:h-[140px] flex items-center overflow-hidden">
        {/* Content Container (max-w-[1320px]) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px]">
          {/* Headline */}
          <h2 className="type-h2 text-white tracking-[-0.01em]">
            See what we built.
          </h2>

          {/* Action CTA Button */}
          <div className="shrink-0 flex items-center">
            <Link href="/#products" className="inline-block">
              <CTA variant="dark-bg" as="div">
                Explore the Platform
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsCTASection;
