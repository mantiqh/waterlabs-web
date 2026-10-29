export interface StatItem {
  value: string;
  label: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ClaimCarouselCard {
  title: string;
  description: string;
  href?: string;
}

export interface MemoryKnowledgeTab {
  id: 'payers' | 'specialties' | 'systems' | 'rules';
  label: string;
  description: string;
  desktopVideo: string;
  mobileVideo: string;
  aspectRatio: string;
}

export interface LearningLoopPoint {
  title: string;
  description: string;
}

export interface LifecycleTab {
  id: 'build' | 'manage' | 'govern';
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  desktopVideo: string;
  mobileVideo: string;
}

export interface SecurityPillar {
  title: string;
  description: string;
}

export interface PricingCard {
  label: string;
  description: string;
}
