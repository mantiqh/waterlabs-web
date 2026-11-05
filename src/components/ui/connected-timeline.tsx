import type { Ref } from 'react';

import { cn } from '@/lib/utils';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ConnectedTimeline({
  items,
  progress,
  tone = 'mint',
  listRef,
  className,
  inactiveLabelColor,
}: {
  items: { label: string; description?: string }[];
  progress: number;
  tone?: 'mint' | 'blue';
  listRef?: Ref<HTMLUListElement>;
  className?: string;
  inactiveLabelColor?: 'medium-gray';
}) {
  const position = clamp(progress) * (items.length - 1);
  const color = tone === 'mint' ? 'var(--color-aqua-mint)' : 'var(--color-electric-blue)';
  return (
    <ul ref={listRef} className={cn('relative', className)} data-connected-timeline>
      {items.map((item, index) => {
        const fill = clamp(position - index);
        const highlight = clamp(position - index + 1);
        const grayLabels = tone === 'mint' && inactiveLabelColor === 'medium-gray';
        return (
          <li
            key={item.label}
            className="group relative pb-[18px] pl-3.5 text-sm leading-5 last:pb-0 md:pb-5 md:text-base"
          >
            <span
              aria-hidden="true"
              className="absolute top-[9px] bottom-[-9px] left-px w-px opacity-25 group-last:hidden"
              style={{ backgroundColor: color }}
            />
            <span
              aria-hidden="true"
              data-timeline-connector
              className="absolute top-[9px] bottom-[-9px] left-px w-px origin-top group-last:hidden"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
                transform: `scaleY(${fill})`,
              }}
            />
            <span
              aria-hidden="true"
              className="absolute top-[9px] bottom-[-9px] left-px w-px group-last:hidden"
            >
              <span
                className="absolute -left-[2px] size-[5px] -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px 3px ${color}`,
                  top: `${fill * 100}%`,
                  opacity: position >= index && position < index + 1 ? 1 : 0,
                }}
              />
            </span>
            <span
              aria-hidden="true"
              className="bg-light-gray absolute top-[7px] -left-px size-[5px] rounded-full"
              style={{
                backgroundColor: position >= index ? color : undefined,
              }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 10px 3px ${color}`,
                  opacity: clamp(1 - Math.abs(position - index) / 0.75),
                }}
              />
            </span>
            <span
              className={cn(
                'type-body-xxs max-md:text-sm max-md:leading-5',
                tone === 'mint'
                  ? grayLabels
                    ? 'text-medium-gray tracking-[0.01em]'
                    : 'text-white'
                  : position >= index
                    ? 'text-electric-blue'
                    : 'text-charcoal/70',
              )}
              style={
                tone === 'mint'
                  ? grayLabels
                    ? {
                        color:
                          highlight === 0
                            ? undefined
                            : `color-mix(in srgb, var(--color-medium-gray) ${(1 - highlight) * 100}%, var(--color-white))`,
                        opacity: 0.5 + 0.5 * highlight,
                      }
                    : { opacity: 0.6 + 0.4 * highlight }
                  : undefined
              }
            >
              {item.label}
            </span>
            {item.description && (
              <p className="type-body-xxs text-charcoal mt-3 max-md:text-sm max-md:leading-5">
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
