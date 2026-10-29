import type { Metadata } from 'next';

import HimerPage from '@/components/himer/page';

export const metadata: Metadata = {
  title: 'HIMER AI OS | Waterlabs AI',
  description:
    'The agentic operating system with twenty years of revenue cycle knowledge. Autonomous RCM agents coordinating across front, mid, and back office.',
};

export default function Page() {
  return <HimerPage />;
}
