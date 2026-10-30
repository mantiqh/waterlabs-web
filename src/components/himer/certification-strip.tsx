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
  const totalSlides = 3;
  return (
    <div className="min-w-0 pt-2 lg:col-start-1 lg:row-start-2 lg:pt-8">
      <div
        ref={ref}
        role="region"
        aria-label="Security certifications"
        tabIndex={0}
        className="no-scrollbar flex items-center gap-[max(20px,calc((100%_-_232px)/2))] overflow-x-auto lg:gap-[clamp(20px,calc(14.423vw-127.69px),80px)]"
        onScroll={() => {
          const track = ref.current;
          if (!track) return;
          const maxScroll = track.scrollWidth - track.clientWidth;
          setCurrent(
            maxScroll > 0 ? Math.round((track.scrollLeft / maxScroll) * (totalSlides - 1)) : 0,
          );
        }}
      >
        {seals.map((seal) => (
          <div
            key={seal.name}
            className="flex h-[76px] shrink-0 items-center justify-center lg:h-[73px]"
          >
            <div className="relative" style={{ width: seal.width, height: seal.height }}>
              <Image
                src={seal.src}
                alt={seal.alt}
                fill
                sizes={seal.fit === 'cover' ? '170px' : `${seal.width}px`}
                className={seal.fit === 'cover' ? 'object-cover' : 'object-contain'}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 lg:hidden">
        <CarouselIndicators
          current={current}
          total={totalSlides}
          label="Certification groups"
          onSelect={(index) => {
            const track = ref.current;
            if (track)
              track.scrollTo({
                left: ((track.scrollWidth - track.clientWidth) * index) / (totalSlides - 1),
                behavior: reducedMotion ? 'instant' : 'smooth',
              });
          }}
        />
      </div>
    </div>
  );
}
