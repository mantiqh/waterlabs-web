import Link from 'next/link';

import { CTA } from '@/components/CTA';

export const PaymentPostingCTASection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
      }}
    >
      <div className="bg-electric-blue w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[50px] lg:rounded-bl-[30px] lg:px-[60px] lg:py-[60px]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Heading */}
          <h2 className="type-h2 max-w-[1148px] text-white">
            Discover how this works on <br className="hidden lg:block" />
            your remittance volume.
          </h2>

          {/* CTA Button */}
          <div className="shrink-0">
            <Link href="/contact-us">
              <CTA variant="dark-bg">Get a Demo</CTA>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPostingCTASection;
