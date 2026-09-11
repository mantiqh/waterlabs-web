export interface CaseStudyMetric {
  value: string;
  label: string;
  change?: string;
}

export interface CaseStudyTOCItem {
  id: string;
  title: string;
}

export interface CaseStudyRelated {
  id?: string;
  slug: string;
  title: string;
  categoryTag?: string;
  image?: string;
  heroImage?: string;
  href?: string;
}

export interface CaseStudyStatBadge {
  text: string;
}

export interface CaseStudyResultsBlock {
  headline: string;
  subheadline: string;
  details: string;
}

export interface CaseStudyCTAData {
  tagText?: string;
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  aliases?: string[];
  categoryTag: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt?: string;
  tags?: string[];
  clientSummary?: string;
  statBadges?: CaseStudyStatBadge[];
  challenge?: string;
  whatWaterlabsDid?: string;
  resultsBlock?: CaseStudyResultsBlock;
  outcomes?: string;
  bottomLine?: string;
  client?: {
    name: string;
    specialties: string;
    systemType: string;
  };
  metrics?: CaseStudyMetric[];
  tableOfContents?: CaseStudyTOCItem[];
  relatedCasesHeading?: string;
  relatedCases?: CaseStudyRelated[];
  cta?: CaseStudyCTAData;
  order?: number;
}

