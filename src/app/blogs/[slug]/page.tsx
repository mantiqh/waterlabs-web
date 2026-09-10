import type { Metadata } from 'next';
import React from 'react';

import {
  BlogArticleSection,
  DEFAULT_BLOG_SECTIONS,
} from '@/components/blog-detail/blog-detail-content';
import {
  DEFAULT_RELATED_BLOGS,
  RelatedBlogItem,
} from '@/components/blog-detail/blog-detail-related';
import { BLOG_DETAIL_TOPICS, TOCItem } from '@/components/blog-detail/blog-detail-toc';
import { BlogDetailHeroProps } from '@/components/blog-detail/hero-section';
import BlogDetailPage from '@/components/blog-detail/page';
import {
  fetchAllBlogArticles,
  fetchAllBlogSlugs,
  fetchBlogPostBySlug,
} from '@/sanity/lib/blogs';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateStaticParams() {
  const slugs = new Set<string>(['what-is-agentic-rcm']);

  try {
    const remoteSlugs = await fetchAllBlogSlugs();
    remoteSlugs.forEach((s) => slugs.add(s));

    const articles = await fetchAllBlogArticles();
    articles.forEach((article) => {
      if (article.slug) {
        slugs.add(article.slug);
      }
    });
  } catch (error) {
    console.warn('[Sanity] Error in generateStaticParams for blog detail:', error);
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await fetchBlogPostBySlug(slug);
    if (article) {
      return {
        title: `${article.title} | Waterlabs AI`,
        description:
          article.excerpt ||
          (article.heroParagraphs ? article.heroParagraphs.slice(0, 160) : undefined) ||
          'Insights and guides from the team at Waterlabs AI.',
      };
    }
  } catch {
    // Fall back to default static metadata
  }

  if (slug === 'what-is-agentic-rcm') {
    return {
      title: 'What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle | Waterlabs AI',
      description:
        'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up.',
    };
  }

  return {
    title: 'Blog | Waterlabs AI',
    description: 'Insights and guides from the team at Waterlabs AI.',
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // Fetch article data from Sanity CMS
  const sanityArticle = await fetchBlogPostBySlug(slug);

  // 1. Resolve Hero Props
  let heroProps: BlogDetailHeroProps | undefined = undefined;

  if (sanityArticle) {
    let heroParagraphsList: string[] = [];

    if (sanityArticle.heroParagraphs) {
      heroParagraphsList = sanityArticle.heroParagraphs
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    } else if (slug === 'what-is-agentic-rcm') {
      // Default paragraphs for flagship article
      heroParagraphsList = [
        'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up, rather than flagging tasks for humans to complete.',
        'It is the difference between software that builds a worklist and software that works the list. This guide, from the team at Waterlabs, explains what agentic RCM is, how it differs from the automation that came before it, what it changes for a health system, and where its real limits sit.',
        'The shift is happening fast. A revenue cycle survey found that 80% of health systems were exploring, piloting, or implementing generative AI tools for RCM, a 38-percentage-point increase in under two years. Agentic RCM is the frontier of that shift, and the term is new enough that most definitions still get it wrong.',
      ];
    } else if (sanityArticle.excerpt) {
      heroParagraphsList = [
        sanityArticle.excerpt,
        'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up, rather than flagging tasks for humans to complete.',
      ];
    }

    heroProps = {
      tag: sanityArticle.tag || 'Lorem',
      subTag: sanityArticle.subTag || 'Lorem Ipsum',
      title: sanityArticle.titleAccent ? undefined : sanityArticle.title,
      titleAccent: sanityArticle.titleAccent,
      titleRest: sanityArticle.titleRest,
      desktopImage:
        sanityArticle.heroBannerDesktop ||
        sanityArticle.desktopImage ||
        '/images/blog-detail/hero-banner-desktop.png',
      mobileImage:
        sanityArticle.heroBannerMobile ||
        sanityArticle.mobileImage ||
        sanityArticle.heroBannerDesktop ||
        sanityArticle.desktopImage ||
        '/images/blog-detail/hero-banner-mobile.png',
      paragraphs: heroParagraphsList.length > 0 ? heroParagraphsList : undefined,
    };
  }

  // 2. Resolve Article Sections & Table of Contents (TOC)
  let sections: BlogArticleSection[] = DEFAULT_BLOG_SECTIONS;
  let topics: TOCItem[] = BLOG_DETAIL_TOPICS;

  if (sanityArticle?.sections && sanityArticle.sections.length > 0) {
    sections = sanityArticle.sections.map((sec, idx) => ({
      id: sec.id?.trim() || slugify(sec.title) || `topic-${idx + 1}`,
      title: sec.title,
      paragraphs: sec.content
        ? sec.content
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean)
        : sec.paragraphs || [],
    }));

    topics = sections.map((sec) => ({
      id: sec.id,
      label: sec.title,
    }));
  }

  // 3. Resolve Related Blogs
  let relatedBlogs: RelatedBlogItem[] = DEFAULT_RELATED_BLOGS;

  if (sanityArticle?.relatedArticles && sanityArticle.relatedArticles.length > 0) {
    relatedBlogs = sanityArticle.relatedArticles.map((item, idx) => ({
      id: item._id || item.id || `rel-${idx}`,
      title: item.title,
      image: item.desktopImage || DEFAULT_RELATED_BLOGS[idx % DEFAULT_RELATED_BLOGS.length].image,
      href: `/blogs/${item.slug}`,
      isShorter: idx === 1,
    }));
  } else {
    // If not manually curated, fetch latest blog posts excluding current article
    try {
      const allArticles = await fetchAllBlogArticles();
      const otherArticles = allArticles.filter((a) => a.slug !== slug);

      if (otherArticles.length >= 3) {
        relatedBlogs = otherArticles.slice(0, 3).map((a, idx) => ({
          id: a.id || a._id || `rel-${idx}`,
          title: a.title,
          image:
            a.desktopImage ||
            DEFAULT_RELATED_BLOGS[idx % DEFAULT_RELATED_BLOGS.length].image,
          href: `/blogs/${a.slug}`,
          isShorter: idx === 1,
        }));
      }
    } catch {
      // Keep DEFAULT_RELATED_BLOGS fallback
    }
  }

  return (
    <BlogDetailPage
      heroProps={heroProps}
      sections={sections}
      topics={topics}
      relatedBlogs={relatedBlogs}
    />
  );
}
