import Image from 'next/image';

import { HIMER_PRICING_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';

export const HimerPricingMeterSection = () => {
  return (
    <section className="bg-ghost-white relative w-full overflow-hidden">
      {/*
        Signature Waterlabs Curved Container (Figma: radii [0, 60, 60, 0] node 8301:11840):
        - Background: White (#FFFFFF)
        - Top-right and bottom-right are rounded-tr-[60px] rounded-br-[60px] (mobile: rounded-tr-[30px] rounded-br-[30px])
        - Outer background is bg-ghost-white (#F4F6F9) so the rounded corners cut out cleanly
      */}
      <div className="himer-surface relative w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-white py-16 text-black md:py-20 lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
        <Image
          src="/images/himer/bg_you_payay_for_the_work.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-right-bottom"
        />

        <div className="layout-container relative z-10">
          {/* Eyebrow Tag (Figma: Text - Tag placed above the 2-column header row) */}
          <div className="mb-3 flex items-center gap-1 md:mb-5">
            <span className="bg-electric-blue h-2 w-2 rounded-full" />
            <span className="type-body-xxs text-medium-gray tracking-wide max-md:text-sm max-md:leading-5">
              {HIMER_PRICING_DATA.tag}
            </span>
          </div>

          {/* Header Grid: Headline & Description top-aligned at items-start */}
          <div className="mb-5 grid grid-cols-1 items-start gap-5 md:mb-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="type-h2 text-gray-black tracking-tight max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                <span className="text-electric-blue">No license.</span>
                <br />
                <span>No deployment fee.</span>
                <br />
                <span>No seats.</span>
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="type-body-xxs text-gray-black max-md:text-sm max-md:leading-6">
                {HIMER_PRICING_DATA.subtext}
              </p>
            </div>
          </div>

          {/* 2-Column Main Content */}
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: 3 Pricing Phase Cards */}
            <div className="order-2 flex flex-col gap-3 lg:order-1 lg:col-span-5">
              {HIMER_PRICING_DATA.cards.map((card) => (
                <div key={card.label} className="bg-ghost-white rounded-[20px] p-3 md:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="bg-electric-blue hidden h-1.5 w-1.5 rounded-full md:block" />
                    <span className="type-body-xxs text-electric-blue max-md:text-sm max-md:leading-6">
                      {card.label}
                    </span>
                  </div>
                  <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Pricing Meter Video Animation (Figma: Rectangle 13360 with border 1px #D7DCE2) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <HimerVideo
                desktopSrc={HIMER_PRICING_DATA.desktopVideo}
                mobileSrc={HIMER_PRICING_DATA.mobileVideo}
                aspectRatio="1680 / 920"
                mobileAspectRatio="362 / 337"
                containerClassName="w-full rounded-[20px] border border-[#D7DCE2]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerPricingMeterSection;
