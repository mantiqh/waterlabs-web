import Image from 'next/image';

import Navbar from '@/components/common/navbar';

import bannerDesktop from '../../../public/images/ROI/hero-section/img_banner.png';
import bannerMobile from '../../../public/images/ROI/hero-section/img_banner_mobile (8).png';

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
        className="relative flex w-full flex-col gap-[20px] overflow-hidden rounded-bl-[30px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[32px] md:pb-[60px] lg:gap-[32px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 68.83%, #63CCB7 108.85%)',
        }}
      >
        {/* Desktop Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/images/ROI/hero-section/img_banner_bg (2).png"
            alt=""
            fill
            priority
            className="object-cover object-bottom"
          />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col items-start gap-[20px] lg:flex-row lg:items-center lg:gap-[32px]">
          {/* Left: Headline */}
          <div className="w-full lg:flex-1">
            <h1 className="type-h2 tracking-[-0.01em] text-white">
              Find out what your revenue cycle actually costs you. Then find out what it could cost
              instead.
            </h1>
          </div>

          {/* Right: Hero Image */}
          <div className="relative w-full lg:flex-1">
            {/* Desktop image */}
            <div className="relative hidden aspect-[644/425] w-full overflow-hidden rounded-[20px_10px_20px_20px] md:block">
              <Image
                src={bannerDesktop}
                alt="ROI Calculator preview showing estimated savings and revenue opportunity"
                fill
                priority
                className="object-cover"
              />
            </div>
            {/* Mobile image */}
            <div className="relative block aspect-[362/246] w-full overflow-hidden rounded-[20px_10px_20px_20px] md:hidden">
              <Image
                src={bannerMobile}
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
