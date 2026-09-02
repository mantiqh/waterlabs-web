import type { Metadata } from 'next';
import React from 'react';

import CareersPage, { type CareersPageData } from '@/components/careers/page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { careersPageQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Careers | Waterlabs',
  description: 'Join Waterlabs and help rebuild how healthcare operations run.',
};

export const revalidate = 60;

export default async function Page() {
  const careersData = await sanityFetch<CareersPageData>({
    query: careersPageQuery,
    tags: ['careersPage'],
  });

  return <CareersPage data={careersData} />;
}

