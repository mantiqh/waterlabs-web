import type { Metadata } from 'next';
import React from 'react';

import BlogsPage from '@/components/blogs/page';
import { fetchAllBlogArticles, fetchBlogsPageSettings } from '@/sanity/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs | Waterlabs AI',
  description:
    'Insights, guides, and perspectives on autonomous revenue cycle management and agentic AI in healthcare.',
};

export const revalidate = 60;

export default async function Page() {
  const [articles, pageSettings] = await Promise.all([
    fetchAllBlogArticles(),
    fetchBlogsPageSettings(),
  ]);

  return <BlogsPage articles={articles} pageSettings={pageSettings} />;
}
