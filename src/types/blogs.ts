import React from 'react';

export interface SanityBlogDetailSection {
  _key?: string;
  title: string;
  id?: string;
  content?: string;
  paragraphs?: string[];
}

export interface SanityRelatedArticle {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  desktopImage?: string;
  mobileImage?: string;
  excerpt?: string;
}

export interface SanityBlogArticle {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  tag?: string;
  subTag?: string;
  titleAccent?: string;
  titleRest?: string;
  desktopImage?: string;
  mobileImage?: string;
  heroBannerDesktop?: string;
  heroBannerMobile?: string;
  heroParagraphs?: string;
  order?: number;
  publishedAt?: string;
  excerpt?: string;
  sections?: SanityBlogDetailSection[];
  relatedArticles?: SanityRelatedArticle[];
}

export interface BlogArticleItem {
  id: string;
  category: string;
  tag: string;
  subTag: string;
  title: React.ReactNode;
  rawTitle: string;
  slug: string;
  desktopImage: string;
  mobileImage: string;
  order?: number;
  publishedAt?: string;
  excerpt?: string;
}

export interface BlogsPageData {
  categories?: string[];
  searchPlaceholder?: string;
  filterByLabel?: string;
  readBlogButtonText?: string;
}

export interface BlogsPageProps {
  articles?: SanityBlogArticle[];
  pageSettings?: BlogsPageData | null;
}
