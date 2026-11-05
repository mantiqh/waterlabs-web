import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.comparison;

export default function ComparisonSection() {
  return (
    <section className="bg-ghost-white rounded-tl-[30px] rounded-bl-[30px] py-10 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-20">
      <div className="layout-container">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,372fr)_minmax(0,928fr)] lg:gap-5">
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <div>
            <h2 className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
              <span className="text-electric-blue">{data.title.accent}</span> <br />
              {data.title.rest}
            </h2>
            <p className="type-body-xxs text-charcoal mt-5 tracking-[0.01em] max-md:text-sm max-md:leading-5">
              {data.description}
            </p>
          </div>
        </div>
        <div className="relative isolate mt-10 overflow-hidden rounded-[20px_10px_20px_20px] bg-black">
          <ProductVideo
            id="against-manual-coding"
            label="Manual coding, computer-assisted coding and CurieCode comparison"
            aspectRatio="1320 / 544"
            className="rounded-none"
          />
          <div
            aria-hidden="true"
            data-comparison-glow
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-30 mix-blend-screen"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at bottom left, var(--color-aqua-mint), transparent 65%), radial-gradient(ellipse at bottom right, var(--color-electric-blue), transparent 65%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
