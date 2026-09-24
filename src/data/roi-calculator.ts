export interface SpecialtyBenchmark {
  chargePerClaim: number;
  denialRate: number;
  cleanClaimRate?: number;
  writeOffRate?: number;
  dsoTarget?: number;
}

export const ROI_CONSTANTS = {
  inhouseCostPerFTE: 7500,
  outsourcedCostPerFTE: 2000,
  agentCostPerFTE: 1000,
  conversionRate: 0.75,
  denialRecoveryRate: 0.35,
  efficiencyUplift: 0.015,
} as const;

export const ROI_BENCHMARKS: Record<string, SpecialtyBenchmark> = {
  "Primary Care (Family/Internal Medicine)": {
    chargePerClaim: 180,
    denialRate: 0.07,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Pediatrics": {
    chargePerClaim: 150,
    denialRate: 0.06,
    cleanClaimRate: 0.97,
    writeOffRate: 0.025,
    dsoTarget: 28,
  },
  "Cardiology": {
    chargePerClaim: 450,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Orthopedics": {
    chargePerClaim: 500,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Dermatology": {
    chargePerClaim: 180,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 28,
  },
  "Gastroenterology": {
    chargePerClaim: 900,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 33,
  },
  "Neurology": {
    chargePerClaim: 300,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Oncology": {
    chargePerClaim: 3000,
    denialRate: 0.12,
    cleanClaimRate: 0.92,
    writeOffRate: 0.06,
    dsoTarget: 42,
  },
  "Radiology (Diagnostic)": {
    chargePerClaim: 250,
    denialRate: 0.07,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Interventional Radiology": {
    chargePerClaim: 2000,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Emergency Medicine": {
    chargePerClaim: 700,
    denialRate: 0.12,
    cleanClaimRate: 0.91,
    writeOffRate: 0.07,
    dsoTarget: 45,
  },
  "Anesthesiology": {
    chargePerClaim: 800,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "OB/GYN": {
    chargePerClaim: 300,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 33,
  },
  "Urology": {
    chargePerClaim: 500,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Ophthalmology": {
    chargePerClaim: 300,
    denialRate: 0.06,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Physical Therapy": {
    chargePerClaim: 120,
    denialRate: 0.05,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Behavioral Health": {
    chargePerClaim: 120,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 22,
  },
  "Endocrinology": {
    chargePerClaim: 200,
    denialRate: 0.06,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Pulmonology": {
    chargePerClaim: 350,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "General Surgery": {
    chargePerClaim: 2500,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Urgent Care": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Allergy & Immunology": {
    chargePerClaim: 180,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 28,
  },
  "Rheumatology": {
    chargePerClaim: 250,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "Nephrology": {
    chargePerClaim: 350,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Infectious Disease": {
    chargePerClaim: 250,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 32,
  },
  "Hematology": {
    chargePerClaim: 800,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Vascular Surgery": {
    chargePerClaim: 3000,
    denialRate: 0.11,
    cleanClaimRate: 0.92,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Plastic & Reconstructive Surgery": {
    chargePerClaim: 2000,
    denialRate: 0.08,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Neurosurgery": {
    chargePerClaim: 10000,
    denialRate: 0.12,
    cleanClaimRate: 0.91,
    writeOffRate: 0.06,
    dsoTarget: 45,
  },
  "Cardiothoracic Surgery": {
    chargePerClaim: 20000,
    denialRate: 0.12,
    cleanClaimRate: 0.91,
    writeOffRate: 0.06,
    dsoTarget: 45,
  },
  "Colorectal Surgery": {
    chargePerClaim: 2500,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Bariatric Surgery": {
    chargePerClaim: 12000,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Trauma Surgery": {
    chargePerClaim: 8000,
    denialRate: 0.13,
    cleanClaimRate: 0.9,
    writeOffRate: 0.07,
    dsoTarget: 48,
  },
  "Pain Management": {
    chargePerClaim: 500,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 32,
  },
  "Physical Medicine & Rehabilitation": {
    chargePerClaim: 250,
    denialRate: 0.06,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Occupational Therapy": {
    chargePerClaim: 120,
    denialRate: 0.05,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Speech-Language Pathology": {
    chargePerClaim: 120,
    denialRate: 0.05,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Podiatry": {
    chargePerClaim: 250,
    denialRate: 0.06,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Otolaryngology (ENT)": {
    chargePerClaim: 350,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 33,
  },
  "Sleep Medicine": {
    chargePerClaim: 1000,
    denialRate: 0.08,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "Nuclear Medicine": {
    chargePerClaim: 800,
    denialRate: 0.08,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Pathology": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.03,
    dsoTarget: 28,
  },
  "Hospice & Palliative Care": {
    chargePerClaim: 200,
    denialRate: 0.03,
    cleanClaimRate: 0.99,
    writeOffRate: 0.01,
    dsoTarget: 20,
  },
  "Geriatrics": {
    chargePerClaim: 180,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 26,
  },
  "Neonatology": {
    chargePerClaim: 2000,
    denialRate: 0.1,
    cleanClaimRate: 0.92,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Maternal-Fetal Medicine": {
    chargePerClaim: 500,
    denialRate: 0.08,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "Reproductive Endocrinology & Infertility": {
    chargePerClaim: 1500,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 32,
  },
  "Genetics / Medical Genetics": {
    chargePerClaim: 400,
    denialRate: 0.05,
    cleanClaimRate: 0.96,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Addiction Medicine": {
    chargePerClaim: 150,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 22,
  },
  "Sports Medicine": {
    chargePerClaim: 250,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Hand Surgery": {
    chargePerClaim: 2500,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.05,
    dsoTarget: 36,
  },
  "Oral & Maxillofacial Surgery": {
    chargePerClaim: 1500,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Dental (Medical Claims)": {
    chargePerClaim: 250,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Chiropractic": {
    chargePerClaim: 75,
    denialRate: 0.03,
    cleanClaimRate: 0.99,
    writeOffRate: 0.01,
    dsoTarget: 20,
  },
  "Acupuncture": {
    chargePerClaim: 80,
    denialRate: 0.03,
    cleanClaimRate: 0.99,
    writeOffRate: 0.01,
    dsoTarget: 20,
  },
  "Integrative Medicine": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Clinical Psychology": {
    chargePerClaim: 120,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 22,
  },
  "Psychiatry": {
    chargePerClaim: 180,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 22,
  },
  "Home Health": {
    chargePerClaim: 150,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 35,
  },
  "Skilled Nursing Facility (SNF)": {
    chargePerClaim: 500,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Dialysis Center": {
    chargePerClaim: 1000,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 36,
  },
  "Infusion Therapy": {
    chargePerClaim: 1000,
    denialRate: 0.1,
    cleanClaimRate: 0.93,
    writeOffRate: 0.05,
    dsoTarget: 38,
  },
  "Ambulatory Surgery Center (ASC)": {
    chargePerClaim: 2500,
    denialRate: 0.09,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 36,
  },
  "Hospitalist Medicine": {
    chargePerClaim: 300,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 30,
  },
  "Critical Care Medicine": {
    chargePerClaim: 1500,
    denialRate: 0.11,
    cleanClaimRate: 0.92,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Preventive Medicine": {
    chargePerClaim: 180,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Occupational Medicine": {
    chargePerClaim: 180,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Telemedicine": {
    chargePerClaim: 80,
    denialRate: 0.03,
    cleanClaimRate: 0.99,
    writeOffRate: 0.01,
    dsoTarget: 20,
  },
  "Clinical Laboratory": {
    chargePerClaim: 50,
    denialRate: 0.02,
    cleanClaimRate: 0.99,
    writeOffRate: 0.01,
    dsoTarget: 18,
  },
  "Fertility Clinic": {
    chargePerClaim: 2000,
    denialRate: 0.08,
    cleanClaimRate: 0.94,
    writeOffRate: 0.04,
    dsoTarget: 35,
  },
  "Wound Care": {
    chargePerClaim: 500,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "Hepatology": {
    chargePerClaim: 350,
    denialRate: 0.08,
    cleanClaimRate: 0.95,
    writeOffRate: 0.04,
    dsoTarget: 34,
  },
  "Electrophysiology": {
    chargePerClaim: 5000,
    denialRate: 0.11,
    cleanClaimRate: 0.92,
    writeOffRate: 0.05,
    dsoTarget: 40,
  },
  "Cardiac Rehabilitation": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Respiratory Therapy": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Clinical Nutrition / Dietetics": {
    chargePerClaim: 100,
    denialRate: 0.04,
    cleanClaimRate: 0.98,
    writeOffRate: 0.02,
    dsoTarget: 22,
  },
  "Audiology": {
    chargePerClaim: 150,
    denialRate: 0.05,
    cleanClaimRate: 0.97,
    writeOffRate: 0.02,
    dsoTarget: 25,
  },
  "Prosthetics & Orthotics": {
    chargePerClaim: 500,
    denialRate: 0.07,
    cleanClaimRate: 0.95,
    writeOffRate: 0.03,
    dsoTarget: 32,
  },
};

export const SORTED_SPECIALTIES = Object.keys(ROI_BENCHMARKS).sort((a, b) =>
  a.localeCompare(b),
);

export interface CalculatorInputs {
  specialty: string;
  monthlyRevenue: number;
  monthlyClaims: number;
  denialRatePct: number;
  headcount: number;
  outsourcedPct: number;
}

export interface CalculatorResults {
  annualSaving: number;
  monthlySaving: number;
  revenueOpportunity: number;
  pctOfCollections: number | null;
  gap: number;
  atBenchmark: boolean;
  benchmarkDenialRate: number;
}

export function calculateROI(
  inputs: CalculatorInputs,
): CalculatorResults | null {
  if (!inputs.specialty || !ROI_BENCHMARKS[inputs.specialty]) {
    return null;
  }

  const benchmark = ROI_BENCHMARKS[inputs.specialty];
  const outShare = inputs.outsourcedPct / 100;
  const denialRate = inputs.denialRatePct / 100;

  // Stream 1 — Estimated annual savings
  const blendedCostNow =
    ROI_CONSTANTS.inhouseCostPerFTE * (1 - outShare) +
    ROI_CONSTANTS.outsourcedCostPerFTE * outShare;

  const revisedCost =
    ROI_CONSTANTS.conversionRate * ROI_CONSTANTS.agentCostPerFTE +
    (1 - ROI_CONSTANTS.conversionRate) * blendedCostNow;

  const annualSaving =
    inputs.headcount * (blendedCostNow - revisedCost) * 12;

  const monthlySaving = annualSaving / 12;

  // Stream 2 — Estimated revenue opportunity
  const annualClaims = inputs.monthlyClaims * 12;
  const annualRevenue = inputs.monthlyRevenue * 12;

  const claimValue = benchmark.chargePerClaim;
  const benchmarkDenial = benchmark.denialRate;

  const denialPool = annualClaims * denialRate * claimValue;

  const gap = Math.max(0, denialRate - benchmarkDenial);

  const captureShare = denialRate > 0 ? gap / denialRate : 0;

  const recovered =
    denialPool * captureShare * ROI_CONSTANTS.denialRecoveryRate;

  const uplift = annualRevenue * ROI_CONSTANTS.efficiencyUplift;

  const revenueOpportunity = recovered + uplift;

  // Supporting percentage line:
  // If annualRevenue === 0: HIDE this supporting line completely (null)
  const pctOfCollections =
    annualRevenue > 0
      ? (revenueOpportunity / annualRevenue) * 100
      : null;

  const atBenchmark = gap <= 0.001;

  return {
    annualSaving,
    monthlySaving,
    revenueOpportunity,
    pctOfCollections,
    gap,
    atBenchmark,
    benchmarkDenialRate: benchmark.denialRate,
  };
}

export function formatMoney(val: number): string {
  const abs = Math.abs(val);
  if (abs >= 1e9) {
    return `$${(val / 1e9).toFixed(2)}B`;
  }
  if (abs >= 1e6) {
    return `$${(val / 1e6).toFixed(1)}M`;
  }
  if (abs >= 1e3) {
    return `$${Math.round(val / 1e3)}K`;
  }
  return `$${Math.round(val)}`;
}

export function formatThousands(val: number): string {
  return Math.round(val).toLocaleString("en-US");
}

export function sanitizeNumberInput(
  raw: string,
  max: number = 999999999,
): number {
  const cleaned = raw.replace(/[^0-9]/g, "");
  if (!cleaned) return 0;
  const parsed = parseInt(cleaned, 10);
  if (isNaN(parsed) || parsed < 0) return 0;
  return Math.min(parsed, max);
}
