'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { HIMER_TRUST_SECURITY_DATA } from '@/data/himer';

import { useReducedMotion } from './use-scroll-progress';

export function CertificationStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const seals = HIMER_TRUST_SECURITY_DATA.seals;
  return (
    <div className="min-w-0 pt-2 lg:col-start-1 lg:row-start-2 lg:pt-8">
      <div
        ref={ref}
        role="region"
        aria-label="Security certifications"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-10 overflow-x-auto lg:flex-wrap lg:gap-6"
        onScroll={() => {
          const track = ref.current;
          if (!track) return;
          const first = track.children[0] as HTMLElement;
          const second = track.children[1] as HTMLElement;
          setCurrent(
            Math.min(
              seals.length - 1,
              Math.round(track.scrollLeft / (second.offsetLeft - first.offsetLeft)),
            ),
          );
        }}
      >
        {seals.map((seal) => (
          <div
            key={seal.name}
            className="relative flex h-[76px] w-[calc((100%-80px)/3)] shrink-0 snap-start items-center justify-center lg:h-12 lg:w-24"
          >
            <Image
              src={seal.src}
              alt={seal.alt}
              width={96}
              height={76}
              className="max-h-[76px] w-auto object-contain lg:max-h-12"
            />
          </div>
        ))}
      </div>
      <div className="mt-5 lg:hidden">
        <CarouselIndicators
          current={current}
          total={seals.length - 2}
          label="Certification groups"
          onSelect={(index) => {
            const track = ref.current;
            const item = track?.children[index] as HTMLElement | undefined;
            if (track && item)
              track.scrollTo({
                left: item.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft,
                behavior: reducedMotion ? 'instant' : 'smooth',
              });
          }}
        />
      </div>
    </div>
  );
}
