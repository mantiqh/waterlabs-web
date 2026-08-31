'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export const ContactUsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Contact Us Hero Banner:
        - Desktop: 1440px x 550px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Mobile: 402px x 490px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient overlay on hero image with decorative glassmorphic shape
      */}
      <div className="relative w-full min-h-[490px] lg:h-[550px] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[10px]">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop Background */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/images/contact-us/hero-section/img_banner (3).png"
              alt="Contact Us Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile/Tablet Background */}
          <div className="block lg:hidden absolute inset-0">
            <Image
              src="/images/contact-us/hero-section/img_banner_mobile.png"
              alt="Contact Us Background Mobile"
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

        {/* Hero Content (Desktop: Frame 8 / Frame 12 / Frame 2147203284, Mobile: Bottom aligned) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex-grow flex flex-col justify-end lg:justify-center items-start pt-[32px]">
          {/* Content Block (Mobile: gap-12, Desktop: Frame 2147226510 gap-20) */}
          <div className="w-full max-w-[664px] flex flex-col items-start gap-[12px] lg:gap-[20px]">
            {/* Heading + Subheading Stack (Frame 2147226524 gap-12) */}
            <div className="w-full flex flex-col items-start gap-[12px]">
              {/* Heading (52px / 60px / -0.01em, #111111) */}
              <h1 className="type-h2 tracking-[-0.01em] text-[#111111]">
                Contact <span className="text-electric-blue">Waterlabs</span>
              </h1>
              {/* Subheading (20px / 28px, #2A2A2A) */}
              <p className="type-body-s text-[#2A2A2A] max-w-[540px] lg:max-w-[664px]">
                We&apos;re always open to new conversations — whether<br className="hidden sm:inline" /> it&apos;s a question, a partnership, or just a hello.
              </p>
            </div>
            
            {/* CTA Button */}
            <a href="#contact-form">
              <CTA variant="light-bg">
                Contact us
              </CTA>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUsHeroSection;
