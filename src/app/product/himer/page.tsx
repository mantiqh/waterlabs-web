import type { Metadata } from 'next';

import HimerPage from '@/components/himer/page';

const title = 'HIMER AI OS | Waterlabs AI';
const description =
  'The agentic operating system with twenty years of revenue cycle knowledge. Autonomous RCM agents coordinating across front, mid, and back office.';
const url = 'https://www.waterlabs.ai/product/himer';
const image = {
  url: 'https://www.waterlabs.ai/images/home/the-waterlabs-platform-engine/desktop/img_himer_ai_os.png',
  width: 1782,
  height: 920,
  alt: 'HIMER AI OS revenue cycle management platform',
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Waterlabs AI',
    title,
    description,
    url,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
};

export default function Page() {
  return <HimerPage />;
}
