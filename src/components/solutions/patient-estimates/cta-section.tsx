import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const PatientEstimatesCTASection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
      }}
    >
      <div className="w-full bg-electric-blue rounded-tr-[30px] rounded-br-[30px] lg:rounded-bl-[30px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[50px] lg:py-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[24px] lg:gap-[20px]">
          {/* Heading */}
          <h2 className="type-h2 text-white max-w-[1148px]">
            Discover how this works on{' '}
            <br className="hidden lg:block" />
            your appointment schedule.
          </h2>

          {/* CTA Button */}
          <div className="shrink-0">
            <Link href="/contact-us">
              <CTA variant="dark-bg">
                Get a Demo
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientEstimatesCTASection;
