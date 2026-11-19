import Image from 'next/image';

import { HIMER_PRICING_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';

export const HimerPricingMeterSection = () => {
  return (
    <section
      data-motion-section="pricing"
      className="bg-ghost-white relative w-full overflow-hidden"
    >
      {/*
        Signature Waterlabs Curved Container (Figma: radii [0, 60, 60, 0] node 8301:11840):
        - Background: White (#FFFFFF)
        - Top-right and bottom-right are rounded-tr-[60px] rounded-br-[60px] (mobile: rounded-tr-[30px] rounded-br-[30px])
        - Outer background is bg-ghost-white (#F4F6F9) so the rounded corners cut out cleanly
      */}
      <div
        data-motion-reveal="panel"
        data-motion-trigger="section"
        data-motion-start="top 75%"
        className="himer-surface relative w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-white py-16 text-black md:py-20 lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20"
      >
        <Image
          src="/images/himer/bg_you_payay_for_the_work.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none hidden object-cover object-right-bottom md:block"
        />

        <div className="layout-container relative z-10">
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 75%"
            className="mb-5 flex flex-col md:mb-8"
          >
            {/* Eyebrow Tag */}
            <div className="mb-3 flex items-center gap-1 md:mb-5">
              <span className="bg-electric-blue h-2 w-2 rounded-full" />
              <span
                data-motion-reveal="scramble"
                data-motion-at="0.5"
                className="type-body-xxs tracking-wide text-[#68727d] max-md:text-sm max-md:leading-5"
              >
                {HIMER_PRICING_DATA.tag}
              </span>
            </div>

            {/* Header Grid: Headline & Description top-aligned at items-start */}
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-5">
              <div className="min-w-0">
                <h2
                  data-motion-reveal="lines"
                  data-motion-at="0.55"
                  className="type-h2 text-gray-black tracking-tight max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]"
                >
                  <span className="text-electric-blue">No license.</span>
                  <br />
                  <span>No deployment fee.</span>
                  <br />
                  <span>No seats.</span>
                </h2>
              </div>

              <div className="min-w-0">
                <p
                  data-motion-reveal="blur"
                  data-motion-at="0.7"
                  className="type-body-xxs text-gray-black max-md:text-sm max-md:leading-6 lg:max-w-[495px]"
                >
                  {HIMER_PRICING_DATA.subtext}
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column Main Content */}
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,547fr)_minmax(0,733fr)] lg:gap-10">
            {/* Left Column: 3 Pricing Phase Cards */}
            <div data-motion-group className="order-2 flex flex-col gap-3 lg:order-1">
              {HIMER_PRICING_DATA.cards.map((card) => (
                <div key={card.label} className="bg-sky-blue/10 rounded-[20px] p-3 md:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      data-motion-reveal="fade"
                      className="type-body-xxs text-electric-blue max-md:text-sm max-md:leading-6"
                    >
                      {card.label}
                    </span>
                  </div>
                  <p
                    data-motion-reveal="blur"
                    className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5"
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Pricing Meter Video Animation (Figma: Rectangle 13360 with border 1px #D7DCE2) */}
            <div data-motion-reveal="image" className="order-1 lg:order-2">
              <HimerVideo
                desktopSrc={HIMER_PRICING_DATA.desktopVideo}
                mobileSrc={HIMER_PRICING_DATA.mobileVideo}
                preloadDistance={1000}
                aspectRatio="733 / 379"
                mobileAspectRatio="362 / 337"
                fit="cover"
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
