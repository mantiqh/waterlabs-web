import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export const DenialManagementHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        className="relative flex min-h-[683px] w-full flex-col justify-between gap-[20px] overflow-hidden rounded-bl-[60px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[28px] md:pb-[60px] lg:h-[653px] lg:gap-[32px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
        }}
      >
        {/* Background Banner Graphic */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[60px]">
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/solutions/solutions-denialmanagement/hero-section/img_banner_bg%20(7).png"
              alt="Solutions Gradient Background"
              fill
              priority
              className="object-cover object-right-bottom md:object-bottom"
            />
          </div>
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/images/solutions/solutions-denialmanagement/hero-section/img_banner_bg%20(7).png"
              alt="Solutions Gradient Background Mobile"
              fill
              priority
              className="object-cover object-right-bottom md:object-bottom"
            />
          </div>
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Desktop: Two-Column Hero Content */}
        <div className="relative z-10 mx-auto hidden w-full max-w-[1320px] flex-row items-center justify-between gap-[20px] lg:flex">
          {/* Left Column: Text Content */}
          <div className="flex w-full flex-col justify-center gap-[20px] pt-[32px] lg:max-w-[650px] lg:flex-1 lg:pt-0">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                Agentic RCM Solutions &middot; Denial Management
              </span>
            </div>

            {/* Headline */}
            <h2 className="type-h1 tracking-[-0.01em] text-white">
              Denials worked the day they land.
            </h2>

            {/* Description */}
            <p className="type-body-s max-w-[650px] text-[#F4F6F9]">
              Our agents read the denial, identify the cause, build the appeal, and file it even
              when the deadline is still weeks away.
            </p>

            {/* CTA Button */}
            <div>
              <Link href="/contact-us">
                <CTA variant="dark-bg" as="div">
                  Get a Demo
                </CTA>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative z-[2] aspect-[650/441] w-full overflow-hidden rounded-[20px] lg:max-w-[650px] lg:flex-1">
            <Image
              src="/images/solutions/solutions-denialmanagement/hero-section/img_banner%20(13).png"
              alt="Denial management digital cards and appeal workflow"
              fill
              priority
              sizes="(max-width: 1440px) 50vw, 650px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Mobile & Tablet: Stacked Hero Content */}
        <div className="relative z-10 flex w-full flex-col items-start gap-[20px] lg:hidden">
          {/* Tag */}
          <div className="flex items-center gap-[8px]">
            <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
            <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
              Agentic RCM Solutions &middot; Denial Management
            </span>
          </div>

          {/* Headline */}
          <h2 className="type-h1 tracking-[-0.01em] text-white">
            Denials worked the day they land.
          </h2>

          {/* Description */}
          <p className="type-body-s text-[#F4F6F9]">
            Our agents read the denial, identify the cause, build the appeal, and file it even when
            the deadline is still weeks away.
          </p>

          {/* CTA Button */}
          <div>
            <Link href="/contact-us">
              <CTA variant="dark-bg" as="div">
                Get a Demo
              </CTA>
            </Link>
          </div>

          {/* Hero Image (Mobile & Tablet) */}
          <div className="relative z-[2] aspect-[362/246] w-full overflow-hidden rounded-[20px]">
            <Image
              src="/images/solutions/solutions-denialmanagement/hero-section/img_banner%20(13).png"
              alt="Denial management digital cards and appeal workflow"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DenialManagementHeroSection;
