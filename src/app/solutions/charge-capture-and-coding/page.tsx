import type { Metadata } from 'next';

import ChargeCaptureAndCodingPage from '@/components/solutions/charge-capture-and-coding/page';

export const metadata: Metadata = {
  title: 'Solutions — Charge Capture and Coding | Waterlabs AI',
  description:
    'Coding that clears before the claim moves. Our agents read documentation, assign codes it supports, and check compliance before anything leaves the building.',
};

export default function Page() {
  return <ChargeCaptureAndCodingPage />;
}
