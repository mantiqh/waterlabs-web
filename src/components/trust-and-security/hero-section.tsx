import Image from 'next/image';

import Navbar from '@/components/common/navbar';

export const TrustHeroSection = () => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Trust & Security Hero Banner (Figma Specification):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Tablet (768px): 2-column layout like desktop, h-[560px] - h-[650px]
        - Mobile: 402px x 490px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 41.31%, #9A84E3 100%) with banner.png
      */}
      <div className="relative flex h-[490px] w-full flex-col justify-between gap-[20px] rounded-bl-[30px] bg-gradient-to-b from-[#0F68D6] from-40% to-[#9A84E3] px-[20px] pt-[20px] pb-[40px] md:h-[560px] md:gap-0 md:px-[40px] md:pt-[28px] md:pb-[40px] lg:h-[650px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Background Banner Graphic aligned to bottom */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop & Tablet Banner Graphic */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/trust-and-security/hero-section/banner.png"
              alt="Trust and Security Gradient Background"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/images/trust-and-security/hero-section/banner%20(3).png"
              alt="Trust and Security Gradient Background Mobile"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* =====================================================================
            TABLET & DESKTOP HERO CONTENT (Figma Frame 12)
            - 1320px max-width, height 470px, gap: 20px, pt-[32px]
            - Left: Heading text, General Sans 52px / 60px (Display/H2), 650px width
            - Right (Frame 2147203200 / Rectangle 131): Doctor image card 650px x 441px, rounded-tl-[80px] rounded-tr-[20px] rounded-br-[80px] rounded-bl-[20px]
           ===================================================================== */}
        <div className="relative z-10 mx-auto hidden h-auto w-full max-w-[1320px] flex-row items-center justify-between gap-[20px] pt-0 md:my-auto md:flex lg:my-0 lg:h-[470px] lg:pt-[32px]">
          {/* Left Column: Heading (Display/H2: 52px / 60px in Figma, 650px x 120px) */}
          <div className="flex h-auto w-full max-w-[650px] flex-col items-start justify-center md:w-1/2 lg:h-[441px]">
            <h1 className="type-h2 max-w-[650px] text-white">
              Your patient data never leaves your environment.
            </h1>
          </div>

          {/* Right Column: Doctor Image Card (Rectangle 131: 650px x 441px) */}
          <div className="w-full max-w-[650px] shrink-0 md:w-1/2">
            <div className="relative h-[300px] w-full overflow-hidden rounded-tl-[60px] rounded-tr-[20px] rounded-br-[60px] rounded-bl-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.25)] md:h-[340px] lg:h-[441px] lg:rounded-tl-[80px] lg:rounded-br-[80px]">
              <Image
                src="/images/trust-and-security/hero-section/img_banner%20(2).png"
                alt="Healthcare Provider Reviewing MRI Scans"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* =====================================================================
            MOBILE HERO CONTENT (< 768px Phone screens only - Figma Frame 2147226740 / Frame 12)
            - Full width matching Navbar, Gap: 12px, justify-end
            - Top: Doctor image card (rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px])
            - Bottom: Heading text (General Sans 32px / 40px, Display/H2 mobile spec)
           ===================================================================== */}
        <div className="relative z-10 flex w-full flex-col items-start justify-end gap-[12px] md:hidden">
          {/* Top: Doctor Image Card (Rectangle 131) */}
          <div className="relative aspect-[362/245] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/trust-and-security/hero-section/img_banner%20(2).png"
              alt="Healthcare Provider Reviewing MRI Scans"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Bottom: Heading */}
          <div className="w-full">
            <h1 className="type-h2 text-white">Your patient data never leaves your environment.</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustHeroSection;
