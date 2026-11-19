'use client';

import Image from 'next/image';
import { type FormEvent, type SyntheticEvent, useEffect, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { DEFAULT_CONTACT_US_DATA } from '@/data/contact-us';
import {
  CONTACT_MESSAGE_LIMIT,
  CONTACT_PHONE_LIMIT,
  CONTACT_TEXT_LIMIT,
  type ContactField,
  getContactFieldError,
} from '@/lib/contact-submission';

interface ContactUsContactFormProps {
  tag?: string;
  heading?: string;
  image?: string;
  imageMobile?: string;
  orgTypeOptions?: string[];
  newsletterHeading?: string;
  consentText?: string;
  disclaimerText?: string;
  submitButtonText?: string;
}

export const ContactUsContactForm = ({
  tag = DEFAULT_CONTACT_US_DATA.formTag || 'Send us a message',
  heading = DEFAULT_CONTACT_US_DATA.formHeading,
  image = DEFAULT_CONTACT_US_DATA.formImage ||
    '/images/contact-us/contact-form/img_contact_form_desktop.png',
  imageMobile = DEFAULT_CONTACT_US_DATA.formImageMobile ||
    '/images/contact-us/contact-form/img_contact_form_mobile.png',
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
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOrgTypeTooltip, setShowOrgTypeTooltip] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setShowOrgTypeTooltip(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setShowOrgTypeTooltip(false);
      }
    };

    if (isDropdownOpen || showOrgTypeTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, showOrgTypeTooltip]);

  const [invalidFields, setInvalidFields] = useState<Partial<Record<ContactField, boolean>>>({});

  const fieldProps = (field: Exclude<ContactField, 'agreed' | 'orgType'>) => ({
    id: `contact-${field}`,
    'aria-label': {
      name: 'Name',
      org: 'Organization',
      emailId: 'Email ID',
      phoneNumber: 'Phone number',
      company: 'Company',
      challenge: 'What challenge are you looking to overcome',
    }[field],
    maxLength:
      field === 'challenge'
        ? CONTACT_MESSAGE_LIMIT
        : field === 'phoneNumber'
          ? CONTACT_PHONE_LIMIT
          : CONTACT_TEXT_LIMIT,
    'aria-invalid': Boolean(invalidFields[field]),
    onChange: (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      if (field === 'phoneNumber' && value.replace(/\D/g, '').length > 15) {
        // Reject the edit rather than removing existing digits elsewhere in the number.
        const caret = event.currentTarget.selectionStart ?? value.length;
        const previousCaret = Math.max(0, caret - (value.length - formData.phoneNumber.length));
        event.currentTarget.value = formData.phoneNumber;
        event.currentTarget.setSelectionRange(previousCaret, previousCaret);
        return;
      }
      const message = getContactFieldError(field, value, orgTypeOptions);
      event.currentTarget.setCustomValidity(message);
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (submissionStatus !== 'sending') setSubmissionStatus('idle');
      if (!message) setInvalidFields((prev) => ({ ...prev, [field]: false }));
    },
    onInvalid: (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const message =
        getContactFieldError(field, event.currentTarget.value, orgTypeOptions) ||
        event.currentTarget.validationMessage;
      event.currentTarget.setCustomValidity(message);
      setInvalidFields((prev) => ({ ...prev, [field]: true }));
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionStatus === 'sending') return;
    setShowOrgTypeTooltip(false);
    // Native controls show browser validation bubbles, including required consent.
    // The existing custom organization menu remains validated before any request.
    for (const [field, value] of Object.entries({ ...formData, agreed })) {
      const message = getContactFieldError(field as ContactField, value, orgTypeOptions);
      if (!message) continue;
      if (field === 'orgType') {
        setIsDropdownOpen(false);
        setShowOrgTypeTooltip(true);
        setInvalidFields((prev) => ({ ...prev, orgType: true }));
        requestAnimationFrame(() => dropdownRef.current?.querySelector('button')?.focus());
      } else {
        const control = e.currentTarget.elements.namedItem(field);
        if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
          control.setCustomValidity(message);
          control.reportValidity();
        }
      }
      return;
    }
    setSubmissionStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, agreed }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmissionStatus('success');
      setFormData({
        name: '',
        org: '',
        emailId: '',
        phoneNumber: '',
        company: '',
        orgType: '',
        challenge: '',
      });
      setAgreed(false);
      setInvalidFields({});
      setShowOrgTypeTooltip(false);
    } catch {
      setSubmissionStatus('error');
    }
  };

  return (
    <section
      id="contact-form"
      data-motion-section
      className="relative w-full overflow-hidden bg-gradient-to-b from-white from-50% to-[#000A46] to-50% lg:to-[#010C45]"
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
          <div
            data-motion-group
            data-motion-trigger="section"
            className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[20px] lg:flex-row lg:gap-[32px]"
          >
            {/* Left Column (Frame 2147226540: max 516px, gap: 40px) */}
            <div className="flex w-full min-w-0 shrink-0 flex-col items-start gap-[12px] lg:w-[40%] lg:max-w-[516px] lg:gap-[40px] xl:w-[516px]">
              {/* Tag + Heading (Frame 2147226533: 516px x 96px, gap: 12px) */}
              <div className="flex w-full flex-col items-start gap-[8px] lg:gap-[12px]">
                {/* Text - Tag (gap: 8px, height: 24px) */}
                {tag && (
                  <div className="flex h-[24px] items-center gap-[8px]">
                    <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                    <span
                      data-motion-reveal="scramble"
                      className="type-body-xxs tracking-[0.01em] text-[#7D8690]"
                    >
                      {tag}
                    </span>
                  </div>
                )}
                {/* Heading (52px / 60px / -0.01em, #0F68D6) */}
                <h2
                  data-motion-reveal="lines"
                  className="type-h2 text-electric-blue tracking-[-0.01em]"
                >
                  {heading}
                </h2>
              </div>

              {/* Image Container (Frame 2147226534: max 516px x 328px) */}
              {(image || imageMobile) && (
                <div
                  data-motion-reveal="image"
                  className="relative aspect-[362/230] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:aspect-[516/328] lg:w-full lg:rounded-[30px_15px_30px_30px]"
                >
                  {image && (
                    <div className="absolute inset-0 hidden lg:block">
                      <Image
                        data-motion-parallax
                        src={image}
                        alt="Contact form illustration"
                        fill
                        sizes="516px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  {(imageMobile || image) && (
                    <div className="absolute inset-0 block lg:hidden">
                      <Image
                        data-motion-parallax
                        src={imageMobile || image!}
                        alt="Contact form illustration"
                        fill
                        sizes="(max-width: 1023px) 100vw, 516px"
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Form (Frame: max 772px x 464px, gap: 14px) */}
            <form
              onSubmit={handleSubmit}
              noValidate
              data-motion-reveal="fade"
              className="flex w-full min-w-0 flex-col items-start gap-[16px] lg:w-[60%] lg:flex-1 lg:gap-[14px] xl:w-[772px]"
            >
              {/* Input Fields Container */}
              <div className="flex w-full flex-col items-start gap-[12px]">
                {/* Input container 1: Name & Org */}
                <div className="flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Name */}
                  <div className="flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      {...fieldProps('name')}
                      autoComplete="name"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      required
                      className="h-full min-h-[44px] w-full bg-transparent py-2.5 text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
                    />
                  </div>
                  {/* Org */}
                  <div className="flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      {...fieldProps('org')}
                      autoComplete="organization"
                      name="org"
                      placeholder="Org*"
                      value={formData.org}
                      required
                      className="h-full min-h-[44px] w-full bg-transparent py-2.5 text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
                    />
                  </div>
                </div>

                {/* Input container 2: Email ID & Phone number */}
                <div className="flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Email ID */}
                  <div className="flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="email"
                      {...fieldProps('emailId')}
                      autoComplete="email"
                      name="emailId"
                      placeholder="Email ID*"
                      value={formData.emailId}
                      required
                      className="h-full min-h-[44px] w-full bg-transparent py-2.5 text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
                    />
                  </div>
                  {/* Phone number */}
                  <div className="flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      inputMode="tel"
                      type="tel"
                      {...fieldProps('phoneNumber')}
                      autoComplete="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      className="h-full min-h-[44px] w-full bg-transparent py-2.5 text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
                    />
                  </div>
                </div>

                {/* Input container 3: Company & Organization Type */}
                <div className="relative z-20 flex w-full flex-col items-start gap-[12px] lg:flex-row">
                  {/* Company */}
                  <div className="flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1">
                    <input
                      type="text"
                      {...fieldProps('company')}
                      autoComplete="organization"
                      name="company"
                      placeholder="Company*"
                      value={formData.company}
                      required
                      className="h-full min-h-[44px] w-full bg-transparent py-2.5 text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
                    />
                  </div>
                  {/* Organization Type */}
                  <div
                    ref={dropdownRef}
                    className="relative flex h-[60px] w-full min-w-0 items-center border-b border-[#D7DCE2] px-[16px] lg:w-[380px] lg:flex-1"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowOrgTypeTooltip(false);
                        setIsDropdownOpen((prev) => !prev);
                      }}
                      onBlur={(event) => {
                        if (!dropdownRef.current?.contains(event.relatedTarget))
                          setShowOrgTypeTooltip(false);
                      }}
                      aria-describedby={showOrgTypeTooltip ? 'contact-orgType-tooltip' : undefined}
                      aria-invalid={Boolean(invalidFields.orgType)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      className="group flex h-full w-full cursor-pointer items-center justify-between text-left outline-none"
                    >
                      <span className="text-base tracking-[0.01em] text-[#2A2A2A] md:text-sm">
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

                    {showOrgTypeTooltip && (
                      <div
                        id="contact-orgType-tooltip"
                        role="tooltip"
                        className="absolute top-[calc(100%+8px)] left-0 z-50 flex w-max max-w-full items-start gap-2 rounded-sm border border-[#7D8690] bg-white p-3 text-sm leading-5 text-[#111111] shadow-lg"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -top-[6px] left-5 h-[10px] w-[10px] rotate-45 border-t border-l border-[#7D8690] bg-white"
                        />
                        <span
                          aria-hidden="true"
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-[#D94A00] font-bold text-white"
                        >
                          !
                        </span>
                        <span>Please select an organization type.</span>
                      </div>
                    )}

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
                                setInvalidFields((prev) => ({ ...prev, orgType: false }));
                                setShowOrgTypeTooltip(false);
                                dropdownRef.current?.querySelector('button')?.focus();
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
                    {...fieldProps('challenge')}
                    name="challenge"
                    placeholder="What challenge are you looking to overcome"
                    value={formData.challenge}
                    rows={3}
                    className="h-full w-full resize-none bg-transparent text-base tracking-[0.01em] text-[#2A2A2A] outline-none placeholder:text-[#2A2A2A] md:text-sm"
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
                    <div className="relative flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                      <input
                        id="contact-agreed"
                        name="agreed"
                        type="checkbox"
                        required
                        checked={agreed}
                        aria-label={consentText || DEFAULT_CONTACT_US_DATA.consentText}
                        aria-invalid={Boolean(invalidFields.agreed)}
                        onChange={(event) => {
                          setAgreed(event.currentTarget.checked);
                          event.currentTarget.setCustomValidity('');
                          setInvalidFields((prev) => ({ ...prev, agreed: false }));
                          if (submissionStatus !== 'sending') setSubmissionStatus('idle');
                        }}
                        onInvalid={(event) => {
                          event.currentTarget.setCustomValidity(
                            'Please tick this box if you want to proceed.',
                          );
                          setInvalidFields((prev) => ({ ...prev, agreed: true }));
                        }}
                        className={`focus-visible:outline-electric-blue m-0 h-full w-full cursor-pointer appearance-none rounded-[2px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 forced-colors:appearance-auto ${agreed ? 'bg-electric-blue' : 'bg-[#CCCCCC]'}`}
                      />
                      {agreed && (
                        <svg
                          aria-hidden="true"
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="pointer-events-none absolute h-[8px] w-[10px] forced-colors:hidden"
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
                    </div>
                    {consentText && (
                      <label
                        htmlFor="contact-agreed"
                        className="type-body-xxs cursor-pointer tracking-[0.01em] text-[#333333]"
                      >
                        {consentText}
                      </label>
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
                <CTA
                  data-motion-magnetic
                  variant="light-bg"
                  size="compact-mobile"
                  type="submit"
                  disabled={submissionStatus === 'sending'}
                >
                  {submissionStatus === 'sending' ? 'Sending...' : submitButtonText}
                </CTA>
                <p
                  role="status"
                  aria-live="polite"
                  className="type-body-xxs text-[#333333] empty:hidden"
                >
                  {submissionStatus === 'success' && 'Thank you. Your message has been sent.'}
                  {submissionStatus === 'error' &&
                    'Your message could not be sent. Please try again later.'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsContactForm;
