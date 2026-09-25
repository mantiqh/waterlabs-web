import Image from 'next/image';

import { DEFAULT_HOME_DATA } from '@/data/home';
import type { MarqueeItem } from '@/types/home';

interface CarouselSectionProps {
  marqueeItems?: MarqueeItem[];
  mobileText?: string;
  bannerImageDesktop?: string;
  bannerImageMobile?: string;
}

export const CarouselSection = ({
  marqueeItems = DEFAULT_HOME_DATA.marqueeItems,
  mobileText = DEFAULT_HOME_DATA.marqueeMobileText ||
    'No development fee, Live in weeks, not months',
  bannerImageDesktop = DEFAULT_HOME_DATA.bannerImageDesktop ||
    '/images/home/corousel-images/corousel-banner-img.png',
  bannerImageMobile = DEFAULT_HOME_DATA.bannerImageMobile ||
    '/images/home/corousel-images/corousel-banner-mobile-img.png',
}: CarouselSectionProps) => {
  return (
    <section className="relative w-full bg-[#054FB9] lg:bg-[#2F70D1]">
      <div className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[60px] pt-[40px] pb-[20px] lg:pt-[96px] lg:pb-[20px] flex flex-col gap-[40px] lg:gap-[96px]">
        {/* Desktop/Tablet Marquee Row */}
        <div className="hidden lg:flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[40px] pr-[40px]">
            {/* First Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set1-${index}`} className="flex items-center gap-[20px]">
                {item.image && (
                  <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="type-h1 text-electric-blue">{item.text}</span>
              </div>
            ))}
            {/* Second Set (Duplicate for smooth infinite scroll) */}
            {marqueeItems.map((item, index) => (
              <div key={`set2-${index}`} className="flex items-center gap-[20px]">
                {item.image && (
                  <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="type-h1 text-electric-blue">{item.text}</span>
              </div>
            ))}
          </div>

          <div
            className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[40px] pr-[40px]"
            aria-hidden="true"
          >
            {/* Third Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set3-${index}`} className="flex items-center gap-[20px]">
                {item.image && (
                  <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="type-h1 text-electric-blue">{item.text}</span>
              </div>
            ))}
            {/* Fourth Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set4-${index}`} className="flex items-center gap-[20px]">
                {item.image && (
                  <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="type-h1 text-electric-blue">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Static Text */}
        <div className="block lg:hidden w-full px-[20px] md:px-[40px] lg:px-[60px]">
          <h4 className="type-h4 text-electric-blue">{mobileText}</h4>
        </div>

        {/* Video Thumbnail Area */}
        <div className="px-[20px] md:px-[40px] lg:px-[60px] w-full">
          <div className="w-full max-w-[1320px] mx-auto relative rounded-[15px] lg:rounded-[30px] overflow-hidden aspect-[362/159] lg:aspect-[1320/579] bg-gray-100">
            {/* Desktop Image */}
            {bannerImageDesktop && (
              <Image
                src={bannerImageDesktop}
                alt="Video preview"
                fill
                priority
                unoptimized
                className="hidden lg:block object-cover w-full h-full"
              />
            )}
            {/* Mobile Image */}
            {bannerImageMobile && (
              <Image
                src={bannerImageMobile}
                alt="Video preview"
                fill
                priority
                unoptimized
                className="block lg:hidden object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
