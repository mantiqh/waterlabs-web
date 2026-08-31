import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 lg:gap-12 mb-16">
          
          {/* Logo & Tagline (Col Span 2 on both Mobile and Desktop) */}
          <div className="col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/common/logo.svg" alt="Waterlabs AI" className="h-8 md:h-10 w-auto" />
            </Link>
            <p className="type-body-xxs text-white/70 max-w-sm">
              Agentic AI built to own your revenue<br />
              cycle, not just automate it.
            </p>
          </div>

          {/* Platform Links */}
          <div className="col-span-1 flex flex-col gap-6">
            <h4 className="type-body-xxs text-white font-medium">Platform</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Links */}
          <div className="col-span-1 flex flex-col gap-6">
            <h4 className="type-body-xxs text-white font-medium">Products</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  HIMER AI OS
                </Link>
              </li>
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  CurieCode
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 flex flex-col gap-6">
            <h4 className="type-body-xxs text-white font-medium">Company</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="type-body-xxs text-white/70 hover:text-electric-blue transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 flex flex-col gap-6">
            <h4 className="type-body-xxs text-white font-medium">Social</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 type-body-xxs text-white/70 hover:text-electric-blue transition-colors group">
                  LinkedIn
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#D7DCE2] group-hover:text-electric-blue transition-colors rounded-[2px]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.82 0H1.18C0.53 0 0 0.51 0 1.15V14.85C0 15.49 0.53 16 1.18 16H14.82C15.47 16 16 15.49 16 14.85V1.15C16 0.51 15.47 0 14.82 0ZM4.74 13.67H2.37V6H4.74V13.67ZM3.55 4.96C2.8 4.96 2.19 4.35 2.19 3.6C2.19 2.85 2.8 2.24 3.55 2.24C4.3 2.24 4.91 2.85 4.91 3.6C4.91 4.35 4.3 4.96 3.55 4.96ZM13.67 13.67H11.3V9.94C11.3 9.05 11.28 7.91 10.06 7.91C8.84 7.91 8.65 8.86 8.65 9.87V13.67H6.28V6H8.56V7.05H8.59C8.91 6.45 9.68 5.82 10.84 5.82C13.24 5.82 13.67 7.4 13.67 9.47V13.67Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0">
          <div className="order-2 lg:order-1 type-body-xxs text-white/70">
            © 2026 Waterlabs AI LLC. All rights reserved.
          </div>
          <div className="order-1 lg:order-2 flex flex-row gap-6">
            <Link href="#" className="type-body-xxs text-white/70 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#" className="type-body-xxs text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
