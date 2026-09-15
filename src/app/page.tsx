import type { Metadata } from 'next';

import HomePage from '@/components/home/page';

export const metadata: Metadata = {
  title: 'Waterlabs AI | Agentic Revenue Cycle Management',
  description:
    'Agentic AI built to own your revenue cycle, not just automate it. Autonomous RCM for health systems and healthcare providers.',
};

export default function Page() {
  return <HomePage />;
}

