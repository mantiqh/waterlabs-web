import Image from 'next/image';

export const ROISampleReportSection = () => {
  return (
    <section data-motion-section className="relative w-full overflow-hidden">
      {/*
        Sample Report Section (Figma Specifications):
        - Desktop: dark gradient bg (#0F68D6 → #000000), rounded-tr-[60px] rounded-br-[60px], padding: 60px, gap: 40px
        - Mobile: rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px, gap: 20px
        - Contains: tag, headline, description, full-width report image
      */}
      <div
        data-motion-reveal="panel"
        data-motion-trigger="section"
        data-motion-start="top 75%"
        className="w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[48px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[60px]"
        style={{
          background: 'linear-gradient(238.07deg, #0F68D6 -29.17%, #000000 45.98%)',
        }}
      >
        <div
          data-motion-group
          data-motion-trigger="section"
          data-motion-start="top 75%"
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[40px]"
        >
          {/* Header: Tag + Headline + Description */}
          <div className="flex flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="bg-aqua-mint h-[8px] w-[8px] shrink-0 rounded-full" />
              <span
                data-motion-reveal="scramble"
                data-motion-at="0.5"
                className="type-body-xxs text-medium-gray tracking-[0.01em]"
              >
                Sample Report
              </span>
            </div>

            {/* Headline + Description (Desktop) */}
            <div className="flex flex-col gap-[12px] lg:gap-[20px]">
              <h2
                data-motion-reveal="lines"
                data-motion-at="0.6"
                className="type-h2 max-w-[1005px] tracking-[-0.01em]"
              >
                <span className="text-aqua-mint block">
                  The estimate came
                  <br className="block md:hidden" /> from six answers.
                </span>
                <span className="block text-white">
                  The assessment goes
                  <br className="block md:hidden" /> considerably further.
                </span>
              </h2>
              <p
                data-motion-reveal="blur"
                data-motion-at="0.7"
                className="type-body-xs text-light-gray hidden md:block"
              >
                Below is an example of what comes back. Function by function, where the money sits
                in
                <br />
                your cycle, what it would take to release it, and what we would run first.
              </p>
            </div>
          </div>

          {/* Report Image */}
          <div className="w-full">
            {/* Desktop report image */}
            <div
              data-motion-reveal="image"
              data-motion-at="0.8"
              className="relative hidden aspect-[1320/635] w-full overflow-hidden rounded-[30px_15px_30px_30px] md:block"
            >
              <Image
                data-motion-parallax
                src="/images/ROI/sample-report/img_bg_sample_report_ui_screen.png"
                alt="Sample ROI assessment report showing denial rates, days in AR, cost to collect, and automation potential"
                fill
                className="object-cover"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 86.38%, rgba(0, 0, 0, 0.7) 100%)',
                }}
              />
            </div>
            {/* Mobile report image */}
            <div
              data-motion-reveal="image"
              data-motion-at="0.8"
              className="relative block aspect-[362/246] w-full overflow-hidden rounded-[10px_4px_10px_10px] md:hidden"
            >
              <Image
                data-motion-parallax
                src="/images/ROI/sample-report/img_bg_sample_report_ui_screen_mobile (1).png"
                alt="Sample ROI assessment report showing denial rates, days in AR, cost to collect, and automation potential"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Description (Mobile — placed below image per Figma) */}
          <p
            data-motion-reveal="blur"
            data-motion-at="0.85"
            className="text-light-gray block text-[13px] leading-[20px] tracking-[-0.01em] sm:text-[14px] sm:leading-[22px] md:hidden"
          >
            Below is an example of what comes back. Function by
            <br />
            function, where the money sits in your cycle, what it
            <br />
            would take to release it, and what we would run first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISampleReportSection;
