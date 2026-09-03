import type { Metadata } from 'next';
import React from 'react';

import CulturePage from '@/components/culture/page';

export const metadata: Metadata = {
  title: 'Culture | Waterlabs AI',
  description: 'Built by people who stayed close to the problem. Learn about our culture of ownership and how we empower our teams.',
};

export default function Page() {
  return <CulturePage />;
}
