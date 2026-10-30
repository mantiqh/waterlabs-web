import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';
import { HIMER_TRUST_SECURITY_DATA } from '@/data/himer';

import { CertificationStrip } from './certification-strip';

export const HimerTrustSecuritySection = () => (
  <section className="bg-ghost-white text-gray-black relative w-full rounded-bl-[30px] pt-[60px] pb-10 md:py-20 lg:rounded-bl-[60px] lg:py-20">
    <div className="layout-container">
      <div className="mb-3 flex items-center gap-1">
        <span className="bg-electric-blue size-2 rounded-full" />
        <span className="type-body-xxs text-medium-gray max-md:text-sm max-md:leading-5">
          {HIMER_TRUST_SECURITY_DATA.tag}
        </span>
      </div>
      <div className="mb-5 grid grid-cols-1 items-start gap-5 lg:mb-20 lg:grid-cols-2 lg:gap-5">
        <h2 className="type-h2 text-black max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
          {HIMER_TRUST_SECURITY_DATA.headline}
        </h2>
        <div className="flex flex-col items-start gap-5">
          <p className="type-body-xxs max-md:text-sm max-md:leading-6">
            {HIMER_TRUST_SECURITY_DATA.subtext}
          </p>
          <Link href={HIMER_TRUST_SECURITY_DATA.ctaHref}>
            <CTA variant="light-bg" size="compact-mobile" as="span">
              {HIMER_TRUST_SECURITY_DATA.ctaText}
            </CTA>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,664fr)_minmax(0,616fr)] lg:gap-x-10 lg:gap-y-0">
        <div className="relative aspect-[362/305] overflow-hidden rounded-[20px_10px_20px_20px] md:aspect-[664/560]">
          <Image
            src="/images/himer/img_trust_security.png"
            alt="Waterlabs secure infrastructure and dedicated server facility"
            fill
            sizes="(min-width: 1440px) 664px, (min-width: 1024px) 47vw, (min-width: 720px) calc(100vw - 80px), calc(100vw - 40px)"
            className="hidden object-cover object-center md:block"
          />
          <Image
            src="/images/himer/img_trust_security_mobile.png"
            alt="Waterlabs secure infrastructure and dedicated server facility"
            fill
            sizes="(min-width: 1440px) 664px, (min-width: 1024px) 47vw, (min-width: 720px) calc(100vw - 80px), calc(100vw - 40px)"
            className="object-cover object-center md:hidden"
          />
        </div>
        <div className="flex flex-col gap-3 p-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[min(560px,39vw)] lg:justify-between lg:gap-5 lg:p-0">
          {HIMER_TRUST_SECURITY_DATA.pillars.map((pillar) => (
            <div key={pillar.title} className="border-light-gray border-b pb-[11px] lg:pb-5">
              <h3 className="type-h6 text-electric-blue mb-3.5 max-md:text-lg max-md:leading-[26px]">
                {pillar.title}
              </h3>
              <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
        <CertificationStrip />
      </div>
    </div>
  </section>
);

export default HimerTrustSecuritySection;
