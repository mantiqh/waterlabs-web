import type { Metadata } from 'next';
import React from 'react';

import CareersPage from '@/components/careers/page';

export const metadata: Metadata = {
  title: 'Careers | Waterlabs',
  description: 'Join Waterlabs and help rebuild how healthcare operations run.',
};

export default function Page() {
  return <CareersPage />;
}
