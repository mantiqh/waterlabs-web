import Image from 'next/image';

import type { FounderItem } from '@/types/about-us';

const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-[#0F68D6] transition-opacity hover:opacity-80"
  >
    <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.5V10H9V17ZM7.75 8.875C6.92 8.875 6.25 8.205 6.25 7.375C6.25 6.545 6.92 5.875 7.75 5.875C8.58 5.875 9.25 6.545 9.25 7.375C9.25 8.205 8.58 8.875 7.75 8.875ZM18 17H15.5V13.25C15.5 12.15 14.85 11.75 14.25 11.75C13.5 11.75 13 12.3 13 13.25V17H10.5V10H13V11C13.5 10.3 14.4 9.8 15.4 9.8C16.9 9.8 18 10.8 18 12.8V17Z" />
  </svg>
);

const founders: FounderItem[] = [
  {
    name: 'Kamal Raj',
    title: 'Founder President Chairman of the Board',
    bio: 'Twenty years inside revenue cycle operations before founding Waterlabs in 2019. Built RCM systems for hospital networks across India and the US.',
    image: '/images/about-us/the-founders/img_kamal_raj.png',
  },
  {
    name: 'Jitendra Gupta',
    title: 'CEO',
    bio: 'Fifteen years building autonomous systems for healthcare. Author of the agentic-RCM architecture patents filed in 2019.',
    image: '/images/about-us/the-founders/img_jitendra_gupta.png',
  },
];

export const TheFoundersSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6F9]">
      {/* 
        The Founders Section
        Wrapper: #F4F6F9
        Inner Container: White background with bottom border divider separating from The Team Section
      */}
      <div className="w-full rounded-tl-[30px] bg-white px-[20px] pt-[48px] md:px-[40px] md:pt-[60px] lg:rounded-tl-[60px] lg:px-[60px] lg:pt-[80px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[32px] border-b border-[#D7DCE2] pb-[32px] md:pb-[48px] lg:flex-row lg:gap-[20px] lg:pb-[60px]">
          {/* Left Header Column */}
          <div className="flex w-full min-w-0 shrink-0 flex-col items-start gap-[16px] lg:w-[35%] lg:gap-[20px] xl:w-[538px]">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">Who we are</span>
            </div>

            {/* Heading */}
            <h2 className="type-h2 text-black">The Founders</h2>
          </div>

          {/* Right: Two Founder Cards */}
          <div className="flex w-full min-w-0 flex-1 flex-col items-stretch gap-[20px] sm:flex-row lg:w-[62%] xl:w-[762px]">
            {founders.map((founder, idx) => (
              <div key={idx} className="flex min-w-0 flex-1 flex-col items-start gap-[16px]">
                {/* Founder Photo */}
                <div className="relative h-[239px] w-full overflow-hidden rounded-[20px_10px_20px_20px] bg-gradient-to-b from-[#7D8690] to-[#D7DCE2] sm:h-[260px] lg:h-[220px] xl:h-[300px]">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 371px"
                  />
                </div>

                {/* Founder Details */}
                <div className="flex w-full flex-col items-start gap-[16px] lg:gap-[24px]">
                  <div className="flex w-full flex-row items-start justify-between gap-[8px]">
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-[4px]">
                      <h5 className="type-h5 text-[#042849]">{founder.name}</h5>
                      <p className="type-body-xxs text-[#7D8690]">{founder.title}</p>
                    </div>
                    <div className="pt-[4px]">
                      <LinkedInIcon />
                    </div>
                  </div>

                  <p className="type-body-xxs leading-[20px] text-[#042849] lg:leading-[24px]">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheFoundersSection;
