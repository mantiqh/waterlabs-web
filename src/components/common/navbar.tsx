'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About us', href: '/#about' },
  { label: 'Products', href: '/#products' },
  { label: 'Agentic RCM Solutions', href: '/#solutions' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Trust and Security', href: '/trust-and-security' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blogs', href: '/#blogs' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
        <header className={`flex flex-row items-center justify-between w-full h-[60px] backdrop-blur-[13.2px] py-[8px] transition-all duration-300 shadow-[0_4px_24px_rgba(4,40,73,0.06)] ${
          isScrolled
            ? 'bg-white rounded-none border-x-0 border-t-0 border-b border-[#D7DCE2] px-[20px] md:px-[40px] lg:rounded-[30px] lg:border lg:border-white/24 lg:pl-[16px] lg:pr-[8px] xl:pl-[24px] xl:pr-[12px]'
            : 'bg-white/70 rounded-[30px] border border-white/24 pl-[16px] md:pl-[20px] xl:pl-[24px] pr-[8px] md:pr-[12px] xl:pr-[12px]'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-[6px] xl:mr-0" onClick={() => setIsOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common/logo.svg" alt="Waterlabs AI" className="h-[22px] lg:h-[24px] xl:h-[30px] 2xl:h-[36px] w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row gap-[10px] xl:gap-[20px] 2xl:gap-[32px] items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] xl:text-[14px] 2xl:text-[16px] leading-[20px] text-midnight-blue hover:text-electric-blue transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0 ml-[6px] xl:ml-0">
            <Link href="/contact-us">
              <CTA variant="light-bg" className="h-[38px] xl:h-[44px] px-[14px] xl:px-[20px] text-[13px] xl:text-[15px] 2xl:text-[16px]">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button
              type="button"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center w-[32px] h-[32px] text-midnight-blue hover:text-electric-blue transition-colors p-1 focus:outline-none"
            >
              <span className={`absolute transition-all duration-300 transform ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={`absolute transition-all duration-300 transform ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/common/menu.svg" alt="Menu" className="w-[29px] h-[19px] text-midnight-blue hover:opacity-80 transition-opacity" />
              </span>
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown overlay */}
        <div
          className={`lg:hidden absolute top-[calc(100%+10px)] left-[20px] right-[20px] md:left-[40px] md:right-[40px] lg:left-0 lg:right-0 bg-white/70 backdrop-blur-[13.2px] border border-white/24 rounded-[30px] p-[24px] flex flex-col gap-[16px] shadow-[0_12px_32px_rgba(4,40,73,0.08)] z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${isOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
              : 'opacity-0 -translate-y-4 scale-[0.98] pointer-events-none invisible'
            }`}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col gap-[8px]">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${index * 35 + 80}ms` : '0ms',
                }}
                className={`type-body-xxs text-midnight-blue hover:text-electric-blue transition-all duration-300 py-[8px] transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div
            style={{
              transitionDelay: isOpen ? '360ms' : '0ms',
            }}
            className={`pt-[16px] border-t border-white/40 flex flex-col transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
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
