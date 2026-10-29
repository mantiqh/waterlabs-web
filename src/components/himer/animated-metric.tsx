'use client';

import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import { useViewportReveal } from './use-scroll-progress';

interface AnimatedMetricProps {
  value: string;
  className?: string;
  gradient?: boolean;
}

type CharacterStyle = CSSProperties & { '--metric-delay': string };

export function AnimatedMetric({ value, className, gradient = false }: AnimatedMetricProps) {
  const ref = useViewportReveal<HTMLSpanElement>('data-metric-reveal');

  return (
    <span
      ref={ref}
      data-metric-reveal="pending"
      className={cn('himer-animated-metric inline-block', className)}
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden align-bottom whitespace-pre">
        {Array.from(value).map((character, index) => (
          <span
            key={index}
            className={cn(
              'himer-metric-character inline-block',
              gradient && 'himer-metric-gradient',
            )}
            style={{ '--metric-delay': `${index * 45}ms` } as CharacterStyle}
          >
            {character}
          </span>
        ))}
      </span>
    </span>
  );
}

export default AnimatedMetric;
