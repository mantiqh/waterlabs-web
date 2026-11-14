'use client';

import { clampProgress, useScrollProgress } from '@/lib/hooks/use-scroll-progress';

const REVEAL_TEXT =
  'your patient data stays in your environment, is never copied to us, and is never stored by us. Our agents do the work in the moment, and then the trace is gone. We keep the lesson, not the patient.';

const REVEAL_WORDS = REVEAL_TEXT.split(' ');
const WORD_WINDOW = 0.16;

export const ManifestoSection = () => {
  const { ref, progress } = useScrollProgress<HTMLElement>('focus');

  return (
    <section ref={ref} className="relative m-0 w-full overflow-hidden bg-white p-0">
      {/* Top-right #9983E2 backdrop matches the Hero bottom-right seamlessly behind rounded-tr */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-1/2 w-1/2 bg-[#9983E2]"
      />
      {/*
        White Card with Top curves:
        - Desktop: rounded-tl-[80px] rounded-tr-[60px], pt-[80px] pb-[40px] px-[60px]
        - Mobile: rounded-tr-[30px], py-[40px] px-[20px]
      */}
      <div className="relative z-10 w-full overflow-hidden rounded-tr-[30px] bg-white px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[80px] lg:rounded-tr-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[40px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col justify-center">
          {/* Main Statement Text */}
          <h2 className="type-h3">
            <span className="text-[#111111]">
              Most AI vendors fumble this conversation. Here&apos;s our version:{' '}
            </span>
            <span>
              {REVEAL_WORDS.map((word, index) => {
                const start = (index / REVEAL_WORDS.length) * (1 - WORD_WINDOW);
                const wordProgress = clampProgress((progress - start) / WORD_WINDOW);
                const opacity = 0.25 + 0.75 * wordProgress;

                return (
                  <span
                    key={`${word}-${index}`}
                    className="text-[#111111] transition-opacity duration-150 will-change-[opacity]"
                    style={{ opacity }}
                  >
                    {word}
                    {index < REVEAL_WORDS.length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
