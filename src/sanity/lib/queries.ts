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
  client,
  clientSummary,
  statBadges,
  challenge,
  whatWaterlabsDid,
  resultsBlock,
  outcomes,
  bottomLine,
  metrics,
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
  client,
  clientSummary,
  statBadges,
  challenge,
  whatWaterlabsDid,
  resultsBlock,
  outcomes,
  bottomLine,
  metrics,
  cta,
  order
}`;

export const caseStudySlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)] {
  "slug": slug.current,
  aliases
}`;

