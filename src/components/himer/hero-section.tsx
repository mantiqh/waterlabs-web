import Link from 'next/link';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';
import { AnimatedMetric } from '@/components/ui/animated-metric';
import { HIMER_HERO_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';

export const HimerHeroSection = () => (
  <section className="bg-ghost-white relative w-full text-white">
    <div className="relative flex w-full flex-col overflow-hidden rounded-br-[30px] bg-black pt-5 pb-10 md:pt-8 md:pb-20 lg:rounded-br-[60px] lg:pt-10">
      <div className="layout-container relative z-50 mb-5 md:mb-12 lg:mb-16">
        <Navbar theme="dark" />
      </div>
      <div className="relative order-1 mb-5 w-full md:order-3 md:mx-auto md:mt-0 md:mb-0 md:max-w-[1440px] lg:mt-0">
        <HimerVideo
          desktopSrc={HIMER_HERO_DATA.desktopVideo}
          mobileSrc={HIMER_HERO_DATA.mobileVideo}
          aspectRatio="1672 / 941"
          mobileAspectRatio="402 / 222"
          priority
          fit="cover"
          className="max-md:object-[center_20%]"
          containerClassName="rounded-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent md:h-24 lg:h-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent md:h-40 lg:h-56"
        />
      </div>
      <div className="layout-container order-2 flex flex-col items-start text-left md:items-center md:text-center">
        <h1 className="type-h2 max-w-[916px] tracking-[-0.01em] max-md:text-[36px] max-md:leading-[48px]">
          <span className="text-aqua-mint">An agentic operating system</span> with{' '}
          <br className="hidden sm:inline" />
          twenty years of revenue cycle in it.
        </h1>
        <p className="type-body-xxs text-light-gray max-md:text-ghost-white mt-3 max-w-[916px] max-md:text-base max-md:leading-[26px] md:mt-5 md:tracking-[0.01em]">
          HIMER AI OS is the knowledge engine every Waterlabs agent is built on, deployed through,
          governed <br className="hidden md:inline" />
          by and taught by. It knows the payers, the specialties, the systems and the rules before
          it knows you.
        </p>
        <Link href={HIMER_HERO_DATA.ctaHref} className="mt-3 md:mt-5">
          <CTA variant="light-bg" size="compact-mobile" as="span" className="max-md:leading-6">
            {HIMER_HERO_DATA.ctaText}
          </CTA>
        </Link>
      </div>
      <div className="layout-container order-4 mt-[60px] md:mt-10 lg:mt-10">
        <div
          role="region"
          aria-label="Platform metrics"
          tabIndex={0}
          className="no-scrollbar flex w-[calc(100%+20px)] snap-x snap-mandatory gap-10 overflow-x-auto pr-5 md:grid md:w-full md:grid-cols-4 md:gap-6 md:pr-0"
        >
          {HIMER_HERO_DATA.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-metric-card
              className={`flex shrink-0 snap-start flex-col gap-2 ${index === 0 ? 'max-md:w-[232px]' : 'max-md:w-max'}`}
            >
              <AnimatedMetric
                value={stat.value}
                gradient
                className="type-h4 tracking-[-0.01em] max-md:text-2xl max-md:leading-8"
              />
              <span className="type-body-xxs text-ghost-white tracking-[0.01em] whitespace-nowrap max-md:text-sm max-md:leading-5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HimerHeroSection;
