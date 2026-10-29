const STORY_PARAGRAPHS = [
  "Healthcare's revenue cycle has always scaled by adding people to it.",
  'Higher volumes have meant more staff. When experienced employees leave, their knowledge leaves too, requiring new hires to spend months relearning critical information.',
  'This challenge was widely recognized. The common solution was to outsource work to lower-cost locations, hire more staff, and accept ongoing knowledge loss.',
  'Waterlabs offers a different approach: codifying knowledge within the system instead of relying on individuals, so the system performs the work efficiently.',
];

export const OurStorySection = () => {
  return (
    <section className="w-full overflow-hidden bg-white pl-[20px] min-[1440px]:pl-[calc((100vw-1320px)/2)] md:pl-[40px] lg:pl-[60px]">
      {/* 
        Our story Section:
        - Background container aligned on the left with the 1320px content grid
        - Rounded left corners (rounded-tl / rounded-bl)
        - Extends flush to the right edge of the viewport
        - Gradient background: linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)
      */}
      <div
        className="w-full rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] min-[1440px]:px-[60px] md:px-[32px] md:py-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[40px] lg:py-[80px]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="w-full max-w-[1260px]">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Title top, Row below (Paragraphs left + Photo right)*/}
          {/* ========================================================================= */}
          <div className="hidden w-full flex-col items-start gap-[24px] min-[1440px]:gap-[40px] lg:flex">
            {/* Heading: General Sans, responsive scaling */}
            <h2 className="type-h1 w-full text-[40px] leading-[48px] tracking-[-0.01em] text-[#F4F6F9] min-[1440px]:text-[68px] min-[1440px]:leading-[76px] xl:text-[48px] xl:leading-[56px]">
              Our story
            </h2>

            {/* Row: Left paragraphs (536px) + Right photo (704px x 417px) */}
            <div className="flex w-full flex-row items-center justify-between gap-[20px]">
              {/* Left Column: 4 story paragraphs */}
              <div className="flex w-full shrink-0 flex-col justify-between gap-[16px] min-[1440px]:h-[417px] min-[1440px]:w-[536px] min-[1440px]:gap-[24px] lg:w-[48%] xl:gap-[20px]">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    className="type-body-s text-[16px] leading-[24px] text-white min-[1440px]:text-[20px] min-[1440px]:leading-[28px] xl:text-[17px] xl:leading-[25px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right Column: Photo (responsive width & aspect ratio, exact at 1440px+) */}
              <div
                className="aspect-[704/417] w-full shrink-0 rounded-[10px_40px] bg-[url('/images/about-us/our-story/img_our_Story%20(2).png')] bg-cover bg-center bg-no-repeat min-[1440px]:h-[417px] min-[1440px]:w-[704px] lg:w-[48%]"
                role="img"
                aria-label="Waterlabs vision - architectural courtyard at sunrise"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Stacked Column (Title -> Photo -> Paragraphs)       */}
          {/* ========================================================================= */}
          <div className="mx-auto flex w-full max-w-[342px] flex-col items-start gap-[20px] lg:hidden">
            {/* Heading: General Sans, 36px/48px, -0.01em, #F4F6F9 */}
            <h2 className="type-h1 text-[36px] leading-[48px] tracking-[-0.01em] text-[#F4F6F9]">
              Our story
            </h2>

            {/* Content Frame (Figma: Frame 2147203294, gap: 12px) */}
            <div className="flex w-full flex-col items-start gap-[12px]">
              {/* Middle: Photo (342px x 203px, border-radius: 20px 10px 20px 20px) */}
              <div
                className="h-[203px] w-full rounded-[20px_10px_20px_20px] bg-[url('/images/about-us/our-story/img_our_Story_mob%20(3).png')] bg-cover bg-center bg-no-repeat"
                role="img"
                aria-label="Waterlabs vision - architectural courtyard at sunrise"
              />

              {/* Bottom Content: Story Paragraphs (Figma: Frame 2147203307, gap: 24px) */}
              <div className="flex w-full flex-col items-start gap-[16px] pt-[4px]">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p key={index} className="type-body-s text-[16px] leading-[26px] text-white">
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
