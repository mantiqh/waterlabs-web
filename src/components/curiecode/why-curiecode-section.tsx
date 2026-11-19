import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { MetricsCarousel } from './metrics-carousel';

const data = CURIECODE_PAGE_DATA.why;

export default function WhyCurieCodeSection() {
  return (
    <section className="relative rounded-tl-[30px] rounded-bl-[30px] bg-white py-10 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-20">
      <div className="layout-container">
        <div data-motion-group data-motion-trigger="section" data-motion-start="top 75%">
          <p className="type-body-xxs text-medium-gray flex items-center gap-2 tracking-[0.01em]">
            <span aria-hidden="true" className="bg-electric-blue h-2 w-2 rounded-full" />
            <span data-motion-reveal="scramble">{data.eyebrow}</span>
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-10">
            <h2
              data-motion-reveal="lines"
              className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10"
            >
              <span className="text-electric-blue">{data.title.accent}</span> {data.title.rest}
            </h2>
            <p
              data-motion-reveal="blur"
              className="type-body-xxs text-gray-black max-w-[620px] tracking-[0.01em] max-md:text-sm max-md:leading-5"
            >
              {data.description}
            </p>
          </div>
        </div>
        <MetricsCarousel />
        <p className="type-caption text-medium-gray mt-5">{data.source}</p>
      </div>
    </section>
  );
}
