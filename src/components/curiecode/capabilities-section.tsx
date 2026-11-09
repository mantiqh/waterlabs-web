'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { CURIECODE_MEDIA, CURIECODE_PAGE_DATA } from '@/data/curiecode';
import { cn } from '@/lib/utils';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.capabilities;
const capabilities = data.items;

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [readyVideos, setReadyVideos] = useState<Set<string>>(() => new Set());
  const onVideoReady = useCallback((source: string) => {
    setReadyVideos((current) => (current.has(source) ? current : new Set(current).add(source)));
  }, []);
  return (
    <section className="bg-ghost-white rounded-tl-[30px] rounded-bl-[30px] py-10 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-20">
      <div className="layout-container">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <h2 className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
            {data.title}
          </h2>
          <p className="type-body-xxs text-charcoal max-w-[530px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
            {data.description}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-8 rounded-[20px_10px_20px_20px] bg-white p-5 md:hidden">
          {capabilities.map((item) => (
            <article key={item.media}>
              <h3 className="type-h5 text-electric-blue tracking-[-0.01em]">{item.title}</h3>
              <p className="type-body-xxs text-charcoal mt-3 mb-4 text-sm leading-5 tracking-[0.01em]">
                {item.description}
              </p>
              <ProductVideo id={item.media} label={`${item.title} demonstration`} />
            </article>
          ))}
        </div>
        <div className="mt-10 hidden grid-cols-[minmax(0,556fr)_minmax(0,660fr)] gap-10 rounded-[20px_10px_20px_20px] bg-white p-8 md:grid">
          <div className="flex flex-col gap-8">
            {capabilities.map((item, index) => (
              <div key={item.media}>
                <button
                  type="button"
                  aria-expanded={index === active}
                  aria-controls={`capability-panel-${index}`}
                  onClick={() => setActive(index)}
                  className="focus-visible:outline-electric-blue w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <span
                    className={`type-h6 flex items-center gap-3 tracking-[-0.01em] ${index === active ? 'text-electric-blue' : 'text-[#5A626A]'}`}
                  >
                    {item.title}
                    {index === active && <ChevronRight className="h-[15px] w-[10px]" />}
                  </span>
                </button>
                <div id={`capability-panel-${index}`} hidden={index !== active}>
                  <p className="type-body-xxs text-charcoal mt-4 tracking-[0.01em]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid">
            {capabilities.map((item, index) => (
              <div
                key={item.media}
                id={`capability-video-panel-${index}`}
                aria-hidden={active !== index ? true : undefined}
                inert={active !== index ? true : undefined}
                className={cn(
                  'col-start-1 row-start-1',
                  active !== index && 'pointer-events-none invisible',
                )}
              >
                <ProductVideo
                  id={item.media}
                  label={`${item.title} demonstration`}
                  active={active === index}
                  preloadInactive={
                    index === active + 1 &&
                    readyVideos.has(CURIECODE_MEDIA[capabilities[active].media].desktop.src)
                  }
                  onVideoReady={onVideoReady}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-5 md:mt-10 lg:flex-row lg:gap-20">
          <p className="type-body-xxs text-charcoal max-w-[680px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
            {data.platformDescription}
          </p>
          <Link href={data.platformCta.href} className="shrink-0">
            <CTA variant="light-bg" size="compact-mobile" as="span">
              {data.platformCta.label}
            </CTA>
          </Link>
        </div>
      </div>
    </section>
  );
}
