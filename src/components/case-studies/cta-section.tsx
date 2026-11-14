import Link from 'next/link';
import type { ReactNode } from 'react';

import { CTA } from '@/components/CTA';

export interface CaseStudiesCTASectionProps {
  headline?: ReactNode;
  buttonText?: string;
  buttonLink?: string;
}

export const CaseStudiesCTASection = ({
  headline,
  buttonText = 'Get a demo',
  buttonLink = '/contact-us',
}: CaseStudiesCTASectionProps) => {
  const safeButtonLink = buttonLink?.includes('waterlabs-w7eb.vercel.app')
    ? '/contact-us'
    : buttonLink || '/contact-us';

  const renderHeadline = (content?: ReactNode) => {
    if (!content) {
      return (
        <>
          See what Waterlabs would do <br className="hidden md:block" />
          on your numbers.
        </>
      );
    }
    if (typeof content === 'string') {
      if (content.includes('on your numbers')) {
        const parts = content.split('on your numbers');
        return (
          <>
            {parts[0].trimEnd()} <br className="hidden md:block" />
            on your numbers{parts.slice(1).join('on your numbers')}
          </>
        );
      }
    }
    return content;
  };

  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50% p-0">
      {/* 
        CTA Banner Card (Figma: Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 140px, padding: 40px 60px, gap: 20px, background: #0F68D6, border-radius: 30px 0 0 30px
        - Mobile: 402px x 174px, padding: 40px 20px, gap: 24px, background: #0F68D6, border-radius: 30px 0 0 30px
      */}
      <div className="flex w-full items-center overflow-hidden rounded-tl-[30px] rounded-tr-none rounded-br-none rounded-bl-[30px] bg-[#0F68D6] px-[20px] py-[40px] md:px-[40px] md:py-[48px] lg:h-[240px] lg:px-[60px] lg:py-0">
        {/* Content Container (max-w-[1320px]) */}
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Headline (Display/H2) */}
          <h2 className="type-h3 md:type-h2 tracking-[-0.01em] text-white">
            {renderHeadline(headline)}
          </h2>

          {/* Action CTA Button */}
          <div className="flex shrink-0 items-center">
            <Link href={safeButtonLink} className="inline-block">
              <CTA variant="dark-bg" size="compact-mobile" as="div">
                {buttonText || 'Get a demo'}
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCTASection;
