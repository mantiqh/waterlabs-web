import { CTA } from '@/components/CTA';
import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';
import type { LocationItem } from '@/types/contact-us';

interface LocationCardProps {
  tag: string;
  title: string;
  address: string;
  email: string;
  hours: string;
  buttonText: string;
  href: string;
}

const LocationCard = ({
  tag,
  title,
  address,
  email,
  hours,
  buttonText,
  href,
}: LocationCardProps) => {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-[8px] border-b border-[#D7DCE2] pb-[12px] lg:h-full lg:max-w-[418.67px] lg:flex-1 lg:gap-[14px] lg:border-b-0 lg:pb-0">
      {/* Text - Tag */}
      <div className="flex h-[16px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
        <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#0F68D6] lg:h-[8px] lg:w-[8px]" />
        <span className="lg:type-body-xxs text-[12px] leading-[16px] tracking-[0.01em] text-[#7D8690]">
          {tag}
        </span>
      </div>

      {/* Content Container (Frame 2147226528) */}
      <div className="flex w-full flex-grow flex-row items-end justify-between gap-[12px] lg:flex-col lg:items-start lg:justify-between lg:gap-[16px]">
        {/* Text Block (Frame 2147226530 / 2147226531) */}
        <div className="flex w-full flex-col items-start gap-[12px]">
          <h3 className="lg:type-h6 text-[18px] leading-[26px] tracking-[-0.01em] text-[#0F68D6]">
            {title}
          </h3>
          <p className="lg:type-body-xxs text-[14px] leading-[20px] tracking-[0.01em] whitespace-pre-line text-[#2A2A2A] lg:min-h-[40px]">
            {address}
          </p>
          <p className="lg:type-body-xxs text-[14px] leading-[20px] tracking-[0.01em] text-[#2A2A2A]">
            {email}
          </p>
          <p className="lg:type-body-xxs text-[14px] leading-[20px] tracking-[0.01em] text-[#2A2A2A]">
            {hours}
          </p>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:mt-auto lg:block">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <CTA variant="light-bg">{buttonText}</CTA>
          </a>
        </div>

        {/* Mobile Circular CTA Button (Fill - arrow - indicator: 34px x 34px) */}
        <div className="block shrink-0 lg:hidden">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={buttonText}
            className="hover:bg-royal-blue flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0F68D6] transition-colors"
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[13px] w-[9px]"
            >
              <path
                d="M2 2L7 7L2 12"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

interface ContactUsOperatingInfoProps {
  locations?: LocationItem[];
  bgImage?: string;
}

export const ContactUsOperatingInfo = ({
  locations = DEFAULT_CONTACT_US_DATA.locations,
  bgImage = DEFAULT_CONTACT_US_DATA.operatingInfoBgImage,
}: ContactUsOperatingInfoProps) => {
  return (
    <section className="to-ghost-white relative w-full overflow-hidden bg-gradient-to-b from-[#8EBFE7] from-50% to-50%">
      {/* 
        Operating Info / Locations Section:
        - Desktop: 1440px, padding: 80px 60px, bg: white, border-radius: 0px 60px 60px 0px
        - Mobile: padding: 40px 20px, bg: white, border-radius: 0px 30px 30px 0px
        - Contains location cards side by side on desktop (gap: 32px), stacked on mobile
      */}
      <div
        className="w-full rounded-r-[30px] bg-white bg-cover bg-right bg-no-repeat px-[20px] py-[40px] md:px-[40px] lg:rounded-r-[60px] lg:px-[60px] lg:py-[80px]"
        style={{
          backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1320px]">
          {/* Frame 2147226790 / Frame 2147226529 */}
          <div className="flex max-w-[869.33px] flex-col items-start gap-[32px] lg:flex-row lg:items-stretch">
            {locations.map((loc) => (
              <LocationCard
                key={loc._key || loc.tag}
                tag={loc.tag}
                title={loc.title}
                address={loc.address}
                email={loc.email}
                hours={loc.hours}
                buttonText={loc.buttonText}
                href={loc.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsOperatingInfo;
