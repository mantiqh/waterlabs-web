import type { Metadata } from 'next';
import React from 'react';

import AboutUsPage from '@/components/about-us/page';

export const metadata: Metadata = {
  title: 'About Us | Waterlabs AI',
  description:
    "As healthcare revenue cycle experts, we make healthcare's revenue cycle operate autonomously. Meet our team, founders, and leadership.",
};

export default function Page() {
  return <AboutUsPage />;
}
