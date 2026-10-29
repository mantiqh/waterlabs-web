'use client';

import Image from 'next/image';
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';

interface ContactUsContactFormProps {
  tag?: string;
  heading?: string;
  image?: string;
  orgTypeOptions?: string[];
  newsletterHeading?: string;
  consentText?: string;
  disclaimerText?: string;
  submitButtonText?: string;
}

export const ContactUsContactForm = ({
  tag = DEFAULT_CONTACT_US_DATA.formTag || 'Send us a message',
  heading = DEFAULT_CONTACT_US_DATA.formHeading,
  image = DEFAULT_CONTACT_US_DATA.formImage || '/images/contact-us/contact-form/contact-form.jpg',
  orgTypeOptions = DEFAULT_CONTACT_US_DATA.orgTypeOptions || [
    'Health system',
    'Medical Group',
    'Community Health Center',
    'Outpatient Facility',
    'Hospital',
    'Other',
  ],
  newsletterHeading = DEFAULT_CONTACT_US_DATA.newsletterHeading ||
    'Stay ahead of the curve. Sign up to receive exclusive Waterlabs updates, resources, and tips.',
  consentText = DEFAULT_CONTACT_US_DATA.consentText ||
    'I agree to receive other communications from Waterlabs.*',
  disclaimerText = DEFAULT_CONTACT_US_DATA.disclaimerText ||
    'You may unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.',
  submitButtonText = DEFAULT_CONTACT_US_DATA.submitButtonText || 'Submit',
}: ContactUsContactFormProps) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <section
      id="contact-form"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white from-50% to-[#020c47] to-50%"
    >
      {/* 
        Contact Form Section:
        - Desktop: 1440px, padding: 0px 60px, bg: #F4F6F9, border-radius: 60px 0px 0px 60px
        - Mobile: padding: 40px 20px, bg: #F4F6F9, border-radius: 30px 0px 0px 30px
        - Desktop: Two columns — left has tag + heading + image, right has form
        - Mobile: Stacked — tag + heading, image, form
      */}
      <div className="bg-ghost-white w-full rounded-l-[30px] lg:rounded-l-[60px]">
        <div className="mx-auto w-full max-w-[1440px] px-[20px] py-[40px] md:px-[40px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[20px] lg:flex-row lg:gap-[32px]">
            {/* Left Column (Frame 2147226540: max 516px, gap: 40px) */}
            <div className="flex w-full min-w-0 shrink-0 flex-col items-start gap-[12px] lg:w-[40%] lg:max-w-[516px] lg:gap-[40px] xl:w-[516px]">
              {/* Tag + Heading (Frame 2147226533: 516px x 96px, gap: 12px) */}
              <div className="flex w-full flex-col items-start gap-[8px] lg:gap-[12px]">
                {/* Text - Tag (gap: 8px, height: 24px) */}
                {tag && (
                  <div className="flex h-[24px] items-center gap-[8px]">
                    <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                    <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">{tag}</span>
                  </div>
                )}
                {/* Heading (52px / 60px / -0.01em, #0F68D6) */}
                <h2 className="type-h2 text-electric-blue tracking-[-0.01em]">{heading}</h2>
              </div>

              {/* Image Container (Frame 2147226534: max 516px x 328px) */}
              {image && (
                <div className="relative aspect-[516/328] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:w-full lg:rounded-[30px_15px_30px_30px]">
                  <Image
                    src={image}
                    alt="Contact form illustration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 516px"
                    className="object-cover object-center"
                  />
                  {/* Exact Figma Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.7) 106.55%)',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Form (Frame: max 772px x 464px, gap: 14px) */}
            <form
              onSubmit={handleSubmit}
              className="flex w-full min-w-0 flex-col items-start gap-[16px] lg:w-[60%] lg:flex-1 lg:gap-[14px] xl:w-[772px]"
            >
              {/* Input Fields Container */}
              <div className="flex w-full flex-col items-start gap-[12px]">
                {/* Input container 1: Name & Org */}
                <div className="flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Name */}
                  <div className="flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="type-body-xxs w-full bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                    />
                  </div>
                  {/* Org */}
                  <div className="flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      name="org"
                      placeholder="Org*"
                      value={formData.org}
                      onChange={handleChange}
                      required
                      className="type-body-xxs w-full bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                    />
                  </div>
                </div>

                {/* Input container 2: Email ID & Phone number */}
                <div className="flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Email ID */}
                  <div className="flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="email"
                      name="emailId"
                      placeholder="Email ID*"
                      value={formData.emailId}
                      onChange={handleChange}
                      required
                      className="type-body-xxs w-full bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                    />
                  </div>
                  {/* Phone number */}
                  <div className="flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="type-body-xxs w-full bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                    />
                  </div>
                </div>

                {/* Input container 3: Company & Organization Type */}
                <div className="relative z-20 flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Company */}
                  <div className="flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company*"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="type-body-xxs w-full bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                    />
                  </div>
                  {/* Organization Type */}
                  <div
                    ref={dropdownRef}
                    className="relative flex h-[60px] w-full items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1"
                  >
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      className="group flex h-full w-full cursor-pointer items-center justify-between text-left outline-none"
                    >
                      <span className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {formData.orgType || 'Organization Type*'}
                      </span>
                      <div
                        className={`text-[#7D8690] transition-transform duration-200 group-hover:text-[#0F68D6] ${
                          isDropdownOpen ? '-rotate-90 text-[#0F68D6]' : 'rotate-90'
                        }`}
                      >
                        <ChevronRight className="h-[12px] w-[8px] shrink-0 xl:h-[14.63px] xl:w-[9.73px]" />
                      </div>
                    </button>

                    {/* Hidden input to maintain form state */}
                    <input type="hidden" name="orgType" value={formData.orgType} />

                    {/* Dropdown Menu (matching Navbar dropdown UI in Image 2 and section colors) */}
                    {isDropdownOpen && (
                      <div
                        className="animate-in fade-in-0 zoom-in-95 absolute top-[calc(100%+8px)] left-0 z-50 flex w-full flex-col gap-[4px] rounded-[20px_10px_20px_20px] border border-[#D7DCE2] bg-[#F4F6F9] p-[16px] shadow-[0_16px_40px_rgba(4,40,73,0.10)] backdrop-blur-[20px] duration-150"
                        role="listbox"
                      >
                        {orgTypeOptions.map((opt) => {
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
                              className={`body-xxs type-body-xxs flex h-[40px] w-full cursor-pointer flex-row items-center gap-[14px] px-[12px] py-[8px] text-left transition-colors duration-150 ${
                                isSelected || isHovered
                                  ? 'text-[#0F68D6]'
                                  : 'text-[#111111] hover:text-[#0F68D6]'
                              }`}
                            >
                              <span className="whitespace-nowrap">{opt}</span>
                              {(isSelected || isHovered) && (
                                <ChevronRight className="h-[14.63px] w-[9.73px] shrink-0 text-[#0F68D6]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* What challenge are you looking to overcome */}
                <div className="h-[102px] w-full border-b border-[#D7DCE2] px-[16px] pt-[18px]">
                  <textarea
                    name="challenge"
                    placeholder="What challenge are you looking to overcome"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={3}
                    className="type-body-xxs h-full w-full resize-none bg-transparent tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A]"
                  />
                </div>
              </div>

              {/* Consent and Submit Area */}
              <div className="flex w-full flex-col items-start gap-[16px] pt-[8px]">
                <div className="flex w-full flex-col items-start gap-[12px]">
                  {/* Main heading */}
                  {newsletterHeading && (
                    <p className="type-body-xxs tracking-[0.01em] text-[#333333]">
                      {newsletterHeading}
                    </p>
                  )}

                  {/* Checkbox */}
                  <div className="flex items-center gap-[8px]">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded-[2px] transition-colors ${
                        agreed ? 'bg-electric-blue' : 'bg-[#CCCCCC]'
                      }`}
                      aria-label="Agree to terms"
                    >
                      {agreed && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-[8px] w-[10px]"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    {consentText && (
                      <span className="type-body-xxs tracking-[0.01em] text-[#333333]">
                        {consentText}
                      </span>
                    )}
                  </div>

                  {/* Main heading / Disclaimer */}
                  {disclaimerText && (
                    <p className="type-body-xxs tracking-[0.01em] text-[#333333]">
                      {disclaimerText}
                    </p>
                  )}
                </div>

                {/* Desktop - Fill CTA (Submit Button) */}
                <CTA variant="light-bg" type="submit">
                  {submitButtonText}
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
