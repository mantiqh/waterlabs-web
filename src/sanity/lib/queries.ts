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
  relatedCasesHeading,
  "relatedCases": relatedCases[] {
    _type == "reference" => @-> {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      "heroImage": heroImage.asset->url,
      "image": heroImage.asset->url,
      "href": "/case-study/" + slug.current
    },
    _type == "customRelatedCase" => {
      _key,
      title,
      "image": image.asset->url,
      "heroImage": image.asset->url,
      "href": link,
      "slug": link
    }
  },
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
  relatedCasesHeading,
  "relatedCases": relatedCases[] {
    _type == "reference" => @-> {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      "heroImage": heroImage.asset->url,
      "image": heroImage.asset->url,
      "href": "/case-study/" + slug.current
    },
    _type == "customRelatedCase" => {
      _key,
      title,
      "image": image.asset->url,
      "heroImage": image.asset->url,
      "href": link,
      "slug": link
    }
  },
  cardCategory,
  cardTag,
  cardStat,
  cardSubtitle,
  "desktopImage": desktopImage.asset->url,
  "mobileImage": mobileImage.asset->url,
  cta,
  order
}`;

export const caseStudiesPageQuery = groq`*[_type == "caseStudiesPage"][0] {
  categories,
  searchPlaceholder,
  filterByLabel,
  readStoryButtonText
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

export const allBlogPostsQuery = groq`*[_type == "blogPost" && !(_id in path('drafts.**')) && !(slug.current in ['testing-blog', 'testing-blog2', 'prior-authorization-automation-broken-process-healthcare'])] | order(order asc, publishedAt desc, _createdAt asc) {
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

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug && !(_id in path('drafts.**')) && !(slug.current in ['testing-blog', 'testing-blog2', 'prior-authorization-automation-broken-process-healthcare'])][0] {
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

export const blogPostSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current) && !(_id in path('drafts.**')) && !(slug.current in ['testing-blog', 'testing-blog2', 'prior-authorization-automation-broken-process-healthcare'])] {
  "slug": slug.current
}`;

export const solutionBySlugQuery = groq`*[_type == "solutionPage" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  title,
  "id": _id,
  "slug": slug.current,
  navLabel,
  order,
  heroEyebrow,
  heroHeadline,
  heroDescription,
  heroCtaText,
  heroCtaLink,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  "heroBanner": heroBanner.asset->url,
  problemTag,
  problemHeadline,
  problemHeadlineHighlight,
  problemDescription,
  problemDescriptionSecondary,
  problemQuoteText,
  problemQuoteAuthor,
  "problemImage": problemImage.asset->url,
  "problemImageAlt": problemImage.alt,
  closesSectionTitle,
  closesSectionHighlight,
  closesSubtitle,
  "closesImage": closesImage.asset->url,
  "closesImageAlt": closesImage.alt,
  closesSteps[] {
    title,
    description
  },
  statsTitle,
  stats[] {
    value,
    label
  },
  humanHeading,
  humanHeadingHighlight,
  humanParagraphs,
  "humanImage": humanImage.asset->url,
  "humanImageMobile": humanImageMobile.asset->url,
  "humanImageAlt": humanImage.alt,
  platformEyebrow,
  platformHeading,
  platformDescription,
  platformCtaText,
  platformCtaLink,
  "platformImage": platformImage.asset->url,
  threeThingsHeading,
  threeThingsHeadingHighlight,
  threeThingsCards[] {
    "icon": icon.asset->url,
    title,
    description
  },
  ctaHeadline,
  ctaButtonText,
  ctaButtonLink,
  metaTitle,
  metaDescription
}`;

export const allSolutionsQuery = groq`*[_type == "solutionPage" && !(_id in path('drafts.**'))] | order(order asc, _createdAt asc) {
  _id,
  title,
  "id": _id,
  "slug": slug.current,
  navLabel,
  order,
  heroEyebrow,
  heroHeadline,
  heroDescription,
  heroCtaText,
  heroCtaLink,
  "heroImage": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  "heroBanner": heroBanner.asset->url,
  problemTag,
  problemHeadline,
  problemHeadlineHighlight,
  problemDescription,
  problemDescriptionSecondary,
  problemQuoteText,
  problemQuoteAuthor,
  "problemImage": problemImage.asset->url,
  "problemImageAlt": problemImage.alt,
  closesSectionTitle,
  closesSectionHighlight,
  closesSubtitle,
  "closesImage": closesImage.asset->url,
  "closesImageAlt": closesImage.alt,
  closesSteps[] {
    title,
    description
  },
  statsTitle,
  stats[] {
    value,
    label
  },
  humanHeading,
  humanHeadingHighlight,
  humanParagraphs,
  "humanImage": humanImage.asset->url,
  "humanImageMobile": humanImageMobile.asset->url,
  "humanImageAlt": humanImage.alt,
  platformEyebrow,
  platformHeading,
  platformDescription,
  platformCtaText,
  platformCtaLink,
  "platformImage": platformImage.asset->url,
  threeThingsHeading,
  threeThingsHeadingHighlight,
  threeThingsCards[] {
    "icon": icon.asset->url,
    title,
    description
  },
  ctaHeadline,
  ctaButtonText,
  ctaButtonLink,
  metaTitle,
  metaDescription
}`;

export const solutionNavQuery = groq`*[_type == "solutionPage" && defined(slug.current) && !(_id in path('drafts.**'))] | order(order asc, _createdAt asc) {
  title,
  navLabel,
  "slug": slug.current,
  order
}`;

export const solutionSlugsQuery = groq`*[_type == "solutionPage" && defined(slug.current) && !(_id in path('drafts.**'))] {
  "slug": slug.current
}`;

export const contactUsPageQuery = groq`*[_type == "contactUsPage"][0] {
  heroHeading,
  heroHeadingHighlight,
  heroSubheading,
  heroCtaText,
  heroCtaLink,
  "heroImageDesktop": heroImageDesktop.asset->url,
  "heroImageMobile": heroImageMobile.asset->url,
  locations[] {
    _key,
    tag,
    title,
    address,
    email,
    hours,
    buttonText,
    href
  },
  "operatingInfoBgImage": operatingInfoBgImage.asset->url,
  formTag,
  formHeading,
  "formImage": formImage.asset->url,
  orgTypeOptions,
  newsletterHeading,
  consentText,
  disclaimerText,
  submitButtonText,
  ctaHeading,
  ctaHeadingHighlight,
  ctaButtonText,
  ctaButtonLink,
  "ctaBackgroundImageDesktop": ctaBackgroundImageDesktop.asset->url,
  "ctaBackgroundImageMobile": ctaBackgroundImageMobile.asset->url,
  metaTitle,
  metaDescription
}`;

export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroSubheading,
  heroHeading,
  heroDescription,
  heroCtaText,
  heroCtaLink,
  heroSecondaryCtaText,
  heroSecondaryCtaLink,
  "heroBackgroundImageDesktop": heroBackgroundImageDesktop.asset->url,
  "heroBackgroundImageMobile": heroBackgroundImageMobile.asset->url,

  marqueeItems[] {
    _key,
    text,
    "image": image.asset->url
  },
  marqueeMobileText,
  "bannerImageDesktop": bannerImageDesktop.asset->url,
  "bannerImageMobile": bannerImageMobile.asset->url,

  brandHeading,
  brandHeadingHighlight,
  brandLogos[] {
    _key,
    name,
    "logo": logo.asset->url
  },

  productsHeadingPart1,
  productsHeadingHighlight,
  product1 {
    name,
    description,
    "image": image.asset->url,
    ctaText,
    ctaLink
  },
  product2 {
    name,
    description,
    "image": image.asset->url,
    ctaText,
    ctaLink
  },

  eligibilityTag,
  eligibilityHeading,
  eligibilitySubtag,
  eligibilitySubheading,
  "eligibilityDiagramImage": eligibilityDiagramImage.asset->url,
  eligibilityDescription,
  "eligibilityBgDesktop": eligibilityBgDesktop.asset->url,
  "eligibilityBgMobile": eligibilityBgMobile.asset->url,

  featuresTag,
  featuresHeading,
  featuresHeadingHighlight,
  featuresDescription,
  card1Title,
  card1Description,
  "card1Image": card1Image.asset->url,
  card2Title,
  card2Description,
  "card2Image": card2Image.asset->url,
  securityTag,
  securityHeadingHighlight,
  securityHeading,
  securityDescription,
  "securityImage": securityImage.asset->url,
  statsTag,
  statsHeading,
  stats[] {
    _key,
    "icon": icon.asset->url,
    stat,
    unit,
    label
  },
  caseStudyTitle,
  caseStudySubtitle,
  "caseStudyImage": caseStudyImage.asset->url,
  caseStudyCtaText,
  caseStudyCtaLink,

  testimonials[] {
    _key,
    name,
    role,
    quote,
    "image": image.asset->url
  },

  calculateHeading,
  "calculateImage": calculateImage.asset->url,

  billingTag,
  billingHeadingHighlight,
  billingHeading,
  billingDescription,
  billingSteps[] {
    _key,
    num,
    title,
    day,
    dayVariant,
    desc
  },
  billingPoints,

  ctaTag,
  ctaHeading,
  ctaPrimaryButtonText,
  ctaPrimaryButtonLink,
  ctaSecondaryButtonText,
  ctaSecondaryButtonLink,
  "ctaBackgroundImage": ctaBackgroundImage.asset->url,

  metaTitle,
  metaDescription
}`;





