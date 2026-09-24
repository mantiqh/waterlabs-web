import { DEFAULT_SOLUTIONS_NAV, getAllSolutions, getSolutionBySlug } from '@/data/solutions';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  allSolutionsQuery,
  solutionBySlugQuery,
  solutionNavQuery,
  solutionSlugsQuery,
} from '@/sanity/lib/queries';
import { SolutionNavItem, SolutionPageData } from '@/types/solution';

interface SanitySolutionDoc {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  navLabel?: string;
  order?: number;

  heroEyebrow?: string;
  heroHeadline?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroBanner?: string;

  problemTag?: string;
  problemHeadline?: string;
  problemHeadlineHighlight?: string;
  problemDescription?: string;
  problemDescriptionSecondary?: string;
  problemQuoteText?: string;
  problemQuoteAuthor?: string;
  problemImage?: string;
  problemImageAlt?: string;

  closesSectionTitle?: string;
  closesSectionHighlight?: string;
  closesSubtitle?: string;
  closesImage?: string;
  closesImageAlt?: string;
  closesSteps?: {
    title: string;
    description: string;
  }[];

  statsTitle?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  humanHeading?: string;
  humanHeadingHighlight?: string;
  humanParagraphs?: string[];
  humanImage?: string;
  humanImageMobile?: string;
  humanImageAlt?: string;

  platformEyebrow?: string;
  platformHeading?: string;
  platformDescription?: string;
  platformCtaText?: string;
  platformCtaLink?: string;
  platformImage?: string;
  threeThingsHeading?: string;
  threeThingsHeadingHighlight?: string;
  threeThingsCards?: {
    icon?: string;
    title: string;
    description: string;
  }[];

  ctaHeadline?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;

  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Transforms a raw Sanity solution document to the strongly typed SolutionPageData model.
 */
function mapSanityToSolution(doc: SanitySolutionDoc): SolutionPageData {
  return {
    id: doc._id || doc.id || doc.slug,
    title: doc.title,
    slug: doc.slug,
    navLabel: doc.navLabel || doc.title,
    order: doc.order ?? 99,

    hero: {
      eyebrow: doc.heroEyebrow || `Agentic RCM Solutions · ${doc.title}`,
      headline: doc.heroHeadline || doc.title,
      description: doc.heroDescription || '',
      ctaText: doc.heroCtaText || 'Get a Demo',
      ctaLink: doc.heroCtaLink || '/contact-us',
      heroImage: doc.heroImage,
      heroImageAlt: doc.heroImageAlt || doc.title,
      heroBanner: doc.heroBanner,
    },

    problem: {
      tag: doc.problemTag || 'The problem',
      headline: doc.problemHeadline || 'The problem',
      headlineHighlight: doc.problemHeadlineHighlight || '',
      description: doc.problemDescription || '',
      descriptionSecondary: doc.problemDescriptionSecondary || '',
      quoteText: doc.problemQuoteText,
      quoteAuthor: doc.problemQuoteAuthor,
      image: doc.problemImage,
      imageAlt: doc.problemImageAlt,
    },

    closes: {
      sectionTitle: doc.closesSectionTitle || 'How Waterlabs',
      sectionTitleHighlight: doc.closesSectionHighlight || 'closes the gap',
      subtitle: doc.closesSubtitle || '',
      image: doc.closesImage,
      imageAlt: doc.closesImageAlt,
      steps: Array.isArray(doc.closesSteps) ? doc.closesSteps : [],
    },

    statsAndHuman: {
      statsTitle: doc.statsTitle || 'Our Stats',
      stats: Array.isArray(doc.stats) ? doc.stats : [],
      humanHeading: doc.humanHeading || 'Human in the loop, by design',
      humanHeadingHighlight: doc.humanHeadingHighlight || 'Human in the loop,',
      humanParagraphs: Array.isArray(doc.humanParagraphs) && doc.humanParagraphs.length > 0
        ? doc.humanParagraphs
        : ['When an issue requires clinical judgment, our agents route it to your team with all background context prepared.'],
      humanImage: doc.humanImage,
      humanImageMobile: doc.humanImageMobile,
      humanImageAlt: doc.humanImageAlt,
    },

    platformAndFeatures: {
      platformEyebrow: doc.platformEyebrow || `This isn't just a ${doc.title.toLowerCase()} tool`,
      platformHeading: doc.platformHeading || 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: doc.platformDescription || `${doc.title} runs on our proprietary HIMER AI OS, which also manages eligibility, denials, accounts receivable, cash posting, and coding.`,
      platformCtaText: doc.platformCtaText || 'Explore HIMER AI OS',
      platformCtaLink: doc.platformCtaLink || '/products/himer',
      platformImage: doc.platformImage,
      threeThingsHeading: doc.threeThingsHeading || 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: doc.threeThingsHeadingHighlight || 'The three things that usually',
      threeThingsCards: Array.isArray(doc.threeThingsCards) && doc.threeThingsCards.length > 0
        ? doc.threeThingsCards
        : [
            {
              title: 'Start small',
              description: `You may begin with ${doc.title.toLowerCase()} only and add additional stages when ready.`,
            },
            {
              title: 'Go live fast',
              description: 'Your agents will be live within 14 days.',
            },
            {
              title: 'Data remains secure',
              description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
            },
          ],
    },

    cta: {
      headline: doc.ctaHeadline || `Discover how this solution integrates with your workflow.`,
      buttonText: doc.ctaButtonText || 'Get a Demo',
      buttonLink: doc.ctaButtonLink || '/contact-us',
    },

    seo: {
      metaTitle: doc.metaTitle || `Solutions — ${doc.title} | Waterlabs AI`,
      metaDescription: doc.metaDescription || doc.heroDescription,
    },
  };
}

/**
 * Fetches a single solution page by slug from Sanity, falling back to local fallback data if not found.
 */
export async function fetchSolutionBySlug(slug: string): Promise<SolutionPageData | undefined> {
  try {
    const sanityDoc = await sanityFetch<SanitySolutionDoc | null>({
      query: solutionBySlugQuery,
      params: { slug },
      tags: ['solutionPage', `solutionPage:${slug}`],
      revalidate: 60,
    });

    if (sanityDoc && sanityDoc.title) {
      return mapSanityToSolution(sanityDoc);
    }
  } catch (error) {
    console.warn(`[Sanity] Failed to fetch solution page '${slug}', falling back to local data:`, error);
  }

  // Fallback to static TypeScript definitions
  return getSolutionBySlug(slug);
}

/**
 * Fetches all solution pages from Sanity, falling back to static definitions if Sanity is empty.
 */
export async function fetchAllSolutions(): Promise<SolutionPageData[]> {
  try {
    const sanityDocs = await sanityFetch<SanitySolutionDoc[]>({
      query: allSolutionsQuery,
      tags: ['solutionPage'],
      revalidate: 60,
    });

    if (sanityDocs && sanityDocs.length > 0) {
      return sanityDocs.map(mapSanityToSolution);
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch all solutions, falling back to local data:', error);
  }

  return getAllSolutions();
}

/**
 * Fetches all solution navigation items dynamically for the "Agentic RCM Solutions" dropdown.
 * Merges published Sanity solutions with default solutions to guarantee all items are present.
 */
export async function fetchSolutionNavItems(): Promise<SolutionNavItem[]> {
  const navMap = new Map<string, SolutionNavItem>();

  // 1. Seed with default 8 solutions
  DEFAULT_SOLUTIONS_NAV.forEach((item) => {
    navMap.set(item.href, { ...item });
  });

  // 2. Fetch published solutions from Sanity
  try {
    const sanityNav = await sanityFetch<{ title: string; navLabel?: string; slug: string; order?: number }[]>({
      query: solutionNavQuery,
      tags: ['solutionPage'],
      revalidate: 60,
    });

    if (Array.isArray(sanityNav) && sanityNav.length > 0) {
      sanityNav.forEach((item) => {
        // Special case for eligibility which points to /solutions
        const href = item.slug === 'eligibility-and-benefits-verification' ? '/solutions' : `/solutions/${item.slug}`;
        navMap.set(href, {
          label: item.navLabel || item.title,
          href,
          order: item.order ?? (navMap.get(href)?.order ?? 99),
        });
      });
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch solution nav items:', error);
  }

  // 3. Return sorted by order, then label
  return Array.from(navMap.values()).sort((a, b) => {
    const orderA = a.order ?? 99;
    const orderB = b.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.label.localeCompare(b.label);
  });
}

/**
 * Gathers all solution slugs for static params generation.
 */
export async function fetchAllSolutionSlugs(): Promise<{ slug: string }[]> {
  const slugSet = new Set<string>();

  // Add static slugs
  const staticSolutions = getAllSolutions();
  staticSolutions.forEach((sol) => {
    slugSet.add(sol.slug);
    sol.aliases?.forEach((alias) => slugSet.add(alias));
  });

  // Query Sanity slugs
  try {
    const sanitySlugs = await sanityFetch<{ slug: string }[]>({
      query: solutionSlugsQuery,
      tags: ['solutionPage'],
      revalidate: 60,
    });

    if (Array.isArray(sanitySlugs)) {
      sanitySlugs.forEach((item) => {
        if (item.slug) slugSet.add(item.slug);
      });
    }
  } catch (error) {
    console.warn('[Sanity] Failed to fetch solution slugs from Sanity:', error);
  }

  return Array.from(slugSet).map((slug) => ({ slug }));
}
