import Image from 'next/image';

export const WhatWeDoMattersSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#B8B1A5] from-50% to-[#F4F6F9] to-50%">
      {/* 
        White Wrapper Frame with top-right and bottom-right rounded corners:
        - Desktop: rounded-tr-[60px] rounded-br-[60px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px]
        - Reveals #B8B1A5 at the top-right and #F4F6F9 at the bottom-right.
      */}
      <div className="w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] pt-[40px] pb-[20px] md:px-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        {/* 
          Main Dark Card (Figma Frame 2147203295)
          Desktop: 1320px x 650px, rounded-tl-[20px] rounded-tr-[20px] rounded-br-[40px] rounded-bl-[20px], p-[32px], gap-[40px]
          Mobile: rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px], p-[20px]
        */}
        <div className="relative mx-auto flex w-full max-w-[1320px] flex-col justify-start gap-[24px] overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#042849] p-[20px] pb-[28px] sm:p-[28px] lg:gap-[32px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-br-[40px] lg:rounded-bl-[20px] lg:p-[36px] lg:pb-[36px]">
          {/* Background Architectural Image */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/careers/what-we-do-matters/img_why_do_we_matters_bg_image.png"
              alt="Architectural surfaces background"
              fill
              priority
              className="object-cover object-center opacity-90 mix-blend-overlay"
            />
          </div>

          {/* Top Header Block (Figma Frame 1272628356 / Frame 2147203229) */}
          <div className="relative z-10 flex w-full flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#63CCB7] lg:h-[8px] lg:w-[8px]" />
              <span className="body-xxs text-[#D7DCE2]">Why what we do matters</span>
            </div>
          </div>

          {/* Bottom Content Area (Figma Frame 2147203286: max-w-[1024px], gap-[20px]) */}
          <div className="relative z-10 flex w-full max-w-[1024px] flex-col items-start justify-between gap-[16px] lg:flex-row lg:gap-[20px]">
            {/* Left Column: Subheading matching typographic weightage of eyebrow */}
            <div className="w-full min-w-0 lg:w-[508px] lg:max-w-[508px]">
              <h3 className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                This is a hard problem to solve.
              </h3>
            </div>

            {/* Right Column: Paragraph & Team Image (Figma Frame 2147226457: 496px width, gap 16px) */}
            <div className="flex w-full min-w-0 flex-col gap-[16px] lg:w-[496px] lg:max-w-[496px] lg:gap-[20px]">
              <p className="type-body-xs max-w-[496px] text-[#D7DCE2]">
                Revenue cycle is one of the hardest problems in healthcare. Here, the rules are
                complex, the exceptions are abundant, and the stakes are high. Whether you&apos;re
                defining software, running operations, or working with customers, you&apos;ll be
                solving problems that don&apos;t come in playbooks.
              </p>

              {/* Team Image (Frame 2147203292: 496px x 250px with rounded-tl-[40px] rounded-tr-[10px] rounded-br-[40px] rounded-bl-[10px]) */}
              <div className="relative aspect-[322/182] w-full shrink-0 overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.2)] lg:aspect-auto lg:h-[240px] lg:w-[496px] lg:rounded-tl-[40px] lg:rounded-tr-[10px] lg:rounded-br-[40px] lg:rounded-bl-[10px] xl:h-[250px]">
                <Image
                  src="/images/careers/what-we-do-matters/Frame%202147203292.png"
                  alt="Problem Solving Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 496px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoMattersSection;
