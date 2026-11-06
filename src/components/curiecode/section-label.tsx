import { cn } from '@/lib/utils';

export function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        'type-body-xxs flex items-center gap-2 self-start tracking-[0.01em] max-md:text-sm max-md:leading-5',
        dark ? 'text-light-gray' : 'text-medium-gray',
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-2 shrink-0 rounded-full', dark ? 'bg-aqua-mint' : 'bg-electric-blue')}
      />
      {children}
    </p>
  );
}
