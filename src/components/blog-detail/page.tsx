import BlogDetailContent, { type BlogArticleSection } from '@/components/blog-detail/blog-detail-content';
import BlogDetailRelated, { type RelatedBlogItem } from '@/components/blog-detail/blog-detail-related';
import type { TOCItem } from '@/components/blog-detail/blog-detail-toc';
import BlogDetailHeroSection, { type BlogDetailHeroProps } from '@/components/blog-detail/hero-section';
import BlogsCTASection from '@/components/blogs/cta-section';

export interface BlogDetailPageProps {
  heroProps?: BlogDetailHeroProps;
  sections?: BlogArticleSection[];
  topics?: TOCItem[];
  relatedBlogs?: RelatedBlogItem[];
}

export const BlogDetailPage = ({
  heroProps,
  sections,
  topics,
  relatedBlogs,
}: BlogDetailPageProps) => {
  return (
    <div className="w-full bg-white flex flex-col">
      {/* Blog Detail Hero Section */}
      <BlogDetailHeroSection {...heroProps} />

      {/* Blog Detail Interactive Content Section with Sticky TOC and Scroll-Spy */}
      <BlogDetailContent sections={sections} topics={topics} />

      {/* Related Blogs Section */}
      <BlogDetailRelated relatedBlogs={relatedBlogs} />

      {/* Closing CTA Section */}
      <BlogsCTASection />
    </div>
  );
};

export default BlogDetailPage;
