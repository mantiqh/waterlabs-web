import type { Metadata } from 'next';

import PaymentPostingPage from '@/components/solutions/payment-posting/page';

export const metadata: Metadata = {
  title: 'Solutions — Payment Posting | Waterlabs AI',
  description:
    'Every payment posted the day it lands. Our agents reconcile remittances, post payments, and route what does not balance at whatever volume your practice runs.',
};

export default function Page() {
  return <PaymentPostingPage />;
}
