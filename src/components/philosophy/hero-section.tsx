import Image from 'next/image';

import Navbar from '@/components/common/navbar';

export const PhilosophyHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111]">
      {/* 
        Philosophy Hero Banner (Figma Specifications):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px, gap: 10px
        - Mobile: 402px x 600px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px, gap: 48px
        - Desktop Background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), linear-gradient(0.13deg, #042849 -1.52%, #63CCB7 107.65%)
        - Mobile Background: linear-gradient(0.13deg, rgba(4, 40, 73, 0.6) -1.52%, rgba(99, 204, 183, 0.6) 107.65%), #000000
        - Strict: Centralized typography token only (type-h2), no <h1> tags
      */}
      <div
        className="relative flex h-[600px] w-full flex-col justify-start gap-[48px] overflow-hidden rounded-bl-[30px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[32px] md:pb-[60px] lg:h-[650px] lg:justify-between lg:gap-[10px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), linear-gradient(0.13deg, #042849 -1.52%, #63CCB7 107.65%)',
        }}
      >
        {/* Background Banner Graphics */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop / Tablet Graphic */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/philosophy/hero-section/img_banner (4).png"
              alt="Philosophy Hero Banner Graphic"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          {/* Mobile Graphic */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/images/philosophy/hero-section/banner-mobile.png"
              alt="Philosophy Hero Banner Graphic Mobile"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Top Navbar (Figma Frame 9 / Component 1) */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Content Container (Figma Mobile Frame 2147226740 / Frame 12 | Tablet Left Aligned | Desktop Frame 8 / Frame 12) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[362px] flex-1 flex-col items-start justify-start pt-[0px] md:mx-0 md:max-w-none lg:mx-auto lg:max-w-[1320px] lg:justify-center lg:pt-[32px]">
          <div className="w-full max-w-[362px] md:max-w-[540px] lg:max-w-[664px]">
            <h2 className="type-h1 lg:type-h2">
              <span className="text-white">
                Each year, health systems
                <br className="hidden md:inline lg:inline" /> spend billions to collect
                <br className="hidden md:inline lg:inline" />{' '}
              </span>
              <span className="text-[#63CCB7]">
                revenue they have already
                <br className="hidden md:inline lg:inline" /> earned.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyHeroSection;
