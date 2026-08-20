import React from 'react';

import { CTA } from '@/components/CTA';

const Navbar: React.FC = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full max-w-[1320px] mx-auto rounded-[30px] border border-white/20 bg-white/70 backdrop-blur-[13px] px-6 py-2">
      {/* Logo Placeholder */}
      <div className="font-primary font-bold text-xl text-[#0F68D6]">Waterlabs</div>
      
      <nav className="hidden md:flex flex-row gap-10">
        {['Platform', 'Solutions', 'Results', 'Resources', 'Company'].map((item) => (
          <a key={item} href="#" className="font-secondary text-base text-midnight-blue hover:text-[#0F68D6] transition-colors">
            {item}
          </a>
        ))}
      </nav>

      <CTA variant="light-bg">Discover</CTA>
    </header>
  );
};

export default Navbar;
