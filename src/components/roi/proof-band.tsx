export const ROIProofBand = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        Proof Band (Figma Specifications):
        - Outer wrapper: gradient from teal to white so the top-right corner radius syncs with the hero section
        - Desktop: #F4F6F9 bg, rounded-tr-[60px] rounded-br-[60px], padding: 60px, gap: 32px
        - Mobile: rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px, gap: 40px
        - 3 stat columns with gradient numbers + description text
      */}
      <div
        className="w-full"
        style={{
          background: 'linear-gradient(180deg, #4AAEC0 0%, #FFFFFF 100%)',
        }}
      >
        <div className="bg-ghost-white w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[48px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[60px]">
          <div className="mx-auto w-full max-w-[1320px]">
            {/* Stats Grid */}
            <div className="flex flex-col items-start gap-[40px] lg:flex-row lg:gap-[40px]">
              {/* Stat 1 */}
              <div className="flex flex-1 flex-col gap-[8px] lg:gap-[14px]">
                <h2
                  className="type-h2 w-fit tracking-[-0.01em]"
                  style={{
                    background: 'linear-gradient(90deg, #0F68D6 76.92%, #63CCB7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  93%
                </h2>
                <p className="type-body-xxs text-charcoal">
                  Less intake headcount,
                  <br className="sm:hidden" /> physical therapy network
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-1 flex-col gap-[8px] lg:gap-[14px]">
                <h2
                  className="type-h2 w-fit tracking-[-0.01em]"
                  style={{
                    background: 'linear-gradient(90deg, #0F68D6 76.92%, #63CCB7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  $72M
                </h2>
                <p className="type-body-xxs text-charcoal">
                  Released 3 to 5 days sooner,
                  <br className="sm:hidden" /> rural health system
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-1 flex-col gap-[8px] lg:gap-[14px]">
                <h2
                  className="type-h2 w-fit tracking-[-0.01em]"
                  style={{
                    background: 'linear-gradient(90deg, #0F68D6 76.92%, #63CCB7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  90%
                </h2>
                <p className="type-body-xxs text-charcoal">
                  Of ED encounters coded
                  <br className="sm:hidden" /> without a coder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIProofBand;
