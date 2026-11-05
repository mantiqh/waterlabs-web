export type CurieCodeMediaId =
  | 'against-manual-coding'
  | 'ai-search'
  | 'autonomous-coding'
  | 'denials-agent'
  | 'getting-started'
  | 'hero-banner'
  | 'how-1-reads-the-chart'
  | 'how-2-scores-mdm'
  | 'how-3-scrubs-before-billing'
  | 'how-4-earns-autonomy'
  | 'impact-clean-claims'
  | 'impact-fewer-denials'
  | 'impact-revenue'
  | 'impact-volume'
  | 'intelligent-scrubber'
  | 'scavenger-hunt'
  | 'scrubber-learns'
  | 'universal-code-book';

export interface CurieCodeVideoAsset {
  src: string;
  poster: string;
  width: number;
  height: number;
}
export interface CurieCodeResponsiveMedia {
  desktop: CurieCodeVideoAsset;
  mobile: CurieCodeVideoAsset;
}
export interface CurieCodeMetric {
  value: string;
  description: string;
}
export interface CurieCodeLink {
  label: string;
  href: string;
}
export interface CurieCodeCapability {
  title: string;
  description: string;
  media: CurieCodeMediaId;
}
export interface CurieCodeWorkflowStep extends CurieCodeCapability {
  details: string[];
}
export interface CurieCodeTimelineItem {
  label: string;
  description?: string;
}
interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}
interface AccentedTitle {
  accent: string;
  rest: string;
}
export interface CurieCodePageData {
  hero: { title: string; description: string; cta: CurieCodeLink; metrics: CurieCodeMetric[] };
  why: {
    eyebrow: string;
    title: AccentedTitle;
    description: string;
    metrics: CurieCodeMetric[];
    source: string;
  };
  fragmentation: { title: string; description: string };
  capabilities: SectionCopy & {
    items: CurieCodeCapability[];
    platformDescription: string;
    platformCta: CurieCodeLink;
  };
  banner: string[];
  workflow: SectionCopy & { steps: CurieCodeWorkflowStep[] };
  scrubber: SectionCopy & { stages: CurieCodeTimelineItem[]; beats: number[] };
  comparison: { eyebrow: string; title: AccentedTitle; description: string };
  impact: SectionCopy & { cards: CurieCodeCapability[] };
  gettingStarted: {
    eyebrow: string;
    titleLines: [string, string];
    description: string;
    cta: CurieCodeLink;
    steps: { title: string; description: string }[];
    beats: number[];
    disclaimer: string;
    backgroundImage: string;
  };
}
