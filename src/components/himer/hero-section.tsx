import Link from 'next/link';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';
import { HIMER_HERO_DATA } from '@/data/himer';

import { AnimatedMetric } from './animated-metric';
import { HimerVideo } from './himer-video';

export const HimerHeroSection = () => (
  <section className="bg-ghost-white relative w-full text-white">
    <div className="relative w-full overflow-hidden rounded-br-[30px] bg-black pt-5 pb-10 md:pt-8 md:pb-20 lg:rounded-br-[60px] lg:pt-10">
      <div className="layout-container relative z-50 mb-5 md:mb-12 lg:mb-16">
        <Navbar theme="dark" mobileVariant="hero" />
      </div>
      <div className="mb-5 w-full md:hidden">
        <HimerVideo
          desktopSrc={HIMER_HERO_DATA.desktopVideo}
          mobileSrc={HIMER_HERO_DATA.mobileVideo}
          mobileAspectRatio="402 / 222"
          fit="cover"
          className="object-[center_20%]"
          containerClassName="rounded-none"
        />
      </div>
      <div className="layout-container flex flex-col items-start text-left md:items-center md:text-center">
        <h1 className="type-h2 max-w-[916px] max-md:text-[36px] max-md:leading-[48px] max-md:tracking-[-0.01em]">
          <span className="text-aqua-mint">An agentic operating system</span> with{' '}
          <br className="hidden sm:inline" />
          twenty years of revenue cycle in it.
        </h1>
        <p className="type-body-xxs text-light-gray mt-3 max-w-3xl max-md:text-base max-md:leading-[26px] md:mt-6">
          {HIMER_HERO_DATA.subtext}
        </p>
        <Link href={HIMER_HERO_DATA.ctaHref} className="mt-3 md:mt-8">
          <CTA variant="light-bg" size="compact-mobile" as="span">
            {HIMER_HERO_DATA.ctaText}
          </CTA>
        </Link>
      </div>
      <div className="mx-auto mt-8 hidden w-full max-w-[1440px] md:block lg:mt-12">
        <HimerVideo
          desktopSrc={HIMER_HERO_DATA.desktopVideo}
          mobileSrc={HIMER_HERO_DATA.mobileVideo}
          aspectRatio="1672 / 941"
          containerClassName="rounded-none"
        />
      </div>
      <div className="layout-container mt-[60px] md:mt-16 lg:mt-20">
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
                className="type-h4 max-md:text-2xl max-md:leading-8"
              />
              <span className="type-body-xxs text-ghost-white whitespace-nowrap max-md:text-sm max-md:leading-5">
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
