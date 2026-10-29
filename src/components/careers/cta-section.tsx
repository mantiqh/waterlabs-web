import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const CareersCTASection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 
        CTA Card with Top-Right rounded corner:
        - Desktop: rounded-tr-[80px], py-[80px] px-[60px], min-h-[508px]
        - Mobile: rounded-tr-[30px], py-[40px] px-[20px], min-h-[402px]
      */}
      <div className="relative flex min-h-[402px] w-full flex-col justify-center overflow-hidden rounded-tr-[30px] px-[20px] py-[40px] md:px-[40px] lg:min-h-[508px] lg:rounded-tr-[80px] lg:px-[60px] lg:py-[80px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/careers/cta-section/img_come_do_the_most_meaningful_work_of_your_career.png"
            alt="Come do the most meaningful work of your career"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[20px] lg:gap-[24px]">
          {/* Main Text Content Block */}
          <div className="flex w-full max-w-[687px] flex-col items-start gap-[14px] lg:gap-[20px]">
            {/* Heading */}
            <h2 className="type-h3 text-white lg:text-[#91C6F2]">
              Come do the most meaningful work of your career. On a problem that matters.
            </h2>

            {/* Description Subheading */}
            <p className="type-body-xs max-w-[566px] text-[#F4F6F9]">
              We work for impact. The applause follows. Your work matters. We&apos;ll help you turn
              it into results that are visible.
            </p>
          </div>

          {/* CTA Action Button */}
          <div className="mt-[4px] lg:mt-[8px]">
            <Link href="#where-you-would-fit">
              <CTA variant="dark-bg">See Open Roles</CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTASection;
