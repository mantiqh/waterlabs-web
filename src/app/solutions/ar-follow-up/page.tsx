import type { Metadata } from 'next';

import ARFollowUpPage from '@/components/solutions/ar-follow-up/page';

export const metadata: Metadata = {
  title: 'Solutions — AR Follow-up | Waterlabs AI',
  description:
    'Every claim followed up, including the old ones. Our agents work through the entire ledger, checking statuses, chasing payers, and escalating anything that has stalled.',
};

export default function Page() {
  return <ARFollowUpPage />;
}
