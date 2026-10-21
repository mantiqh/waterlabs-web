'use client';

import { FileSliders } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { ChevronRight,CTA } from '@/components/CTA';
import {
  calculateROI,
  formatMoney,
  SORTED_SPECIALTIES,
} from '@/data/roi-calculator';

import styles from './calculator.module.css';

// Exact Figma gradient for opportunity figures (Figma Node 6684-7712):
// background: linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%);
const GRADIENT_STYLE: React.CSSProperties = {
  background: 'linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

export interface InfoButtonProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  content?: string;
}

export const InfoButton = ({
  id,
  ariaLabel = 'More information',
  className = '',
  content,
}: InfoButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipLeft, setTooltipLeft] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isActive]);

  const updatePlacement = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = 266;

      const boundaryEl =
        containerRef.current.closest('[data-tooltip-boundary="card"]') ||
        containerRef.current.closest('#roi-calculator');

      let minLeft = 16;
      let maxRight = window.innerWidth - 16;

      if (boundaryEl) {
        const bRect = boundaryEl.getBoundingClientRect();
        const isCard = boundaryEl.getAttribute('data-tooltip-boundary') === 'card';
        if (isCard) {
          minLeft = Math.max(16, bRect.left);
          maxRight = Math.min(window.innerWidth - 16, bRect.right);
        } else {
          const bStyle = window.getComputedStyle(boundaryEl);
          const pLeft = parseFloat(bStyle.paddingLeft) || 0;
          const pRight = parseFloat(bStyle.paddingRight) || 0;
          minLeft = Math.max(16, bRect.left + pLeft);
          maxRight = Math.min(window.innerWidth - 16, bRect.right - pRight);
        }
      }

      const btnCenter = rect.left + rect.width / 2;
      let targetLeft = btnCenter + 104 - tooltipWidth;

      if (targetLeft + tooltipWidth > maxRight) {
        targetLeft = maxRight - tooltipWidth;
      }
      if (targetLeft < minLeft) {
        targetLeft = minLeft;
      }

      setTooltipLeft(targetLeft - rect.left);
    }
  };

  const isSmallOrTouch = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024 || ('ontouchstart' in window && navigator.maxTouchPoints > 0);
  };

  const isOpen = (isActive || isHovered) && Boolean(content);

  useEffect(() => {
    if (isOpen) {
      updatePlacement();
      const handleResize = () => updatePlacement();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize, true);
      };
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => {
        updatePlacement();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isSmallOrTouch()) {
            updatePlacement();
            setIsActive((prev) => !prev);
          }
        }}
        className={`${styles.infoButton} ${isOpen || isActive ? styles.infoButtonActive : ''} ${className}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] shrink-0 pointer-events-none"
        >
          <circle
            cx="9"
            cy="9"
            r="8.1"
            strokeWidth="1.5"
            className={styles.infoButtonCircle}
          />
          <circle
            cx="9"
            cy="5.4"
            r="0.85"
            className={styles.infoButtonDot}
          />
          <path
            d="M9 8.2V12.6"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={styles.infoButtonStem}
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="tooltip"
          style={{
            left: `${tooltipLeft ?? -153}px`,
          }}
          className="absolute top-[calc(100%+10px)] z-50 w-[266px] max-w-[calc(100vw-32px)] bg-[#2A2A2A] text-white rounded-[12px] px-[14px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] animate-in fade-in-0 duration-150 pointer-events-auto"
        >
          <p className="type-caption text-white text-left font-normal m-0 leading-[16px]">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export const ROICalculator = () => {
  // Calculator inputs state
  const [specialty, setSpecialty] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [monthlyRevenueStr, setMonthlyRevenueStr] = useState<string>('');
  const [monthlyClaims, setMonthlyClaims] = useState<number>(0);
  const [monthlyClaimsStr, setMonthlyClaimsStr] = useState<string>('');
  const [denialRatePct, setDenialRatePct] = useState<number>(34.5);
  const [headcount, setHeadcount] = useState<number>(60);
  const [outsourcedPct, setOutsourcedPct] = useState<number>(20);

  // Generate unique IDs for accessibility
  const specialtyId = useId();
  const revenueId = useId();
  const claimsId = useId();
  const denialId = useId();
  const headcountId = useId();
  const outsourcedId = useId();

  // Calculation results
  const results = useMemo(() => {
    return calculateROI({
      specialty,
      monthlyRevenue,
      monthlyClaims,
      denialRatePct,
      headcount,
      outsourcedPct,
    });
  }, [specialty, monthlyRevenue, monthlyClaims, denialRatePct, headcount, outsourcedPct]);

  // Close specialty dropdown on click outside or escape key
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

  // Reset to defaults
  const handleReset = () => {
    setSpecialty('');
    setIsDropdownOpen(false);
    setHoveredOption(null);
    setMonthlyRevenue(0);
    setMonthlyRevenueStr('');
    setMonthlyClaims(0);
    setMonthlyClaimsStr('');
    setDenialRatePct(34.5);
    setHeadcount(60);
    setOutsourcedPct(20);
  };

  // Slider track fill percentages
  const denialFillPct = ((denialRatePct - 0) / (35 - 0)) * 100;
  const headcountFillPct = ((headcount - 3) / (400 - 3)) * 100;
  const inHousePct = 100 - outsourcedPct;
  const inHouseFillPct = inHousePct;

  // Live number input handler with inline comma formatting and cursor preservation
  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (val: number) => void,
    setValueStr: (valStr: string) => void,
  ) => {
    const input = e.target;
    const rawValue = input.value;
    const cursorPosition = input.selectionStart ?? rawValue.length;

    // Count how many numeric digits occurred before the cursor in raw input
    const digitsBeforeCursor = rawValue
      .slice(0, cursorPosition)
      .replace(/[^0-9]/g, '').length;

    // Extract all digits (limit to 12 digits to prevent overflowing safe numbers)
    const digits = rawValue.replace(/[^0-9]/g, '').slice(0, 12);

    if (!digits) {
      setValue(0);
      setValueStr('');
      return;
    }

    const num = parseInt(digits, 10);
    const parsedVal = isNaN(num) ? 0 : num;
    setValue(parsedVal);

    // Format with commas live as the user types
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setValueStr(formatted);

    // Maintain accurate cursor position despite added or removed commas
    requestAnimationFrame(() => {
      let targetPos = 0;
      let counted = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (counted >= digitsBeforeCursor) {
          break;
        }
        if (formatted[i] >= '0' && formatted[i] <= '9') {
          counted++;
        }
        targetPos = i + 1;
      }
      input.setSelectionRange(targetPos, targetPos);
    });
  };

  return (
    <div className="w-full">
      {/* Main Single Panel Container (Figma: LeftFormPanel + RightResultsPanel) */}
      <div
        id="roi-calculator"
        className="w-full max-w-[1320px] mx-auto rounded-[30px_15px_30px_30px] p-[20px] sm:p-[28px] lg:p-[32px] xl:p-[40px]"
        style={{
          background: 'rgba(145, 198, 242, 0.2)',
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[24px] lg:gap-[32px] xl:gap-[40px]">
          {/* ============================================================
              LEFT COLUMN — 6 INPUTS (Figma: Frame 2147227119, width: 512px)
              ============================================================ */}
          <div
            data-tooltip-boundary="card"
            className="w-full lg:w-[48%] xl:w-[512px] lg:shrink-0 flex flex-col gap-[20px]"
          >
            {/* Input 1: Specialty Dropdown */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[6px]">
                  <label
                    htmlFor={specialtyId}
                    className="type-h6 text-black block cursor-pointer"
                  >
                    Which specialty do you run?
                  </label>
                  <InfoButton
                    ariaLabel="Information about specialty selection"
                    content="Your specialty sets the denial rate benchmark and the average claim value we compare you against. If you cover several, pick the one carrying the most claim volume."
                  />
                </div>
                <p className="type-body-xxs text-charcoal">
                  Denial rates differ sharply by specialty.<br className="hidden lg:inline" /> We work from yours, not an industry average.
                </p>
              </div>

              <div ref={dropdownRef} className="relative mt-[16px]">
                <button
                  type="button"
                  id={specialtyId}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  className={`w-full bg-[#FCFDFE] border rounded-[12px_8px_12px_12px] h-[52px] px-[18px] flex items-center justify-between cursor-pointer transition-colors outline-none ${isDropdownOpen
                      ? 'border-electric-blue ring-2 ring-electric-blue/20'
                      : 'border-[#D7DCE2] hover:border-[#91C6F2]'
                    }`}
                >
                  <span
                    className={`type-caption truncate ${
                      specialty ? 'text-[#111111] font-medium' : 'text-[#7D8690]'
                    }`}
                  >
                    {specialty || 'Select Your Speciality'}
                  </span>
                  <div
                    className={`transition-transform duration-200 text-[#111111] ${
                      isDropdownOpen ? '-rotate-90 text-[#0F68D6]' : 'rotate-90'
                    }`}
                  >
                    <ChevronRight className="w-[9.73px] h-[14.63px] shrink-0" />
                  </div>
                </button>

                {/* Dropdown Menu (Navbar Dropdown UI style with solid white background) */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full max-h-[320px] overflow-y-auto bg-white rounded-[20px_10px_20px_20px] p-[16px] shadow-[0_16px_40px_rgba(4,40,73,0.12)] border border-[#D7DCE2] z-50 flex flex-col gap-[4px] animate-in fade-in-0 zoom-in-95 duration-150"
                    role="listbox"
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    {SORTED_SPECIALTIES.map((spec) => {
                      const isSelected = specialty === spec;
                      const isHovered = hoveredOption === spec;
                      const isActive = isSelected || isHovered;

                      return (
                        <button
                          key={spec}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setHoveredOption(spec)}
                          onMouseLeave={() => setHoveredOption(null)}
                          onClick={() => {
                            setSpecialty(spec);
                            setIsDropdownOpen(false);
                            setHoveredOption(null);
                          }}
                          className={`min-h-[40px] w-full flex flex-row items-center justify-between gap-[14px] px-[12px] py-[8px] rounded-[8px] type-caption transition-colors duration-150 cursor-pointer text-left ${
                            isActive
                              ? 'text-[#0F68D6] bg-[#0F68D6]/5 font-medium'
                              : 'text-[#111111] hover:text-[#0F68D6] hover:bg-[#F4F6F9]'
                          }`}
                        >
                          <span className="truncate">{spec}</span>
                          {isActive && (
                            <ChevronRight className="w-[9.73px] h-[14.63px] shrink-0 text-[#0F68D6]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Input 2 & 3: Monthly Collected Revenue & Monthly Claims Volume */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {/* Revenue */}
                <div className="flex flex-col justify-between gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[6px]">
                      <label
                        htmlFor={revenueId}
                        className="type-body-xxs font-medium text-black cursor-pointer block"
                      >
                        Monthly collected revenue
                      </label>
                      <InfoButton
                        ariaLabel="Information about monthly collected revenue"
                        content="Cash actually received in an average month, after contractual adjustments and write-offs. Not what you billed. If you only have an annual figure, divide it by twelve."
                      />
                    </div>
                    <span className="type-caption text-charcoal block">
                      What lands in the bank
                    </span>
                  </div>
                  <div className="bg-[#FCFDFE] border border-[#D7DCE2] rounded-[12px_8px_12px_12px] h-[64px] px-[16px] flex items-center focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/20 transition-all">
                    <div className="w-full flex items-baseline gap-[6px]">
                      <span className="type-body-xs text-gray-black">$</span>
                      <input
                        id={revenueId}
                        type="text"
                        inputMode="numeric"
                        value={monthlyRevenueStr}
                        onChange={(e) =>
                          handleNumberInputChange(e, setMonthlyRevenue, setMonthlyRevenueStr)
                        }
                        className="w-full bg-transparent outline-none type-h6 text-midnight-blue tabular-nums min-w-0"
                        aria-label="Monthly collected revenue in USD"
                      />
                    </div>
                  </div>
                </div>

                {/* Claims */}
                <div className="flex flex-col justify-between gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[6px]">
                      <label
                        htmlFor={claimsId}
                        className="type-body-xxs font-medium text-black cursor-pointer block"
                      >
                        Monthly claims volume
                      </label>
                      <InfoButton
                        ariaLabel="Information about monthly claims volume"
                        content="Claims submitted in an average month. Count each claim once, whether or not it paid first time. Not claim lines, and not patient visits."
                      />
                    </div>
                    <span className="type-caption text-charcoal block">
                      Claims submitted in an average month
                    </span>
                  </div>
                  <div className="bg-[#FCFDFE] border border-[#D7DCE2] rounded-[12px_8px_12px_12px] h-[64px] px-[16px] flex items-center focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/20 transition-all">
                    <div className="w-full flex items-baseline justify-between gap-[6px]">
                      <input
                        id={claimsId}
                        type="text"
                        inputMode="numeric"
                        value={monthlyClaimsStr}
                        onChange={(e) =>
                          handleNumberInputChange(e, setMonthlyClaims, setMonthlyClaimsStr)
                        }
                        className="w-full bg-transparent outline-none type-h6 text-midnight-blue tabular-nums min-w-0"
                        aria-label="Monthly claims volume"
                      />
                      <span className="type-caption text-medium-gray shrink-0">
                        claims
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input 4: Denial Rate Slider */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex flex-col gap-[6px] mb-[12px]">
                <div className="flex items-center justify-between gap-[16px]">
                  <div className="flex items-center gap-[6px]">
                    <label
                      htmlFor={denialId}
                      className="type-body-xxs font-medium text-black cursor-pointer block"
                    >
                      What share of your claims gets denied?
                    </label>
                    <InfoButton
                      ariaLabel="Information about claims denial share"
                      content="The share of claims denied on first submission, before any rework or appeal. This runs higher than the final denial rate most teams report at month end, so use the first-pass figure if you have it."
                    />
                  </div>
                  <div className="hidden sm:flex items-baseline gap-[4px] whitespace-nowrap">
                    <span className="type-body-l font-bold text-gray-black tabular-nums">
                      {denialRatePct.toFixed(1)}
                    </span>
                    <span className="type-body-xxs font-bold font-primary text-gray-black">
                      %
                    </span>
                  </div>
                </div>

                <span className="type-caption text-charcoal block">
                  First-pass denials, before rework
                </span>

                <div className="flex sm:hidden items-baseline gap-[4px] whitespace-nowrap">
                  <span className="type-body-l font-bold text-gray-black tabular-nums">
                    {denialRatePct.toFixed(1)}
                  </span>
                  <span className="type-body-xxs font-bold font-primary text-gray-black">
                    %
                  </span>
                </div>
              </div>

              <input
                id={denialId}
                type="range"
                min={0}
                max={35}
                step={0.5}
                value={denialRatePct}
                onChange={(e) => setDenialRatePct(parseFloat(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #0F68D6 ${denialFillPct}%, #D7DCE2 ${denialFillPct}%)`,
                }}
                className={`${styles.sliderInput} w-full`}
                aria-label="What share of your claims gets denied"
                aria-valuemin={0}
                aria-valuemax={35}
                aria-valuenow={denialRatePct}
                aria-valuetext={`${denialRatePct.toFixed(1)} percent`}
              />

              <div className="flex justify-between items-center mt-[8px] type-caption text-medium-gray tabular-nums">
                <span>0%</span>
                <span>35%</span>
              </div>
            </div>

            {/* Input 5: Total RCM Headcount Slider */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex items-end justify-between gap-[16px] mb-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center gap-[6px]">
                    <label
                      htmlFor={headcountId}
                      className="type-body-xxs font-medium text-black block cursor-pointer"
                    >
                      Total RCM headcount
                    </label>
                    <InfoButton
                      ariaLabel="Information about total RCM headcount"
                      content="Everyone working your revenue cycle: eligibility, prior authorisation, coding, billing, payment posting, AR follow-up and denials. Include vendor seats working your account. Leave out front desk and clinical staff."
                    />
                  </div>
                  <span className="type-caption text-charcoal block">
                    Everyone working your cycle, in-house or with a vendor
                  </span>
                </div>
                <div className="flex items-baseline gap-[4px] whitespace-nowrap">
                  <span className="type-body-l font-bold text-gray-black tabular-nums">
                    {headcount}
                  </span>
                  <span className="type-caption text-medium-gray uppercase">
                    FTE
                  </span>
                </div>
              </div>

              <input
                id={headcountId}
                type="range"
                min={3}
                max={400}
                step={1}
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                style={{
                  background: `linear-gradient(to right, #0F68D6 ${headcountFillPct}%, #D7DCE2 ${headcountFillPct}%)`,
                }}
                className={`${styles.sliderInput} w-full`}
                aria-label="Total RCM headcount"
                aria-valuemin={3}
                aria-valuemax={400}
                aria-valuenow={headcount}
                aria-valuetext={`${headcount} full-time equivalents`}
              />

              <div className="flex justify-between items-center mt-[8px] type-caption text-medium-gray tabular-nums">
                <span>3</span>
                <span>400+</span>
              </div>
            </div>

            {/* Input 6: Delivery Model Slider */}
            <div className="pt-[4px]">
              <div className="flex flex-col gap-[4px] mb-[12px]">
                <div className="flex items-center gap-[6px]">
                  <label
                    htmlFor={outsourcedId}
                    className="type-body-xxs font-medium text-black block cursor-pointer"
                  >
                    Delivery model
                  </label>
                  <InfoButton
                    ariaLabel="Information about delivery model"
                    content="The share of that headcount sitting with a vendor or BPO rather than on your own payroll. Based on people, not spend."
                  />
                </div>

                <div className="flex justify-between items-center type-caption">
                  <span className="text-electric-blue font-medium">{100 - outsourcedPct}% in-house</span>
                  <span className="text-midnight-blue font-medium">{outsourcedPct}% outsourced</span>
                </div>
              </div>

              <input
                id={outsourcedId}
                type="range"
                min={0}
                max={100}
                step={5}
                value={inHousePct}
                onChange={(e) => setOutsourcedPct(100 - parseInt(e.target.value, 10))}
                style={{
                  background: `linear-gradient(to right, #0F68D6 ${inHouseFillPct}%, #D7DCE2 ${inHouseFillPct}%)`,
                }}
                className={`${styles.sliderInput} w-full`}
                aria-label="Delivery model split"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={inHousePct}
                aria-valuetext={`${inHousePct} percent in-house, ${outsourcedPct} percent outsourced`}
              />
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN — RESULTS PANEL (Figma: RightResultsPanel, width: 688px)
              ============================================================ */}
          <div
            className="w-full lg:w-[52%] xl:w-[688px] lg:flex-1 lg:min-h-[668px] bg-white rounded-[24px] p-[24px] sm:p-[28px] lg:p-[32px] xl:p-[36px] shadow-sm flex flex-col justify-between gap-[24px]"
            aria-live="polite"
          >
            {!results ? (
              /* BEFORE INPUTS STATE (Image 1) */
              <>
                <div className="w-full flex-1 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] bg-[#F8FAFC] rounded-[16px] sm:rounded-[20px] p-[24px] sm:p-[32px] flex flex-col items-center justify-center text-center">
                  <div
                    className="w-[40px] h-[40px] p-[8px] rounded-[20px] mb-[16px] flex items-center justify-center text-[#2A2A2A] shrink-0"
                    style={{
                      background: 'rgba(17, 17, 17, 0.05)',
                      backdropFilter: 'blur(9.8px)',
                      WebkitBackdropFilter: 'blur(9.8px)',
                    }}
                  >
                    <FileSliders className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
                  </div>
                  <h3 className="type-h5 sm:type-h4 font-medium text-[#0F68D6] mb-[8px]">
                    Pick your  Speciality
                  </h3>
                  <p className="type-caption text-[#7D8690] text-center max-w-[340px]">
                    Your numbers appear here and update as you move the sliders.
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="type-caption text-[#7D8690] leading-[18px]">
                  Estimates are illustrative and based on applied to the inputs above. They do not account for every circumstance and are not a guarantee of results. Your assessment uses your actual claim, remit and denial data.
                </p>
              </>
            ) : (
              /* AFTER INPUTS STATE (Image 2) */
              <>
                <div className="flex flex-col gap-[20px]">
                  {/* Header: Dot + Label */}
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[8px] h-[8px] rounded-full bg-electric-blue shrink-0" />
                    <span className="type-body-xxs text-medium-gray font-normal">
                      Your Estimated Opportunity
                    </span>
                  </div>

                  {/* Calculated Result Cards */}
                  <div className="flex flex-col gap-[16px]">
                    {/* DetailBox1: Estimated Annual Savings */}
                    <div
                      data-tooltip-boundary="card"
                      className="rounded-[16px_8px_16px_16px] p-[20px] flex flex-col gap-[12px] border border-[#F4F6F9]"
                      style={{
                        background: 'rgba(145, 198, 242, 0.05)',
                      }}
                    >
                      <div className="flex items-center gap-[6px]">
                        <span className="type-body-xxs text-gray-black font-normal">
                          Estimated annual savings
                        </span>
                        <InfoButton
                          ariaLabel="Information about estimated annual savings"
                          content="What your revenue cycle costs to run today against what it would cost with agents handling the routine work. Labour only. It does not include the cost of the Waterlabs programme."
                        />
                      </div>
                      <div
                        style={GRADIENT_STYLE}
                        className="type-h1 tabular-nums whitespace-nowrap w-fit"
                      >
                        {formatMoney(results.annualSaving)}
                      </div>
                      <p className="type-caption text-charcoal">
                        {formatMoney(results.monthlySaving)} a month, across the {headcount} people working your cycle today.
                      </p>
                    </div>

                    {/* DetailBox2: Estimated Revenue Opportunity */}
                    <div
                      data-tooltip-boundary="card"
                      className="rounded-[16px_8px_16px_16px] p-[20px] flex flex-col gap-[12px] border border-[#F4F6F9]"
                      style={{
                        background: 'rgba(145, 198, 242, 0.05)',
                      }}
                    >
                      {results.atBenchmark ? (
                        <p className="type-caption text-charcoal">
                          Your denial performance is already at or better than benchmark. We would review how your current processes run for opportunities to lift revenue by a further 1 to 2%.
                        </p>
                      ) : (
                        <>
                          <div className="flex items-center gap-[6px]">
                            <span className="type-body-xxs text-gray-black font-normal">
                              Estimated revenue opportunity
                            </span>
                            <InfoButton
                              ariaLabel="Information about estimated revenue opportunity"
                              content="Two things together: revenue sitting in the gap between your denial rate and the benchmark for your specialty, and the lift we would expect from automating routine steps in the cycle."
                            />
                          </div>
                          <div
                            style={GRADIENT_STYLE}
                            className="type-h1 tabular-nums whitespace-nowrap w-fit"
                          >
                            {formatMoney(results.revenueOpportunity)}
                          </div>
                          {results.pctOfCollections !== null && (
                            <p className="type-caption text-charcoal">
                              {results.pctOfCollections.toFixed(1)}% of what you collect in a year.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  {/* Disclaimer */}
                  <p className="type-caption text-[#7D8690] leading-[18px]">
                    Estimates are illustrative and based on applied to the inputs above. They do not account for every circumstance and are not a guarantee of results. Your assessment uses your actual claim, remit and denial data.
                  </p>

                  {/* Start again button */}
                  <div>
                    <CTA variant="light-bg" onClick={handleReset}>
                      Start again
                    </CTA>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
