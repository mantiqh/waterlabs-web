'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    indicatorStyle?: React.CSSProperties;
  }
>(({ className, value, indicatorClassName, indicatorStyle, children, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn('bg-charcoal relative h-1 w-full overflow-hidden rounded-full', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'bg-aqua-mint h-full w-full flex-1 rounded-full transition-all duration-300 ease-linear',
        indicatorClassName,
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)`, ...indicatorStyle }}
    />
    {children}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
