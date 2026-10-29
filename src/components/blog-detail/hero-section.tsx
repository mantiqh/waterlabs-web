import Image from 'next/image';

import Navbar from '@/components/common/navbar';
import { renderFormattedText } from '@/lib/format-text';

export interface BlogDetailHeroProps {
  tag?: string;
  subTag?: string;
  titleAccent?: string;
  titleRest?: string;
  title?: string;
  desktopImage?: string;
  mobileImage?: string;
  paragraphs?: string[];
}

const DEFAULT_PARAGRAPHS = [
  'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up, rather than flagging tasks for humans to complete.',
  'It is the difference between software that builds a worklist and software that works the list. This guide, from the team at Waterlabs, explains what agentic RCM is, how it differs from the automation that came before it, what it changes for a health system, and where its real limits sit.',
  'The shift is happening fast. A revenue cycle survey found that 80% of health systems were exploring, piloting, or implementing generative AI tools for RCM, a 38-percentage-point increase in under two years. Agentic RCM is the frontier of that shift, and the term is new enough that most definitions still get it wrong.',
];

export const BlogDetailHeroSection = ({
  tag = 'Lorem',
  subTag = 'Lorem Ipsum',
  titleAccent = 'What Is Agentic RCM?',
  titleRest = ' The Definitive Guide to the Autonomous Revenue Cycle',
  title,
  desktopImage = '/images/blog-detail/hero-banner-desktop.png',
  mobileImage = '/images/blog-detail/hero-banner-mobile.png',
  paragraphs = DEFAULT_PARAGRAPHS,
}: BlogDetailHeroProps) => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Blog Detail Hero Banner (Figma Specifications):
        - Desktop (Figma: 5915-17005): 1440px x 1122px, padding: 40px 60px 80px, gap: 60px, rounded-bl: 60px
        - Mobile (Figma: 5915-17408): 402px x 1044px, padding: 20px 20px 40px, gap: 40px, rounded-bl: 30px
        - Background: #F4F6F9
      */}
      <div className="relative w-full overflow-hidden rounded-bl-[30px] bg-[#F4F6F9] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pb-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Mobile Decorative Background Glass Shape (Figma: 539.32px x 269.66px rotated 16.52deg) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[42px] left-[82px] z-0 h-[270px] w-[539px] rotate-[16.52deg] rounded-[30px] border border-white/25 bg-white/50 opacity-80 backdrop-blur-[6.6px] lg:hidden"
        />

        {/* Top Navbar */}
        <div className="relative z-50 mx-auto w-full max-w-[1320px]">
          <Navbar />
        </div>

        {/* 
          Hero Content Section (Frame 2147226790 & Frame 2147226789):
          - Width: 1320px max, padding 0 112px on desktop => 1096px inner width
          - Top gap: 40px on mobile, 60px on desktop
        */}
        <div className="relative z-10 mx-auto mt-[32px] flex w-full max-w-[1320px] flex-col items-center md:mt-[48px] lg:mt-[60px]">
          <div className="flex w-full max-w-[1096px] flex-col gap-[24px] md:gap-[32px]">
            {/* Header / Title Group (Frame 2147203266 & Frame 2147226509) */}
            <div className="flex w-full flex-col items-start gap-[8px] md:gap-[12px]">
              {/* Text - Tag Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <span className="type-caption text-[#7D8690]">{tag}</span>
                <span className="h-[14px] w-[1px] bg-[#7D8690]/50 md:h-[17.5px]" />
                <span className="type-caption text-[#7D8690]">{subTag}</span>
              </div>

              {/* Title (Display/H2: General Sans Regular, 52px / 60px desktop, 32px / 40px mobile) */}
              <h2 className="type-h2 max-w-[874px]">
                {title ? (
                  <span className="text-[#042849]">{title}</span>
                ) : (
                  <>
                    <span className="text-[#0F68D6]">{titleAccent}</span>
                    <span className="text-[#042849]">{titleRest}</span>
                  </>
                )}
              </h2>
            </div>

            {/* Hero Image Banner (Frame 2147203302): 1096px x 350px on desktop, 362px x 245px on mobile */}
            <div className="relative h-[245px] w-full shrink-0 overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(4,40,73,0.06)] sm:h-[290px] md:h-[320px] lg:h-[350px]">
              {/* Desktop / Tablet Image */}
              <Image
                src={desktopImage}
                alt={title || `${titleAccent}${titleRest}`}
                fill
                priority
                className="hidden object-cover object-center md:block"
                sizes="(max-width: 1096px) 100vw, 1096px"
              />
              {/* Mobile Image */}
              <Image
                src={mobileImage}
                alt={title || `${titleAccent}${titleRest}`}
                fill
                priority
                className="block object-cover object-center md:hidden"
                sizes="(max-width: 768px) 100vw, 362px"
              />
            </div>

            {/* Introductory Body Copy (Body-XS / Body-S in Figma: 18px / 26px desktop, 14px / 24px mobile) */}
            <div className="flex w-full flex-col gap-[16px] md:gap-[20px]">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="type-body-xs text-[#2A2A2A]">
                  {renderFormattedText(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHeroSection;
