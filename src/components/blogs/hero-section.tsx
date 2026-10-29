import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export const BlogsHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-bl-[30px] bg-white px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pb-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
      {/* Top Navbar */}
      <div className="relative z-50 mx-auto w-full max-w-[1320px]">
        <Navbar />
      </div>

      {/* 
        Featured Blog Hero Card:
        - Desktop (Figma: 5915-17114): 1320px x 517px, border-radius: 40px 20px
        - Mobile (Figma: 5915-17212): 362px x 448.5px, border-radius: 20px 10px 20px 20px
        - Background: CSS background image without absolute positioning
      */}
      <div className="mx-auto mt-[24px] w-full max-w-[1320px] overflow-hidden rounded-[20px_10px_20px_20px] bg-[#042849] bg-[url('/images/blogs/hero-section/img_hero_bg_mobile.png')] bg-cover bg-center bg-no-repeat shadow-[0_12px_40px_rgba(4,40,73,0.08)] md:bg-[url('/images/blogs/hero-section/img_hero_bg.png')] lg:mt-[32px] lg:rounded-[40px_20px_40px_20px] xl:mt-[40px]">
        {/* ========================================================================= */}
        {/* Desktop Layout (1024px+): Side-by-side (506px text / 810px image)         */}
        {/* ========================================================================= */}
        <div className="hidden h-[460px] w-full flex-row items-stretch justify-between lg:flex xl:h-[517px]">
          {/* Left Column: Text Content & CTA (Frame 2147203266 / 2147226900) */}
          <div className="flex w-full shrink-0 flex-col items-start justify-center gap-[20px] p-[32px] lg:w-[48%] xl:w-[506px] xl:p-[40px]">
            <div className="flex w-full flex-col items-start gap-[20px]">
              {/* Tag / Eyebrow (Text - Tag) */}
              <div className="flex items-center gap-[8px]">
                <span className="type-caption text-[#D7DCE2]">Article</span>
                <span className="h-[14px] w-[1px] bg-[#D7DCE2]/40" />
                <span className="type-caption text-[#D7DCE2]">Jun 26, 2025</span>
              </div>

              {/* Title & Description (Frame 2147226899) */}
              <div className="flex w-full flex-col items-start gap-[12px]">
                <h5 className="type-h5 tracking-[-0.01em] text-white">
                  What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle
                </h5>
                <p className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]">
                  Agentic RCM is revenue cycle management run by autonomous AI agents that do the
                  work themselves.
                </p>
              </div>
            </div>

            {/* CTA Button (Desktop - Fill CTA / Frame 2147226507) */}
            <div className="pt-[4px]">
              <Link href="/blogs/what-is-agentic-rcm" className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Read Blog
                </CTA>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image (Frame 2147226502) - Full width & height without margin or layers */}
          <div className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[20px]">
            <Image
              src="/images/blogs/hero-section/img_agentic_rcm_hero.png"
              alt="What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 50vw, 810px"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Mobile & Tablet Layout (< 1024px): Stacked Layout (Image Top / Text Bottom) */}
        {/* ========================================================================= */}
        <div className="flex min-h-[500px] w-full flex-col items-start justify-between sm:min-h-[540px] lg:hidden">
          {/* Top Image (Frame 2147226503) */}
          <div className="relative h-[210px] w-full shrink-0 overflow-hidden rounded-[20px] sm:h-[240px]">
            <Image
              src="/images/blogs/hero-section/img_agentic_rcm_hero.png"
              alt="What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 768px"
            />
          </div>

          {/* Bottom Content (Frame 2147203266) */}
          <div className="flex w-full flex-1 flex-col items-start justify-between gap-[20px] p-[20px] pb-[28px] sm:p-[24px] sm:pb-[36px]">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[6px]">
              <span className="type-caption text-[#D7DCE2]">Article</span>
              <span className="h-[12px] w-[1px] bg-[#D7DCE2]/40" />
              <span className="type-caption text-[#D7DCE2]">Jun 26, 2025</span>
            </div>

            {/* Title & Description */}
            <div className="flex w-full flex-col items-start gap-[10px]">
              <h5 className="type-h5 tracking-[-0.01em] text-white">
                What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle
              </h5>
              <p className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]">
                Agentic RCM is revenue cycle management run by autonomous AI agents that do the work
                themselves.
              </p>
            </div>

            {/* CTA Button on mobile */}
            <div className="pt-[4px]">
              <Link href="/blogs/what-is-agentic-rcm" className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Read Blog
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHeroSection;
