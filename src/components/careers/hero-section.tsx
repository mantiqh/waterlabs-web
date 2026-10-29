import Image from 'next/image';

import Navbar from '@/components/common/navbar';

export const CareersHeroSection = () => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Careers Hero Banner (Figma Frame 6 / Banner Specification):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Tablet (768px): 2-column layout, h-[560px] - h-[650px], vertically centered
        - Mobile: 402px x 659px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 2.92%, #B8B1A5 100%) with banner (1).png (desktop/tablet) / banner (2).png (mobile)
      */}
      <div className="relative flex min-h-[620px] w-full flex-col justify-between gap-[20px] rounded-bl-[30px] bg-gradient-to-b from-[#0F68D6] from-30% to-[#B8B1A5] px-[20px] pt-[20px] pb-[40px] md:h-[560px] md:gap-0 md:px-[40px] md:pt-[28px] md:pb-[40px] lg:h-[650px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        {/* Background Banner Graphic anchored to bottom */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop & Tablet Banner Graphic */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/careers/hero-section/banner%20(1).png"
              alt="Careers Background Banner"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/images/careers/hero-section/banner%20(2).png"
              alt="Careers Background Banner Mobile"
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
            TABLET & DESKTOP HERO CONTENT (Figma Frame 8 / Frame 12)
            - Tablet: vertically centered with md:my-auto md:items-center
            - Desktop: 1320px width, height 470px, gap: 20px, align-items: flex-end (lg:my-0 lg:items-end)
            - Left (Frame 12): 650px x 470px with pt-[32px] on desktop
              - Inner Frame 2147203284: 650px x 438px, justify-center
              - Heading: General Sans 48px / 56px, max-w-[650px]
            - Right (Rectangle 131): 650px x 441px team image card, rounded-tl-[80px] rounded-tr-[20px] rounded-br-[80px] rounded-bl-[20px]
           ===================================================================== */}
        <div className="relative z-10 mx-auto hidden h-auto w-full max-w-[1320px] flex-row justify-between gap-[20px] md:my-auto md:flex md:items-center lg:my-0 lg:h-[470px] lg:items-end">
          {/* Left Column (Frame 12 -> Frame 2147203284): Heading */}
          <div className="flex h-auto w-full max-w-[650px] flex-col items-start justify-center pt-0 md:w-1/2 lg:h-full lg:pt-[32px]">
            <div className="flex h-auto w-full flex-col items-start justify-center lg:h-[438px]">
              <h2 className="type-h3 max-w-[650px] tracking-[-0.01em] text-white">
                We are tackling one of healthcare&apos;s hardest problems: rebuilding how healthcare
                gets paid.
              </h2>
            </div>
          </div>

          {/* Right Column: Team Image Card (Rectangle 131) */}
          <div className="w-full max-w-[650px] shrink-0 md:w-1/2">
            <div className="relative h-[300px] w-full overflow-hidden rounded-tl-[60px] rounded-tr-[20px] rounded-br-[60px] rounded-bl-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:h-[340px] lg:h-[441px] lg:rounded-tl-[80px] lg:rounded-br-[80px]">
              <Image
                src="/images/careers/hero-section/img_banner%20(8).png"
                alt="Waterlabs Team"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* =====================================================================
            MOBILE HERO CONTENT (Figma Frame 2147226740 / Frame 12)
            - Top: Heading (General Sans 36px / 48px)
            - Bottom: Team image card (362px x 246px, rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px])
           ===================================================================== */}
        <div className="relative z-10 mt-auto flex w-full flex-col items-start justify-end gap-[20px] md:hidden">
          {/* Top: Heading */}
          <div className="w-full">
            <h2 className="type-h1 tracking-[-0.01em] text-white">
              We are tackling one of healthcare&apos;s hardest problems: rebuilding how healthcare
              gets paid.
            </h2>
          </div>

          {/* Bottom: Team Image Card (Rectangle 132) */}
          <div className="relative aspect-[362/246] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/careers/hero-section/img_banner%20(8).png"
              alt="Waterlabs Team"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
