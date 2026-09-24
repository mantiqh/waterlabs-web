import ROICalculator from './roi-calculator';

export const ROICalculatorSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
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
        <div className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[60px] rounded-bl-[30px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
          <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[40px]">

            {/* Header Block: Tag + Heading/Description */}
            <div className="flex flex-col gap-[8px] lg:gap-[14px]">
              {/* Tag */}
              <div className="flex items-center gap-[4px] lg:gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-electric-blue shrink-0" />
                <span className="type-body-xxs text-medium-gray">
                  Opportunity Calculator
                </span>
              </div>

              {/* Heading + Description Row */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-[12px] lg:gap-[20px]">
                <h2 className="type-h2 lg:max-w-[650px] flex-1">
                  <span className="text-electric-blue block">See what your cycle is</span>
                  <span className="text-gray-black block">leaving on the table.</span>
                </h2>
                <div className="lg:max-w-[650px] flex-1">
                  <p className="type-body-xs text-charcoal">
                    Six questions about how your revenue cycle runs today. We will show you the annual saving available, and the revenue sitting in the gap between your denial rate and the benchmark for your specialty.
                  </p>
                </div>
              </div>
            </div>

            {/* Functional Opportunity Calculator */}
            <ROICalculator />

          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
