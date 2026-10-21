'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export interface PlatformProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
  hasBorder?: boolean;
}

const DEFAULT_PRODUCTS: PlatformProduct[] = [
  {
    id: 'himer-ai-os',
    title: 'HIMER AI OS',
    description:
      'The Agentic Operating System for RCM, powered by patented technology to create, deploy, orchestrate and manage AI agents across the revenue cycle.',
    image:
      '/images/home/the-waterlabs-platform-engine/desktop/img_himer_ai_os.png',
    href: '/solutions/prior-authorization',
    ctaText: 'Explore HIMER AI OS',
  },
  {
    id: 'curie-code',
    title: 'CurieCode',
    description:
      'An AI-powered, AHIMA-certified coding platform with predictive algorithms trained on millions of processed claims. It learns from real-world coding patterns to deliver accurate, consistent coding at scale.',
    image:
      '/images/home/the-waterlabs-platform-engine/desktop/ing_curie_code.png',
    href: '/solutions/charge-capture-and-coding',
    ctaText: 'Explore CurieCode',
    hasBorder: true,
  },
];

export interface PlatformEngineSectionProps {
  headingLine1?: string;
  headingLine2?: string;
  products?: PlatformProduct[];
}

export const PlatformEngineSection = ({
  headingLine1 = 'The Waterlabs',
  headingLine2 = 'Platform Engine',
  products = DEFAULT_PRODUCTS,
}: PlatformEngineSectionProps) => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Curved Container:
        Desktop: border-radius 0px 60px 60px 0px, padding 80px 60px
        Mobile: border-radius 0px 30px 30px 0px, padding 40px 20px
        Background: Figma linear gradient with desktop texture overlay
      */}
      <div
        className="w-full rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px] relative bg-cover bg-no-repeat bg-center"
        style={{
          background:
            'linear-gradient(250.93deg, #0F68D6 -91.8%, #000000 72.79%)',
          backgroundImage:
            "url('/images/home/the-waterlabs-platform-engine/desktop/bg_platform engine.png')",
        }}
      >
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[32px] sm:gap-[40px]">
          
          {/* =========================================================
              LEFT COLUMN: Sticky Heading (sticks on desktop scroll)
             ========================================================= */}
          <div className="w-full lg:w-[389px] shrink-0 lg:sticky lg:top-[120px] self-start">
            <h2 className="type-h2 tracking-[-0.01em]">
              <span className="text-white block">{headingLine1}</span>
              <span className="text-aqua-mint block">{headingLine2}</span>
            </h2>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Product Showcases (HIMER AI OS & CurieCode)
             ========================================================= */}
          <div className="w-full lg:w-[891px] flex flex-col gap-[32px] sm:gap-[40px]">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-[16px] lg:gap-[20px] w-full"
              >
                {/* Product Image Card */}
                <div
                  className={`relative w-full aspect-[362/195] lg:aspect-[891/460] rounded-[20px_10px_20px_20px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${
                    item.hasBorder ? 'border border-[#D7DCE2]/10' : ''
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 891px"
                    className="object-cover"
                  />
                  {/* Subtle bottom vignette matching Figma overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Desktop Text & Action (>= 1024px) */}
                <div className="hidden lg:flex flex-row items-end justify-between gap-[32px] w-full">
                  <div className="flex flex-col gap-[16px] max-w-[520px]">
                    <h3 className="type-h5 tracking-[-0.01em] bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="type-body-s text-[#D7DCE2]">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Link href={item.href}>
                      <CTA variant="dark-bg">{item.ctaText}</CTA>
                    </Link>
                  </div>
                </div>

                {/* Mobile / Tablet Text & Action (< 1024px) */}
                <div className="flex lg:hidden flex-col gap-[8px] sm:gap-[12px] w-full">
                  <h3 className="type-h5 tracking-[-0.01em] bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <div className="flex flex-row items-end justify-between gap-[16px] sm:gap-[20px] w-full">
                    <p className="type-body-s text-[#D7DCE2] flex-1 text-[16px] leading-[26px]">
                      {item.description}
                    </p>
                    <div className="shrink-0 pb-[2px]">
                      <Link href={item.href} aria-label={item.ctaText}>
                        <CTA
                          variant="dark-bg"
                          aria-label={item.ctaText}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformEngineSection;
