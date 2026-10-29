'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

import { useViewportReveal } from './use-scroll-progress';

/** Reveal the reported value once, then retain it regardless of scroll direction. */
export function MetricBar({
  value,
  threshold,
  className,
  fillClassName,
}: {
  value: number;
  threshold?: number;
  className: string;
  fillClassName: string;
}) {
  const ref = useViewportReveal<HTMLDivElement>('data-bar-reveal');

  return (
    <Progress
      ref={ref}
      value={value}
      data-bar-reveal="pending"
      aria-hidden="true"
      className={className}
      indicatorClassName={cn('himer-bar-fill origin-left', fillClassName)}
      indicatorStyle={{ width: `${value}%`, transform: undefined }}
    >
      {threshold !== undefined && (
        <span className="absolute inset-y-0 w-px bg-white" style={{ left: `${threshold}%` }} />
      )}
    </Progress>
  );
}
