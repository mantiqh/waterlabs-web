'use client';

import { HIMER_ACTIVITY_LOG_DATA } from '@/data/himer';
import { cn } from '@/lib/utils';

import { HimerVideo } from './himer-video';
import { useScrollProgress } from './use-scroll-progress';

const FIRST_PHRASE = 'Our agents handle';
const REMAINING_WORDS_SENTENCE_1 = ['the', 'volume.'];
const SENTENCE_2_WORDS = ['Your', 'team', 'handles', 'the', 'judgment.'];
const SENTENCE_3_WORDS = ['The', 'system', 'logs', 'both.'];

const TOTAL_REMAINING_WORDS =
  REMAINING_WORDS_SENTENCE_1.length + SENTENCE_2_WORDS.length + SENTENCE_3_WORDS.length;

export const HimerActivityLogSection = () => {
  const { ref: cardRef, progress: scrollProgress } = useScrollProgress<HTMLDivElement>();

  return (
    <section className="relative w-full bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-gradient-to-r from-[#0F68D6] to-black lg:h-[140px]" />

      <div className="bg-ghost-white text-gray-black relative z-10 w-full rounded-tl-[30px] pt-10 pb-0 md:pt-20 md:pb-12 lg:rounded-tl-[60px] lg:pt-[80px] lg:pb-[40px]">
        <div className="layout-container flex justify-center">
          <div
            ref={cardRef}
            className="flex w-full max-w-[1320px] flex-col items-center gap-10 bg-transparent p-0 text-center sm:gap-10 sm:px-8 md:gap-12 md:rounded-tl-[40px] md:rounded-tr-[20px] md:rounded-br-[40px] md:rounded-bl-[40px] md:bg-white md:px-12 md:py-14 lg:gap-[80px] lg:px-[60px] lg:py-[60px]"
          >
            <h2 className="type-h2 max-w-4xl tracking-tight max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
              <span className="md:block">
                <span className="text-gray-black transition-colors duration-300">
                  {FIRST_PHRASE}{' '}
                </span>
                {REMAINING_WORDS_SENTENCE_1.map((word, idx) => {
                  const globalIdx = idx;
                  const isLit = scrollProgress > globalIdx / TOTAL_REMAINING_WORDS;
                  return (
                    <span
                      key={`w1-${idx}`}
                      className={cn(
                        'inline transition-colors duration-300',
                        isLit ? 'text-gray-black' : 'text-light-gray',
                      )}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>

              <span className="md:block">
                {SENTENCE_2_WORDS.map((word, idx) => {
                  const globalIdx = idx + REMAINING_WORDS_SENTENCE_1.length;
                  const isLit = scrollProgress > globalIdx / TOTAL_REMAINING_WORDS;
                  return (
                    <span
                      key={`w2-${idx}`}
                      className={cn(
                        'inline transition-colors duration-300',
                        isLit ? 'text-gray-black' : 'text-light-gray',
                      )}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>

              <span className="md:block">
                {SENTENCE_3_WORDS.map((word, idx) => {
                  const globalIdx =
                    idx + REMAINING_WORDS_SENTENCE_1.length + SENTENCE_2_WORDS.length;
                  const isLit = scrollProgress > globalIdx / TOTAL_REMAINING_WORDS;
                  return (
                    <span
                      key={`w3-${idx}`}
                      className={cn(
                        'inline transition-colors duration-300',
                        isLit ? 'text-gray-black' : 'text-light-gray',
                      )}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
            </h2>

            {/* Video Container */}
            <div className="w-full max-w-[840px]">
              <HimerVideo
                desktopSrc={HIMER_ACTIVITY_LOG_DATA.desktopVideo}
                mobileSrc={HIMER_ACTIVITY_LOG_DATA.mobileVideo}
                aspectRatio="1680 / 960"
                mobileAspectRatio="362 / 350"
                containerClassName=" w-full border border-[#D7DCE2] rounded-[20px] md:rounded-tl-[30px] md:rounded-tr-[10px] md:rounded-br-[30px] md:rounded-bl-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerActivityLogSection;
