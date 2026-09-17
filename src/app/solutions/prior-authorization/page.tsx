import type { Metadata } from 'next';

import PriorAuthorizationPage from '@/components/solutions/prior-authorization/page';

export const metadata: Metadata = {
  title: 'Solutions — Prior Authorization | Waterlabs AI',
  description:
    'Prior authorization in 24 to 48 hours. Our agents manage every authorization around the clock, ensuring prompt processing.',
};

export default function Page() {
  return <PriorAuthorizationPage />;
}
