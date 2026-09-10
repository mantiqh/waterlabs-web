'use client';

import React from 'react';

import type { BlogsPageProps } from '@/types/blogs';

import BlogsCTASection from './cta-section';
import BlogsHeroSection from './hero-section';
import BlogsTabsSection from './tabs-section';

export const BlogsPage: React.FC<BlogsPageProps> = ({ articles, pageSettings }) => {
  return (
    <div className="w-full flex flex-col">
      <BlogsHeroSection />
      <BlogsTabsSection
        initialArticles={articles}
        settings={pageSettings}
        categories={pageSettings?.categories}
      />
      <BlogsCTASection />
    </div>
  );
};

export default BlogsPage;
