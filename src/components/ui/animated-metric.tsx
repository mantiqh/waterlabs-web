'use client';

import type { CSSProperties } from 'react';

import { useViewportReveal } from '@/lib/hooks/use-scroll-progress';
import { cn } from '@/lib/utils';

interface AnimatedMetricProps {
  value: string;
  className?: string;
  gradient?: boolean;
  revealOnEntry?: boolean;
}

type CharacterStyle = CSSProperties & { '--metric-delay': string };

export function AnimatedMetric({
  value,
  className,
  gradient = false,
  revealOnEntry = false,
}: AnimatedMetricProps) {
  const ref = useViewportReveal<HTMLSpanElement>('data-metric-reveal', revealOnEntry);

  return (
    <span
      ref={ref}
      data-metric-reveal="pending"
      className={cn('animated-metric inline-block', className)}
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden align-bottom whitespace-pre">
        {Array.from(value).map((character, index) => (
          <span
            key={index}
            className={cn('metric-character inline-block', gradient && 'metric-gradient')}
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
