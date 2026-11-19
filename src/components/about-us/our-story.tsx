import Image from 'next/image';

const STORY_PARAGRAPHS = [
  "Healthcare's revenue cycle has always scaled by adding people to it.",
  'Higher volumes have meant more staff. When experienced employees leave, their knowledge leaves too, requiring new hires to spend months relearning critical information.',
  'This challenge was widely recognized. The common solution was to outsource work to lower-cost locations, hire more staff, and accept ongoing knowledge loss.',
  'Waterlabs offers a different approach: codifying knowledge within the system instead of relying on individuals, so the system performs the work efficiently.',
];

export const OurStorySection = () => {
  return (
    <section
      data-motion-section
      className="w-full overflow-hidden bg-gradient-to-b from-white from-50% to-[#F4F6F9] to-50% pl-[20px] min-[1440px]:pl-[calc((100vw-1320px)/2)] md:pl-[40px] lg:pl-[60px]"
    >
      {/* 
        Our story Section:
        - Background container aligned on the left with the 1320px content grid
        - Rounded left corners (rounded-tl / rounded-bl)
        - Extends flush to the right edge of the viewport
        - Gradient background: linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)
      */}
      <div
        data-motion-reveal="panel-rtl"
        data-motion-trigger="section"
        data-motion-start="top 75%"
        className="w-full rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] min-[1440px]:px-[60px] md:px-[32px] md:py-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[40px] lg:py-[80px]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="w-full max-w-[1260px]">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Title top, Row below (Paragraphs left + Photo right)*/}
          {/* ========================================================================= */}
          <div
            data-motion-group
            data-motion-together
            data-motion-trigger="section"
            data-motion-start="top 75%"
            className="hidden w-full flex-col items-start gap-[24px] min-[1440px]:gap-[40px] lg:flex"
          >
            {/* Heading: General Sans, responsive scaling */}
            <h2
              data-motion-reveal="lines"
              data-motion-at="0.55"
              className="type-h1 w-full tracking-[-0.01em] text-[#F4F6F9]"
            >
              Our story
            </h2>

            {/* Row: Left paragraphs (536px) + Right photo (704px x 417px) */}
            <div className="flex w-full flex-row items-center justify-between gap-[20px]">
              {/* Left Column: 4 story paragraphs */}
              <div className="flex w-full shrink-0 flex-col justify-between gap-[16px] min-[1440px]:h-[417px] min-[1440px]:w-[536px] min-[1440px]:gap-[24px] lg:w-[48%] xl:gap-[20px]">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    data-motion-reveal="blur"
                    data-motion-at={0.65 + index * 0.08}
                    className="type-body-s text-white"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right Column: Photo (responsive width & aspect ratio, exact at 1440px+) */}
              <div
                data-motion-reveal="image"
                data-motion-at="0.75"
                className="relative aspect-[704/417] w-full shrink-0 overflow-hidden rounded-[10px_40px] min-[1440px]:h-[417px] min-[1440px]:w-[704px] lg:w-[48%]"
              >
                <Image
                  data-motion-parallax
                  src="/images/about-us/our-story/img_our_Story%20(2).png"
                  alt="Waterlabs vision - architectural courtyard at sunrise"
                  fill
                  sizes="(max-width: 1024px) 100vw, 704px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Stacked Column (Title -> Photo -> Paragraphs)       */}
          {/* ========================================================================= */}
          <div
            data-motion-group
            data-motion-together
            data-motion-trigger="section"
            data-motion-start="top 75%"
            className="mx-auto flex w-full max-w-[342px] flex-col items-start gap-[20px] md:max-w-none lg:hidden"
          >
            {/* Heading: General Sans */}
            <h2
              data-motion-reveal="lines"
              data-motion-at="0.55"
              className="type-h1 tracking-[-0.01em] text-[#F4F6F9]"
            >
              Our story
            </h2>

            {/* Content Frame (Figma: Frame 2147203294, gap: 12px) */}
            <div className="flex w-full flex-col items-start gap-[12px]">
              {/* Middle: Photo (342px x 203px, border-radius: 20px 10px 20px 20px) */}
              <div
                data-motion-reveal="image"
                data-motion-at="0.65"
                className="relative aspect-[342/203] w-full overflow-hidden rounded-[20px_10px_20px_20px]"
              >
                <Image
                  data-motion-parallax
                  src="/images/about-us/our-story/img_our_Story_mob%20(3).png"
                  alt="Waterlabs vision - architectural courtyard at sunrise"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Bottom Content: Story Paragraphs (Figma: Frame 2147203307, gap: 24px) */}
              <div className="flex w-full flex-col items-start gap-[16px] pt-[4px]">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    data-motion-reveal="fade"
                    data-motion-at={0.75 + index * 0.08}
                    className="type-body-s text-white"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
