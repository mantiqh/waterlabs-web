import { groq } from 'next-sanity';

export const homepageQuery = groq`*[_type == "homepage"][0] {
  heroHeading,
  heroSubheading,
  heroButtonText,
  heroSecondaryButtonText,
  "heroBackgroundImageUrl": heroBackgroundImage.asset->url
}`;

export const careersPageQuery = groq`*[_type == "careersPage"][0] {
  openRolesTag,
  openRolesHeading,
  categories[] {
    _key,
    tabName,
    roles[] {
      _key,
      title,
      experience,
      category,
      roleTag,
      eligibility,
      link
    }
  }
}`;

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && (slug.current == $slug || $slug in aliases)][0] {
  _id,
  title,
  "id": _id,
  "slug": slug.current,
  aliases,
  categoryTag,
  titleHighlight,
  subtitle,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  tags,
  clientSummary,
  statBadges,
  challenge,
  whatWaterlabsDid,
  resultsBlock,
  outcomes,
  bottomLine,
  cta,
  order
}`;

export const allCaseStudiesQuery = groq`*[_type == "caseStudy"] | order(order asc, _createdAt asc) {
  _id,
  title,
  "id": _id,
  "slug": slug.current,
  aliases,
  categoryTag,
  titleHighlight,
  subtitle,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  tags,
  clientSummary,
  statBadges,
  challenge,
  whatWaterlabsDid,
  resultsBlock,
  outcomes,
  bottomLine,
  cta,
  order
}`;

export const caseStudySlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)] {
  "slug": slug.current,
  aliases
}`;

export const aboutUsPageQuery = groq`*[_type == "aboutUsPage"][0] {
  leadersTag,
  leaders[] {
    _key,
    name,
    title,
    "image": image.asset->url,
    linkedinUrl
  }
}`;

export const allBlogPostsQuery = groq`*[_type == "blogPost" && !(_id in path('drafts.**'))] | order(order asc, publishedAt desc, _createdAt asc) {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  category,
  tag,
  subTag,
  "desktopImage": desktopImage.asset->url,
  "mobileImage": mobileImage.asset->url,
  order,
  publishedAt,
  excerpt
}`;

export const blogsPageQuery = groq`*[_type == "blogsPage"][0] {
  categories,
  searchPlaceholder,
  filterByLabel,
  readBlogButtonText
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  category,
  tag,
  subTag,
  titleAccent,
  titleRest,
  "desktopImage": desktopImage.asset->url,
  "mobileImage": mobileImage.asset->url,
  "heroBannerDesktop": heroBannerDesktop.asset->url,
  "heroBannerMobile": heroBannerMobile.asset->url,
  heroParagraphs,
  order,
  publishedAt,
  excerpt,
  sections[] {
    _key,
    title,
    id,
    content
  },
  "relatedArticles": relatedArticles[]-> {
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    "desktopImage": desktopImage.asset->url,
    "mobileImage": mobileImage.asset->url,
    excerpt
  }
}`;

export const blogPostSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current) && !(_id in path('drafts.**'))] {
  "slug": slug.current
}`;


