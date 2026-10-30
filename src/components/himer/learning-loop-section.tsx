import { HIMER_LEARNING_LOOP_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';

export const HimerLearningLoopSection = () => {
  return (
    <section className="from-ghost-white relative w-full overflow-hidden bg-gradient-to-b from-20% to-black to-80%">
      {/* Signature Waterlabs Curved Container (Top-Right & Bottom-Right rounded per Figma: [0, 60, 60, 0] node 8301:11708) */}
      <div className="himer-surface max-md:to-midnight-blue relative z-10 w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-gradient-to-br from-black to-[#0F68D6] py-16 text-white md:py-20 lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
        <div className="layout-container relative">
          {/* Header Grid */}
          <div className="mb-3 grid grid-cols-1 items-start gap-5 md:mb-16 lg:grid-cols-2 lg:gap-5">
            <div className="min-w-0">
              <h2 className="type-h2 tracking-tight text-white max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                <span>It knows more this </span>
                <br />
                <span className="text-sky-blue">quarter than last.</span>
              </h2>
            </div>
            <div className="min-w-0">
              <p className="type-body-xxs text-light-gray max-md:text-sm max-md:leading-5 lg:max-w-[520px]">
                {HIMER_LEARNING_LOOP_DATA.subtext}
              </p>
            </div>
          </div>

          {/* Unified Video & Content Card */}
          <div className="rounded-[20px] bg-black/15 p-3 backdrop-blur-[74px] md:rounded-[24px] md:p-8 lg:p-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,650fr)_minmax(0,566fr)] lg:gap-10">
              {/* Left Column: Learning Loop Video */}
              <div className="min-w-0">
                <div className="md:border-light-gray/30 relative overflow-hidden rounded-[20px_10px_20px_20px] md:rounded-[24px] md:border md:shadow-2xl">
                  <HimerVideo
                    desktopSrc={HIMER_LEARNING_LOOP_DATA.desktopVideo}
                    mobileSrc={HIMER_LEARNING_LOOP_DATA.mobileVideo}
                    aspectRatio={HIMER_LEARNING_LOOP_DATA.aspectRatio}
                    mobileAspectRatio="338 / 308"
                  />
                </div>
              </div>

              {/* Right Column: 4 Adaptive Principles (Aligned with video, no top/bottom extra padding) */}
              <div className="flex flex-col justify-between gap-9 py-3 md:py-0 lg:h-full lg:gap-0">
                {HIMER_LEARNING_LOOP_DATA.points.map((point) => (
                  <div key={point.title} className="flex flex-col gap-2.5">
                    <h3 className="type-h6 text-white max-md:text-lg max-md:leading-[26px]">
                      {point.title}
                    </h3>
                    <p className="type-body-xxs text-light-gray leading-relaxed max-md:text-sm max-md:leading-5">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerLearningLoopSection;
