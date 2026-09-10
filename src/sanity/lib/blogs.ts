import { sanityFetch } from '@/sanity/lib/fetch';
import {
  allBlogPostsQuery,
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  blogsPageQuery,
} from '@/sanity/lib/queries';
import type { BlogsPageData, SanityBlogArticle } from '@/types/blogs';

/**
 * Fetches all published blog articles from Sanity CMS.
 * Returns an empty array if none are found or if an error occurs.
 */
export async function fetchAllBlogArticles(): Promise<SanityBlogArticle[]> {
  try {
    const articles = await sanityFetch<SanityBlogArticle[]>({
      query: allBlogPostsQuery,
      tags: ['blogPost'],
      revalidate: 60,
    });

    if (Array.isArray(articles) && articles.length > 0) {
      return articles;
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch blog articles:', error);
  }

  return [];
}

/**
 * Fetches a single blog post by its slug from Sanity CMS.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<SanityBlogArticle | null> {
  try {
    const article = await sanityFetch<SanityBlogArticle | null>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blogPost', `blogPost:${slug}`],
      revalidate: 60,
    });

    if (article && article.title) {
      return article;
    }
  } catch (error) {
    console.warn(`[Sanity] Failed to fetch blog post '${slug}':`, error);
  }

  return null;
}

/**
 * Fetches all blog article slugs for static paths generation.
 */
export async function fetchAllBlogSlugs(): Promise<string[]> {
  try {
    const items = await sanityFetch<{ slug: string }[]>({
      query: blogPostSlugsQuery,
      tags: ['blogPost'],
      revalidate: 60,
    });

    if (Array.isArray(items) && items.length > 0) {
      return items.map((i) => i.slug).filter(Boolean);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch blog slugs:', error);
  }

  return [];
}

/**
 * Fetches blogs page configuration settings from Sanity CMS.
 */
export async function fetchBlogsPageSettings(): Promise<BlogsPageData | null> {
  try {
    const settings = await sanityFetch<BlogsPageData | null>({
      query: blogsPageQuery,
      tags: ['blogsPage'],
      revalidate: 60,
    });

    if (settings) {
      return settings;
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch blogs page settings:', error);
  }

  return null;
}
