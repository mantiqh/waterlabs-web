import Image from 'next/image';

export const HumanInTheLoopSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180.75deg, #1C5265 -2.97%, #FFFFFF 101.15%)',
      }}
    >
      <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[40px] lg:gap-[60px]">
          {/* ── HUMAN IN THE LOOP ── */}
          <div className="flex flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[32px]">
            {/* Left: Text Content */}
            <div className="flex w-full flex-col justify-center gap-[16px] lg:max-w-[644px] lg:flex-1 lg:gap-[20px]">
              <h3 className="type-h3 text-[#111111]">
                <span className="text-[#0F68D6]">Human in the loop,</span> by design
              </h3>
              <p className="type-body-xs max-w-[644px] text-[#111111]">
                If a plan is ambiguous or coverage is unclear, or if a patient requires a detailed
                discussion about their financial responsibility, our agents escalate the case to
                your team. The eligibility response, accumulator status, and calculation are
                included.
              </p>
            </div>

            {/* Right: Image */}
            <div className="w-full lg:max-w-[644px] lg:flex-1">
              {/* Desktop Image */}
              <div className="relative hidden aspect-[644/309] w-full overflow-hidden rounded-[30px_10px_30px_30px] lg:block">
                <Image
                  src="/images/solutions/solutions-patient-estimates/human-in-the-loop/Frame%202147203302%20(3).png"
                  alt="Human in the loop reviewing patient estimates and coverage"
                  fill
                  priority
                  sizes="(max-width: 1440px) 50vw, 644px"
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile / Tablet Image */}
              <div className="relative block aspect-[362/156] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
                <Image
                  src="/images/solutions/solutions-patient-estimates/human-in-the-loop/img_human_in_the_loop%20(1).png"
                  alt="Human in the loop reviewing patient estimates and coverage"
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

export default HumanInTheLoopSection;
