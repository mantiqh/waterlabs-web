import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

import Navbar from '../common/navbar';

export interface HeroData {
  heroHeading?: string;
  heroSubheading?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;
  heroBackgroundImageDesktop?: string;
  heroBackgroundImageMobile?: string;
}

export interface HeroProps {
  data?: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  const bgDesktop = data?.heroBackgroundImageDesktop || '/images/home/hero-bg.png';
  const bgMobile = data?.heroBackgroundImageMobile || '/images/home/hero-bg-mobile.png';

  return (
    <section className="relative w-full">
      <div className="relative flex flex-col justify-between gap-[40px] lg:gap-0 w-full min-h-[581px] lg:min-h-[850px] rounded-br-[30px] lg:rounded-br-[60px] pt-[20px] px-[20px] md:px-[40px] pb-[40px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-br-[30px] lg:rounded-br-[60px]">
          {/* Desktop Background */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src={bgDesktop}
              alt="Hero Background Desktop"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile/Tablet Background */}
          <div className="block lg:hidden absolute inset-0">
            <Image
              src={bgMobile}
              alt="Hero Background Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between w-full max-w-[1320px] mx-auto gap-[20px] lg:gap-[40px] xl:gap-[80px] 2xl:gap-[120px]">
          {/* Left Column */}
          <div className="flex flex-col gap-[20px] w-full flex-1 min-w-0 lg:max-w-[700px]">
            <div className="flex flex-row items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2]" />
              <span className="type-caption text-[#D7DCE2]">
                {data?.heroSubheading || 'Agentic RCM built from inside healthcare'}
              </span>
            </div>

            <h1 className="type-h1 text-white">
              {data?.heroHeading ||
                "Don't just automate your revenue cycle. Apply intelligence to it."}
            </h1>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[20px] lg:gap-[40px] w-full lg:w-[380px] xl:w-[460px] shrink-0 min-w-0">
            <p className="type-body-s text-[#F4F6F9]">
              {data?.heroDescription ||
                'We provide the platform that runs your revenue cycle. You measure it, we improve it.'}
            </p>

            <div className="flex flex-row flex-wrap items-center gap-[12px] lg:gap-[16px]">
              {/* Get a demo button */}
              <Link href={data?.heroCtaLink || '/contact-us'}>
                <CTA variant="dark-bg">
                  {data?.heroCtaText || 'Get a demo'}
                </CTA>
              </Link>

              {/* See how it works button */}
              <Link href={data?.heroSecondaryCtaLink || '#discover'}>
                <CTA variant="outline">
                  {data?.heroSecondaryCtaText || 'See how it works'}
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

