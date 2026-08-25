'use client';

import Image from 'next/image';
import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-[80px] lg:pb-[120px] px-[20px] lg:px-[80px]">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Main Testimonial Card */}
        <div className="relative w-full flex flex-col lg:flex-row gap-[40px] overflow-hidden items-center lg:items-start">
          
          {/* Left Image Side */}
          <div className="relative w-full lg:w-[480px] aspect-[4/3] rounded-[20px] overflow-hidden shrink-0">
            <Image 
              src="/images/home/features-images/AdobeStock_588310218%204.png" 
              alt="Terri Edwards" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Right Content Side */}
          <div className="flex flex-col justify-center flex-1">
            <p className="font-normal text-[16px] lg:text-[20px] leading-[1.4] text-[#111111] mb-[40px]">
              “Our partnership has become a valuable extension of our front-office operations. The team provides critical support with eligibility verification, fax management, authorization processing and retrieval, plan of care tracking, and other essential administrative functions. Through a strong collaborative partnership, ongoing training, and continuous process improvement, we have achieved increased efficiency, reduced denials, lowered operational costs, and been able to leverage automation more effectively. Their commitment to our quality required, turnaround times and adaptability has made them a trusted partner in supporting our growth and success.”
            </p>

            <div className="flex flex-col gap-[4px] lg:gap-[8px]">
              <span className="font-general-sans font-normal text-[24px] lg:text-[32px] text-[#0F68D6] leading-[1.2]">
                Terri Edwards
              </span>
              <span className="font-medium text-[14px] lg:text-[16px] text-[#2A2A2A]">
                Vice President of Intake
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Indicators / Navigation */}
        <div className="flex items-center justify-between w-full mt-[32px] lg:mt-[40px] px-[16px] lg:px-[32px]">
          {/* Dots */}
          <div className="flex items-center gap-[6px]">
            <div className="w-[20px] h-[4px] rounded-full bg-[#0F68D6]"></div>
            <div className="w-[4px] h-[4px] rounded-full bg-[#91C6F2]"></div>
            <div className="w-[4px] h-[4px] rounded-full bg-[#91C6F2]"></div>
          </div>
          
          {/* Arrows */}
          <div className="flex items-center gap-[12px]">
            {/* Left Arrow */}
            <button className="group w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full border border-[#0F68D6] flex items-center justify-center text-[#0F68D6] hover:bg-[#0F68D6] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none">
              <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rotate-180 scale-[0.8] lg:scale-100">
                <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor"/>
                <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor"/>
              </svg>
            </button>
            {/* Right Arrow */}
            <button className="group w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#0F68D6] flex items-center justify-center text-white [@media(hover:hover)]:hover:bg-gradient-to-br [@media(hover:hover)]:hover:from-[#0F68D6] [@media(hover:hover)]:hover:from-[50%] [@media(hover:hover)]:hover:to-[#43D4B6] transition-all duration-300 cursor-pointer focus:outline-none">
              <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 scale-[0.8] lg:scale-100">
                <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor"/>
                <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
