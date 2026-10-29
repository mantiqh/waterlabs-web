import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const BlogsCTASection = () => {
  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50% p-0">
      {/* 
        CTA Banner Card (Figma: Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 140px, padding: 40px 60px, gap: 20px, background: #0F68D6, border-radius: 30px 0 0 30px
        - Mobile: 402px x 174px, padding: 40px 20px, gap: 24px, background: #0F68D6, border-radius: 30px 0 0 30px
      */}
      <div className="rounded-tr-0 rounded-br-0 flex w-full items-center overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#0F68D6] px-[20px] py-[40px] md:px-[40px] md:py-[48px] lg:h-[240px] lg:px-[60px] lg:py-0">
        {/* Content Container (max-w-[1320px]) */}
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-center">
          {/* Headline */}
          <h2 className="sm:type-h2 text-[23px] leading-[29px] tracking-[-0.01em] text-white min-[375px]:text-[25px] min-[375px]:leading-[31px] sm:leading-[60px]">
            See what Waterlabs would do
            <br />
            on your numbers.
          </h2>

          {/* Action CTA Button */}
          <div className="flex shrink-0 items-center">
            <Link href="/contact-us" className="inline-block">
              <CTA variant="dark-bg" as="div">
                GET A DEMO
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsCTASection;
