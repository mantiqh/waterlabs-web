import type { Metadata } from 'next';

import ROIPage from '@/components/roi/page';

export const metadata: Metadata = {
  title: 'ROI Calculator | Waterlabs AI',
  description:
    'Find out what your revenue cycle actually costs you. Then find out what it could cost instead. Calculate your potential savings with our ROI calculator.',
};

export default function Page() {
  return <ROIPage />;
}
