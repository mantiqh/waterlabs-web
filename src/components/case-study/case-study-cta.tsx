import Link from 'next/link';

import { CTA } from '@/components/CTA';

export interface CaseStudyCTAProps {
  tagText?: string;
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export const CaseStudyCTA = ({
  buttonText = 'GET A DEMO',
  buttonHref = '/contact-us',
}: CaseStudyCTAProps) => {
  const safeButtonHref = buttonHref?.includes('waterlabs-w7eb.vercel.app')
    ? '/contact-us'
    : buttonHref || '/contact-us';

  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50% p-0">
      {/* 
        Case Study Bottom CTA Banner (Figma Frame 2147226494, node 5419-5637):
        - Frame dimensions: max-w-[1440px], padding: 60px (desktop)
        - Background: #0F68D6 (Electric Blue)
        - Border radius: 0px 30px 30px 30px (desktop)
        - Gap: 20px
      */}
      <div className="flex w-full items-center overflow-hidden rounded-tl-[0px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[24px] bg-[#0F68D6] px-[20px] py-[40px] sm:rounded-tr-[30px] sm:rounded-br-[30px] sm:rounded-bl-[30px] md:px-[40px] md:py-[48px] lg:h-[240px] lg:px-[60px] lg:py-0">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Left Column: Headline */}
          <div className="flex w-full flex-1 flex-col items-start justify-center lg:max-w-[1080px]">
            <h2 className="type-h2 leading-[29px] tracking-[-0.01em] text-white min-[375px]:leading-[31px] sm:leading-[60px]">
              See what Waterlabs would do <br className="hidden md:block" />
              on your numbers.
            </h2>
          </div>

          {/* Right Column: CTA Action Button (Desktop - Fill CTA) */}
          <div className="flex shrink-0 items-center">
            <Link href={safeButtonHref} className="inline-block">
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

export default CaseStudyCTA;
