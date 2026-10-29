import Image from 'next/image';

import Navbar from '@/components/common/navbar';
import { renderFormattedText } from '@/lib/format-text';
import type { CaseStudy } from '@/types/case-study';

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export const CaseStudyHero = ({ caseStudy }: CaseStudyHeroProps) => {
  const { categoryTag, title, titleHighlight, subtitle, heroImage, heroImageAlt } = caseStudy;

  return (
    <section className="relative w-full bg-white">
      {/* 
        Case Study Banner (Figma Specifications):
        - Desktop (1440px x 690px):
          - padding: 40px 60px 80px, gap: 60px
          - background: #F4F6F9
          - border-radius: 0px 0px 0px 60px
        - Mobile (362px - 402px):
          - padding: 20px 20px 40px, gap: 40px
          - border-radius: 0px 0px 0px 30px
      */}
      <div className="relative flex min-h-[600px] w-full flex-col justify-between gap-[36px] rounded-bl-[30px] bg-[#F4F6F9] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[28px] md:pb-[50px] lg:min-h-[690px] lg:gap-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Background Decorative Graphic Elements (Figma Specs) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]"
          aria-hidden="true"
        >
          {/* Desktop Decorative Vector (880px x 440px) */}
          <div className="absolute -bottom-[215px] left-[200px] hidden h-[440px] w-[880px] rounded-[41.88px] border border-[rgba(244,246,249,0.2)] bg-white/30 backdrop-blur-[9.2px] lg:block" />

          {/* Desktop Rotated Vector (2274px x 1137px) */}
          <div className="absolute top-[550px] -left-[893px] hidden h-[1137px] w-[2274px] -rotate-[3.62deg] rounded-[30px] border border-white/15 lg:block" />

          {/* Mobile Decorative Vector (539px x 270px) */}
          <div className="absolute top-[42px] left-[82px] block h-[270px] w-[539px] rotate-[16.52deg] rounded-[30px] border border-white/25 bg-white/50 backdrop-blur-[6.6px] lg:hidden" />
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Hero Main Content Row (Frame 2147203232: 1320px x 450px) */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1320px] flex-1 flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[40px]">
          {/* Left Column: Text Content (Frame 2147226949)
              On mobile: order-2 (text below image)
              On desktop: order-1 (text on left)
          */}
          <div className="order-2 flex w-full min-w-0 flex-col items-start justify-center gap-[12px] lg:order-1 lg:w-1/2 lg:max-w-[640px] lg:gap-[16px]">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
              <span className="body-caption tracking-[0.01em] text-[#7D8690]">{categoryTag}</span>
            </div>

            {/* Headline & Subtitle Container (Frame 2147226938) */}
            <div className="flex w-full flex-col items-start gap-[8px] lg:gap-[12px]">
              {/* Headline: semantic <h2> with type-h2 and dynamic blue accent */}
              <h2 className="type-h2 text-[#111111]">
                {titleHighlight && title.includes(titleHighlight) ? (
                  <>
                    {title.split(titleHighlight)[0]}
                    <span className="text-[#0F68D6]">{titleHighlight}</span>
                    {title.split(titleHighlight)[1]}
                  </>
                ) : (
                  title
                )}
              </h2>

              {/* Subtitle / Excerpt: type-body-xs */}
              <p className="type-body-xs max-w-[640px] text-[#2A2A2A]">
                {renderFormattedText(subtitle)}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Image Card (Frame 2147226953: 640px x 450px)
              On mobile: order-1 (image on top), border-radius: 10px 20px 20px 20px
              On desktop: order-2 (image on right), border-radius: 10px 40px 10px 40px
          */}
          <div className="relative order-1 aspect-[640/450] w-full shrink-0 overflow-hidden rounded-tl-[10px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] shadow-sm lg:order-2 lg:w-1/2 lg:max-w-[640px] lg:rounded-tl-[10px] lg:rounded-tr-[40px] lg:rounded-br-[10px] lg:rounded-bl-[40px]">
            <Image
              src={heroImage}
              alt={heroImageAlt || title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
