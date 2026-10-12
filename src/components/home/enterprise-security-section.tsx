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
    description:
      'Signed by default on every engagement, before a single system connects.',
  },
  {
    title: 'Proprietary infrastructure',
    description:
      'Owned and run entirely by Waterlabs, with no public cloud dependency.',
  },
  {
    title: 'Independent audits',
    description:
      'Third-party penetration test reports available on request.',
  },
  {
    title: 'Complete audit trails',
    description:
      'Real-time, immutable logging of every agent and human action.',
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
  ctaText = 'How we handle data security',
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
        className="w-full lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] relative bg-cover bg-no-repeat bg-center"
        style={{
          background:
            'linear-gradient(181.45deg, #0F68D6 -39.68%, #042849 45.11%)',
          backgroundImage:
            "url('/images/home/enterprise-healthcare-security/bg_enterprise_healthcare_security.png')",
        }}
      >
        <div className="relative z-10 w-full max-w-[1260px] flex flex-col gap-[32px] lg:gap-[40px]">

          {/* =========================================================
              TOP HEADER BLOCK: Eyebrow + Heading + CTA Button
             ========================================================= */}
          <div className="flex flex-col gap-[12px] lg:gap-[20px] w-full">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[#63CCB7] shrink-0" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                {eyebrow}
              </span>
            </div>

            {/* Title & Action Button Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[20px] lg:gap-[24px] w-full">
              <h2 className="type-h2 tracking-[-0.01em] max-w-[923px]">
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
          <div className="w-full bg-black/40 rounded-[20px_10px_20px_20px] lg:rounded-[18px_6px_18px_18px] p-[20px] lg:p-[32px] xl:p-[40px] flex flex-col lg:flex-row items-center justify-between gap-[20px] lg:gap-[24px] xl:gap-[40px]">

            {/* Artwork / Image Card (Desktop 664x488, Mobile 322x280) */}
            <div className="relative w-full lg:w-[48%] xl:w-[664px] h-[280px] sm:h-[360px] lg:h-[420px] xl:h-[488px] rounded-[20px_10px_20px_20px] overflow-hidden shrink-0 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
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
                className="object-cover hidden sm:block"
                priority
              />
            </div>

            {/* Right Security Pillars List (Desktop 496x488, Mobile 322x396) */}
            <div className="w-full lg:w-[48%] xl:w-[496px] flex flex-col justify-between py-[4px] lg:py-[10px] px-0 lg:px-[12px] xl:px-[20px] gap-[16px] lg:gap-[20px] xl:gap-[32px]">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex flex-col gap-[6px] lg:gap-[8px] xl:gap-[14px] w-full"
                >
                  <h3 className="type-h6 tracking-[-0.01em] text-[#91C6F2]">
                    {pillar.title}
                  </h3>
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
