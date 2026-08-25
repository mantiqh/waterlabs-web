import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

const Navbar: React.FC = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full max-w-[1320px] h-[60px] mx-auto rounded-[30px] border border-white/24 bg-white/70 backdrop-blur-[13.2px] pl-[24px] pr-[12px] py-[8px]">
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0">
        <img src="/images/common/logo.svg" alt="Waterlabs AI" className="h-[24px] xl:h-[36px] w-[auto]" />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-row gap-[40px] items-center">
        {['Platform', 'Solutions', 'Results', 'Resources', 'Company'].map((item) => (
          <a key={item} href="#" className="font-secondary text-[16px] leading-[24px] text-midnight-blue hover:text-electric-blue transition-colors whitespace-nowrap">
            {item}
          </a>
        ))}
      </nav>

      {/* Desktop CTA */}
      <div className="hidden lg:block shrink-0">
        <CTA variant="light-bg" className="!py-[10px] !px-[20px] lg:!py-[10px] lg:!px-[20px] !gap-[10px] lg:!gap-[10px] font-medium !text-[16px] lg:!text-[16px] [&>svg]:!text-white">
          Discover
        </CTA>
      </div>

      {/* Mobile Menu Actions */}
      <div className="flex lg:hidden flex-row items-center gap-ds-12 md:gap-ds-20 shrink-0">
        <button aria-label="Search" className="text-midnight-blue hover:text-electric-blue transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button aria-label="Open Menu">
          <img src="/images/common/menu.svg" alt="Menu" className="w-[29px] h-[19px] text-midnight-blue hover:opacity-80 transition-opacity" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
