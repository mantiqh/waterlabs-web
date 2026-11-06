'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { CTA } from '@/components/CTA';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.gettingStarted;
const { steps, beats } = data;

export default function GettingStartedSection() {
  const [active, setActive] = useState(0);
  const [seekTo, setSeekTo] = useState<{ seconds: number }>();
  return (
    <section className="section-deferred relative overflow-hidden rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] bg-white py-10 lg:rounded-tl-[60px] lg:rounded-tr-[60px] lg:rounded-bl-[60px] lg:py-20">
      <Image
        src={data.backgroundImage}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-right-bottom"
      />
      <div className="layout-container relative">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <h2 className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
            {data.titleLines[0]} <br />
            <span className="text-electric-blue">{data.titleLines[1]}</span>
          </h2>
          <div>
            <p className="type-body-xs max-w-[430px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
              {data.description}
            </p>
            <Link href={data.cta.href} className="mt-5 inline-block">
              <CTA variant="light-bg" as="span" size="compact-mobile">
                {data.cta.label}
              </CTA>
            </Link>
          </div>
        </div>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,548fr)_minmax(0,732fr)] lg:gap-10">
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') setActive(index);
                }}
                className="bg-ghost-white rounded-[20px_10px_20px_20px] p-5"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={active === index}
                    aria-controls={`getting-started-${index}`}
                    onFocus={() => setActive(index)}
                    onClick={() => {
                      setActive(index);
                      setSeekTo({ seconds: beats[index] });
                    }}
                    className={`type-body-xxs focus-visible:outline-electric-blue w-full cursor-pointer text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${active === index ? 'text-electric-blue' : 'text-black'}`}
                  >
                    {step.title}
                  </button>
                </h3>
                <div
                  id={`getting-started-${index}`}
                  aria-hidden={active !== index}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${active === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="type-body-xxs text-charcoal mt-4 max-w-[420px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ProductVideo
            id="getting-started"
            label="From sample charts to autonomous coding"
            seekTo={seekTo}
          />
        </div>
        <p className="type-caption text-charcoal mt-10 max-w-[548px] leading-5">
          {data.disclaimer}
        </p>
      </div>
    </section>
  );
}
