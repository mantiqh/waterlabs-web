import Link from 'next/link';

import { CTA } from '@/components/CTA';
import { DEFAULT_HOME_DATA } from '@/data/home';

interface CTASectionProps {
  tag?: string;
  heading?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

export const CTASection = ({
  tag = DEFAULT_HOME_DATA.ctaTag,
  heading = DEFAULT_HOME_DATA.ctaHeading,
  primaryButtonText = DEFAULT_HOME_DATA.ctaPrimaryButtonText,
  primaryButtonLink = DEFAULT_HOME_DATA.ctaPrimaryButtonLink,
  secondaryButtonText = DEFAULT_HOME_DATA.ctaSecondaryButtonText,
  secondaryButtonLink = DEFAULT_HOME_DATA.ctaSecondaryButtonLink,
  backgroundImage = DEFAULT_HOME_DATA.ctaBackgroundImage ||
    '/images/home/get-in-touch/img_get_in_touch%20(1).png',
}: CTASectionProps) => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div
        className="w-full rounded-tr-[40px] lg:rounded-tr-[80px] bg-[#003AA5] bg-cover bg-right-top bg-no-repeat px-[20px] md:px-[40px] lg:px-[60px] py-[48px] md:py-[60px] lg:py-[72px]"
        style={{
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[32px] lg:gap-[48px]">
          {/* Left Text Block */}
          <div className="flex flex-col gap-[12px] lg:gap-[16px]">
            {tag && (
              <div className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#38BDF8] shrink-0" />
                <span className="type-body-xxs text-white/90">{tag}</span>
              </div>
            )}
            <h3 className="type-h3 text-white">{heading}</h3>
          </div>

          {/* Right CTA Buttons */}
          <div className="flex items-center gap-[12px] sm:gap-[16px] flex-wrap">
            <Link href={primaryButtonLink}>
              <CTA variant="light-bg">{primaryButtonText}</CTA>
            </Link>

            {/* Small Screen: Outline Button */}
            <div className="block lg:hidden">
              <Link href={secondaryButtonLink}>
                <CTA
                  variant="outline"
                  className="h-[38px] text-[14px] leading-[20px]"
                >
                  {secondaryButtonText}
                </CTA>
              </Link>
            </div>

            {/* Desktop: Default White Button */}
            <div className="hidden lg:block">
              <Link href={secondaryButtonLink}>
                <CTA variant="dark-bg">{secondaryButtonText}</CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
