import Image from 'next/image';
import Link from 'next/link';

import { CTA } from '@/components/CTA';

export interface SecurityPillar {
  title: string;
  description: string;
}

const DEFAULT_PILLARS: SecurityPillar[] = [
  {
    title: 'Standard BAA',
    description: 'Signed by default on every engagement, before a single system connects.',
  },
  {
    title: 'Proprietary infrastructure',
    description: 'Owned and run entirely by Waterlabs, with no public cloud dependency.',
  },
  {
    title: 'Independent audits',
    description: 'Third-party penetration test reports available on request.',
  },
  {
    title: 'Complete audit trails',
    description: 'Real-time, immutable logging of every agent and human action.',
  },
];

export interface EnterpriseSecuritySectionProps {
  eyebrow?: string;
  headingHighlight?: string;
  headingRest?: string;
  ctaText?: string;
  ctaLink?: string;
  pillars?: SecurityPillar[];
}

export const EnterpriseSecuritySection = ({
  eyebrow = 'Enterprise Healthcare Security',
  headingHighlight = 'Your data stays protected',
  headingRest = 'under strict BAA terms, on US-based infrastructure.',
  ctaText = 'How we handle data and security',
  ctaLink = '/trust-and-security',
  pillars = DEFAULT_PILLARS,
}: EnterpriseSecuritySectionProps) => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Curved Container:
        Desktop: border-radius 0px 60px 60px 0px, padding 80px 60px, width 1380px (Figma node 7487-16760)
        Mobile: border-radius 0px 30px 30px 0px, padding 40px 20px, full width (untouched)
        Background: Figma linear gradient with desktop texture overlay
      */}
      <div
        className="relative mr-auto w-full rounded-tr-[30px] rounded-br-[30px] bg-[#042849] bg-cover bg-center bg-no-repeat px-[20px] py-[40px] md:px-[40px] lg:w-[min(calc(100vw-60px),calc(50vw+660px))] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-[80px] lg:pr-[60px] lg:pl-[max(60px,calc((100vw-1320px)/2))]"
        style={{
          backgroundColor: '#042849',
          backgroundImage:
            "url('/images/home/enterprise-healthcare-security/bg_enterprise_healthcare_security.png'), linear-gradient(181.45deg, #0F68D6 -39.68%, #042849 45.11%)",
        }}
      >
        <div className="relative z-10 flex w-full max-w-[1260px] flex-col gap-[32px] lg:gap-[40px]">
          {/* =========================================================
              TOP HEADER BLOCK: Eyebrow + Heading + CTA Button
             ========================================================= */}
          <div className="flex w-full flex-col gap-[12px] lg:gap-[20px]">
            {/* Eyebrow Tag */}
            <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
              <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#63CCB7]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">{eyebrow}</span>
            </div>

            {/* Title & Action Button Row */}
            <div className="flex w-full flex-col items-start justify-between gap-[20px] lg:flex-row lg:items-end lg:gap-[24px]">
              <h2 className="type-h2 max-w-[923px] tracking-[-0.01em]">
                <span className="text-[#63CCB7]">{headingHighlight}</span>{' '}
                <span className="text-white">{headingRest}</span>
              </h2>

              <div className="shrink-0 self-start lg:self-end">
                <Link href={ctaLink}>
                  <CTA variant="dark-bg">{ctaText}</CTA>
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================
              SECURITY FEATURES CONTENT BOX (Desktop 1260x568, Mobile 362x728)
             ========================================================= */}
          <div className="flex w-full flex-col items-center justify-between gap-[20px] rounded-[20px_10px_20px_20px] bg-black/40 p-[20px] lg:flex-row lg:gap-[24px] lg:rounded-[18px_6px_18px_18px] lg:p-[32px] xl:gap-[40px] xl:p-[40px]">
            {/* Artwork / Image Card (Desktop 664x488, Mobile 322x280) */}
            <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:h-[360px] lg:h-[420px] lg:w-[48%] xl:h-[488px] xl:w-[664px]">
              {/* Mobile crop image */}
              <Image
                src="/images/home/enterprise-healthcare-security/img_enterprise_healthcare_security (1).png"
                alt="Healthcare professionals reviewing security in server room"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 664px"
                className="object-cover sm:hidden"
                priority
              />
              {/* Desktop image */}
              <Image
                src="/images/home/enterprise-healthcare-security/img_enterprise_healthcare_security.png"
                alt="Healthcare professionals reviewing security in server room"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 664px"
                className="hidden object-cover sm:block"
                priority
              />
            </div>

            {/* Right Security Pillars List (Desktop 496x488, Mobile 322x396) */}
            <div className="flex w-full flex-col justify-between gap-[16px] px-0 py-[4px] lg:w-[48%] lg:gap-[20px] lg:px-[12px] lg:py-[10px] xl:w-[496px] xl:gap-[32px] xl:px-[20px]">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex w-full flex-col gap-[6px] lg:gap-[8px] xl:gap-[14px]"
                >
                  <h3 className="type-h6 tracking-[-0.01em] text-[#91C6F2]">{pillar.title}</h3>
                  <p className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSecuritySection;
