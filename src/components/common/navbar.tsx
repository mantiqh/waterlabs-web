'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { DEFAULT_SOLUTIONS_NAV } from '@/data/solutions';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItemColumn {
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href?: string;
  header?: string;
  columns?: NavItemColumn[];
  children?: NavSubItem[];
}

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [solutionsNav, setSolutionsNav] = useState<NavSubItem[]>(DEFAULT_SOLUTIONS_NAV);

  useEffect(() => {
    fetch('/api/solutions/nav')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch solutions nav');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSolutionsNav(data);
        }
      })
      .catch(() => {});
  }, []);

  const navItems: NavItem[] = useMemo(() => {
    const half = Math.ceil(solutionsNav.length / 2);
    const col1 = solutionsNav.slice(0, half);
    const col2 = solutionsNav.slice(half);

    return [
      {
        label: 'Company',
        header: 'Company',
        children: [
          { label: 'About Us', href: '/about-us' },
          { label: 'Philosophy', href: '/philosophy' },
          { label: 'Careers', href: '/careers' },
          { label: 'Culture', href: '/culture' },
        ],
      },
      {
        label: 'Products',
        header: 'Products',
        children: [
          { label: 'Himer AI OS', href: '/products/himer' },
          { label: 'CurieCode', href: '/products/curiecode' },
        ],
      },
      {
        label: 'Agentic RCM Solutions',
        header: 'Agentic RCM Solutions',
        columns: [
          { items: col1 },
          { items: col2 },
        ],
        children: solutionsNav,
      },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Trust and Security', href: '/trust-and-security' },
      { label: 'Blogs', href: '/blogs' },
    ];
  }, [solutionsNav]);

  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
    setHoveredSubItem(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredSubItem(null);
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
    <div className="w-full h-[60px] lg:h-auto relative max-w-[1320px] mx-auto z-50 lg:max-xl:-mx-[24px] lg:max-xl:w-[calc(100%+48px)]">
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 lg:relative lg:top-0 lg:left-auto lg:right-auto lg:px-0 w-full max-w-[1320px] mx-auto transition-all duration-300 ease-out ${isScrolled
            ? 'px-0 translate-y-0 opacity-100'
            : 'px-[20px] md:px-[40px] translate-y-[20px] opacity-100 lg:translate-y-0'
          }`}
      >
        <header
          className={`lg:relative flex flex-row items-center justify-between w-full h-[60px] backdrop-blur-[13.2px] py-[8px] transition-all duration-300 shadow-[0_4px_24px_rgba(4,40,73,0.06)] ${isScrolled
              ? 'bg-white rounded-none border-x-0 border-t-0 border-b border-[#D7DCE2] px-[20px] md:px-[40px] lg:rounded-[30px] lg:border lg:border-white/24 lg:pl-[12px] lg:pr-[6px] xl:pl-[24px] xl:pr-[12px]'
              : 'bg-white/70 rounded-[30px] border border-white/24 pl-[16px] md:pl-[20px] lg:pl-[12px] xl:pl-[24px] pr-[8px] md:pr-[12px] lg:pr-[6px] xl:pr-[12px]'
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 mr-[6px] lg:max-xl:mr-[2px] xl:mr-0"
            onClick={() => {
              setIsOpen(false);
              setActiveDropdown(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/common/logo.svg"
              alt="Waterlabs AI"
              className="h-[22px] lg:h-[22px] xl:h-[30px] 2xl:h-[36px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row gap-[12px] xl:gap-[24px] items-center h-[60px] -my-[8px]">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isDropdownOpen = activeDropdown === item.label;
              const isCurrentPage = item.href ? pathname === item.href : false;

              return (
                <div
                  key={item.label}
                  className={`h-full flex items-center ${
                    item.columns && item.columns.length > 1
                      ? 'relative lg:max-xl:static xl:relative'
                      : 'relative'
                  }`}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`group flex items-center gap-[6px] xl:gap-[8px] body-xxs type-body-xxs transition-colors py-[8px] whitespace-nowrap ${
                        isDropdownOpen || isCurrentPage
                          ? 'text-[#0F68D6]'
                          : 'text-[#111111] hover:text-[#0F68D6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronRight
                          className={`w-[8px] h-[12px] xl:w-[9.73px] xl:h-[14.63px] shrink-0 transition-transform duration-200 ${
                            isDropdownOpen
                              ? '-rotate-90 text-[#0F68D6]'
                              : isCurrentPage
                                ? 'rotate-90 text-[#0F68D6]'
                                : 'rotate-90 text-[#111111]/70 group-hover:text-[#0F68D6]'
                          }`}
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className={`group flex items-center gap-[6px] xl:gap-[8px] body-xxs type-body-xxs transition-colors py-[8px] whitespace-nowrap cursor-pointer ${
                        isDropdownOpen
                          ? 'text-[#0F68D6]'
                          : 'text-[#111111] hover:text-[#0F68D6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronRight
                          className={`w-[8px] h-[12px] xl:w-[9.73px] xl:h-[14.63px] shrink-0 transition-transform duration-200 ${
                            isDropdownOpen
                              ? '-rotate-90 text-[#0F68D6]'
                              : 'rotate-90 text-[#111111]/70 group-hover:text-[#0F68D6]'
                          }`}
                        />
                      )}
                    </button>
                  )}

                  {/* Dropdown Card - Exact 30px gap below navbar capsule */}
                  {hasChildren && item.children && (
                    <div
                      className={`absolute top-full pt-[30px] z-50 origin-top transition-all duration-200 ease-out ${
                        item.columns && item.columns.length > 1
                          ? 'left-0 lg:max-xl:left-auto lg:max-xl:right-0 xl:left-0 xl:right-auto'
                          : 'left-0'
                      } ${
                        isDropdownOpen
                          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 scale-[0.97] pointer-events-none invisible'
                      }`}
                    >
                      {item.columns && item.columns.length > 1 ? (
                        /* 2-Column Dropdown (Agentic RCM Solutions: 746px x 284px) */
                        <div
                          className="w-[746px] max-w-[calc(100vw-32px)] bg-white/85 backdrop-blur-[20px] rounded-[20px_10px_20px_20px] p-[24px] shadow-[0_16px_40px_rgba(4,40,73,0.08)] border border-white/70 flex flex-col"
                          onMouseLeave={() => setHoveredSubItem(null)}
                        >


                          {/* Columns Frame 2147227097 */}
                          <div className="flex flex-row gap-[24px] items-start w-full">
                            {item.columns.map((col, colIdx) => (
                              <div key={colIdx} className="w-[337px] flex-1 flex flex-col gap-[8px]">
                                {col.items.map((subItem, subIdx) => {
                                  const allHrefs = item.children ? item.children.map((c) => c.href) : [];
                                  const isFirst = colIdx === 0 && subIdx === 0;
                                  const isActive = hoveredSubItem
                                    ? hoveredSubItem === subItem.href
                                    : allHrefs.includes(pathname)
                                      ? pathname === subItem.href
                                      : isFirst;

                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onMouseEnter={() => setHoveredSubItem(subItem.href)}
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setHoveredSubItem(null);
                                      }}
                                      className={`h-[40px] flex flex-row items-center gap-[14px] py-[8px] body-xxs type-body-xxs transition-colors duration-150 ${
                                        isActive
                                          ? 'text-[#0F68D6]'
                                          : 'text-[#111111] hover:text-[#0F68D6]'
                                      }`}
                                    >
                                      <span className="whitespace-nowrap">{subItem.label}</span>
                                      {isActive && (
                                        <ChevronRight className="w-[9.73px] h-[14.63px] shrink-0 text-[#0F68D6]" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* 1-Column Dropdown (About us / Products: 218px x 188px) */
                        <div
                          className="w-[218px] bg-white/85 backdrop-blur-[20px] rounded-[20px_10px_20px_20px] p-[24px] shadow-[0_16px_40px_rgba(4,40,73,0.08)] border border-white/70 flex flex-col"
                          onMouseLeave={() => setHoveredSubItem(null)}
                        >


                          {/* Items Frame 2147227091 */}
                          <div className="flex flex-col gap-[8px] w-full">
                            {item.children.map((subItem, subIdx) => {
                              const allHrefs = item.children ? item.children.map((c) => c.href) : [];
                              const isFirst = subIdx === 0;
                              const isActive = hoveredSubItem
                                ? hoveredSubItem === subItem.href
                                : allHrefs.includes(pathname)
                                  ? pathname === subItem.href
                                  : isFirst;

                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onMouseEnter={() => setHoveredSubItem(subItem.href)}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setHoveredSubItem(null);
                                  }}
                                  className={`h-[40px] flex flex-row items-center gap-[12px] py-[8px] body-xxs type-body-xxs transition-colors duration-150 ${
                                    isActive
                                      ? 'text-[#0F68D6]'
                                      : 'text-[#111111] hover:text-[#0F68D6]'
                                  }`}
                                >
                                  <span className="whitespace-nowrap">{subItem.label}</span>
                                  {isActive && (
                                    <ChevronRight className="w-[9.73px] h-[14.63px] shrink-0 text-[#0F68D6]" />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0 ml-[6px] lg:max-xl:ml-[2px] xl:ml-0">
            <Link href="/contact-us">
              <CTA
                variant="light-bg"
                className="lg:max-xl:!h-[38px] lg:max-xl:!px-[12px] lg:max-xl:!gap-[6px] xl:h-[44px] xl:px-[20px] xl:gap-[10px] body-cta type-cta"
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
                className={`absolute transition-all duration-300 transform ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
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
                className={`absolute transition-all duration-300 transform ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
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
          className={`lg:hidden absolute top-[calc(100%+10px)] left-[20px] right-[20px] md:left-[40px] md:right-[40px] bg-white/85 backdrop-blur-[13.2px] border border-white/30 rounded-[30px] p-[20px] md:p-[24px] flex flex-col gap-[16px] shadow-[0_12px_32px_rgba(4,40,73,0.08)] z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top max-h-[calc(100vh-100px)] overflow-y-auto ${isOpen
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
                    className={`flex flex-col border-b border-white/30 last:border-b-0 py-[4px] transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex items-center justify-between w-full py-[8px] body-xxs type-body-xxs text-midnight-blue hover:text-electric-blue transition-colors cursor-pointer text-left"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight
                        className={`w-[8px] h-[12px] shrink-0 transition-transform duration-300 ${isExpanded ? '-rotate-90 text-electric-blue' : 'rotate-90 text-midnight-blue/60'
                          }`}
                      />
                    </button>

                    {/* Accordion Sub-items */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isExpanded
                          ? 'grid-rows-[1fr] opacity-100 mt-[2px]'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                    >
                      <div className="min-h-0 flex flex-col gap-[2px] pl-[12px] border-l-2 border-[#0F68D6]/25 ml-[4px] pb-[8px]">
                        {item.children.map((subItem, subIdx) => {
                          const isCurrent = pathname === subItem.href;
                          return (
                            <Link
                              key={`${subItem.label}-${subIdx}`}
                              href={subItem.href}
                              onClick={() => {
                                setIsOpen(false);
                                setExpandedMobileItem(null);
                              }}
                              className={`py-[8px] px-[10px] rounded-[10px] body-xxs type-body-xxs flex items-center justify-between transition-all duration-150 ${isCurrent
                                  ? 'text-[#0F68D6] font-medium bg-white/40'
                                  : 'text-midnight-blue/80 hover:text-[#0F68D6] hover:bg-white/60'
                                }`}
                            >
                              <span>{subItem.label}</span>
                              {isCurrent && (
                                <ChevronRight className="w-[10px] h-[15px] shrink-0 text-[#0F68D6]" />
                              )}
                            </Link>
                          );
                        })}
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
                  className={`body-xxs type-body-xxs text-midnight-blue hover:text-electric-blue transition-all duration-300 py-[10px] border-b border-white/30 last:border-b-0 transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
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
            className={`pt-[12px] border-t border-white/40 flex flex-col transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
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
