import { AnimatedMetric } from '@/components/ui/animated-metric';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.impact;
const cards = data.cards;

export default function ImpactSection() {
  return (
    <section className="section-deferred rounded-tr-[30px] rounded-br-[30px] bg-black py-10 text-white lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
      <div className="layout-container">
        <SectionLabel dark>{data.eyebrow}</SectionLabel>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <h2 className="type-h4 tracking-[-0.01em] max-md:text-2xl max-md:leading-8">
            {data.title}
          </h2>
          <p className="type-body-xxs text-light-gray max-w-[571px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
            {data.description}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1160px] gap-6 md:grid-cols-2 lg:mt-20">
          {cards.map((card) => (
            <article
              key={card.media}
              className="rounded-[16px] border border-white/10 bg-white/5 p-3 md:p-5"
            >
              <ProductVideo
                id={card.media}
                label={`${card.title} impact demonstration`}
                className="rounded-[10px]"
              />
              <h3 data-metric-card className="type-h5 text-aqua-mint mt-5 tracking-[-0.01em]">
                <AnimatedMetric value={card.title} />
              </h3>
              <p className="type-caption mt-3 leading-5 text-white">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
