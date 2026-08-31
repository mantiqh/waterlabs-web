'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { CTA } from '@/components/CTA';

export const ContactUsContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    company: '',
    message: '',
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData, agreed);
  };

  return (
    <section id="contact-form" className="relative w-full bg-gradient-to-b from-white from-50% to-[#020c47] to-50% overflow-hidden">
      {/* 
        Contact Form Section:
        - Desktop: 1440px, padding: 0px 60px, bg: #F4F6F9, border-radius: 60px 0px 0px 60px
        - Mobile: padding: 40px 20px, bg: #F4F6F9, border-radius: 30px 0px 0px 30px
        - Desktop: Two columns — left has tag + heading + image, right has form
        - Mobile: Stacked — tag + heading, image, form
      */}
      <div className="w-full bg-ghost-white rounded-l-[30px] lg:rounded-l-[60px]">
        <div className="w-full max-w-[1440px] mx-auto px-[20px] lg:px-[60px] py-[40px] lg:py-[80px]">
          <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[32px]">

            {/* Left Column (Frame 2147226540: 516px x 464px, gap: 40px) */}
            <div className="w-full lg:w-[516px] lg:h-[464px] shrink-0 flex flex-col items-start gap-[12px] lg:gap-[40px]">
              {/* Tag + Heading (Frame 2147226533: 516px x 96px, gap: 12px) */}
              <div className="w-full flex flex-col items-start gap-[8px] lg:gap-[12px]">
                {/* Text - Tag (gap: 8px, height: 24px) */}
                <div className="flex items-center gap-[8px] h-[24px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
                    Send us a message
                  </span>
                </div>
                {/* Heading (52px / 60px / -0.01em, #0F68D6) */}
                <h2 className="type-h2 tracking-[-0.01em] text-electric-blue">
                  Contact Form
                </h2>
              </div>

              {/* Image Container (Frame 2147226534: 516px x 328px) */}
              <div className="w-full relative overflow-hidden rounded-[20px_10px_20px_20px] lg:rounded-[30px_15px_30px_30px] h-[230px] lg:h-[328px] lg:w-[516px] shrink-0">
                <Image
                  src="/images/contact-us/contact-form/img_contact _form.png"
                  alt="Contact form illustration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 516px"
                  className="object-cover object-center"
                />
                {/* Exact Figma Gradient overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Form (Frame: 772px x 464px, gap: 14px) */}
            <form onSubmit={handleSubmit} className="w-full lg:w-[772px] lg:h-[464px] flex flex-col items-start gap-[16px] lg:gap-[14px]">
              {/* Frame 2147226535 (772px x 246px, gap: 12px) */}
              <div className="w-full flex flex-col items-start gap-[12px] lg:h-[246px]">
                {/* Input container 1 (772px x 60px, gap: 12px) */}
                <div className="w-full flex flex-col lg:flex-row items-start gap-[12px] h-auto lg:h-[60px]">
                  {/* First Name */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Input container 2 (772px x 60px, gap: 12px) */}
                <div className="w-full flex flex-col lg:flex-row items-start gap-[12px] h-auto lg:h-[60px]">
                  {/* Work Email */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="email"
                      name="workEmail"
                      placeholder="Work Email*"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                  {/* Company */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Message (772px x 102px) */}
                <div className="w-full h-[102px] border-b border-[#D7DCE2] px-[16px] pt-[18px]">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full h-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Frame 2147226538 (772px x 204px, gap: 16px) */}
              <div className="w-full flex flex-col items-start gap-[16px] lg:h-[204px]">
                {/* Frame 2147226537 (772px x 144px, gap: 12px) */}
                <div className="w-full flex flex-col items-start gap-[12px] lg:h-[144px]">
                  {/* Main heading (772px x 24px) */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#333333] lg:h-[24px]">
                    Stay ahead of the curve. Sign up to receive exclusive Waterlabs updates, resources, and tips.
                  </p>

                  {/* Frame 2147226536 (772px x 24px, gap: 8px) */}
                  <div className="flex items-center gap-[8px] lg:h-[24px]">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`w-[20px] h-[20px] rounded-[2px] flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        agreed ? 'bg-electric-blue' : 'bg-[#CCCCCC]'
                      }`}
                      aria-label="Agree to terms"
                    >
                      {agreed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[8px]">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="type-body-xxs tracking-[0.01em] text-[#333333]">
                      I agree to receive other communications from Waterlabs.*
                    </span>
                  </div>

                  {/* Main heading / Disclaimer (772px x 72px) */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#333333] lg:h-[72px]">
                    You may unsubscribe from these communications at any time. For more information on how to<br className="hidden lg:inline" />
                    unsubscribe, our privacy practices, and how we are committed to protecting and respecting your<br className="hidden lg:inline" />
                    privacy, please review our Privacy Policy.
                  </p>
                </div>

                {/* Desktop - Fill CTA (Submit Button) */}
                <CTA variant="light-bg" type="submit">
                  Submit
                </CTA>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsContactForm;
