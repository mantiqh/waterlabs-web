import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const ROIAssessmentSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        Assessment Section (Figma Specifications):
        - Outer wrapper: gradient #010101 → #010F1C (left padding on desktop for the reveal)
        - Desktop: White bg, rounded-tl-[60px] rounded-bl-[60px], padding: 80px 60px, gap: 80px
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], padding: 40px 20px, gap: 40px
        - Two-column layout: left info card + right image
      */}
      <div
        className="w-full lg:pl-[60px]"
        style={{
          background: 'linear-gradient(180deg, #010101 0%, #010F1C 100%)',
        }}
      >
        <div className="w-full bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
          <div className="w-full max-w-[1320px] lg:max-w-[1260px] mx-auto flex flex-col gap-[40px]">

            {/* Header: Tag + Heading */}
            <div className="flex flex-col gap-[8px] lg:gap-[14px]">
              {/* Tag */}
              <div className="flex items-center gap-[4px] lg:gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-electric-blue shrink-0" />
                <span className="type-body-xxs text-medium-gray tracking-[0.01em]">
                  The Assessment
                </span>
              </div>

              {/* Heading */}
              <h2 className="type-h2 tracking-[-0.01em]">
                <span className="text-electric-blue block">The next step is an assessment.</span>
                <span className="text-gray-black block">No cost, and no obligation to go further.</span>
              </h2>
            </div>

            {/* Desktop Two-column / Mobile Stacked Layout */}
            <div className="flex flex-col lg:flex-row items-stretch gap-[20px]">
              {/* Info Card (On mobile: wraps image + features + button; on desktop: 476px wide, 492px high) */}
              <div
                className="w-full lg:w-[476px] lg:h-[492px] shrink-0 rounded-[20px_10px_20px_20px] overflow-hidden flex flex-col justify-between"
                style={{
                  background: 'rgba(145, 198, 242, 0.15)',
                }}
              >
                {/* On mobile, image goes at the top of the card */}
                <div className="block lg:hidden relative w-full aspect-[362/233] rounded-[20px_10px_20px_20px] overflow-hidden">
                  <Image
                    src="/images/ROI/the-assessment/img_the_assessment_mobile (1).png"
                    alt="Waterlabs assessment interface"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content area: features + CTA */}
                <div className="p-[16px] lg:p-[32px] flex flex-col justify-between flex-1 gap-[24px] lg:gap-0">
                  {/* Feature Items */}
                  <div className="flex flex-col gap-[20px] lg:gap-[24px]">
                    {/* Feature 1 */}
                    <div className="flex flex-col gap-[4px] lg:gap-[8px]">
                      <span className="type-body-s text-electric-blue">
                        Read-only access
                      </span>
                      <p className="type-body-xs text-charcoal">
                        We take read-only access to your claim and remit data. Nothing changes in your systems.
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col gap-[4px] lg:gap-[8px]">
                      <span className="type-body-s text-electric-blue">
                        The mapping
                      </span>
                      <p className="type-body-xs text-charcoal">
                        We map your cycle function by function against what we run today.
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col gap-[4px] lg:gap-[8px]">
                      <span className="type-body-s text-electric-blue">
                        The walkthrough
                      </span>
                      <p className="type-body-xs text-charcoal">
                        We take you through what we found, and what we would start with.
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-[8px] lg:pt-0">
                    <Link href="/contact-us" className="inline-block">
                      <CTA variant="light-bg" as="div">
                        Book my assessment
                      </CTA>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Assessment Image (Desktop only: 492px high, matching left card) */}
              <div className="hidden lg:block flex-1 h-[492px] relative rounded-[20px_10px_20px_20px] overflow-hidden">
                <Image
                  src="/images/ROI/the-assessment/img_the_assessment.png"
                  alt="Waterlabs assessment interface"
                  fill
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

export default ROIAssessmentSection;
