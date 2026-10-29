import Image from 'next/image';

export const TheProblemSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #9DA5AD 7.11%, #043857 92.65%)',
      }}
    >
      {/*
        The Problem Section:
        - Outer: gradient #9DA5AD → #043857
        - Inner: white bg, border-radius: 0 60px 60px 0 (right-side rounding)
        - Desktop: padding 0 60px, inner padding 80px 0, gap 60px
        - Mobile: padding 40px 20px
      */}
      <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto max-w-[1320px]">
          {/* Desktop Layout: Image Left + Card Right */}
          <div className="hidden flex-row items-stretch justify-between gap-[20px] lg:flex">
            {/* Left: Large Image */}
            <div className="relative min-h-[456px] w-full min-w-0 overflow-hidden rounded-[30px_10px_30px_30px] lg:max-w-[830px] lg:flex-[1.766]">
              <Image
                src="/images/solutions/solutions-eligibility/the-problem/img_the_problem%20(1).png"
                alt="Healthcare staff manually verifying patient eligibility"
                fill
                priority
                sizes="(max-width: 1440px) 60vw, 830px"
                className="object-cover object-center"
              />
              {/* Gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                }}
              />
            </div>

            {/* Right: Content Card */}
            <div className="relative flex w-full min-w-0 flex-col justify-center overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(145,198,242,0.3)] lg:max-w-[470px] lg:flex-1">
              {/* Subtle Decorative Shape without blur */}
              <div
                className="pointer-events-none absolute rounded-[30px] border border-[rgba(244,246,249,0.2)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '812px',
                  height: '406px',
                  left: '64px',
                  top: '244px',
                }}
              />

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start gap-[14px] p-[24px] xl:p-[20px_32px]">
                {/* Tag */}
                <div className="flex items-center gap-[8px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                  <span className="type-caption tracking-[0.01em] text-[#2A2A2A]">The problem</span>
                </div>

                {/* Headline */}
                <h5 className="type-h5 tracking-[-0.01em] text-[#111111]">
                  Which patient on tomorrow&apos;s schedule has coverage that changed{' '}
                  <span className="text-[#0F68D6]">since you checked?</span>
                </h5>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                    Most practices verify once at booking and never check again. Coverage changes
                    after the appointment, and nobody finds out until the claim returns 60 days
                    later.
                  </p>
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                    Caught before the visit, an eligibility error costs a phone call. Caught as a
                    denial 60 days later, it costs many times that.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Layout: Single Card */}
          <div className="flex justify-center lg:hidden">
            <div className="relative flex w-full max-w-[362px] flex-col overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(145,198,242,0.3)]">
              {/* Subtle Decorative Shape matching Image 5 */}
              <div
                className="pointer-events-none absolute rounded-[30px] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '364px',
                  height: '182px',
                  right: '-40px',
                  bottom: '-19px',
                }}
              />

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start gap-[20px] p-[12px]">
                {/* Tag */}
                <div className="flex items-center gap-[4px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                  <span className="type-caption tracking-[0.01em] text-[#2A2A2A]">The problem</span>
                </div>

                {/* Headline (in exactly 3 lines matching Figma and screenshot) */}
                <h5 className="type-h5 tracking-[-0.01em] text-[#111111]">
                  Which patient on tomorrow&apos;s
                  <br />
                  schedule has coverage that changed
                  <br />
                  <span className="text-[#0F68D6]">since you checked?</span>
                </h5>

                {/* Image */}
                <div className="relative aspect-[338/185.7] w-full overflow-hidden rounded-[20px_10px_20px_20px]">
                  <Image
                    src="/images/solutions/solutions-eligibility/the-problem/img_the_problem%20(2).png"
                    alt="Healthcare staff manually verifying patient eligibility"
                    fill
                    sizes="(max-width: 1024px) 100vw, 338px"
                    className="object-cover object-center"
                  />
                  {/* Gradient overlay per Figma */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                    }}
                  />
                </div>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                    Most practices verify once at booking and never check again. Coverage changes
                    after the appointment, and nobody finds out until the claim returns 60 days
                    later.
                  </p>
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                    Caught before the visit, an eligibility error costs a phone call. Caught as a
                    denial 60 days later, it costs many times that.
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
