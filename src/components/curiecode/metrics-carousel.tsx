'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatedMetric } from '@/components/ui/animated-metric';
import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

const data = CURIECODE_PAGE_DATA.why;
const metrics = data.metrics;

export function MetricsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const update = () => {
      if (container.clientWidth === 0) return;
      const count = Math.ceil(container.scrollWidth / container.clientWidth);
      const distance = container.scrollWidth - container.clientWidth;
      setPages(count);
      setCurrent(distance > 0 ? Math.round((container.scrollLeft / distance) * (count - 1)) : 0);
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div
        ref={ref}
        onScroll={(event) => {
          const container = event.currentTarget;
          const distance = container.scrollWidth - container.clientWidth;
          setCurrent(
            distance > 0 ? Math.round((container.scrollLeft / distance) * (pages - 1)) : 0,
          );
        }}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible"
      >
        {metrics.map(({ value, description }) => (
          <div
            key={value}
            data-metric-card
            className="min-h-[164px] w-[264px] shrink-0 snap-start rounded-[20px] bg-black/[0.02] p-8 lg:w-auto"
          >
            <AnimatedMetric
              value={value}
              className="type-h5 text-electric-blue tracking-[-0.01em]"
            />
            <p className="type-body-xxs text-gray-black mt-3 max-w-[230px] tracking-[0.01em]">{description}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 lg:hidden">
        <CarouselIndicators
          current={current}
          total={pages}
          label="Coding metrics"
          getItemLabel={(index) => `Show metrics page ${index + 1}`}
          onSelect={(index) => {
            const container = ref.current;
            if (container && pages > 1) {
              container.scrollTo({
                left: ((container.scrollWidth - container.clientWidth) * index) / (pages - 1),
                behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              });
            }
          }}
        />
      </div>
    </>
  );
}
