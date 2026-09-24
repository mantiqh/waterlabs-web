import Image from 'next/image';

export const ROISampleReportSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        Sample Report Section (Figma Specifications):
        - Desktop: dark gradient bg (#0F68D6 → #000000), rounded-tr-[60px] rounded-br-[60px], padding: 60px, gap: 40px
        - Mobile: rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px, gap: 20px
        - Contains: tag, headline, description, full-width report image
      */}
      <div
        className="w-full rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] md:py-[48px] md:px-[40px] lg:py-[60px] lg:px-[60px]"
        style={{
          background: 'linear-gradient(238.07deg, #0F68D6 -29.17%, #000000 45.98%)',
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[20px] lg:gap-[40px]">

          {/* Header: Tag + Headline + Description */}
          <div className="flex flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-aqua-mint shrink-0" />
              <span className="type-body-xxs text-medium-gray tracking-[0.01em]">
                Sample Report
              </span>
            </div>

            {/* Headline + Description (Desktop) */}
            <div className="flex flex-col gap-[12px] lg:gap-[20px]">
              <h2 className="type-h2 tracking-[-0.01em] max-w-[1005px]">
                <span className="text-aqua-mint block">The estimate came from six answers.</span>
                <span className="text-white block">The assessment goes considerably further.</span>
              </h2>
              <p className="hidden md:block type-body-xs text-light-gray max-w-[1320px]">
                Below is an example of what comes back. Function by function, where the money sits in your cycle, what it would take to release it, and what we would run first.
              </p>
            </div>
          </div>

          {/* Report Image */}
          <div className="w-full">
            {/* Desktop report image */}
            <div className="hidden md:block relative w-full aspect-[1320/635] rounded-[30px_15px_30px_30px] overflow-hidden">
              <Image
                src="/images/ROI/sample-report/img_bg_sample_report_ui_screen.png"
                alt="Sample ROI assessment report showing denial rates, days in AR, cost to collect, and automation potential"
                fill
                className="object-cover"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 86.38%, rgba(0, 0, 0, 0.7) 100%)',
                }}
              />
            </div>
            {/* Mobile report image */}
            <div className="block md:hidden relative w-full aspect-[362/246] rounded-[10px_4px_10px_10px] overflow-hidden">
              <Image
                src="/images/ROI/sample-report/img_bg_sample_report_ui_screen_mobile (1).png"
                alt="Sample ROI assessment report showing denial rates, days in AR, cost to collect, and automation potential"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Description (Mobile — placed below image per Figma) */}
          <p className="block md:hidden type-body-xs text-light-gray">
            Below is an example of what comes back. Function by function, where the money sits in your cycle, what it would take to release it, and what we would run first.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ROISampleReportSection;
