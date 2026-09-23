'use client';

import Image from 'next/image';
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';

const ORG_TYPE_OPTIONS = [
  'Health system',
  'Medical Group',
  'Community Health Center',
  'Outpatient Facility',
  'Hospital',
  'Other',
];

export const ContactUsContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    emailId: '',
    phoneNumber: '',
    company: '',
    orgType: '',
    challenge: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.orgType) {
      setIsDropdownOpen(true);
      return;
    }
    // Form submission logic
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
        <div className="w-full max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[60px] py-[40px] lg:py-[80px]">
          <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[32px]">

            {/* Left Column (Frame 2147226540: max 516px, gap: 40px) */}
            <div className="w-full lg:w-[40%] xl:w-[516px] lg:max-w-[516px] shrink-0 min-w-0 flex flex-col items-start gap-[12px] lg:gap-[40px]">
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

              {/* Image Container (Frame 2147226534: max 516px x 328px) */}
              <div className="w-full relative overflow-hidden rounded-[20px_10px_20px_20px] lg:rounded-[30px_15px_30px_30px] aspect-[516/328] lg:w-full">
                <Image
                  src="/images/contact-us/contact-form/contact-form.jpg"
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

            {/* Right Column: Form (Frame: max 772px x 464px, gap: 14px) */}
            <form onSubmit={handleSubmit} className="w-full lg:w-[60%] xl:w-[772px] lg:flex-1 min-w-0 flex flex-col items-start gap-[16px] lg:gap-[14px]">
              {/* Input Fields Container */}
              <div className="w-full flex flex-col items-start gap-[12px]">
                {/* Input container 1: Name & Org */}
                <div className="w-full flex flex-col lg:flex-row items-start gap-[12px]">
                  {/* Name */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                  {/* Org */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="org"
                      placeholder="Org*"
                      value={formData.org}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Input container 2: Email ID & Phone number */}
                <div className="w-full flex flex-col lg:flex-row items-start gap-[12px]">
                  {/* Email ID */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="email"
                      name="emailId"
                      placeholder="Email ID*"
                      value={formData.emailId}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                  {/* Phone number */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Input container 3: Company & Organization Type */}
                <div className="w-full flex flex-col lg:flex-row items-start gap-[12px] relative z-20">
                  {/* Company */}
                  <div className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px]">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company*"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none"
                    />
                  </div>
                  {/* Organization Type */}
                  <div
                    ref={dropdownRef}
                    className="w-full lg:w-[380px] lg:flex-1 h-[60px] flex items-center border-b border-[#D7DCE2] px-[16px] relative"
                  >
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      className="w-full h-full flex items-center justify-between text-left outline-none cursor-pointer group"
                    >
                      <span className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {formData.orgType || 'Organization Type*'}
                      </span>
                      <div
                        className={`transition-transform duration-200 text-[#7D8690] group-hover:text-[#0F68D6] ${isDropdownOpen ? '-rotate-90 text-[#0F68D6]' : 'rotate-90'
                          }`}
                      >
                        <ChevronRight className="w-[8px] h-[12px] xl:w-[9.73px] xl:h-[14.63px] shrink-0" />
                      </div>
                    </button>

                    {/* Hidden input to maintain form state */}
                    <input type="hidden" name="orgType" value={formData.orgType} />

                    {/* Dropdown Menu (matching Navbar dropdown UI in Image 2 and section colors) */}
                    {isDropdownOpen && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#F4F6F9] backdrop-blur-[20px] rounded-[20px_10px_20px_20px] p-[16px] shadow-[0_16px_40px_rgba(4,40,73,0.10)] border border-[#D7DCE2] z-50 flex flex-col gap-[4px] animate-in fade-in-0 zoom-in-95 duration-150"
                        role="listbox"
                      >
                        {ORG_TYPE_OPTIONS.map((opt) => {
                          const isSelected = formData.orgType === opt;
                          const isHovered = hoveredOption === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onMouseEnter={() => setHoveredOption(opt)}
                              onMouseLeave={() => setHoveredOption(null)}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, orgType: opt }));
                                setIsDropdownOpen(false);
                                setHoveredOption(null);
                              }}
                              className={`h-[40px] w-full flex flex-row items-center gap-[14px] px-[12px] py-[8px] body-xxs type-body-xxs transition-colors duration-150 cursor-pointer text-left ${
                                isSelected || isHovered
                                  ? 'text-[#0F68D6]'
                                  : 'text-[#111111] hover:text-[#0F68D6]'
                              }`}
                            >
                              <span className="whitespace-nowrap">{opt}</span>
                              {(isSelected || isHovered) && (
                                <ChevronRight className="w-[9.73px] h-[14.63px] shrink-0 text-[#0F68D6]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* What challenge are you looking to overcome */}
                <div className="w-full h-[102px] border-b border-[#D7DCE2] px-[16px] pt-[18px]">
                  <textarea
                    name="challenge"
                    placeholder="What challenge are you looking to overcome"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={3}
                    className="w-full h-full type-body-xxs tracking-[0.01em] text-[#2A2A2A] placeholder:text-[#2A2A2A] bg-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Consent and Submit Area */}
              <div className="w-full flex flex-col items-start gap-[16px] pt-[8px]">
                <div className="w-full flex flex-col items-start gap-[12px]">
                  {/* Main heading */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#333333]">
                    Stay ahead of the curve. Sign up to receive exclusive Waterlabs updates, resources, and tips.
                  </p>

                  {/* Checkbox */}
                  <div className="flex items-center gap-[8px]">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`w-[20px] h-[20px] rounded-[2px] flex items-center justify-center transition-colors cursor-pointer shrink-0 ${agreed ? 'bg-electric-blue' : 'bg-[#CCCCCC]'
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

                  {/* Main heading / Disclaimer */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#333333]">
                    You may unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.
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

