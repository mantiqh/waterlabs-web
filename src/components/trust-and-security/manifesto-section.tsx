'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { clampProgress, useReducedMotion } from '@/lib/hooks/use-scroll-progress';

const REVEAL_TEXT =
  'your patient data stays in your environment, is never copied to us, and is never stored by us. Our agents do the work in the moment, and then the trace is gone. We keep the lesson, not the patient.';

const REVEAL_WORDS = REVEAL_TEXT.split(' ');
const WORD_WINDOW = 0.16;

export const ManifestoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const words = Array.from(section.querySelectorAll<HTMLElement>('[data-manifesto-word]'));
    const render = (progress: number) => {
      words.forEach((word, index) => {
        const start = (index / words.length) * (1 - WORD_WINDOW);
        word.style.opacity = String(0.25 + 0.75 * clampProgress((progress - start) / WORD_WINDOW));
      });
    };
    if (reducedMotion) {
      render(1);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      end: () => `+=${Math.max(1, section.getBoundingClientRect().height + innerHeight * 0.35)}`,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    render(trigger.progress);
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section
      ref={ref}
      data-motion-section
      className="relative m-0 w-full overflow-hidden bg-white p-0"
    >
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
                return (
                  <span
                    key={`${word}-${index}`}
                    data-manifesto-word
                    className="text-[#111111] transition-opacity duration-150 will-change-[opacity]"
                    style={{ opacity: reducedMotion ? 1 : 0.25 }}
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
