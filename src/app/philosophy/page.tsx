import type { Metadata } from 'next';
import React from 'react';

import PhilosophyPage from '@/components/philosophy/page';

export const metadata: Metadata = {
  title: 'Philosophy | Waterlabs AI',
  description: 'Learn about the philosophy, vision, and core principles driving Waterlabs to transform healthcare revenue cycle.',
};

export default function Page() {
  return <PhilosophyPage />;
}
