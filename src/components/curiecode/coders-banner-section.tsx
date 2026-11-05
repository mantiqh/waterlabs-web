'use client';

import { CURIECODE_PAGE_DATA } from '@/data/curiecode';
import { clampProgress, useScrollProgress } from '@/lib/hooks/use-scroll-progress';

const data = CURIECODE_PAGE_DATA.banner;

export default function CodersBannerSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>('focus');
  return (
    <div className="from-ghost-white bg-linear-to-b from-50% to-black to-50%">
      <section
        ref={ref}
        data-coders-banner
        className="relative overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-black py-10 text-center text-white lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20"
      >
        <div
          aria-hidden="true"
          className="to-electric-blue/60 pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black"
        />
        <div className="layout-container relative space-y-2">
          {data.map((line, index) => (
            <p
              key={line}
              className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10"
              style={{
                opacity: index === 0 ? 1 : 0.22 + 0.78 * clampProgress(progress * 3 - index + 0.5),
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
