import type {
  ClaimCarouselCard,
  LearningLoopPoint,
  LifecycleTab,
  MemoryKnowledgeTab,
  MetricItem,
  PricingCard,
  SecurityPillar,
  StatItem,
} from '@/types/himer';

export const HIMER_HERO_DATA = {
  subtext:
    'HIMER AI OS is the knowledge engine every Waterlabs agent is built on, deployed through, governed by and taught by. It knows the payers, the specialties, the systems and the rules before it knows you.',
  ctaText: 'Get a demo',
  ctaHref: '/contact-us',
  desktopVideo: '/videos/himer/desktop/himer-hero_2x.mp4',
  mobileVideo: '/videos/himer/mobile/himer-hero_mob_base-image.mp4',
  stats: [
    { value: '100+', label: 'Agents in production' },
    { value: '10+', label: 'Active clients' },
    { value: '4,000+', label: 'Payer connections' },
    { value: '2 weeks', label: 'To deploy an agent' },
  ] as StatItem[],
};

export const HIMER_METRICS_DATA = {
  headline: 'Returns that compound.',
  subtext:
    'Lower cost to collect, faster cash and cleaner claims, with your team spending its day on the work that needs judgment.',
  metrics: [
    { value: '30–70%', label: 'Lower cost to collect' },
    { value: '40%', label: 'Reduction in days in AR' },
    { value: '85%+', label: 'Clean-claim rate' },
    { value: '60%', label: 'Reduction in staff workload' },
  ] as MetricItem[],
};

export const HIMER_CLAIM_JOURNEY_DATA = {
  subtext:
    'From the first appointment to zero balance, front office, mid office and back office run on the same memory.',
  desktopVideo: '/videos/himer/desktop/himer-claim-journey_2x.mp4',
  mobileVideo: '/videos/himer/mobile/himer-claim-journey_mob.mp4',
  aspectRatio: '2000 / 667',
  carouselCards: [
    {
      title: 'Patient Access',
      description:
        'Scheduling, registration and eligibility handled before the patient arrives. Coverage confirmed, demographics validated and referrals logged, so the claim that goes out 30 days later was already correct on day one.',
      href: '/solutions/prior-authorization',
    },
    {
      title: 'Authorization & Financial Clearance',
      description:
        'Authorizations requested, tracked and extended around the clock. Medical necessity and coverage checked, and a cost estimate delivered to the patient before the visit.',
      href: '/solutions/prior-authorization',
    },
    {
      title: 'Charge Capture & Coding',
      description:
        'Autonomous clinical chart review and coding against the deepest global codebook foundation, reconciling every clinical encounter before billing.',
      href: '/solutions/charge-capture-and-coding',
    },
    {
      title: 'Claims & Reimbursement',
      description:
        'Zero-touch claim generation, scrubbing, and direct submission with automated clearinghouse tracking and rapid remittance reconciliation.',
      href: '/solutions/claim-submission-and-scrubbing',
    },
  ] as ClaimCarouselCard[],
};

export const HIMER_MEMORY_DATA = {
  tag: 'What Himer Knows',
  subtext:
    'Waterlabs built the algorithms that turn what HIMER knows into working agents, so most of your agent exists before your project starts.',
  split: {
    alreadyInHimer: '70% · Already in HIMER',
    learnedFromYou: '30% learned from you',
  },
  tabs: [
    {
      id: 'payers',
      label: 'Payers',
      description:
        'How each one behaves. What they accept, what they reject, and what they want attached before they will pay.',
      desktopVideo: '/videos/himer/desktop/himer-knows-payers_orbit_v1_clean.mp4',
      mobileVideo: '/videos/himer/mobile/himer-knows-payers_mob.mp4',
      aspectRatio: '1160 / 880',
    },
    {
      id: 'specialties',
      label: 'Specialties',
      description:
        'What changes between them. A prior authorization in oncology is not the same piece of work as one in physical therapy.',
      desktopVideo: '/videos/himer/desktop/himer-knows-specialties_v2.mp4',
      mobileVideo: '/videos/himer/mobile/himer-knows-specialties_mob.mp4',
      aspectRatio: '1160 / 880',
    },
    {
      id: 'systems',
      label: 'Systems',
      description:
        'The practice management platforms and EHRs our agents already work, screen by screen, the way your team does.',
      desktopVideo: '/videos/himer/desktop/himer-knows-systems_v2.mp4',
      mobileVideo: '/videos/himer/mobile/himer-knows-systems_mob.mp4',
      aspectRatio: '1160 / 880',
    },
    {
      id: 'rules',
      label: 'Rules',
      description:
        'Payer policies, coding guidelines and coverage criteria, maintained as they change rather than frozen at the version that shipped.',
      desktopVideo: '/videos/himer/desktop/himer-knows-rules_v2.mp4',
      mobileVideo: '/videos/himer/mobile/himer-knows-rules_mob.mp4',
      aspectRatio: '1160 / 880',
    },
  ] as MemoryKnowledgeTab[],
  callout: 'An agent is live in two weeks rather than a year.',
};

export const HIMER_LEARNING_LOOP_DATA = {
  subtext:
    'Every agent Waterlabs builds adds context the system did not have, so your second agent starts further ahead than your first.',
  desktopVideo: '/videos/himer/desktop/himer-learning-loop_ticket.mp4',
  mobileVideo: '/videos/himer/mobile/himer-learning-loop_mob.mp4',
  aspectRatio: '1140 / 840',
  points: [
    {
      title: 'A payer behaved differently.',
      description: 'Nothing on record matched it. Now it is on record.',
    },
    {
      title: 'A workflow nobody had encoded.',
      description: 'Watched, learned and kept.',
    },
    {
      title: 'An exception your team resolved.',
      description:
        'The rule joins the system, so the same case does not come back. What travels is the rule about the payer, not the record it came from.',
    },
    {
      title: 'A portal moved overnight.',
      description: 'The agent self-heals to the new layout and keeps working.',
    },
  ] as LearningLoopPoint[],
};

export const HIMER_LIFECYCLE_DATA = {
  headline: 'Built, managed and governed on one system.',
  subtext: 'One system from the first day of the build to every decision in production.',
  tabs: [
    {
      id: 'build',
      badge: 'BUILD · Compose Agent',
      title: 'Composed from memory',
      description:
        'You tell us the process, the system and the specialty. HIMER assembles the sub-agents it already holds into a working workflow.',
      bullets: [
        'Ask for it in a sentence',
        'Skills come in from memory',
        'Assembled into a workflow',
        'Tested on 30 audited cases',
        'Ready to run, then live',
      ],
      desktopVideo: '/videos/himer/desktop/himer-build-an-agent_v3.mp4',
      mobileVideo: '/videos/himer/mobile/himer-build-an-agent_mob.mp4',
    },
    {
      id: 'manage',
      badge: 'MANAGE · Agents and Analytics',
      title: 'Every agent, tracked live',
      description:
        'Step, status, elapsed time and failure mode for every agent, scaling up automatically when the volume does.',
      bullets: [
        'What each agent is doing now',
        'A failure, retried and recovered',
        'Volume spikes',
        'Scales out on its own',
        'Queue cleared, nobody paged',
      ],
      desktopVideo: '/videos/himer/desktop/himer-manage-agents-analytics.mp4',
      mobileVideo: '/videos/himer/mobile/himer-manage-agents-analytics_mob.mp4',
    },
    {
      id: 'govern',
      badge: 'GOVERN · Governance',
      title: 'Humans decide only when it matters',
      description:
        'Anything uncertain comes to your team with the source document, the agent’s reasoning and a recommended fix.',
      bullets: [
        'Guardrails your team sets',
        'Confident work goes straight through',
        'Uncertain or high-value work stops',
        'Source, reasoning and a fix',
        'You approve, it is logged and learned',
      ],
      desktopVideo: '/videos/himer/desktop/himer-govern-governance.mp4',
      mobileVideo: '/videos/himer/mobile/himer-govern-governance_mob.mp4',
    },
  ] as LifecycleTab[],
  proof: {
    headline: 'Proved before production',
    subtext:
      'Automated checks on logic, guardrails and payer rules, followed by up to 30 human audits. An agent goes live at 96% accuracy or it does not go live.',
    cards: [
      { value: '30 / 30', label: '30 of 30 audits passed' },
      { value: '98.4%', label: 'Accuracy · bar is 96%' },
    ],
  },
};

export const HIMER_ACTIVITY_LOG_DATA = {
  desktopVideo: '/videos/himer/desktop/himer-activity-log_stack.mp4',
  mobileVideo: '/videos/himer/mobile/himer-activity-log_mob.mp4',
};

export const HIMER_TRUST_SECURITY_DATA = {
  tag: 'Trust and Security',
  headline: 'Where your data sits, and who can reach it.',
  subtext:
    'Every agent works inside a healthcare operation, on healthcare data, under healthcare rules. That is the starting condition rather than something added afterwards.',
  ctaText: 'How we handle data and security',
  ctaHref: '/trust-and-security',
  pillars: [
    {
      title: 'A BAA on every engagement',
      description: 'Signed as standard, from the first day of work.',
    },
    {
      title: 'Our own infrastructure',
      description:
        'Owned and operated by Waterlabs in the United States, end to end. Not resold capacity.',
    },
    {
      title: 'Access under your control',
      description:
        'Role-based permissions, approval gates on high-value work, and confidence thresholds your team sets.',
    },
    {
      title: 'Every action logged',
      description:
        'Every agent action and every human override recorded, with the trail produced as the work happens rather than assembled afterwards for a reviewer.',
    },
  ] as SecurityPillar[],
  seals: [
    {
      name: 'HIPAA Compliant',
      src: '/images/trust-and-security/certifications/Hippa_logo.png',
      alt: 'HIPAA Compliant',
    },
    {
      name: 'SOC 2 Type 2',
      src: '/images/trust-and-security/certifications/image 98.png',
      alt: 'SOC 2 Type 2 Certified',
    },
    {
      name: 'ISO 27001',
      src: '/images/trust-and-security/certifications/Iso_27001_logo.png',
      alt: 'ISO 27001 Information Security Management',
    },
    {
      name: 'ISO 27017 & 27018',
      src: '/images/trust-and-security/certifications/ISO_27017_27018_logo.png',
      alt: 'ISO 27017 Cloud Security & ISO 27018 Privacy',
    },
  ],
};

export const HIMER_PRICING_DATA = {
  tag: 'You pay for the work',
  subtext:
    'Billing follows the transactions our agents complete, and nothing is charged before they are live.',
  cards: [
    {
      label: 'Before go-live',
      description: 'Nothing is charged.',
    },
    {
      label: 'After go-live',
      description: 'You pay for the transactions agents complete.',
    },
    {
      label: 'Always',
      description: 'Transparent pricing and joint ownership of outcomes.',
    },
  ] as PricingCard[],
  desktopVideo: '/videos/himer/desktop/himer-pricing-meter_flow5_light.mp4',
  mobileVideo: '/videos/himer/mobile/himer-pricing-meter_mob.mp4',
};

export const HIMER_FINAL_CTA_DATA = {
  headline: 'Bring us one function you want running itself.',
  subtext:
    'Prior authorization, eligibility, denials, whichever is costing you the most. We will show you what Waterlabs would do on your numbers.',
  ctaText: 'Get a demo',
  ctaHref: '/contact-us',
};
