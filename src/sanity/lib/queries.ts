import { groq } from 'next-sanity'

export const homepageQuery = groq`*[_type == "homepage"][0] {
  heroHeading,
  heroSubheading,
  heroButtonText,
  heroSecondaryButtonText,
  "heroBackgroundImageUrl": heroBackgroundImage.asset->url
}`
