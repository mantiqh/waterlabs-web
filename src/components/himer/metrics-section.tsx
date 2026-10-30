import { HIMER_METRICS_DATA } from '@/data/himer';

import { AnimatedMetric } from './animated-metric';

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div data-metric-card className="flex flex-col">
      <div className="type-h3 text-electric-blue max-md:text-[28px] max-md:leading-9">
        <AnimatedMetric value={value} />
      </div>
      <p className="type-body-xxs text-charcoal mt-3.5 max-md:text-sm max-md:leading-5">{label}</p>
    </div>
  );
}

export const HimerMetricsSection = () => {
  return (
    <section className="text-gray-black relative w-full bg-white">
      {/* Top Black Backdrop: Provides black background behind the top-left rounded curve */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-black lg:h-[120px]" />

      {/*  Signature Waterlabs Curved Container */}
      <div className="himer-surface bg-ghost-white relative z-10 w-full rounded-tl-[30px] rounded-bl-[30px] py-16 md:py-20 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-20">
        <div className="layout-container">
          {/* Header Row  */}
          <div className="mb-5 flex flex-col justify-between gap-5 md:mb-16 md:gap-6 lg:mb-16 lg:flex-row lg:items-start lg:gap-5">
            <div className="min-w-0 lg:w-1/2">
              <h2 className="type-h2 tracking-tight text-black max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                {HIMER_METRICS_DATA.headline}
              </h2>
            </div>
            <div className="min-w-0 lg:w-1/2">
              <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5 lg:whitespace-pre-line">
                {HIMER_METRICS_DATA.subtext}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-[60px]">
            {HIMER_METRICS_DATA.metrics.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerMetricsSection;
