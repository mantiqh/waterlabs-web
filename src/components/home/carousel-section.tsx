import Image from 'next/image';
import React from 'react';

const marqueeItems = [
  { text: "No development fee", img: "/images/home/corousel-images/corousel-img-1.png" },
  { text: "Live in weeks, not months", img: "/images/home/corousel-images/corousel-img-2.png" },
  { text: "Billing starts day 15", img: "/images/home/corousel-images/corousel-img-1.png" },
];

export const CarouselSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#054FB9] lg:bg-[#2F70D1]">
      {/* 
        The background of the section itself is inherited from the parent or hero, 
        but to match the design (white rounded box overlapping the hero's blue), 
        we ensure the outer wrapper doesn't clip the white box's rounded corner. 
        Actually, the easiest way is a transparent background and pulling it up with negative margin if needed, 
        but standard stacking is fine since Hero sets its own layout. 
      */}
      <div className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[60px] pt-[40px] pb-[20px] lg:pt-[96px] lg:pb-[20px] flex flex-col gap-[40px] lg:gap-[96px]">
        
        {/* Desktop/Tablet Marquee Row */}
        <div className="hidden lg:flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[40px] pr-[40px]">
            {/* First Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set1-${index}`} className="flex items-center gap-[20px]">
                <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                  <Image src={item.img} alt="" fill className="object-cover" />
                </div>
                <span className="font-primary font-normal text-electric-blue text-[68px] leading-[1.11] tracking-[-0.01em]">
                  {item.text}
                </span>
              </div>
            ))}
            {/* Second Set (Duplicate for smooth infinite scroll) */}
            {marqueeItems.map((item, index) => (
              <div key={`set2-${index}`} className="flex items-center gap-[20px]">
                <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                  <Image src={item.img} alt="" fill className="object-cover" />
                </div>
                <span className="font-primary font-normal text-electric-blue text-[68px] leading-[1.11] tracking-[-0.01em]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[40px] pr-[40px]" aria-hidden="true">
            {/* First Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set3-${index}`} className="flex items-center gap-[20px]">
                <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                  <Image src={item.img} alt="" fill className="object-cover" />
                </div>
                <span className="font-primary font-normal text-electric-blue text-[68px] leading-[1.11] tracking-[-0.01em]">
                  {item.text}
                </span>
              </div>
            ))}
            {/* Second Set */}
            {marqueeItems.map((item, index) => (
              <div key={`set4-${index}`} className="flex items-center gap-[20px]">
                <div className="relative w-[140px] h-[64px] rounded-[40px] overflow-hidden shrink-0">
                  <Image src={item.img} alt="" fill className="object-cover" />
                </div>
                <span className="font-primary font-normal text-electric-blue text-[68px] leading-[1.11] tracking-[-0.01em]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Static Text */}
        <div className="block lg:hidden w-full px-[20px] lg:px-[60px]">
          <h2 className="font-primary font-normal text-electric-blue text-[24px] leading-[1.33] tracking-[-0.01em]">
            No development fee, Live in weeks, not months
          </h2>
        </div>

        {/* Video Thumbnail Area */}
        <div className="px-[20px] lg:px-[60px] w-full">
          <div className="w-full max-w-[1320px] mx-auto relative rounded-[15px] lg:rounded-[30px] overflow-hidden aspect-[362/159] lg:aspect-[1320/579] bg-gray-100">
            {/* Desktop Image */}
            <Image 
              src="/images/home/corousel-images/corousel-banner-img.png" 
              alt="Video preview" 
              fill
              priority
              unoptimized
              className="hidden lg:block object-cover w-full h-full"
            />
            {/* Mobile Image */}
            <Image 
              src="/images/home/corousel-images/corousel-banner-mobile-img.png" 
              alt="Video preview" 
              fill
              priority
              unoptimized
              className="block lg:hidden object-cover w-full h-full"
            />
            
            {/* Note: The play button icon is intentionally omitted here as requested by the user */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CarouselSection;
