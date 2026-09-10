import type { Metadata } from 'next';
import React from 'react';

import SolutionsPage from '@/components/solutions/page';

export const metadata: Metadata = {
  title: 'Solutions — Eligibility & Benefits Verification | Waterlabs AI',
  description:
    'Every patient verified before they arrive. Our agents check coverage, benefits, and patient responsibility ahead of the visit.',
};

export default function Page() {
  return <SolutionsPage />;
}
