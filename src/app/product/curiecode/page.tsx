import type { Metadata } from 'next';

import CurieCodePage from '@/components/curiecode/page';

const title = 'CurieCode | Waterlabs AI';
const description = 'Autonomous medical coding and intelligent claim scrubbing with CurieCode.';
const url = 'https://www.waterlabs.ai/product/curiecode';
const image = {
  url: 'https://www.waterlabs.ai/images/home/the-waterlabs-platform-engine/desktop/ing_curie_code.png',
  width: 1782,
  height: 920,
  alt: 'CurieCode autonomous medical coding platform',
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
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

export const dynamic = 'force-static';

export default async function Page() {
  return <CurieCodePage />;
}
