import Navbar from '@/components/common/navbar';

export const HeroSection = () => {
  return (
    <section className="w-full overflow-hidden bg-white">
      {/* 
        Hero Banner Section (Desktop: 6211-17465 / Mobile: 6211-17810):
        - Desktop: 1440px width, 726px height, padding: 40px 60px 80px, border-radius: 0 0 0 60px
        - Mobile: 402px width, 581px height, padding: 20px 20px 40px, border-radius: 0 0 0 30px
        - Background: CSS background image with linear-gradient and vector artwork
        - Layout: Flex column justify-between, Navbar at top, Frame 2147203192 at bottom
      */}
      <div className="flex min-h-[581px] w-full flex-col items-start justify-between gap-[40px] rounded-bl-[30px] bg-[#042849] bg-[url('/images/about-us/hero-section/img_banner_mob.png')] bg-cover bg-center bg-no-repeat px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[32px] md:pb-[60px] lg:min-h-[726px] lg:gap-[10px] lg:rounded-bl-[60px] lg:bg-[url('/images/about-us/hero-section/img_banner.png')] lg:px-[60px] lg:pt-[40px] lg:pb-[80px] xl:h-[726px]">
        {/* Navbar */}
        <Navbar />

        {/* Hero Content Area (Figma: Frame 2147203192) */}
        <div className="mx-auto flex w-full max-w-[1320px] flex-col justify-between gap-[12px] lg:flex-row lg:items-end lg:gap-[20px]">
          {/* Heading */}
          <div className="w-full shrink-0 lg:w-[522px]">
            <h2 className="type-h1 tracking-[-0.01em] text-white">
              We are building
              <br />
              the revenue cycle
              <br />
              that runs itself.
            </h2>
          </div>

          {/* Description */}
          <div className="w-full flex-1 lg:max-w-[778px]">
            <p className="type-body-s text-[#F4F6F9]">
              The US healthcare system loses billions every year to a revenue cycle run by hand.
              Waterlabs builds the agentic AI that runs it instead. Our agents work every stage, in
              every specialty, at health system scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
