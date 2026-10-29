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
          { label: 'Himer AI OS', href: '/solutions/prior-authorization' },
          { label: 'CurieCode', href: '/solutions/charge-capture-and-coding' },
        ],
      },
      {
        label: 'Agentic RCM Solutions',
        header: 'Agentic RCM Solutions',
        columns: [{ items: col1 }, { items: col2 }],
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
    <div className="relative z-50 mx-auto h-[60px] w-full max-w-[1320px] lg:h-auto lg:max-xl:-mx-[24px] lg:max-xl:w-[calc(100%+48px)]">
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 left-0 z-50 mx-auto w-full max-w-[1320px] transition-all duration-300 ease-out lg:relative lg:top-0 lg:right-auto lg:left-auto lg:px-0 ${
          isScrolled
            ? 'translate-y-0 px-0 opacity-100'
            : 'translate-y-[20px] px-[20px] opacity-100 md:px-[40px] lg:translate-y-0'
        }`}
      >
        <header
          className={`flex h-[60px] w-full flex-row items-center justify-between py-[8px] shadow-[0_4px_24px_rgba(4,40,73,0.06)] backdrop-blur-[13.2px] transition-all duration-300 lg:relative ${
            isScrolled
              ? 'rounded-none border-x-0 border-t-0 border-b border-[#D7DCE2] bg-white px-[20px] md:px-[40px] lg:rounded-[30px] lg:border lg:border-white/24 lg:pr-[6px] lg:pl-[12px] xl:pr-[12px] xl:pl-[24px]'
              : 'rounded-[30px] border border-white/24 bg-white/70 pr-[8px] pl-[16px] md:pr-[12px] md:pl-[20px] lg:pr-[6px] lg:pl-[12px] xl:pr-[12px] xl:pl-[24px]'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="mr-[6px] flex shrink-0 items-center lg:max-xl:mr-[2px] xl:mr-0"
            onClick={() => {
              setIsOpen(false);
              setActiveDropdown(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/common/logo.svg"
              alt="Waterlabs AI"
              className="h-[22px] w-auto lg:h-[22px] xl:h-[30px] 2xl:h-[36px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="-my-[8px] hidden h-[60px] flex-row items-center gap-[12px] lg:flex xl:gap-[24px]">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isDropdownOpen = activeDropdown === item.label;
              const isCurrentPage = item.href ? pathname === item.href : false;

              return (
                <div
                  key={item.label}
                  className={`flex h-full items-center ${
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
                      className={`group body-xxs type-body-xxs flex items-center gap-[6px] py-[8px] whitespace-nowrap transition-colors xl:gap-[8px] ${
                        isDropdownOpen || isCurrentPage
                          ? 'text-[#0F68D6]'
                          : 'text-[#111111] hover:text-[#0F68D6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronRight
                          className={`h-[12px] w-[8px] shrink-0 transition-transform duration-200 xl:h-[14.63px] xl:w-[9.73px] ${
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
                      className={`group body-xxs type-body-xxs flex cursor-pointer items-center gap-[6px] py-[8px] whitespace-nowrap transition-colors xl:gap-[8px] ${
                        isDropdownOpen ? 'text-[#0F68D6]' : 'text-[#111111] hover:text-[#0F68D6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronRight
                          className={`h-[12px] w-[8px] shrink-0 transition-transform duration-200 xl:h-[14.63px] xl:w-[9.73px] ${
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
                      className={`absolute top-full z-50 origin-top pt-[30px] transition-all duration-200 ease-out ${
                        item.columns && item.columns.length > 1
                          ? 'left-0 lg:max-xl:right-0 lg:max-xl:left-auto xl:right-auto xl:left-0'
                          : 'left-0'
                      } ${
                        isDropdownOpen
                          ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
                          : 'pointer-events-none invisible -translate-y-2 scale-[0.97] opacity-0'
                      }`}
                    >
                      {item.columns && item.columns.length > 1 ? (
                        /* 2-Column Dropdown (Agentic RCM Solutions: 746px x 284px) */
                        <div
                          className="flex w-[746px] max-w-[calc(100vw-32px)] flex-col rounded-[20px_10px_20px_20px] border border-white/70 bg-white/85 p-[24px] shadow-[0_16px_40px_rgba(4,40,73,0.08)] backdrop-blur-[20px]"
                          onMouseLeave={() => setHoveredSubItem(null)}
                        >
                          {/* Columns Frame 2147227097 */}
                          <div className="flex w-full flex-row items-start gap-[24px]">
                            {item.columns.map((col, colIdx) => (
                              <div
                                key={colIdx}
                                className="flex w-[337px] flex-1 flex-col gap-[8px]"
                              >
                                {col.items.map((subItem, subIdx) => {
                                  const allHrefs = item.children
                                    ? item.children.map((c) => c.href)
                                    : [];
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
                                      className={`body-xxs type-body-xxs flex h-[40px] flex-row items-center gap-[14px] py-[8px] transition-colors duration-150 ${
                                        isActive
                                          ? 'text-[#0F68D6]'
                                          : 'text-[#111111] hover:text-[#0F68D6]'
                                      }`}
                                    >
                                      <span className="whitespace-nowrap">{subItem.label}</span>
                                      {isActive && (
                                        <ChevronRight className="h-[14.63px] w-[9.73px] shrink-0 text-[#0F68D6]" />
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
                          className="flex w-[218px] flex-col rounded-[20px_10px_20px_20px] border border-white/70 bg-white/85 p-[24px] shadow-[0_16px_40px_rgba(4,40,73,0.08)] backdrop-blur-[20px]"
                          onMouseLeave={() => setHoveredSubItem(null)}
                        >
                          {/* Items Frame 2147227091 */}
                          <div className="flex w-full flex-col gap-[8px]">
                            {item.children.map((subItem, subIdx) => {
                              const allHrefs = item.children
                                ? item.children.map((c) => c.href)
                                : [];
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
                                  className={`body-xxs type-body-xxs flex h-[40px] flex-row items-center gap-[12px] py-[8px] transition-colors duration-150 ${
                                    isActive
                                      ? 'text-[#0F68D6]'
                                      : 'text-[#111111] hover:text-[#0F68D6]'
                                  }`}
                                >
                                  <span className="whitespace-nowrap">{subItem.label}</span>
                                  {isActive && (
                                    <ChevronRight className="h-[14.63px] w-[9.73px] shrink-0 text-[#0F68D6]" />
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
          <div className="ml-[6px] hidden shrink-0 lg:block lg:max-xl:ml-[2px] xl:ml-0">
            <Link href="/contact-us">
              <CTA
                variant="light-bg"
                className="body-cta type-cta lg:max-xl:!h-[38px] lg:max-xl:!gap-[6px] lg:max-xl:!px-[12px] xl:h-[44px] xl:gap-[10px] xl:px-[20px]"
              >
                Contact Us
              </CTA>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="gap-ds-12 md:gap-ds-20 flex shrink-0 flex-row items-center lg:hidden">
            <button
              type="button"
              aria-label="Search"
              className="text-midnight-blue hover:text-electric-blue p-1 transition-colors"
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
                className="h-[18px] w-[18px]"
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
              className="text-midnight-blue hover:text-electric-blue relative flex h-[32px] w-[32px] items-center justify-center p-1 transition-colors focus:outline-none"
            >
              <span
                className={`absolute transform transition-all duration-300 ${
                  isOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-75 -rotate-90 opacity-0'
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
                  className="h-[20px] w-[20px]"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span
                className={`absolute transform transition-all duration-300 ${
                  isOpen ? 'scale-75 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/common/menu.svg"
                  alt="Menu"
                  className="text-midnight-blue h-[19px] w-[29px] transition-opacity hover:opacity-80"
                />
              </span>
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown overlay */}
        <div
          className={`absolute top-[calc(100%+10px)] right-[20px] left-[20px] z-50 flex max-h-[calc(100vh-100px)] origin-top flex-col gap-[16px] overflow-y-auto rounded-[30px] border border-white/30 bg-white/85 p-[20px] shadow-[0_12px_32px_rgba(4,40,73,0.08)] backdrop-blur-[13.2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:right-[40px] md:left-[40px] md:p-[24px] lg:hidden ${
            isOpen
              ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none invisible -translate-y-4 scale-[0.98] opacity-0'
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
                    className={`flex transform flex-col border-b border-white/30 py-[4px] transition-all duration-300 last:border-b-0 ${
                      isOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileItem(item.label)}
                      className="body-xxs type-body-xxs text-midnight-blue hover:text-electric-blue flex w-full cursor-pointer items-center justify-between py-[8px] text-left transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight
                        className={`h-[12px] w-[8px] shrink-0 transition-transform duration-300 ${
                          isExpanded
                            ? 'text-electric-blue -rotate-90'
                            : 'text-midnight-blue/60 rotate-90'
                        }`}
                      />
                    </button>

                    {/* Accordion Sub-items */}
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? 'mt-[2px] grid-rows-[1fr] opacity-100'
                          : 'mt-0 grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="ml-[4px] flex min-h-0 flex-col gap-[2px] border-l-2 border-[#0F68D6]/25 pb-[8px] pl-[12px]">
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
                              className={`body-xxs type-body-xxs flex items-center justify-between rounded-[10px] px-[10px] py-[8px] transition-all duration-150 ${
                                isCurrent
                                  ? 'bg-white/40 font-medium text-[#0F68D6]'
                                  : 'text-midnight-blue/80 hover:bg-white/60 hover:text-[#0F68D6]'
                              }`}
                            >
                              <span>{subItem.label}</span>
                              {isCurrent && (
                                <ChevronRight className="h-[15px] w-[10px] shrink-0 text-[#0F68D6]" />
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
                  className={`body-xxs type-body-xxs text-midnight-blue hover:text-electric-blue transform border-b border-white/30 py-[10px] transition-all duration-300 last:border-b-0 ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
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
            className={`flex transform flex-col border-t border-white/40 pt-[12px] transition-all duration-300 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
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
