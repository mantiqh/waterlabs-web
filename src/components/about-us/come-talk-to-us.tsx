import Link from 'next/link';

import { ChevronRight } from '@/components/CTA';

export const ComeTalkToUsSection = () => {
  return (
    <section className="w-full overflow-hidden bg-white pr-[20px] min-[1440px]:pr-[calc((100vw-1320px)/2)] md:pr-[40px] lg:pr-[60px]">
      {/* 
        Come talk to us Section:
        - Background container flush with the left viewport edge
        - Rounded right corners (rounded-tr / rounded-br) aligned with the 1320px content grid
        - White margin on the right (matching grid margin of The Team and other sections)
        - Gradient background: linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)
      */}
      <div
        className="w-full rounded-tr-[30px] rounded-br-[30px] py-[40px] pr-[20px] pl-[20px] min-[1440px]:pr-[60px] min-[1440px]:pl-[calc((100vw-1320px)/2)] md:py-[60px] md:pr-[32px] md:pl-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-[80px] lg:pr-[40px] lg:pl-[60px]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="ml-auto w-full max-w-[1260px]">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Side-by-side Row (Text Column + Photo Column)       */}
          {/* ========================================================================= */}
          <div className="hidden w-full flex-row items-center justify-between gap-[20px] lg:flex">
            {/* Left Column: Heading, Description, CTA Button */}
            <div className="flex w-full shrink-0 flex-col items-start justify-center gap-[24px] min-[1440px]:w-[536px] min-[1440px]:gap-[40px] lg:w-[48%] xl:gap-[28px]">
              {/* Heading: General Sans, responsive scaling */}
              <h2 className="type-h1 text-[40px] leading-[48px] tracking-[-0.01em] text-[#F4F6F9] min-[1440px]:text-[68px] min-[1440px]:leading-[76px] xl:text-[48px] xl:leading-[56px]">
                Come talk to us.
              </h2>

              {/* Sub-stack: Paragraph + CTA */}
              <div className="flex w-full flex-col items-start gap-[20px] xl:gap-[24px]">
                {/* Paragraph: Inter, responsive sizing */}
                <p className="type-body-s max-w-[536px] text-[16px] leading-[24px] text-white min-[1440px]:text-[20px] min-[1440px]:leading-[28px] xl:text-[17px] xl:leading-[25px]">
                  Whether it is one function that needs fixing or a revenue cycle that needs
                  rethinking, the fastest way to find out what we can do is to look at your numbers.
                </p>

                {/* CTA Button: 44px height, px-20, py-10, Inter 16px/24px 500, #042849, blue chevron */}
                <Link
                  href="/contact-us"
                  className="group inline-flex h-[44px] items-center justify-center gap-[10px] rounded-[64px] bg-white px-[20px] py-[10px] transition-all duration-200 hover:bg-white/90"
                >
                  <span className="type-cta text-[16px] leading-[24px] font-medium text-[#042849]">
                    Get in touch
                  </span>
                  <ChevronRight className="h-[18.6px] w-[12.4px] text-[#0F68D6] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Photo (responsive width & aspect ratio, exact at 1440px+) */}
            <div
              className="aspect-[704/417] w-full shrink-0 rounded-[40px_10px] bg-[url('/images/about-us/come-talk-to-us/come_talk_to_us_img%20(2).png')] bg-cover bg-center bg-no-repeat min-[1440px]:h-[417px] min-[1440px]:w-[704px] lg:w-[48%]"
              role="img"
              aria-label="Waterlabs team in conversation with healthcare client"
            />
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Stacked Column (Title -> Photo -> Text -> CTA)      */}
          {/* ========================================================================= */}
          <div className="mx-auto flex w-full max-w-[342px] flex-col items-start gap-[20px] lg:hidden">
            {/* Heading: General Sans, 36px/48px, -0.01em, #F4F6F9 */}
            <h2 className="type-h1 text-[36px] leading-[48px] tracking-[-0.01em] text-[#F4F6F9]">
              Come talk to us.
            </h2>

            {/* Content Frame (Figma: Frame 2147203294, gap: 12px) */}
            <div className="flex w-full flex-col items-start gap-[12px]">
              {/* Middle: Photo (342px x 203px, border-radius: 20px 10px 20px 20px) */}
              <div
                className="h-[203px] w-full rounded-[20px_10px_20px_20px] bg-[url('/images/about-us/come-talk-to-us/come_talk_to_us_img_mob%20(3).png')] bg-cover bg-center bg-no-repeat"
                role="img"
                aria-label="Waterlabs team in conversation with healthcare client"
              />

              {/* Bottom Content: Paragraph + CTA (Figma: Frame 2147203307, gap: 24px) */}
              <div className="flex w-full flex-col items-start gap-[24px]">
                {/* Paragraph: Inter, 16px/26px, #FFFFFF */}
                <p className="type-body-s text-[16px] leading-[26px] text-white">
                  Whether it is one function that needs fixing or a revenue cycle that needs
                  rethinking, the fastest way to find out what we can do is to look at your numbers.
                </p>

                {/* CTA Button: 38px height, px-12, py-10, Inter 14px/24px 500, #000000, dark chevron */}
                <Link
                  href="/contact-us"
                  className="group inline-flex h-[38px] items-center justify-center gap-[10px] rounded-[64px] bg-white px-[12px] py-[10px] transition-all duration-200 hover:bg-white/90"
                >
                  <span className="font-['Inter'] text-[14px] leading-[24px] font-medium text-black">
                    Get in touch
                  </span>
                  <ChevronRight className="h-[14.6px] w-[9.7px] text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComeTalkToUsSection;
