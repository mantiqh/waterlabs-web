'use client';

import React from 'react';

import BlogDetailContent, { BlogArticleSection } from '@/components/blog-detail/blog-detail-content';
import BlogDetailRelated, { RelatedBlogItem } from '@/components/blog-detail/blog-detail-related';
import { TOCItem } from '@/components/blog-detail/blog-detail-toc';
import BlogDetailHeroSection, { BlogDetailHeroProps } from '@/components/blog-detail/hero-section';

export interface BlogDetailPageProps {
  heroProps?: BlogDetailHeroProps;
  sections?: BlogArticleSection[];
  topics?: TOCItem[];
  relatedBlogs?: RelatedBlogItem[];
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  heroProps,
  sections,
  topics,
  relatedBlogs,
}) => {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Blog Detail Hero Section */}
      <BlogDetailHeroSection {...heroProps} />

      {/* Blog Detail Interactive Content Section with Sticky TOC and Scroll-Spy */}
      <BlogDetailContent sections={sections} topics={topics} />

      {/* Related Blogs Section */}
      <BlogDetailRelated relatedBlogs={relatedBlogs} />
    </div>
  );
};

export default BlogDetailPage;
