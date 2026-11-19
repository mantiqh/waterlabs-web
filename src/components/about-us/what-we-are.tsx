import Image from 'next/image';

export const WhatWeAreSection = () => {
  return (
    <section
      id="what-we-are"
      data-motion-section
      className="m-0 w-full overflow-hidden p-0"
      style={{
        background: 'linear-gradient(180deg, #1E5467 20%, #F4F6F9 100%)',
      }}
    >
      {/* 
        Top Frame Container (Figma Desktop: 6211-17472 / Mobile: 6211-17835):
        - Desktop: 1440px width, 576px height, padding: 80px 60px 40px, border-radius: 0 60px 60px 0
        - Mobile: 402px width, 506px height, padding: 40px 20px, border-radius: 0 30px 30px 0
        - Background: White (#FFFFFF)
      */}
      <div className="w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] pt-[40px] pb-[40px] md:px-[40px] md:pt-[60px] md:pb-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[40px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col justify-center">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Side-by-side Row (830px image + 470px card)        */}
          {/* ========================================================================= */}
          <div
            data-motion-group
            data-motion-start="top 75%"
            className="hidden w-full flex-row items-stretch justify-between gap-[20px] lg:flex"
          >
            {/* Left Column: 3D Diagram (responsive width & aspect ratio, exact at 1440px+) */}
            <div
              data-motion-reveal="image"
              className="relative aspect-[830/456] w-full shrink-0 overflow-hidden rounded-[20px] min-[1440px]:h-[456px] min-[1440px]:w-[830px] lg:w-[60%] xl:w-[62%]"
            >
              <Image
                data-motion-parallax
                src="/images/about-us/what-we-are/img_What%20we%20are%20(2).png"
                alt="Waterlabs 3D revenue cycle operations and agents diagram"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 830px"
                className="object-cover object-center"
              />
            </div>

            {/* Right Column: ICD content column (responsive width, exact at 1440px+) */}
            <div className="flex w-full shrink-0 flex-col justify-center gap-[8px] self-stretch overflow-hidden rounded-[20px_10px_20px_20px] bg-[#91C6F2]/30 bg-[url('/images/about-us/what-we-are/bg_what_we_are_abstract.png')] bg-cover bg-bottom bg-no-repeat px-[20px] py-[16px] min-[1440px]:h-[456px] min-[1440px]:w-[470px] min-[1440px]:gap-[14px] min-[1440px]:px-[40px] lg:w-[38%] xl:w-[35%] xl:gap-[12px] xl:px-[28px] xl:py-[20px]">
              {/* Descriptor headline */}
              <h5 data-motion-reveal="lines" className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                What we are
              </h5>

              {/* Descriptor detail text */}
              <p data-motion-reveal="blur" className="type-body-xs text-[#2A2A2A]">
                Founded in 2024 and headquartered in India, Waterlabs builds the agents running
                revenue cycle operations, the system building more of them, and the memory making
                each agent better than the last. Hospitals, health systems, and specialist practices
                run their revenue cycle on Waterlabs today. 100 agents are in production.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile / Tablet Layout (< lg): Single Unified Card                       */}
          {/* ========================================================================= */}
          <div
            data-motion-group
            data-motion-start="top 75%"
            className="flex w-full flex-col overflow-hidden rounded-[20px_10px_20px_20px] bg-[#91C6F2]/30 lg:hidden"
          >
            {/* Top: ICD detail image (362px x 198.88px) */}
            <div
              data-motion-reveal="image"
              className="relative h-[199px] w-full overflow-hidden rounded-[20px_10px_20px_20px] sm:h-[240px] md:h-[300px]"
            >
              <Image
                data-motion-parallax
                src="/images/about-us/what-we-are/img_What%20we%20are_mob%20(3).png"
                alt="Waterlabs 3D revenue cycle operations and agents diagram"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Bottom: ICD detail text container */}
            <div className="flex flex-col gap-[12px] p-[20px] md:p-[24px]">
              <h5 data-motion-reveal="lines" className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                What we are
              </h5>
              <p data-motion-reveal="blur" className="type-body-xs text-[#2A2A2A]">
                Founded in 2024 and headquartered in India, Waterlabs builds the agents running
                revenue cycle operations, the system building more of them, and the memory making
                each agent better than the last. Hospitals, health systems, and specialist practices
                run their revenue cycle on Waterlabs today. 100 agents are in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAreSection;
