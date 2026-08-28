'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

const navItems = ['Platform', 'Solutions', 'Results', 'Resources', 'Company'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative w-full max-w-[1320px] mx-auto z-50">
      <header className="flex flex-row items-center justify-between w-full h-[60px] rounded-[30px] border border-white/24 bg-white/70 backdrop-blur-[13.2px] pl-[24px] pr-[12px] py-[8px] transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setIsOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/common/logo.svg" alt="Waterlabs AI" className="h-[24px] xl:h-[36px] w-[auto]" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-row gap-[40px] items-center">
          {navItems.map((item) => (
            <a key={item} href="#" className="font-secondary font-normal text-[16px] leading-[24px] text-midnight-blue hover:text-electric-blue transition-colors whitespace-nowrap">
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block shrink-0">
          <CTA variant="light-bg" className="[&>svg]:!text-white">
            Discover
          </CTA>
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

      {/* Mobile Menu Dropdown expanding in flow to prevent hero content overlapping */}
      {isOpen && (
        <div 
          className="lg:hidden relative mt-[12px] w-full bg-white/70 backdrop-blur-[13.2px] border border-white/24 rounded-[30px] p-[24px] flex flex-col gap-[16px] shadow-[0_12px_32px_rgba(4,40,73,0.08)] z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top animate-in fade-in slide-in-from-top-2"
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col gap-[8px]">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: `${index * 30 + 50}ms`,
                }}
                className="font-secondary font-normal text-[16px] leading-[24px] text-midnight-blue hover:text-electric-blue transition-all duration-200 py-[8px]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div 
            style={{
              transitionDelay: '200ms',
            }}
            className="pt-[16px] border-t border-white/40 flex flex-col transition-all duration-200"
          >
            <CTA variant="light-bg" className="w-full justify-center [&>svg]:!text-white" onClick={() => setIsOpen(false)}>
              Discover
            </CTA>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
