import type { Metadata } from 'next';

import DenialManagementPage from '@/components/solutions/denial-management/page';

export const metadata: Metadata = {
  title: 'Solutions — Denial Management | Waterlabs AI',
  description:
    'Denials worked the day they land. Our agents read the denial, identify the cause, build the appeal, and file it even when the deadline is still weeks away.',
};

export default function Page() {
  return <DenialManagementPage />;
}
