import PageMotion from '@/components/common/page-motion';
import type { BlogsPageProps } from '@/types/blogs';

import BlogsCTASection from './cta-section';
import BlogsHeroSection from './hero-section';
import BlogsTabsSection from './tabs-section';

export const BlogsPage = ({ articles, pageSettings }: BlogsPageProps) => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
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
