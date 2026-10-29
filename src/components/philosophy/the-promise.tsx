import Image from 'next/image';

export const ThePromiseSection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#0F68D6] from-50% to-[#0F68D6] to-50% p-0">
      {/* 
        Top Frame Container (Figma Frame 1272628356 / Frame 11):
        - Desktop: 1440px x 801px, rounded-tl-[60px] rounded-bl-[60px], padding: 80px 60px
        - Mobile: 402px x 526.07px, rounded-tl-[30px] rounded-bl-[30px], padding: 40px 20px
        - Background: #F4F6F9 (Ghost White)
      */}
      <div className="relative w-full overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Abstract Background Graphic Pattern */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <Image
            src="/images/philosophy/the-promise/img_the_promise_bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover object-center"
          />
        </div>

        {/* Content Container (Max width 1320px) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:gap-[20px]">
          {/* Left Column: Heading (Frame 2147226497: 536px) */}
          <div className="w-full shrink-0 lg:w-[536px]">
            <h2 className="type-h2 text-[#111111]">The Promise</h2>
          </div>

          {/* Right Column: Statement, Image & Outcome Headline (Frame 2147226496) */}
          <div className="flex w-full flex-col items-start gap-[20px] lg:w-[700px] lg:gap-[24px]">
            {/* Lead Statement */}
            <p className="type-body-l w-full max-w-[700px] text-[#042849]">
              Your revenue cycle no longer controls your operations. The most complex and costly
              function becomes worry-free, as we take full accountability for its performance.
            </p>

            {/* Visual Image Card (Frame 2147203302: 700px x 325px desktop, 362px x 168px mobile) */}
            <div className="relative w-full max-w-[700px] overflow-hidden rounded-[20px_10px_20px_20px] border-b border-[#91C6F2] lg:rounded-[40px_10px_40px_10px]">
              <Image
                src="/images/philosophy/what-we-believe/img_the_promise%20(1).png"
                alt="The Promise Visual"
                width={1400}
                height={650}
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="block h-auto w-full"
              />
              {/* Overlay Gradient: rgba(99, 204, 183, 0) 52.42% to rgba(15, 104, 214, 0.66) 109.85% */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[52.42%] to-[#0F68D6]/[0.66] to-[109.85%]" />
            </div>

            {/* Outcome Headline */}
            <p className="type-h4 w-full max-w-[700px] text-[#0F68D6]">
              We own the outcome.
              <br />
              You get your attention back.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThePromiseSection;
