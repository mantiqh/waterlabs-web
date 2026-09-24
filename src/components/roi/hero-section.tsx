import Image from 'next/image';

import Navbar from '@/components/common/navbar';

export const ROIHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        Hero Banner (Figma Specifications):
        - Desktop: 1440px x 622px, background: linear-gradient(180deg, #0F68D6 68.83%, #63CCB7 108.85%),
          border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px, gap: 32px
        - Mobile: 402px x 599px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px, gap: 20px
      */}
      <div
        className="relative w-full rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[32px] md:px-[40px] md:pb-[60px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col gap-[20px] lg:gap-[32px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 68.83%, #63CCB7 108.85%)',
        }}
      >
        {/* Desktop Background Image */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/ROI/hero-section/img_banner_bg (2).png"
            alt=""
            fill
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="block lg:hidden absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/ROI/hero-section/img_banner_bg_mobile (3).png"
            alt=""
            fill
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Content Area: Text + Image side-by-side (desktop) / stacked (mobile) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-[20px] lg:gap-[32px] flex-1">
          {/* Left: Headline */}
          <div className="w-full lg:flex-1">
            <h1 className="type-h2 text-white tracking-[-0.01em]">
              Find out what your revenue cycle actually costs you. Then find out what it could cost instead.
            </h1>
          </div>

          {/* Right: Hero Image */}
          <div className="w-full lg:flex-1 relative">
            {/* Desktop image */}
            <div className="hidden md:block relative w-full aspect-[644/425] rounded-[20px_10px_20px_20px] overflow-hidden">
              <Image
                src="/images/ROI/hero-section/img_banner.png"
                alt="ROI Calculator preview showing estimated savings and revenue opportunity"
                fill
                priority
                className="object-cover"
              />
            </div>
            {/* Mobile image */}
            <div className="block md:hidden relative w-full aspect-[362/246] rounded-[20px_10px_20px_20px] overflow-hidden">
              <Image
                src="/images/ROI/hero-section/img_banner_mobile (8).png"
                alt="ROI Calculator preview showing estimated savings and revenue opportunity"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIHeroSection;
