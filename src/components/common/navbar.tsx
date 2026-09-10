'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: 'About Us',
    href: '/about-us',
    children: [
      { label: 'About Us Overview', href: '/about-us' },
      { label: 'Our Philosophy', href: '/philosophy' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    label: 'Products',
    children: [
      { label: 'Himer', href: '/products/himer' },
      { label: 'Curiecode', href: '/products/curiecode' },
    ],
  },
  {
    label: 'Agentic RCM Solutions',
    children: [
      { label: 'Prior Authorization', href: '/solutions/prior-authorization' },
      { label: 'Eligibility & Benefits Verification', href: '/solutions' },
      { label: 'Denial Management', href: '/solutions/denial-management' },
      { label: 'AR Follow-up', href: '/solutions/ar-follow-up' },
      { label: 'Charge capture and coding', href: '/solutions/charge-capture-and-coding' },
      { label: 'Payment Posting', href: '/solutions/payment-posting' },
      { label: 'Claim submission and scrubbing', href: '/solutions/claim-submission-and-scrubbing' },
      { label: 'Denial Management', href: '/solutions/denial-management' },
      { label: 'Patient Access and Registration', href: '/solutions/patient-access-and-registration' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Trust and Security', href: '/trust-and-security' },
  { label: 'Blogs', href: '/blogs' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  // Close menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-[60px] lg:h-auto relative max-w-[1320px] mx-auto z-50">
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 lg:relative lg:top-0 lg:left-auto lg:right-auto lg:px-0 w-full max-w-[1320px] mx-auto transition-all duration-300 ease-out ${
          isScrolled
            ? 'px-0 translate-y-0 opacity-100'
            : 'px-[20px] md:px-[40px] translate-y-[20px] opacity-100 lg:translate-y-0'
        }`}
      >
        <header
          className={`flex flex-row items-center justify-between w-full h-[60px] backdrop-blur-[13.2px] py-[8px] transition-all duration-300 shadow-[0_4px_24px_rgba(4,40,73,0.06)] ${
            isScrolled
              ? 'bg-white rounded-none border-x-0 border-t-0 border-b border-[#D7DCE2] px-[20px] md:px-[40px] lg:rounded-[30px] lg:border lg:border-white/24 lg:pl-[16px] lg:pr-[8px] xl:pl-[24px] xl:pr-[12px]'
              : 'bg-white/70 rounded-[30px] border border-white/24 pl-[16px] md:pl-[20px] xl:pl-[24px] pr-[8px] md:pr-[12px] xl:pr-[12px]'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 mr-[6px] xl:mr-0"
            onClick={() => {
              setIsOpen(false);
              setActiveDropdown(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/common/logo.svg"
              alt="Waterlabs AI"
              className="h-[22px] lg:h-[24px] xl:h-[30px] 2xl:h-[36px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row gap-[8px] xl:gap-[16px] 2xl:gap-[24px] items-center">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isDropdownOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`group flex items-center gap-[4px] text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[20px] transition-colors py-[8px] whitespace-nowrap ${
                        isDropdownOpen
                          ? 'text-electric-blue'
                          : 'text-midnight-blue hover:text-electric-blue'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={`transition-transform duration-200 ${
                            isDropdownOpen
                              ? 'rotate-180 text-electric-blue'
                              : 'text-midnight-blue/60 group-hover:text-electric-blue'
                          }`}
                        >
                          <path
                            d="M2 3.5L5 6.5L8 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className={`group flex items-center gap-[4px] text-[13px] xl:text-[14px] 2xl:text-[15px] leading-[20px] transition-colors py-[8px] whitespace-nowrap cursor-pointer ${
                        isDropdownOpen
                          ? 'text-electric-blue'
                          : 'text-midnight-blue hover:text-electric-blue'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={`transition-transform duration-200 ${
                            isDropdownOpen
                              ? 'rotate-180 text-electric-blue'
                              : 'text-midnight-blue/60 group-hover:text-electric-blue'
                          }`}
                        >
                          <path
                            d="M2 3.5L5 6.5L8 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )}

                  {/* Dropdown Card */}
                  {hasChildren && item.children && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-[20px] z-50 origin-top transition-all duration-200 ease-out ${
                        isDropdownOpen
                          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 scale-[0.96] pointer-events-none invisible'
                      }`}
                    >
                      <div
                        className={`bg-white/70 backdrop-blur-[13.2px] border border-white/24 rounded-[20px] p-[6px] shadow-[0_16px_40px_rgba(4,40,73,0.1)] flex flex-col gap-[2px] [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1] [&::-webkit-scrollbar-thumb]:rounded-full ${
                          item.children.length > 4
                            ? 'w-[280px] xl:w-[310px] max-h-[calc(100vh-100px)] overflow-y-auto'
                            : 'min-w-[190px] w-max'
                        }`}
                      >
                        {item.children.map((subItem, subIdx) => (
                          <Link
                            key={`${subItem.label}-${subIdx}`}
                            href={subItem.href}
                            onClick={() => setActiveDropdown(null)}
                            className="px-[14px] py-[8px] rounded-[12px] text-[13px] xl:text-[14px] text-midnight-blue hover:text-electric-blue hover:bg-white/60 transition-colors duration-150"
                          >
                            <span className="leading-[18px]">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0 ml-[6px] xl:ml-0">
            <Link href="/contact-us">
              <CTA
                variant="light-bg"
                className="h-[38px] xl:h-[44px] px-[14px] xl:px-[20px] text-[13px] xl:text-[15px] 2xl:text-[16px]"
              >
                Contact Us
              </CTA>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden flex-row items-center gap-ds-12 md:gap-ds-20 shrink-0">
            <button
              type="button"
              aria-label="Search"
              className="text-midnight-blue hover:text-electric-blue transition-colors p-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[18px] h-[18px]"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button
              type="button"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center w-[32px] h-[32px] text-midnight-blue hover:text-electric-blue transition-colors p-1 focus:outline-none"
            >
              <span
                className={`absolute transition-all duration-300 transform ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[20px] h-[20px]"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span
                className={`absolute transition-all duration-300 transform ${
                  isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/common/menu.svg"
                  alt="Menu"
                  className="w-[29px] h-[19px] text-midnight-blue hover:opacity-80 transition-opacity"
                />
              </span>
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown overlay */}
        <div
          className={`lg:hidden absolute top-[calc(100%+10px)] left-[20px] right-[20px] md:left-[40px] md:right-[40px] bg-white/70 backdrop-blur-[13.2px] border border-white/24 rounded-[30px] p-[20px] md:p-[24px] flex flex-col gap-[16px] shadow-[0_12px_32px_rgba(4,40,73,0.08)] z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top max-h-[calc(100vh-100px)] overflow-y-auto ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
              : 'opacity-0 -translate-y-4 scale-[0.98] pointer-events-none invisible'
          }`}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col gap-[4px]">
            {navItems.map((item, index) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isExpanded = expandedMobileItem === item.label;

              if (hasChildren && item.children) {
                return (
                  <div
                    key={item.label}
                    style={{
                      transitionDelay: isOpen ? `${index * 35 + 60}ms` : '0ms',
                    }}
                    className={`flex flex-col border-b border-white/30 last:border-b-0 py-[4px] transition-all duration-300 transform ${
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex items-center justify-between w-full py-[8px] type-body-xxs text-midnight-blue hover:text-electric-blue transition-colors cursor-pointer text-left"
                    >
                      <span className="font-medium">{item.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={`transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-electric-blue' : 'text-midnight-blue/60'
                        }`}
                      >
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Accordion Sub-items */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 mt-[2px]'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="min-h-0 flex flex-col gap-[2px] pl-[12px] border-l-2 border-[#0F68D6]/25 ml-[4px] pb-[8px]">
                        {item.children.map((subItem, subIdx) => (
                          <Link
                            key={`${subItem.label}-${subIdx}`}
                            href={subItem.href}
                            onClick={() => {
                              setIsOpen(false);
                              setExpandedMobileItem(null);
                            }}
                            className="py-[6px] px-[8px] rounded-[10px] text-[13px] text-midnight-blue/80 hover:text-electric-blue hover:bg-white/60 transition-all duration-150"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${index * 35 + 60}ms` : '0ms',
                  }}
                  className={`type-body-xxs text-midnight-blue hover:text-electric-blue transition-all duration-300 py-[10px] border-b border-white/30 last:border-b-0 transform ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            style={{
              transitionDelay: isOpen ? '300ms' : '0ms',
            }}
            className={`pt-[12px] border-t border-white/40 flex flex-col transition-all duration-300 transform ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Link href="/contact-us" onClick={() => setIsOpen(false)} className="w-full">
              <CTA variant="light-bg" className="w-full justify-center">
                Contact Us
              </CTA>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
