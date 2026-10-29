'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { HIMER_MEMORY_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';
import { MetricBar } from './metric-bar';

export const HimerMemoryKnowledgeSection = () => {
  const [activeTabId, setActiveTabId] = useState(HIMER_MEMORY_DATA.tabs[0].id);
  const activeTab =
    HIMER_MEMORY_DATA.tabs.find((tab) => tab.id === activeTabId) ?? HIMER_MEMORY_DATA.tabs[0];
  return (
    <section className="relative w-full bg-gradient-to-b from-white to-black">
      <div className="bg-ghost-white rounded-tl-[30px] rounded-bl-[30px] py-10 md:py-20 lg:rounded-tl-[60px] lg:rounded-bl-[60px]">
        <div className="layout-container">
          <div className="mb-3 flex items-center gap-1">
            <span className="bg-electric-blue size-2 rounded-full" />
            <span className="type-body-xxs text-medium-gray max-md:text-sm max-md:leading-5">
              {HIMER_MEMORY_DATA.tag}
            </span>
          </div>
          <h2 className="type-h2 text-black max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
            <span className="text-electric-blue">The revenue cycle,</span> written into software.
          </h2>
          <p className="type-body-xxs text-charcoal mt-5 mb-5 max-md:text-sm max-md:leading-5">
            {HIMER_MEMORY_DATA.subtext}
          </p>
          <div className="mb-5 grid max-w-[1190px] grid-cols-1 gap-5 md:mb-20 md:grid-cols-2 md:gap-[60px]">
            {[HIMER_MEMORY_DATA.split.alreadyInHimer, HIMER_MEMORY_DATA.split.learnedFromYou].map(
              (label, index) => (
                <div key={label} data-metric-card className="flex flex-col gap-6">
                  <MetricBar
                    value={index === 0 ? 70 : 30}
                    className="bg-light-gray h-3 md:h-4"
                    fillClassName={index === 0 ? 'bg-electric-blue' : 'bg-golden-ochre'}
                  />
                  <span className="type-body-xxs text-midnight-blue max-md:text-sm max-md:leading-6">
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
          <div className="mb-5 flex flex-col gap-8 rounded-[20px_10px_20px_20px] bg-white p-5 md:hidden">
            {HIMER_MEMORY_DATA.tabs.map((tab) => (
              <article key={tab.id} className="flex flex-col gap-3.5">
                <h3 className="type-h4 text-electric-blue max-md:text-2xl max-md:leading-8">
                  {tab.label}
                </h3>
                <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5">
                  {tab.description}
                </p>
                <HimerVideo
                  desktopSrc={tab.desktopVideo}
                  mobileSrc={tab.mobileVideo}
                  mobileAspectRatio="322 / 330"
                  containerClassName="rounded-[20px_10px_20px_20px]"
                  ariaLabel={`${tab.label} knowledge demonstration`}
                />
              </article>
            ))}
          </div>
          <div className="mb-8 hidden rounded-[32px] bg-white p-8 md:block">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-6 lg:col-span-5">
                {HIMER_MEMORY_DATA.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={tab.id === activeTabId}
                    onClick={() => setActiveTabId(tab.id)}
                    className="cursor-pointer text-left"
                  >
                    <span
                      className={`type-h6 flex items-center gap-2.5 ${tab.id === activeTabId ? 'text-electric-blue' : 'text-medium-gray'}`}
                    >
                      {tab.label}
                      {tab.id === activeTabId && <ChevronRight className="h-[15px] w-[10px]" />}
                    </span>
                    {tab.id === activeTabId && (
                      <p className="type-body-xxs text-charcoal mt-3 max-md:text-sm max-md:leading-5">
                        {tab.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7">
                <HimerVideo
                  key={activeTab.id}
                  desktopSrc={activeTab.desktopVideo}
                  mobileSrc={activeTab.mobileVideo}
                  aspectRatio={activeTab.aspectRatio}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-[20px] bg-white p-5 md:flex-row md:items-center md:justify-between md:p-10">
            <h3 className="type-h5 text-midnight-blue max-md:text-xl max-md:leading-7">
              {HIMER_MEMORY_DATA.callout}
            </h3>
            <Link href="/contact-us">
              <CTA variant="light-bg" size="compact-mobile" as="span">
                Get a demo
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerMemoryKnowledgeSection;
