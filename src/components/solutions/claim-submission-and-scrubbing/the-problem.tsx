import Image from 'next/image';

export const TheProblemSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #9DA5AD 7.11%, #043857 92.65%)',
      }}
    >
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-[1320px] mx-auto">

          {/* Desktop Layout: Image Left + Card Right */}
          <div className="hidden lg:flex flex-row items-stretch justify-between gap-[20px]">
            {/* Left: Large Image */}
            <div className="relative w-full lg:flex-[1.766] lg:max-w-[830px] min-w-0 min-h-[456px] rounded-[30px_10px_30px_30px] overflow-hidden">
              <Image
                src="/images/solutions/solutions-claim-submission/the-problem/img_the_problem%20(8).png"
                alt="Healthcare staff reviewing claim rejections and scrubbing logs"
                fill
                priority
                sizes="(max-width: 1440px) 60vw, 830px"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                }}
              />
            </div>

            {/* Right: Content Card */}
            <div className="relative w-full lg:flex-1 lg:max-w-[470px] min-w-0 flex flex-col justify-center bg-[rgba(145,198,242,0.3)] rounded-[20px_10px_20px_20px] overflow-hidden">
              <div
                className="absolute pointer-events-none rounded-[30px] border border-[rgba(244,246,249,0.2)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '812px',
                  height: '406px',
                  left: '64px',
                  top: '244px',
                }}
              />

              <div className="relative z-10 flex flex-col items-start p-[24px] xl:p-[20px_32px] gap-[14px]">
                {/* Tag */}
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-caption text-[#2A2A2A] tracking-[0.01em]">
                    The problem
                  </span>
                </div>

                {/* Headline */}
                <h5 className="type-h5 text-[#111111] tracking-[-0.01em]">
                  How many claims went out last month{' '}
                  <span className="text-[#0F68D6]">and came straight back?</span>
                </h5>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Most practices track denials but do not distinguish rejections. Rejected claims never reach adjudication, so they are excluded from denial rates and the associated rework is not tracked.
                  </p>
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Rework is a hidden cost, reflected in increased staffing rather than as a direct expense.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Layout: Single Card */}
          <div className="flex lg:hidden justify-center">
            <div className="relative w-full max-w-[362px] flex flex-col bg-[rgba(145,198,242,0.3)] rounded-[20px_10px_20px_20px] overflow-hidden">
              <div
                className="absolute pointer-events-none rounded-[30px] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '364px',
                  height: '182px',
                  right: '-40px',
                  bottom: '-19px',
                }}
              />

              <div className="relative z-10 flex flex-col items-start p-[12px] gap-[20px]">
                {/* Tag */}
                <div className="flex items-center gap-[4px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-caption text-[#2A2A2A] tracking-[0.01em]">
                    The problem
                  </span>
                </div>

                {/* Headline */}
                <h5 className="type-h5 text-[#111111] tracking-[-0.01em]">
                  How many claims went out last month
                  <br />
                  <span className="text-[#0F68D6]">and came straight back?</span>
                </h5>

                {/* Image */}
                <div className="relative w-full aspect-[338/185.7] rounded-[20px_10px_20px_20px] overflow-hidden">
                  <Image
                    src="/images/solutions/solutions-claim-submission/the-problem/img_the_problem%20(8).png"
                    alt="Healthcare staff reviewing claim rejections and scrubbing logs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 338px"
                    className="object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                    }}
                  />
                </div>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Most practices track denials but do not distinguish rejections. Rejected claims never reach adjudication, so they are excluded from denial rates and the associated rework is not tracked.
                  </p>
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Rework is a hidden cost, reflected in increased staffing rather than as a direct expense.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheProblemSection;
