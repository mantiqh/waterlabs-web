import Image from 'next/image';

export const OurStatsSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180.75deg, #1C5265 -2.97%, #FFFFFF 101.15%)',
      }}
    >
      {/*
        Our Stats + Human in the Loop Section:
        - Outer: gradient #1C5265 → #FFFFFF
        - Inner: white bg, border-radius: 0 60px 60px 0 (right-side rounding)
        - Desktop: padding 80px 60px, gap 60px
        - Mobile: padding 40px 20px, gap 32px
      */}
      <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[40px] lg:gap-[60px]">
          {/* ── OUR STATS ── */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            {/* Section Heading */}
            <h3 className="type-h3 text-electric-blue">Our Stats</h3>

            {/* Stats Card */}
            <div className="bg-ghost-white flex w-full flex-col gap-[24px] rounded-[20px] p-[20px] md:p-[32px] lg:flex-row lg:gap-[40px] lg:p-[40px]">
              {/* Stat 1 */}
              <div className="flex flex-1 flex-col gap-[8px] lg:gap-[12px]">
                <h3 className="type-h3 text-black">4 days to 1 day</h3>
                <p className="type-body-xs text-charcoal">verification turnaround</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-1 flex-col gap-[8px] lg:gap-[12px]">
                <h3 className="type-h3 text-black">75%</h3>
                <p className="type-body-xxs text-charcoal">
                  faster in a behavioral health deployment.
                </p>
              </div>
            </div>
          </div>

          {/* ── HUMAN IN THE LOOP ── */}
          <div className="flex flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[32px]">
            {/* Left: Text Content */}
            <div className="flex w-full flex-col justify-center gap-[16px] lg:max-w-[644px] lg:flex-1 lg:gap-[20px]">
              <h3 className="type-h3 text-[#111111]">
                <span className="text-[#0F68D6]">Human in the loop,</span> by design
              </h3>
              <p className="type-body-xs max-w-[644px] text-[#111111]">
                When coverage is ambiguous, our agents route it to your team instead of guessing.
                Coordination of benefits issues, unclear plans, or patients needing a conversation
                about what they owe are handled. The payer response and verification history arrive
                attached.
              </p>
            </div>

            {/* Right: Image */}
            <div className="w-full lg:max-w-[644px] lg:flex-1">
              {/* Desktop Image (644x309 aspect ratio, entire image visible) */}
              <div className="relative hidden aspect-[644/309] w-full overflow-hidden rounded-[30px_10px_30px_30px] lg:block">
                <Image
                  src="/images/solutions/solutions-eligibility/human-in-the-loop/Frame%202147203302%20(3).png"
                  alt="Human reviewing ambiguous coverage verification results"
                  fill
                  priority
                  sizes="(max-width: 1440px) 50vw, 644px"
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile / Tablet Image (362x156 aspect ratio, entire image visible) */}
              <div className="relative block aspect-[362/156] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
                <Image
                  src="/images/solutions/solutions-eligibility/human-in-the-loop/img_human_in_the_loop%20(1).png"
                  alt="Human reviewing ambiguous coverage verification results"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 644px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStatsSection;
