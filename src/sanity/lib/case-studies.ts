import { getAllCaseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from '@/data/case-studies';
import { sanityFetch } from '@/sanity/lib/fetch';
import { allCaseStudiesQuery, caseStudyBySlugQuery, caseStudySlugsQuery } from '@/sanity/lib/queries';
import { CaseStudy } from '@/types/case-study';

interface SanityCaseStudyDoc {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  aliases?: string[];
  categoryTag?: string;
  titleHighlight?: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  tags?: string[];
  client?: {
    name?: string;
    specialties?: string;
    systemType?: string;
  };
  clientSummary?: string;
  statBadges?: { text: string }[];
  challenge?: string;
  whatWaterlabsDid?: string;
  resultsBlock?: {
    headline: string;
    subheadline: string;
    details: string;
  };
  outcomes?: string;
  bottomLine?: string;
  metrics?: {
    value: string;
    label: string;
    change?: string;
  }[];
  cta?: {
    tagText?: string;
    headline?: string;
    buttonText?: string;
    buttonHref?: string;
  };
  order?: number;
}

/**
 * Transforms a Sanity case study document to the application's CaseStudy model.
 */
function mapSanityToCaseStudy(doc: SanityCaseStudyDoc): CaseStudy {
  return {
    id: doc._id || doc.id || doc.slug,
    slug: doc.slug,
    aliases: doc.aliases || [],
    categoryTag: doc.categoryTag || 'Case Study · Healthcare RCM',
    title: doc.title,
    titleHighlight: doc.titleHighlight || '',
    subtitle: doc.subtitle || '',
    heroImage: doc.heroImage || '/images/case-study/case-study-1-multi-state/Frame%202147226953.png',
    heroImageAlt: doc.heroImageAlt || doc.title,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    client: doc.client
      ? {
          name: doc.client.name || '',
          specialties: doc.client.specialties || '',
          systemType: doc.client.systemType || '',
        }
      : undefined,
    clientSummary: doc.clientSummary || '',
    statBadges: Array.isArray(doc.statBadges) ? doc.statBadges : [],
    challenge: doc.challenge || '',
    whatWaterlabsDid: doc.whatWaterlabsDid || '',
    resultsBlock: doc.resultsBlock,
    outcomes: doc.outcomes || '',
    bottomLine: doc.bottomLine || '',
    metrics: Array.isArray(doc.metrics) ? doc.metrics : [],
    cta: doc.cta || {
      tagText: 'Talk to us.',
      headline:
        'Schedule a 15-minute call to see how Waterlabs can impact your organization’s results.',
      buttonText: 'Get a Demo',
      buttonHref: '/contact-us',
    },
  };
}

/**
 * Fetches a single case study by slug from Sanity, falling back to local data if not found.
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  try {
    const sanityDoc = await sanityFetch<SanityCaseStudyDoc | null>({
      query: caseStudyBySlugQuery,
      params: { slug },
      tags: ['caseStudy', `caseStudy:${slug}`],
      revalidate: 60,
    });

    if (sanityDoc && sanityDoc.title) {
      return mapSanityToCaseStudy(sanityDoc);
    }
  } catch (error) {
    console.warn(`[Sanity] Failed to fetch case study '${slug}', falling back to local data:`, error);
  }

  // Graceful fallback to static TypeScript definitions
  return getCaseStudyBySlug(slug);
}

/**
 * Fetches all case studies from Sanity, or falls back to static definitions if Sanity is empty.
 */
export async function fetchAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const sanityDocs = await sanityFetch<SanityCaseStudyDoc[]>({
      query: allCaseStudiesQuery,
      tags: ['caseStudy'],
      revalidate: 60,
    });

    if (sanityDocs && sanityDocs.length > 0) {
      return sanityDocs.map(mapSanityToCaseStudy);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch all case studies, falling back to local data:', error);
  }

  return getAllCaseStudies();
}

/**
 * Returns related case studies excluding the current one.
 */
export async function fetchRelatedCaseStudies(currentSlug: string, count = 3): Promise<CaseStudy[]> {
  try {
    const all = await fetchAllCaseStudies();
    const related = all.filter(
      (study) => study.slug !== currentSlug && !study.aliases?.includes(currentSlug)
    );
    if (related.length > 0) {
      return related.slice(0, count);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch related case studies:', error);
  }

  return getRelatedCaseStudies(currentSlug, count);
}

/**
 * Gathers all slugs for generateStaticParams from both Sanity and static data.
 */
export async function fetchAllCaseStudySlugs(): Promise<{ slug: string }[]> {
  const slugSet = new Set<string>();

  // Add static slugs & aliases
  const staticStudies = getAllCaseStudies();
  staticStudies.forEach((study) => {
    slugSet.add(study.slug);
    study.aliases?.forEach((alias) => slugSet.add(alias));
  });

  // Query Sanity slugs
  try {
    const sanitySlugs = await sanityFetch<{ slug: string; aliases?: string[] }[]>({
      query: caseStudySlugsQuery,
      tags: ['caseStudy'],
      revalidate: 60,
    });

    if (Array.isArray(sanitySlugs)) {
      sanitySlugs.forEach((item) => {
        if (item.slug) slugSet.add(item.slug);
        item.aliases?.forEach((alias) => slugSet.add(alias));
      });
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch slugs from Sanity:', error);
  }

  return Array.from(slugSet).map((slug) => ({ slug }));
}
