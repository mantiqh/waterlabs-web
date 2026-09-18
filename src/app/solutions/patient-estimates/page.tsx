import type { Metadata } from 'next';

import PatientEstimatesPage from '@/components/solutions/patient-estimates/page';

export const metadata: Metadata = {
  title: 'Solutions — Patient Estimates | Waterlabs AI',
  description:
    'Every patient knows what they owe before they arrive. Our agents generate a benefits-adjusted estimate as soon as a visit is booked and deliver it before the date of service.',
};

export default function Page() {
  return <PatientEstimatesPage />;
}
