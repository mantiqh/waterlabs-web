import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const DoWorkThatMattersSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111]">
      {/* 
        Culture Page Last Section Wrapper:
        - Background #111111 to match Footer
        - Inner container #F4F6F9 with rounded-br-[30px] lg:rounded-br-[60px]
      */}
      <div className="w-full overflow-hidden rounded-br-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[90px]">
        {/* 
          Do Work That Matters Section (Figma node: 5419-5394 / 5419-5397):
          - Container: 1320px x 462px, padding: 0 40px 0 0, gap: 60px, rounded-[20px], bg: #FFFFFF
          - Left Image (AdobeStock_588310218 2): 650px x 462px, border-radius: 8px 8px 32px 8px
          - Right Content (Frame 2147203147): 570px x 462px, padding: 50px 0px, gap: 24px
            - Frame 2147203133: gap 8px (Tag + Headline + Description)
            - Frame 7: CTA Button
        */}
        <div className="relative z-10 mx-auto flex min-h-[462px] w-full max-w-[1320px] flex-col items-stretch justify-start gap-[24px] overflow-hidden rounded-t-[8px] rounded-b-[20px] bg-white p-0 shadow-sm lg:flex-row lg:items-center lg:gap-[32px] lg:rounded-[20px] lg:pr-[40px] xl:gap-[44px]">
          {/* Left Column: Speaker Image (Mobile: 8px 8px 32px 8px, Desktop: 650px x 462px with 8px top-right and 32px bottom-right) */}
          <div className="relative min-h-[250px] w-full shrink-0 self-stretch overflow-hidden rounded-tl-[8px] rounded-tr-[8px] rounded-br-[32px] rounded-bl-[8px] sm:min-h-[380px] lg:min-h-[462px] lg:w-[480px] lg:rounded-t-none lg:rounded-l-[20px] lg:rounded-tr-[8px] lg:rounded-br-[32px] xl:w-[650px]">
            <Image
              src="/images/culture/do-work-that-matters/do_work_that_matters.png"
              alt="Do work that matters, with people who'll back you"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 480px, 650px"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Content Block (570px x 462px in Figma, padding: 50px 0px, gap: 24px) */}
          <div className="flex w-full flex-col items-start justify-center gap-[20px] bg-white p-[24px] sm:p-[36px] lg:flex-1 lg:gap-[24px] lg:px-0 lg:py-[50px] xl:w-[570px] xl:max-w-[570px]">
            {/* Header & Body Block (Frame 2147203133: gap 8px) */}
            <div className="flex w-full max-w-[570px] flex-col items-start gap-[8px]">
              {/* Tag / Eyebrow (Text - Tag) */}
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
                  Build what&apos;s next
                </span>
              </div>

              {/* Headline: type-h2, semantic <h2> */}
              <h2 className="type-h2 max-w-[570px] text-[#042849]">
                Do work that matters, with people who&apos;ll back you.
              </h2>

              {/* Body Description: type-body-xs (Exact line breaks matching Figma Image 1) */}
              <p className="type-body-xs max-w-[540px] pt-[2px] text-[#111111]">
                We want curious people who take ownership and want to solve real problems. Whether
                you are early in your career or leading a team, there is room here to build
                something real.
              </p>
            </div>

            {/* CTA Button: Frame 7 (gap 24px from Frame 2147203133) */}
            <div>
              <Link href="/careers#where-you-would-fit">
                <CTA variant="light-bg">See Open Roles</CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoWorkThatMattersSection;
