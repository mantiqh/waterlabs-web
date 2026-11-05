'use client';

import { useCallback, useState } from 'react';

import { ConnectedTimeline } from '@/components/ui/connected-timeline';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';
import { useReducedMotion } from '@/lib/hooks/use-scroll-progress';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.scrubber;
const { stages, beats } = data;

function ScrubberPlayback() {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const onPlaybackFrame = useCallback((seconds: number) => {
    const phase = beats.reduce((current, beat, index) => (seconds >= beat ? index : current), 0);
    const next = beats[phase + 1];
    const fraction = next
      ? Math.max(0, Math.min(1, (seconds - beats[phase]) / (next - beats[phase])))
      : 0;
    setProgress((phase + fraction) / (beats.length - 1));
  }, []);
  return (
    <div className="mt-10 grid gap-5 lg:mt-20 lg:grid-cols-[minmax(0,492fr)_minmax(0,808fr)] lg:gap-5">
      <div className="order-2 lg:order-1">
        <ConnectedTimeline items={stages} progress={reduced ? 1 : progress} tone="blue" />
      </div>
      <div className="order-1 lg:order-2">
        <ProductVideo
          id="scrubber-learns"
          label="How the intelligent scrubber learns from payment outcomes"
          onPlaybackFrame={onPlaybackFrame}
        />
      </div>
    </div>
  );
}

export default function ScrubberSection() {
  return (
    <section className="rounded-tr-[30px] rounded-br-[30px] bg-white py-10 lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
      <div className="layout-container">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-10">
          <h2 className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
            {data.title}
          </h2>
          <p className="type-body-xxs text-charcoal tracking-[0.01em] max-md:text-sm max-md:leading-5">
            {data.description}
          </p>
        </div>
        <ScrubberPlayback />
      </div>
    </section>
  );
}
