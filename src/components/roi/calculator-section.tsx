import ROICalculator from './roi-calculator';

export const ROICalculatorSection = () => {
  return (
    <section data-motion-section className="relative w-full overflow-hidden">
      {/*
        Calculator Section (Figma Specifications):
        - Outer: gradient from #F4F6F9 to #010101
        - Inner: White bg, rounded-tl-[60px] rounded-bl-[60px] (desktop), padding: 80px 60px, gap: 80px
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], padding: 40px 20px, gap: 48px
        - Contains: tag, heading + description, calculator placeholder
      */}
      <div
        style={{
          background: 'linear-gradient(180deg, #F4F6F9 0%, #010101 100%)',
        }}
      >
        <div className="w-full rounded-tl-[30px] rounded-bl-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[40px]">
            {/* Header Block: Tag + Heading/Description */}
            <div
              data-motion-group
              data-motion-trigger="section"
              data-motion-start="top 75%"
              className="flex flex-col gap-[8px] lg:gap-[14px]"
            >
              {/* Tag */}
              <div className="flex items-center gap-[4px] lg:gap-[8px]">
                <div className="bg-electric-blue h-[8px] w-[8px] shrink-0 rounded-full" />
                <span
                  data-motion-reveal="scramble"
                  data-motion-at="0.1"
                  className="type-body-xxs text-medium-gray"
                >
                  Opportunity Calculator
                </span>
              </div>

              {/* Heading + Description Row */}
              <div className="flex flex-col items-start justify-between gap-[12px] lg:flex-row lg:gap-[20px]">
                <h2
                  data-motion-reveal="lines"
                  data-motion-at="0.2"
                  className="type-h2 flex-1 lg:max-w-[650px]"
                >
                  <span className="text-electric-blue block">See what your cycle is</span>
                  <span className="text-gray-black block">leaving on the table.</span>
                </h2>
                <div className="flex-1 lg:max-w-[650px]">
                  <p
                    data-motion-reveal="blur"
                    data-motion-at="0.3"
                    className="type-body-xs text-charcoal"
                  >
                    Six questions about how your revenue cycle runs today. We will show you the
                    annual saving available, and the revenue sitting in the gap between your denial
                    rate and the benchmark for your specialty.
                  </p>
                </div>
              </div>
            </div>

            {/* Functional Opportunity Calculator */}
            <div data-motion-reveal="fade" data-motion-at="0.4">
              <ROICalculator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
