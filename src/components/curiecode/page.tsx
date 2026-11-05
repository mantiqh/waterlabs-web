import Link from 'next/link';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';
import { AnimatedMetric } from '@/components/ui/animated-metric';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import CapabilitiesSection from './capabilities-section';
import CodersBannerSection from './coders-banner-section';
import CodingFragmentationSection from './coding-fragmentation-section';
import ComparisonSection from './comparison-section';
import GettingStartedSection from './getting-started-section';
import { HeroGradient } from './hero-gradient';
import ImpactSection from './impact-section';
import { ProductVideo } from './product-video';
import ScrubberSection from './scrubber-section';
import WhyCurieCodeSection from './why-curiecode-section';
import WorkflowSection from './workflow-section';

const data = CURIECODE_PAGE_DATA.hero;

export default function CurieCodePage() {
  return (
    <div className="bg-ghost-white w-full overflow-x-clip">
      <section className="relative flex flex-col overflow-hidden rounded-br-[30px] bg-black text-white lg:rounded-br-[60px]">
        <HeroGradient />
        <div className="layout-container relative z-10 order-1 pt-5 md:pt-8 lg:pt-10">
          <Navbar theme="dark" />
        </div>
        <div className="layout-container relative isolate order-3 flex flex-col items-center pt-10 text-center md:order-2 md:pt-20">
          <HeroGradient mobile />
          <h1 className="type-h2 max-w-[280px] tracking-[-0.01em] max-md:text-[32px] max-md:leading-10 md:max-w-[708px]">
            {data.title}
          </h1>
          <p className="type-body-xxs text-light-gray mt-5 max-w-[708px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
            {data.description}
          </p>
          <Link href={data.cta.href} className="mt-5">
            <CTA as="span" variant="light-bg" size="compact-mobile">
              {data.cta.label}
            </CTA>
          </Link>
        </div>
        <div className="relative order-2 mx-auto w-full max-w-[1440px] md:order-3">
          <ProductVideo
            id="hero-banner"
            label="CurieCode autonomous coding demonstration"
            className="rounded-none"
            aspectRatio="1440 / 867"
            priority
          />
          <div
            aria-hidden="true"
            data-hero-video-fade
            className="pointer-events-none absolute -bottom-px left-1/2 h-[121px] w-[541px] -translate-x-1/2 bg-linear-to-b from-black/0 via-black/45 to-black blur-[18.15px] md:hidden"
          />
        </div>
        <div className="layout-container order-4 flex gap-10 overflow-x-auto pt-10 pb-20 md:grid md:grid-cols-4 md:gap-10 md:overflow-visible">
          {data.metrics.map(({ value, description }) => (
            <div
              key={value}
              data-metric-card
              className="flex w-[240px] shrink-0 flex-col gap-3 md:w-auto"
            >
              <AnimatedMetric value={value} className="type-h5 text-aqua-mint tracking-[-0.01em]" />
              <p className="type-body-xxs text-ghost-white max-w-[220px] tracking-[0.01em]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-black">
        <WhyCurieCodeSection />
      </div>
      <CodingFragmentationSection />
      <div className="from-midnight-blue bg-linear-to-b from-50% to-black to-50%">
        <CapabilitiesSection />
      </div>
      <CodersBannerSection />
      <WorkflowSection />
      <div className="to-ghost-white bg-linear-to-b from-black from-50% to-50%">
        <ScrubberSection />
      </div>
      <div className="bg-linear-to-b from-white from-50% to-black to-50%">
        <ComparisonSection />
      </div>
      <div className="bg-ghost-white">
        <ImpactSection />
      </div>
      <div className="from-ghost-white to-gray-black bg-linear-to-b from-50% to-50%">
        <GettingStartedSection />
      </div>
    </div>
  );
}
