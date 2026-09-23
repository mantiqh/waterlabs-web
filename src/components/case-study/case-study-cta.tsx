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
    : (buttonHref || '/contact-us');

  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        Case Study Bottom CTA Banner (Figma Frame 2147226494, node 5419-5637):
        - Frame dimensions: max-w-[1440px], padding: 60px (desktop)
        - Background: #0F68D6 (Electric Blue)
        - Border radius: 0px 30px 30px 30px (desktop)
        - Gap: 20px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tl-[0px] rounded-tr-[24px] sm:rounded-tr-[30px] rounded-br-[24px] sm:rounded-br-[30px] rounded-bl-[24px] sm:rounded-bl-[30px] py-[40px] px-[20px] md:py-[48px] md:px-[40px] lg:py-0 lg:px-[60px] lg:h-[240px] flex items-center overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[20px]">
          
          {/* Left Column: Headline */}
          <div className="w-full lg:max-w-[1080px] flex-1 flex flex-col justify-center items-start">
            <h2 className="text-[23px] min-[375px]:text-[25px] sm:type-h2 text-white tracking-[-0.01em] leading-[29px] min-[375px]:leading-[31px] sm:leading-[60px]">
              See what Waterlabs would do
              <br />
              on your numbers.
            </h2>
          </div>

          {/* Right Column: CTA Action Button (Desktop - Fill CTA) */}
          <div className="shrink-0 flex items-center">
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
