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
    image: '/images/home/the-waterlabs-platform-engine/desktop/img_himer_ai_os.png',
    href: '/solutions/prior-authorization',
    ctaText: 'Explore HIMER AI OS',
  },
  {
    id: 'curie-code',
    title: 'CurieCode',
    description:
      'An AI-powered, AHIMA-certified coding platform with predictive algorithms trained on millions of processed claims. It learns from real-world coding patterns to deliver accurate, consistent coding at scale.',
    image: '/images/home/the-waterlabs-platform-engine/desktop/ing_curie_code.png',
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
        className="relative w-full rounded-tr-[30px] rounded-br-[30px] bg-cover bg-center bg-no-repeat px-[20px] py-[40px] md:px-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]"
        style={{
          background: 'linear-gradient(250.93deg, #0F68D6 -91.8%, #000000 72.79%)',
          backgroundImage:
            "url('/images/home/the-waterlabs-platform-engine/desktop/bg_platform engine.png')",
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[32px] sm:gap-[40px] lg:flex-row">
          {/* =========================================================
              LEFT COLUMN: Sticky Heading (sticks on desktop scroll)
             ========================================================= */}
          <div className="w-full shrink-0 self-start lg:sticky lg:top-[120px] lg:w-[389px]">
            <h2 className="type-h2 tracking-[-0.01em]">
              <span className="block text-white">{headingLine1}</span>
              <span className="text-aqua-mint block">{headingLine2}</span>
            </h2>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Product Showcases (HIMER AI OS & CurieCode)
             ========================================================= */}
          <div className="flex w-full flex-col gap-[32px] sm:gap-[40px] lg:w-[891px]">
            {products.map((item) => (
              <div key={item.id} className="flex w-full flex-col gap-[16px] lg:gap-[20px]">
                {/* Product Image Card */}
                <div
                  className={`relative aspect-[362/195] w-full overflow-hidden rounded-[20px_10px_20px_20px] shadow-[0_16px_40px_rgba(0,0,0,0.35)] lg:aspect-[891/460] ${
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Desktop Text & Action (>= 1024px) */}
                <div className="hidden w-full flex-row items-end justify-between gap-[32px] lg:flex">
                  <div className="flex max-w-[520px] flex-col gap-[16px]">
                    <h3 className="type-h5 bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] bg-clip-text tracking-[-0.01em] text-transparent">
                      {item.title}
                    </h3>
                    <p className="type-body-s text-[#D7DCE2]">{item.description}</p>
                  </div>
                  <div className="shrink-0">
                    <Link href={item.href}>
                      <CTA variant="dark-bg">{item.ctaText}</CTA>
                    </Link>
                  </div>
                </div>

                {/* Mobile / Tablet Text & Action (< 1024px) */}
                <div className="flex w-full flex-col gap-[8px] sm:gap-[12px] lg:hidden">
                  <h3 className="type-h5 bg-gradient-to-r from-[#63CCB7] to-[#0F68D6] bg-clip-text tracking-[-0.01em] text-transparent">
                    {item.title}
                  </h3>
                  <div className="flex w-full flex-row items-end justify-between gap-[16px] sm:gap-[20px]">
                    <p className="type-body-s flex-1 text-[16px] leading-[26px] text-[#D7DCE2]">
                      {item.description}
                    </p>
                    <div className="shrink-0 pb-[2px]">
                      <Link href={item.href} aria-label={item.ctaText}>
                        <CTA
                          variant="dark-bg"
                          aria-label={item.ctaText}
                          className="h-[44px] w-[44px] max-sm:!h-[34px] max-sm:!min-h-[34px] max-sm:!w-[34px] max-sm:!min-w-[34px] max-sm:!p-0"
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
