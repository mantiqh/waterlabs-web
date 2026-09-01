import { groq } from 'next-sanity';

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
