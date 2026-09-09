import type { Metadata } from 'next';
import React from 'react';

import AboutUsPage from '@/components/about-us/page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { aboutUsPageQuery } from '@/sanity/lib/queries';
import type { AboutUsPageData } from '@/types/about-us';

export const metadata: Metadata = {
  title: 'About Us | Waterlabs AI',
  description:
    "As healthcare revenue cycle experts, we make healthcare's revenue cycle operate autonomously. Meet our team, founders, and leadership.",
};

export const revalidate = 60;

export default async function Page() {
  const aboutUsData = await sanityFetch<AboutUsPageData>({
    query: aboutUsPageQuery,
    tags: ['aboutUsPage'],
  });

  return <AboutUsPage data={aboutUsData} />;
}
