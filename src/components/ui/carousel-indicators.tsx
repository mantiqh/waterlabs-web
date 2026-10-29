'use client';

export function CarouselIndicators({
  current,
  total,
  onSelect,
  label,
  maxVisible = 3,
  getItemLabel,
}: {
  current: number;
  total: number;
  onSelect: (index: number) => void;
  label: string;
  maxVisible?: number;
  getItemLabel?: (index: number) => string;
}) {
  const visibleCount = Math.min(maxVisible, total);
  const start = Math.min(Math.max(0, current - 1), Math.max(0, total - visibleCount));
  return (
    <div className="flex h-[5px] items-center gap-[5px]" aria-label={label}>
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
            className="relative flex h-6 shrink-0 cursor-pointer items-center rounded transition-[width] duration-300"
            style={{ width: distance === 0 ? 32 : distance === 1 ? 16 : 6 }}
          >
            <span
              aria-hidden="true"
              className={`h-[5px] w-full rounded-full ${distance === 0 ? 'bg-electric-blue' : 'bg-electric-blue/20'}`}
            />
          </button>
        );
      })}
    </div>
  );
}
