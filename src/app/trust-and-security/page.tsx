import type { Metadata } from 'next';

import TrustAndSecurityPage from '@/components/trust-and-security/page';

export const metadata: Metadata = {
  title: 'Trust & Security | Waterlabs AI',
  description: 'Learn how Waterlabs AI protects your data, ensures compliance, and upholds the highest standards of security.',
};

export default function Page() {
  return <TrustAndSecurityPage />;
}
