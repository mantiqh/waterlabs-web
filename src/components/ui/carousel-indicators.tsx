'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

export function CarouselIndicators({
  current,
  total,
  onSelect,
  label,
  maxVisible = 3,
  getItemLabel,
  color = 'blue',
}: {
  current: number;
  total: number;
  onSelect: (index: number) => void;
  label: string;
  maxVisible?: number;
  getItemLabel?: (index: number) => string;
  color?: 'blue' | 'mint';
}) {
  const visibleCount = Math.min(maxVisible, total);
  const start = Math.min(Math.max(0, current - 1), Math.max(0, total - visibleCount));
  return (
    <div
      className={`flex h-[5px] items-center ${color === 'mint' ? 'gap-0' : 'gap-[5px]'}`}
      aria-label={label}
    >
      {Array.from({ length: visibleCount }, (_, offset) => {
        const index = start + offset;
        const distance = Math.abs(current - index);
        return (
          <button
            key={index}
            type="button"
            aria-label={getItemLabel?.(index) ?? `${label}: ${index + 1}`}
            aria-current={current === index ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className={`relative flex h-6 min-w-6 shrink-0 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${color === 'mint' ? 'p-0' : 'p-0.5'}`}
          >
            <span
              aria-hidden="true"
              className={`h-[5px] rounded-full transition-[width] duration-300 motion-reduce:transition-none ${color === 'mint' ? (distance === 0 ? 'bg-[#63CCB7]' : 'bg-[#63CCB7]/30') : distance === 0 ? 'bg-electric-blue' : 'bg-electric-blue/20'}`}
              style={{ width: distance === 0 ? 32 : distance === 1 ? 16 : 6 }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function MetricScrollIndicators({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pages, setPages] = useState(1);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const update = () => {
      if (!container.clientWidth) return;
      const count = Math.ceil(container.scrollWidth / container.clientWidth);
      const distance = container.scrollWidth - container.clientWidth;
      setPages(count);
      setActiveIndex(
        distance > 0 ? Math.round((container.scrollLeft / distance) * (count - 1)) : 0,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        role="region"
        aria-label="Platform metrics"
        tabIndex={0}
        onScroll={(event) => {
          const container = event.currentTarget;
          if (pendingRef.current) {
            if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
            settleTimerRef.current = setTimeout(() => {
              pendingRef.current = false;
              const distance = container.scrollWidth - container.clientWidth;
              setActiveIndex(
                distance > 0 ? Math.round((container.scrollLeft / distance) * (pages - 1)) : 0,
              );
            }, 150);
            return;
          }
          if (frameRef.current !== null) return;
          frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            const distance = container.scrollWidth - container.clientWidth;
            setActiveIndex(
              distance > 0 ? Math.round((container.scrollLeft / distance) * (pages - 1)) : 0,
            );
          });
        }}
        onTouchStart={() => {
          pendingRef.current = false;
          if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
        }}
        className={className}
      >
        {children}
      </div>
      {pages > 1 && (
        <div className="mt-5 flex items-center md:hidden">
          <CarouselIndicators
            current={activeIndex}
            total={pages}
            color="mint"
            label="Choose a metric"
            getItemLabel={(index) => `Show metrics page ${index + 1} of ${pages}`}
            onSelect={(index) => {
              const container = scrollRef.current;
              if (!container || pages <= 1) return;
              pendingRef.current = true;
              setActiveIndex(index);
              if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
              settleTimerRef.current = setTimeout(() => {
                pendingRef.current = false;
              }, 150);
              container.scrollTo({
                left: ((container.scrollWidth - container.clientWidth) * index) / (pages - 1),
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              });
            }}
          />
        </div>
      )}
    </>
  );
}
