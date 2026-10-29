import Image from 'next/image';
import Link from 'next/link';

export const WhoThrivesHereSection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#F4F6F9] from-50% to-[#F4F6F9] to-50% p-0 lg:to-white">
      {/* 
        Colored Gradient Card attached to the left screen edge:
        - Left side: spans from 0px (left screen edge)
        - Right side: Inset by 20px on mobile with rounded-tr-[30px] rounded-br-[30px], 60px on desktop with rounded-tr-[60px] rounded-br-[60px]
        - Proportional vertical padding (py-[40px] lg:py-[48px] xl:py-[64px]) with zero artificial empty space at the bottom
      */}
      <div
        className="mr-auto flex w-[calc(100%-20px)] flex-col justify-between gap-[32px] overflow-hidden rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:w-[calc(100%-40px)] md:px-[40px] lg:w-[min(calc(100vw-60px),calc(50vw+660px))] lg:gap-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-[64px] lg:pr-[60px] lg:pl-[max(60px,calc((100vw-1320px)/2))]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="flex w-full max-w-[1260px] flex-col gap-[28px] lg:gap-[36px] xl:gap-[40px]">
          {/* Header Block: Tag + Title */}
          <div className="flex w-full flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#63CCB7] lg:h-[8px] lg:w-[8px]" />
              <span className="body-xxs text-[#D7DCE2]">The Fit</span>
            </div>

            {/* Title */}
            <h2 className="type-h1 tracking-[-0.01em] text-[#F4F6F9]">Who thrives here</h2>
          </div>

          {/* Content Body: Two Responsive Columns */}
          <div className="flex w-full flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-stretch lg:gap-[32px] xl:gap-[40px]">
            {/* Left Column: Mission Description & Email Contact (Stretches to image height so bottom text aligns with image bottom) */}
            <div className="flex w-full min-w-0 flex-col justify-between gap-[24px] lg:w-1/2 lg:gap-0 xl:w-[536px]">
              <p className="type-h5 tracking-[-0.01em] text-white">
                We are not for everyone, and that&apos;s deliberate. People who do their best work
                here are ambitious, driven, self-starters, and not afraid of ambiguity.
              </p>

              {/* Get in touch CTA */}
              <div className="flex flex-col gap-[8px] lg:gap-[12px]">
                <p className="type-body-s text-white">
                  If this sounds like you, apply below.
                  <br />
                  Or get in touch:
                </p>
                <Link
                  href="mailto:hiring@waterlabs.ai"
                  className="type-body-s w-fit !font-medium whitespace-nowrap text-white no-underline transition-opacity hover:opacity-90"
                >
                  hiring@waterlabs.ai
                </Link>
              </div>
            </div>

            {/* Right Column: Team Culture Image */}
            <div className="w-full min-w-0 lg:w-1/2 xl:w-[704px]">
              <div className="relative aspect-[342/203] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] lg:aspect-[704/417] lg:rounded-tl-[40px] lg:rounded-tr-[10px] lg:rounded-br-[40px] lg:rounded-bl-[10px]">
                <Image
                  src="/images/careers/who-thrives-here/img_who_thrives_here.png"
                  alt="Who Thrives Here Team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 704px"
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

export default WhoThrivesHereSection;
