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
  buttonText = 'GET A DEMO',
  buttonLink = '/contact-us',
}: CaseStudiesCTASectionProps) => {
  const safeButtonLink = buttonLink?.includes('waterlabs-w7eb.vercel.app')
    ? '/contact-us'
    : (buttonLink || '/contact-us');

  const renderHeadline = (content?: ReactNode) => {
    if (!content) {
      return (
        <>
          See what Waterlabs would do
          <br />
          on your numbers.
        </>
      );
    }
    if (typeof content === 'string') {
      if (content.includes('on your numbers')) {
        const parts = content.split('on your numbers');
        return (
          <>
            {parts[0].trimEnd()}
            <br />
            on your numbers{parts.slice(1).join('on your numbers')}
          </>
        );
      }
    }
    return content;
  };

  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        CTA Banner Card (Figma: Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 140px, padding: 40px 60px, gap: 20px, background: #0F68D6, border-radius: 30px 0 0 30px
        - Mobile: 402px x 174px, padding: 40px 20px, gap: 24px, background: #0F68D6, border-radius: 30px 0 0 30px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tl-[30px] rounded-bl-[30px] rounded-tr-0 rounded-br-0 px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[48px] lg:py-0 lg:h-[240px] flex items-center overflow-hidden">
        {/* Content Container (max-w-[1320px]) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[20px]">
          {/* Headline (Display/H2) */}
          <h2 className="text-[23px] min-[375px]:text-[25px] sm:type-h2 text-white tracking-[-0.01em] leading-[29px] min-[375px]:leading-[31px] sm:leading-[38px]">
            {renderHeadline(headline)}
          </h2>

          {/* Action CTA Button */}
          <div className="shrink-0 flex items-center">
            <Link href={safeButtonLink} className="inline-block">
              <CTA variant="dark-bg" as="div">
                {buttonText?.toUpperCase() || 'GET A DEMO'}
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCTASection;
