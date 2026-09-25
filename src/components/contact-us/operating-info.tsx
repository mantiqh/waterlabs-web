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
    <div className="flex flex-col items-start gap-[8px] lg:gap-[14px] pb-[12px] lg:pb-0 border-b border-[#D7DCE2] lg:border-b-0 w-full lg:flex-1 lg:max-w-[418.67px] min-w-0 lg:h-full">
      {/* Text - Tag */}
      <div className="flex items-center gap-[4px] lg:gap-[8px] h-[16px] lg:h-[24px]">
        <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
        <span className="text-[12px] leading-[16px] lg:type-body-xxs tracking-[0.01em] text-[#7D8690]">
          {tag}
        </span>
      </div>

      {/* Content Container (Frame 2147226528) */}
      <div className="flex flex-row justify-between items-end lg:flex-col lg:items-start lg:justify-between gap-[12px] lg:gap-[16px] w-full flex-grow">
        {/* Text Block (Frame 2147226530 / 2147226531) */}
        <div className="flex flex-col items-start gap-[12px] w-full">
          <h3 className="text-[18px] leading-[26px] lg:type-h6 tracking-[-0.01em] text-[#0F68D6]">
            {title}
          </h3>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A] whitespace-pre-line lg:min-h-[40px]">
            {address}
          </p>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
            {email}
          </p>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
            {hours}
          </p>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block lg:mt-auto">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <CTA variant="light-bg">{buttonText}</CTA>
          </a>
        </div>

        {/* Mobile Circular CTA Button (Fill - arrow - indicator: 34px x 34px) */}
        <div className="block lg:hidden shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={buttonText}
            className="w-[34px] h-[34px] rounded-full bg-[#0F68D6] flex items-center justify-center hover:bg-royal-blue transition-colors shrink-0"
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[9px] h-[13px]"
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
    <section className="relative w-full bg-gradient-to-b from-[#8EBFE7] from-50% to-ghost-white to-50% overflow-hidden">
      {/* 
        Operating Info / Locations Section:
        - Desktop: 1440px, padding: 80px 60px, bg: white, border-radius: 0px 60px 60px 0px
        - Mobile: padding: 40px 20px, bg: white, border-radius: 0px 30px 30px 0px
        - Contains location cards side by side on desktop (gap: 32px), stacked on mobile
      */}
      <div
        className="w-full bg-white bg-cover bg-right bg-no-repeat rounded-r-[30px] lg:rounded-r-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px]"
        style={{
          backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
        }}
      >
        <div className="relative z-10 w-full max-w-[1320px] mx-auto">
          {/* Frame 2147226790 / Frame 2147226529 */}
          <div className="flex flex-col lg:flex-row lg:items-stretch items-start gap-[32px] max-w-[869.33px]">
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
