import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

const EXCLUDED_SLUGS = new Set([
  'testing-blog',
  'testing-blog2',
  'prior-authorization-automation-broken-process-healthcare',
]);

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

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr || '';
  }
}

const DENIAL_MANAGEMENT_SECTIONS: BlogArticleSection[] = [
  {
    id: 'understanding-modern-denial-management',
    title: 'Understanding Modern Denial Management in RCM',
    paragraphs: [
      'Denial management is the systematic process of identifying, analyzing, resolving, and preventing claims that payers refuse to reimburse. While traditional billing systems treat denials as an inevitable cost of doing business, modern revenue cycle leaders recognize that over 85% of claim denials are preventable before submission.',
      'A true denial management program bridges front-end patient access, mid-revenue cycle clinical documentation and coding, and back-end billing follow-up. Without tight integration across these stages, practices get trapped in an endless loop of reworking claims instead of resolving the root causes.',
    ],
  },
  {
    id: 'the-true-financial-impact-of-denials',
    title: 'The True Financial Impact of Denials',
    paragraphs: [
      'Industry benchmark data shows that the initial denial rate across US healthcare systems averages between 10% and 12%, with upwards of $260 billion in billing affected annually. Reworking a single denied claim costs between $25 and $118 in direct administrative labor.',
      'Worse, MGMA estimates that between 50% and 65% of denied claims are never resubmitted or appealed at all. Unworked denials quietly transform into bad debt and write-offs, draining 3% to 5% of a provider’s net patient revenue.',
    ],
  },
  {
    id: 'top-root-causes-of-claim-denials',
    title: 'Top Root Causes of Claim Denials',
    paragraphs: [
      'The vast majority of denials cluster around predictable operational breakdowns: missing or invalid authorization, registration and eligibility errors, non-covered services, medical necessity discrepancies, and coding mismatch.',
      'Because each payer publishes complex, frequently shifting policy bulletins, manual teams struggle to keep pace with changing rules. What worked for a commercial plan last quarter may fail today under a revised policy.',
    ],
  },
  {
    id: 'prevention-vs-recovery-why-both-matter',
    title: 'Prevention vs. Recovery: Why Both Matter',
    paragraphs: [
      'An effective revenue cycle cannot rely solely on back-end appeals. Prevention stops clean claim failure at the front door through rigorous pre-submission rule validation and real-time eligibility verification.',
      'At the same time, rapid recovery ensures that when unavoidable denials do occur, they are triaged immediately, matched to payer-specific appeal requirements, and submitted with complete clinical backing before deadlines lapse.',
    ],
  },
  {
    id: 'how-agentic-ai-transforms-denials',
    title: 'How Agentic AI Transforms Denial Workflows',
    paragraphs: [
      'Unlike legacy RPA bots that break when a payer portal layout shifts, agentic AI reasons through denial codes, reads remittance remarks, reviews medical chart notes, and drafts tailored appeal packages with supporting evidence.',
      'By autonomously resolving routine and repetitive denials while escalating nuanced clinical cases to human specialists, agentic RCM reduces touch rates by up to 70% and accelerates cash recovery by weeks.',
    ],
  },
  {
    id: 'building-a-sustainable-denial-strategy',
    title: 'Building a Sustainable Denial Strategy',
    paragraphs: [
      'Eliminating denials requires institutional memory. Every time an exception is resolved, that insight must be codified into the system so the same error is never repeated on future claims.',
      'When providers align technology, clinical documentation, and payer-aware workflows on a shared operating system, denial rates drop permanently and revenue teams can refocus on strategic growth.',
    ],
  },
];

const AUTONOMOUS_CODING_SECTIONS: BlogArticleSection[] = [
  {
    id: 'what-is-autonomous-medical-coding',
    title: 'What Is Autonomous Medical Coding?',
    paragraphs: [
      'Autonomous medical coding is the direct translation of clinical documentation into standardized medical code sets—including ICD-10-CM, CPT, and HCPCS—by intelligent agents without requiring human coders to manually review every chart.',
      'Unlike traditional automated tools that merely suggest keywords, true autonomous coding systems evaluate physician narratives, clinical context, and payer guidelines to assign and validate codes at production-grade accuracy.',
    ],
  },
  {
    id: 'why-computer-assisted-coding-falls-short',
    title: 'Why Computer-Assisted Coding (CAC) Falls Short',
    paragraphs: [
      'Computer-Assisted Coding (CAC) tools rely primarily on basic natural language processing (NLP) to highlight keywords on a screen. While CAC helps human coders locate terms, it still requires a human to open, review, and finalize every single encounter.',
      'As encounter volume grows, CAC does not solve the staffing bottleneck. Coders still experience fatigue, and productivity gains plateau around 15% to 20%, leaving backlogs and DNFB (Discharged Not Final Billed) high.',
    ],
  },
  {
    id: 'ensuring-accuracy-and-regulatory-compliance',
    title: 'Ensuring Accuracy and Regulatory Compliance',
    paragraphs: [
      'In healthcare billing, compliance is paramount. Autonomous engines must not guess or hallucinate codes. Instead, they operate with strict confidence thresholds and comprehensive codebooks that encode official coding guidelines and payer-specific edits.',
      'Every assigned code carries a clear, auditable trail directly linked to the clinical documentation, ensuring complete defensibility during payer reviews and internal audits.',
    ],
  },
  {
    id: 'the-human-in-the-loop-collaboration-model',
    title: 'The Human-in-the-Loop Collaboration Model',
    paragraphs: [
      'Autonomous coding does not eliminate the need for coding professionals; it elevates them. Routine, high-confidence encounters (such as standard outpatient or emergency visits) flow through autonomously.',
      'Complex cases—such as multi-organ trauma, ambiguous physician notes, or rare procedural techniques—are routed to experienced coding specialists with the agent’s clinical reasoning attached, maximizing human expertise where it matters most.',
    ],
  },
  {
    id: 'economic-impact-and-turnaround-acceleration',
    title: 'Economic Impact and Turnaround Acceleration',
    paragraphs: [
      'Health systems adopting autonomous coding see chart turnaround drop from days to hours, preventing billing delays and stabilizing cash flow. Labor costs on routine chart review fall by 60% to 70%, freeing clinical and coding staff for higher-value compliance oversight.',
      'With faster claim release and consistent guideline application, organizations scale encounter capacity without expanding administrative headcount.',
    ],
  },
];

export async function generateStaticParams() {
  const slugs = new Set<string>([
    'what-is-agentic-rcm',
    'denial-management-revenue-cycle-management-complete-guide',
    'autonomous-medical-coding-accuracy-compliance',
  ]);

  try {
    const remoteSlugs = await fetchAllBlogSlugs();
    remoteSlugs.forEach((s) => {
      if (!EXCLUDED_SLUGS.has(s)) slugs.add(s);
    });

    const articles = await fetchAllBlogArticles();
    articles.forEach((article) => {
      if (article.slug && !EXCLUDED_SLUGS.has(article.slug)) {
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

  if (EXCLUDED_SLUGS.has(slug)) {
    return { title: 'Page Not Found | Waterlabs AI' };
  }

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

  if (slug === 'denial-management-revenue-cycle-management-complete-guide') {
    return {
      title: 'Denial Management in Revenue Cycle Management: The Complete Guide | Waterlabs AI',
      description:
        'The complete guide to modern denial management in healthcare revenue cycle management.',
    };
  }

  if (slug === 'autonomous-medical-coding-accuracy-compliance') {
    return {
      title: 'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding | Waterlabs AI',
      description:
        'Understanding accuracy, compliance, and why autonomous AI is replacing traditional CAC tools.',
    };
  }

  return {
    title: 'Blog | Waterlabs AI',
    description: 'Insights and guides from the team at Waterlabs AI.',
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (EXCLUDED_SLUGS.has(slug)) {
    notFound();
  }

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
      heroParagraphsList = [sanityArticle.excerpt];
    }

    const category = sanityArticle.category || 'Features';
    const tag = sanityArticle.tag && sanityArticle.tag !== 'Lorem' ? sanityArticle.tag : category;
    const formattedDate = formatDate(sanityArticle.publishedAt);
    const subTag =
      sanityArticle.subTag && sanityArticle.subTag !== 'Lorem Ipsum'
        ? sanityArticle.subTag
        : formattedDate;

    heroProps = {
      tag,
      subTag,
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
  } else if (slug === 'what-is-agentic-rcm') {
    heroProps = {
      tag: 'Features',
      subTag: 'Jun 27, 2025',
      title: undefined,
      titleAccent: 'What Is Agentic RCM?',
      titleRest: 'The Definitive Guide to the Autonomous Revenue Cycle',
      desktopImage: '/images/blog-detail/hero-banner-desktop.png',
      mobileImage: '/images/blog-detail/hero-banner-mobile.png',
      paragraphs: [
        'Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves, reading payer rules, submitting claims, resolving denials, and following up, rather than flagging tasks for humans to complete.',
        'It is the difference between software that builds a worklist and software that works the list. This guide, from the team at Waterlabs, explains what agentic RCM is, how it differs from the automation that came before it, what it changes for a health system, and where its real limits sit.',
        'The shift is happening fast. A revenue cycle survey found that 80% of health systems were exploring, piloting, or implementing generative AI tools for RCM, a 38-percentage-point increase in under two years. Agentic RCM is the frontier of that shift, and the term is new enough that most definitions still get it wrong.',
      ],
    };
  } else if (slug === 'denial-management-revenue-cycle-management-complete-guide') {
    heroProps = {
      tag: 'Features',
      subTag: 'Jun 26, 2025',
      title: 'Denial Management in Revenue Cycle Management: The Complete Guide',
      desktopImage: '/images/blogs/tabs/img_denial_management_inrevenue.png',
      mobileImage: '/images/blogs/tabs/img_denial_management_inrevenue_mobile (1).png',
      paragraphs: [
        'Denial management is the systematic process of identifying, analyzing, resolving, and preventing claims that payers refuse to reimburse. While traditional billing systems treat denials as an inevitable cost of doing business, modern revenue cycle leaders recognize that over 85% of claim denials are preventable before submission.',
        'A true denial management program bridges front-end patient access, mid-revenue cycle clinical documentation and coding, and back-end billing follow-up. Without tight integration across these stages, practices get trapped in an endless loop of reworking claims instead of resolving the root causes.',
      ],
    };
  } else if (slug === 'autonomous-medical-coding-accuracy-compliance') {
    heroProps = {
      tag: 'Features',
      subTag: 'Jun 24, 2025',
      title:
        'Autonomous Medical Coding: Accuracy, Compliance, and What Replaces Computer-Assisted Coding',
      desktopImage: '/images/blogs/tabs/img_medical_coding.png',
      mobileImage: '/images/blogs/tabs/img_medical_coding_mobile (1).png',
      paragraphs: [
        'Autonomous medical coding is the direct translation of clinical documentation into standardized medical code sets—including ICD-10-CM, CPT, and HCPCS—by intelligent agents without requiring human coders to manually review every chart.',
        'Unlike traditional automated tools that merely suggest keywords, true autonomous coding systems evaluate physician narratives, clinical context, and payer guidelines to assign and validate codes at production-grade accuracy.',
      ],
    };
  } else {
    notFound();
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
  } else if (slug === 'denial-management-revenue-cycle-management-complete-guide') {
    sections = DENIAL_MANAGEMENT_SECTIONS;
    topics = DENIAL_MANAGEMENT_SECTIONS.map((sec) => ({
      id: sec.id,
      label: sec.title,
    }));
  } else if (slug === 'autonomous-medical-coding-accuracy-compliance') {
    sections = AUTONOMOUS_CODING_SECTIONS;
    topics = AUTONOMOUS_CODING_SECTIONS.map((sec) => ({
      id: sec.id,
      label: sec.title,
    }));
  }

  // 3. Resolve Related Blogs
  let relatedBlogs: RelatedBlogItem[] = DEFAULT_RELATED_BLOGS;

  if (sanityArticle?.relatedArticles && sanityArticle.relatedArticles.length > 0) {
    relatedBlogs = sanityArticle.relatedArticles
      .filter((item) => item.slug && !EXCLUDED_SLUGS.has(item.slug))
      .map((item, idx) => ({
        id: item._id || item.id || `rel-${idx}`,
        title: item.title,
        image: item.desktopImage || DEFAULT_RELATED_BLOGS[idx % DEFAULT_RELATED_BLOGS.length].image,
        href: `/blogs/${item.slug}`,
        isShorter: idx === 1,
      }));
  } else {
    // If not manually curated, fetch latest blog posts excluding current article and excluded slugs
    try {
      const allArticles = await fetchAllBlogArticles();
      const otherArticles = allArticles.filter(
        (a) => a.slug !== slug && a.slug && !EXCLUDED_SLUGS.has(a.slug)
      );

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
