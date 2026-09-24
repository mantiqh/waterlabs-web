'use client';

import { useId, useMemo, useState } from 'react';

import {
  calculateROI,
  formatMoney,
  formatThousands,
  ROI_BENCHMARKS,
  sanitizeNumberInput,
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

export const ROICalculator = () => {
  // Calculator inputs state
  const [specialty, setSpecialty] = useState<string>('');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(20000000);
  const [monthlyRevenueStr, setMonthlyRevenueStr] = useState<string>('20,000,000');
  const [monthlyClaims, setMonthlyClaims] = useState<number>(10000);
  const [monthlyClaimsStr, setMonthlyClaimsStr] = useState<string>('10,000');
  const [denialRatePct, setDenialRatePct] = useState<number>(15.0);
  const [headcount, setHeadcount] = useState<number>(60);
  const [outsourcedPct, setOutsourcedPct] = useState<number>(20);

  // Generate unique IDs for accessibility
  const specialtyId = useId();
  const revenueId = useId();
  const claimsId = useId();
  const denialId = useId();
  const headcountId = useId();
  const outsourcedId = useId();

  // Selected benchmark data
  const benchmark = specialty ? ROI_BENCHMARKS[specialty] : null;

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

  // Reset to defaults
  const handleReset = () => {
    setSpecialty('');
    setMonthlyRevenue(20000000);
    setMonthlyRevenueStr('20,000,000');
    setMonthlyClaims(10000);
    setMonthlyClaimsStr('10,000');
    setDenialRatePct(15.0);
    setHeadcount(60);
    setOutsourcedPct(20);
  };

  // Slider track fill percentages
  const denialFillPct = ((denialRatePct - 0) / (35 - 0)) * 100;
  const headcountFillPct = ((headcount - 3) / (400 - 3)) * 100;
  const outsourcedFillPct = ((outsourcedPct - 0) / (100 - 0)) * 100;

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
          <div className="w-full lg:w-[48%] xl:w-[512px] lg:shrink-0 flex flex-col gap-[20px]">
            {/* Input 1: Specialty Dropdown */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex flex-col gap-[8px]">
                <label
                  htmlFor={specialtyId}
                  className="type-h6 text-black block cursor-pointer"
                >
                  Which specialty do you run?
                </label>
                <p className="type-body-xxs text-charcoal">
                  Denial rates differ sharply by specialty. We work from yours, not an industry average.
                </p>
              </div>

              <div className="relative mt-[16px]">
                <select
                  id={specialtyId}
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className={`w-full appearance-none bg-[#FCFDFE] border border-[#D7DCE2] rounded-[12px_8px_12px_12px] h-[52px] px-[18px] pr-[44px] type-caption cursor-pointer focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-colors ${
                    specialty ? 'text-black font-medium' : 'text-medium-gray'
                  }`}
                >
                  <option value="" disabled>
                    Select Your Specialty
                  </option>
                  {SORTED_SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-medium-gray">
                  <svg
                    className="w-[16px] h-[16px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input 2 & 3: Monthly Collected Revenue & Monthly Claims Volume */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {/* Revenue */}
                <div className="flex flex-col justify-between gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <label
                      htmlFor={revenueId}
                      className="type-body-xxs font-medium text-black cursor-pointer block"
                    >
                      Monthly collected revenue
                    </label>
                    <span className="type-caption text-charcoal block">
                      What lands in the bank
                    </span>
                  </div>
                  <div className="bg-[#FCFDFE] border border-[#D7DCE2] rounded-[12px_8px_12px_12px] h-[64px] px-[16px] flex items-baseline gap-[6px] focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/20 transition-all">
                    <span className="type-body-xs text-gray-black">$</span>
                    <input
                      id={revenueId}
                      type="text"
                      inputMode="numeric"
                      value={monthlyRevenueStr}
                      onFocus={() => {
                        setMonthlyRevenueStr(
                          monthlyRevenue > 0 ? monthlyRevenue.toString() : ''
                        );
                      }}
                      onChange={(e) => {
                        const val = sanitizeNumberInput(e.target.value, 999999999);
                        setMonthlyRevenue(val);
                        setMonthlyRevenueStr(e.target.value.replace(/[^0-9]/g, ''));
                      }}
                      onBlur={() => {
                        setMonthlyRevenueStr(formatThousands(monthlyRevenue));
                      }}
                      className="w-full bg-transparent outline-none type-h6 text-midnight-blue tabular-nums min-w-0"
                      aria-label="Monthly collected revenue in USD"
                    />
                  </div>
                </div>

                {/* Claims */}
                <div className="flex flex-col justify-between gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <label
                      htmlFor={claimsId}
                      className="type-body-xxs font-medium text-black cursor-pointer block"
                    >
                      Monthly claims volume
                    </label>
                    <span className="type-caption text-charcoal block">
                      Claims submitted in an average month
                    </span>
                  </div>
                  <div className="bg-[#FCFDFE] border border-[#D7DCE2] rounded-[12px_8px_12px_12px] h-[64px] px-[16px] flex items-baseline justify-between gap-[6px] focus-within:border-electric-blue focus-within:ring-2 focus-within:ring-electric-blue/20 transition-all">
                    <input
                      id={claimsId}
                      type="text"
                      inputMode="numeric"
                      value={monthlyClaimsStr}
                      onFocus={() => {
                        setMonthlyClaimsStr(
                          monthlyClaims > 0 ? monthlyClaims.toString() : ''
                        );
                      }}
                      onChange={(e) => {
                        const val = sanitizeNumberInput(e.target.value, 9999999);
                        setMonthlyClaims(val);
                        setMonthlyClaimsStr(e.target.value.replace(/[^0-9]/g, ''));
                      }}
                      onBlur={() => {
                        setMonthlyClaimsStr(formatThousands(monthlyClaims));
                      }}
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

            {/* Input 4: Denial Rate Slider */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex items-end justify-between gap-[16px] mb-[12px]">
                <div className="flex flex-col gap-[4px]">
                  <label
                    htmlFor={denialId}
                    className="type-body-xxs font-medium text-black block cursor-pointer"
                  >
                    What share of your claims gets denied?
                  </label>
                  <span className="type-caption text-charcoal block">
                    First-pass denials, before rework
                  </span>
                </div>
                <div className="flex items-baseline gap-[4px] whitespace-nowrap">
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
                  background: `linear-gradient(to right, #0F68D6 ${denialFillPct}%, #E2E8F0 ${denialFillPct}%)`,
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
                <span className="text-center font-medium">
                  {benchmark ? (
                    <>
                      Benchmark{' '}
                      <span className="font-semibold text-electric-blue">
                        {Math.round(benchmark.denialRate * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-medium-gray/70">
                      Select a specialty for its benchmark
                    </span>
                  )}
                </span>
                <span>35%</span>
              </div>
            </div>

            {/* Input 5: Total RCM Headcount Slider */}
            <div className="pb-[20px] border-b border-[#D7DCE2]">
              <div className="flex items-end justify-between gap-[16px] mb-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <label
                    htmlFor={headcountId}
                    className="type-body-xxs font-medium text-black block cursor-pointer"
                  >
                    Total RCM headcount
                  </label>
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
                  background: `linear-gradient(to right, #0F68D6 ${headcountFillPct}%, #E2E8F0 ${headcountFillPct}%)`,
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
                <label
                  htmlFor={outsourcedId}
                  className="type-body-xxs font-medium text-black block cursor-pointer"
                >
                  Delivery model
                </label>

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
                value={outsourcedPct}
                onChange={(e) => setOutsourcedPct(parseInt(e.target.value, 10))}
                style={{
                  background: `linear-gradient(to right, #0F68D6 ${outsourcedFillPct}%, #63CCB7 ${outsourcedFillPct}%)`,
                }}
                className={`${styles.sliderInput} w-full`}
                aria-label="Delivery model split"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={outsourcedPct}
                aria-valuetext={`${100 - outsourcedPct} percent in-house, ${outsourcedPct} percent outsourced`}
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
            {/* Header: Dot + Label */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-electric-blue shrink-0" />
              <span className="type-body-xxs text-medium-gray font-normal">
                Your Estimated Opportunity
              </span>
            </div>

            {/* Conditional Content: Empty State vs Results */}
            {!results ? (
              /* Approved Empty State */
              <div className="flex flex-col items-center justify-center text-center py-[48px] px-[16px] rounded-[16px] border border-dashed border-[#D7DCE2] bg-white my-[8px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#EAF2FC] flex items-center justify-center text-electric-blue mb-[14px]">
                  <svg
                    className="w-[22px] h-[22px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <h3 className="type-body-xxs font-semibold text-charcoal">
                  Pick your specialty
                </h3>
                <p className="type-caption text-medium-gray max-w-[260px] mt-[6px]">
                  Your numbers appear here and update as you move the sliders.
                </p>
              </div>
            ) : (
              /* Calculated Result Cards (Figma: DetailBox1 & DetailBox2) */
              <div className="flex flex-col gap-[16px]">
                {/* DetailBox1: Estimated Annual Savings */}
                <div
                  className="rounded-[16px_8px_16px_16px] p-[20px] flex flex-col gap-[12px] border border-[#F4F6F9]"
                  style={{
                    background: 'rgba(145, 198, 242, 0.05)',
                  }}
                >
                  <div className="type-body-xxs text-gray-black font-normal">
                    Estimated annual savings
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
                  className="rounded-[16px_8px_16px_16px] p-[20px] flex flex-col gap-[12px] border border-[#F4F6F9]"
                  style={{
                    background: 'rgba(145, 198, 242, 0.05)',
                  }}
                >
                  <div className="type-body-xxs text-gray-black font-normal">
                    Estimated revenue opportunity
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
                </div>

                {/* At-Benchmark Notice */}
                {results.atBenchmark && (
                  <div className="p-[14px] lg:p-[16px] rounded-[12px] bg-[#FFF8EE] border border-[#F5E2B8] flex items-start gap-[10px]">
                    <svg
                      className="w-[18px] h-[18px] text-[#B27400] shrink-0 mt-[2px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v5m0 3.5v.01"
                      />
                    </svg>
                    <p className="type-caption text-[#6B4A00]">
                      Your denials already sit at or better than benchmark. There is nothing for us to recover there. The opportunity above comes from operating efficiency instead.
                    </p>
                  </div>
                )}

                {/* Start again button */}
                <div className="flex items-center justify-between pt-[4px]">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="type-caption text-medium-gray hover:text-gray-black underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Start again
                  </button>
                </div>
              </div>
            )}

            {/* Detail description / Disclaimer (Figma: Detail description) */}
            <p className="type-caption text-charcoal">
              Estimates are illustrative and based on published benchmarks for your specialty applied to the inputs above. They do not account for every circumstance and are not a guarantee of results. Your assessment uses your actual claim, remit and denial data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
