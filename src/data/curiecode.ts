import type {
  CurieCodeMediaId,
  CurieCodePageData,
  CurieCodeResponsiveMedia,
} from '@/types/curiecode';

export const CURIECODE_MEDIA = {
  'against-manual-coding': {
    desktop: {
      src: '/videos/curiecode/curiecode-against-manual-coding_v7_transparent.webm',
      poster: '/images/curiecode/curiecode-against-manual-coding_v7_transparent.webp',
      width: 3072,
      height: 2048,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-against-manual-coding_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-against-manual-coding_v7_mobile.webp',
      width: 1448,
      height: 1216,
    },
  },
  'ai-search': {
    desktop: {
      src: '/videos/curiecode/curiecode-ai-search_v7.mp4',
      poster: '/images/curiecode/curiecode-ai-search_v7.webp',
      width: 2320,
      height: 1760,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-ai-search_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-ai-search_v7_mobile.webp',
      width: 1288,
      height: 1320,
    },
  },
  'autonomous-coding': {
    desktop: {
      src: '/videos/curiecode/curiecode-autonomous-coding_v7.mp4',
      poster: '/images/curiecode/curiecode-autonomous-coding_v7.webp',
      width: 2320,
      height: 1760,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-autonomous-coding_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-autonomous-coding_v7_mobile.webp',
      width: 1288,
      height: 1320,
    },
  },
  'denials-agent': {
    desktop: {
      src: '/videos/curiecode/curiecode-denials-agent_v7.mp4',
      poster: '/images/curiecode/curiecode-denials-agent_v7.webp',
      width: 2320,
      height: 1760,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-denials-agent_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-denials-agent_v7_mobile.webp',
      width: 1288,
      height: 1320,
    },
  },
  'getting-started': {
    desktop: {
      src: '/videos/curiecode/curiecode-getting-started_v7.mp4',
      poster: '/images/curiecode/curiecode-getting-started_v7.webp',
      width: 2200,
      height: 900,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-getting-started_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-getting-started_v7_mobile.webp',
      width: 1288,
      height: 1280,
    },
  },
  'hero-banner': {
    desktop: {
      src: '/videos/curiecode/curiecode-hero-banner_v7_light_transparent.webm',
      poster: '/images/curiecode/curiecode-hero-banner_v7_light_transparent.webp',
      width: 3072,
      height: 2048,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-hero-banner_v7_mobile_transparent.webm',
      poster: '/images/curiecode/curiecode-hero-banner_v7_mobile_transparent.webp',
      width: 1920,
      height: 1156,
    },
  },
  'how-1-reads-the-chart': {
    desktop: {
      src: '/videos/curiecode/curiecode-how-1-reads-the-chart_v7.mp4',
      poster: '/images/curiecode/curiecode-how-1-reads-the-chart_v7.webp',
      width: 2280,
      height: 1520,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-how-1-reads-the-chart_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-how-1-reads-the-chart_v7_mobile.webp',
      width: 1448,
      height: 1400,
    },
  },
  'how-2-scores-mdm': {
    desktop: {
      src: '/videos/curiecode/curiecode-how-2-scores-mdm_v7.mp4',
      poster: '/images/curiecode/curiecode-how-2-scores-mdm_v7.webp',
      width: 2280,
      height: 1520,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-how-2-scores-mdm_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-how-2-scores-mdm_v7_mobile.webp',
      width: 1448,
      height: 1400,
    },
  },
  'how-3-scrubs-before-billing': {
    desktop: {
      src: '/videos/curiecode/curiecode-how-3-scrubs-before-billing_v7.mp4',
      poster: '/images/curiecode/curiecode-how-3-scrubs-before-billing_v7.webp',
      width: 2280,
      height: 1520,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-how-3-scrubs-before-billing_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-how-3-scrubs-before-billing_v7_mobile.webp',
      width: 1448,
      height: 1400,
    },
  },
  'how-4-earns-autonomy': {
    desktop: {
      src: '/videos/curiecode/curiecode-how-4-earns-autonomy_v7.mp4',
      poster: '/images/curiecode/curiecode-how-4-earns-autonomy_v7.webp',
      width: 2280,
      height: 1520,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-how-4-earns-autonomy_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-how-4-earns-autonomy_v7_mobile.webp',
      width: 1448,
      height: 1400,
    },
  },
  'impact-clean-claims': {
    desktop: {
      src: '/videos/curiecode/curiecode-impact-clean-claims_v7.mp4',
      poster: '/images/curiecode/curiecode-impact-clean-claims_v7.webp',
      width: 2000,
      height: 800,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-impact-clean-claims_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-impact-clean-claims_v7_mobile.webp',
      width: 1352,
      height: 920,
    },
  },
  'impact-fewer-denials': {
    desktop: {
      src: '/videos/curiecode/curiecode-impact-fewer-denials_v7.mp4',
      poster: '/images/curiecode/curiecode-impact-fewer-denials_v7.webp',
      width: 2000,
      height: 800,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-impact-fewer-denials_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-impact-fewer-denials_v7_mobile.webp',
      width: 1352,
      height: 920,
    },
  },
  'impact-revenue': {
    desktop: {
      src: '/videos/curiecode/curiecode-impact-revenue_v7.mp4',
      poster: '/images/curiecode/curiecode-impact-revenue_v7.webp',
      width: 2000,
      height: 800,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-impact-revenue_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-impact-revenue_v7_mobile.webp',
      width: 1352,
      height: 920,
    },
  },
  'impact-volume': {
    desktop: {
      src: '/videos/curiecode/curiecode-impact-volume_v7.mp4',
      poster: '/images/curiecode/curiecode-impact-volume_v7.webp',
      width: 2000,
      height: 800,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-impact-volume_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-impact-volume_v7_mobile.webp',
      width: 1352,
      height: 920,
    },
  },
  'intelligent-scrubber': {
    desktop: {
      src: '/videos/curiecode/curiecode-intelligent-scrubber_v7.mp4',
      poster: '/images/curiecode/curiecode-intelligent-scrubber_v7.webp',
      width: 2320,
      height: 1760,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-intelligent-scrubber_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-intelligent-scrubber_v7_mobile.webp',
      width: 1288,
      height: 1320,
    },
  },
  'scavenger-hunt': {
    desktop: {
      src: '/videos/curiecode/curiecode-scavenger-hunt_v7.mp4',
      poster: '/images/curiecode/curiecode-scavenger-hunt_v7.webp',
      width: 2200,
      height: 1600,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-scavenger-hunt_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-scavenger-hunt_v7_mobile.webp',
      width: 1448,
      height: 1248,
    },
  },
  'scrubber-learns': {
    desktop: {
      src: '/videos/curiecode/curiecode-scrubber-learns_v7.mp4',
      poster: '/images/curiecode/curiecode-scrubber-learns_v7.webp',
      width: 2280,
      height: 1200,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-scrubber-learns_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-scrubber-learns_v7_mobile.webp',
      width: 1448,
      height: 1228,
    },
  },
  'universal-code-book': {
    desktop: {
      src: '/videos/curiecode/curiecode-universal-code-book_v7.mp4',
      poster: '/images/curiecode/curiecode-universal-code-book_v7.webp',
      width: 2320,
      height: 1760,
    },
    mobile: {
      src: '/videos/curiecode/curiecode-universal-code-book_v7_mobile.mp4',
      poster: '/images/curiecode/curiecode-universal-code-book_v7_mobile.webp',
      width: 1288,
      height: 1320,
    },
  },
} as const satisfies Record<CurieCodeMediaId, CurieCodeResponsiveMedia>;

export type { CurieCodeMediaId } from '@/types/curiecode';

export const CURIECODE_PAGE_DATA = {
  hero: {
    title: 'Every chart coded. Every claim checked against how your payers actually pay.',
    description:
      'CurieCode codes autonomously in your specialty and ties every code to the line of the record that supports it. Before anything is billed, each claim is held to the payment behavior mapped from your own paid and denied claims, to current policy and to the terms of your contract. Autonomy is earned one specialty at a time, at the bar your coders set.',
    cta: {
      label: 'Book a demo',
      href: '/contact-us',
    },
    metrics: [
      {
        value: '15%',
        description: 'Revenue upside clients have seen',
      },
      {
        value: 'Specialty-specific',
        description: 'A model per specialty, trained on your volume',
      },
      {
        value: 'Every code',
        description: 'Linked to the line that supports it',
      },
      {
        value: 'Every quarter',
        description: 'All six code sets refreshed on one cycle',
      },
    ],
  },
  why: {
    eyebrow: 'Why Curiecode',
    title: {
      accent: 'Coding fails quietly.',
      rest: 'At scale, it fails expensively.',
    },
    description:
      'Nearly one claim in eight is denied on first pass, and a growing share of those are coding denials. Most are never reworked, so the money is written off rather than argued for. At any volume, that is a line item, not a nuisance.',
    metrics: [
      {
        value: '11.8%',
        description: 'Of claims denied on first pass, industry-wide',
      },
      {
        value: '$25–181',
        description: 'To rework a single denied claim',
      },
      {
        value: '65%',
        description: 'Of denied claims are never resubmitted',
      },
      {
        value: '≈6,000',
        description: 'Denials a month at 50,000 claims',
      },
    ],
    source: 'Industry benchmarks · Experian State of Claims · MGMA · Premier',
  },
  fragmentation: {
    title: 'Coding one chart means opening nine other places to look.',
    description:
      'The code sits in one tool, the guideline in another, the coverage policy on CMS and the contract in someone’s inbox. Every hop is a place accuracy leaks. CurieCode puts all of it on the code itself.',
  },
  capabilities: {
    eyebrow: 'What You Get',
    title: 'Everything between the chart and the payment.',
    description:
      'Five capabilities, built in the order a coder works, so nobody leaves the screen to find a guideline, an edit or a payer rule.',
    items: [
      {
        title: 'Autonomous coding',
        description:
          'CurieCode reads the chart, scores the medical decision making and returns the E/M, CPT® and ICD-10-CM codes. One model per specialty, trained on your coders’ own decisions.',
        media: 'autonomous-coding',
      },
      {
        title: 'Intelligent scrubber',
        description:
          'The scrubber learns how each payer adjudicates, then holds every claim to that, to the rulebook and to the terms of your contract before it is billed.',
        media: 'intelligent-scrubber',
      },
      {
        title: 'Denials agent',
        description:
          'The agent reads the denial reason, reworks the claim and refiles it, then teaches the scrubber so the same denial is caught before submission.',
        media: 'denials-agent',
      },
      {
        title: 'AI search',
        description:
          'Describe the case in clinical language. The codes come back ranked, sequenced and cited to the guideline behind each one.',
        media: 'ai-search',
      },
      {
        title: 'Universal code book',
        description:
          'ICD-10-CM, CPT®, HCPCS, APC, crosswalks and coding tools. 19 references on one screen per code, every set refreshed on the same quarterly cycle.',
        media: 'universal-code-book',
      },
    ],
    platformDescription:
      'CurieCode is also available on HIMER AI OS, the agentic operating system behind every Waterlabs agent, so a coding decision that causes a denial 45 days later comes back to the agent that made it.',
    platformCta: {
      label: 'Explore HIMER AI OS',
      href: '/product/himer',
    },
  },
  banner: ['Coders designed it.', 'Coders set the bar.', 'Coders stay in the loop.'],
  workflow: {
    eyebrow: 'How it Works',
    title: 'Chart in. Clean claim out.',
    description: 'Four steps, all of them visible, and a coder confirms before anything is billed.',
    steps: [
      {
        title: 'Reads the chart, in its specialty',
        description:
          'The chart goes in as written, with no template and no form to fill first. The model trained for that specialty reads it, and the codes come out tied to the line that supports them.',
        media: 'how-1-reads-the-chart',
        details: [
          'Charts in, as written',
          'Routed to its specialty model',
          'Codes out, with evidence',
          'Each specialty, its own model',
          'Trained on your coders’ decisions',
        ],
      },
      {
        title: 'Scores the decision like an auditor',
        description:
          'COPA, Data and Risk are scored separately and two of the three set the level. Every selection links back to the chart, and undercoding surfaces the same way overcoding does.',
        media: 'how-2-scores-mdm',
        details: [
          'Three elements, scored separately',
          'Each tied to the chart',
          'A level per element',
          'The level, and why',
          'Under-coding surfaced',
        ],
      },
      {
        title: 'Scrubs it before it is billed',
        description:
          'The scrubber runs the rulebook on unit limits, code pairs and coverage, then what it has learned about this payer and the terms of your contract. Anything that fails arrives with its fix.',
        media: 'how-3-scrubs-before-billing',
        details: [
          'The rulebook: units and code pairs',
          'Coverage for this plan',
          'What this payer actually denies',
          'Fixed before billing',
          'Clean claim, low risk',
        ],
      },
      {
        title: 'Earns autonomy, specialty by specialty',
        description:
          'Each specialty starts in shadow, coding beside your coders on your own volume until the accuracy holds at the level they require. Your coders then review by exception, and the next specialty begins.',
        media: 'how-4-earns-autonomy',
        details: [
          'Shadows your coders',
          'Aligns to their judgment',
          'Each specialty crosses your bar',
          'Review by exception',
          'The next specialty starts in shadow',
        ],
      },
    ],
  },
  scrubber: {
    eyebrow: 'The Intelligent Scrubber',
    title: 'A scrubber that learns how each payer actually pays.',
    description:
      'Rule-based edits hold a claim to what the rulebook says. CurieCode holds it to what your payers actually do, learned from your own paid and denied claims and turned into checks that run before the claim is billed. What it keeps is the pattern about the payer, not the record it came from.',
    stages: [
      {
        label: 'What gets paid, what gets denied',
        description: 'Your remits, payer by payer, claim by claim.',
      },
      {
        label: 'How each payer actually behaves',
      },
      {
        label: 'The gaps become checks',
      },
      {
        label: 'Collections go up',
      },
      {
        label: 'It keeps learning',
      },
    ],
    beats: [0.3, 3.6, 7, 10.4, 14.4],
  },
  comparison: {
    eyebrow: 'Why Curiecode Over Other Options',
    title: {
      accent: 'Against manual coding.',
      rest: 'Against the computer-assisted coding you have seen.',
    },
    description:
      'Computer-assisted coding suggests, and a coder still touches every line in the same ten tabs. CurieCode changes who does the work, where it happens, and whether the claim gets paid.',
  },
  impact: {
    eyebrow: 'The Impact',
    title: 'It pays for itself.',
    description:
      'Clean claim rate is the first number CurieCode moves, and it moves it in revenue rather than on a dashboard.',
    cards: [
      {
        title: '15%',
        description: 'Revenue upside clients have seen',
        media: 'impact-revenue',
      },
      {
        title: 'Clean claims',
        description: 'The number one metric, and the first one it moves',
        media: 'impact-clean-claims',
      },
      {
        title: 'Fewer denials',
        description: 'Caught before the claim goes out, not 30 days later',
        media: 'impact-fewer-denials',
      },
      {
        title: 'Volume, not headcount',
        description: 'No hundred coders needed to run at a hundred coders’ pace',
        media: 'impact-volume',
      },
    ],
  },
  gettingStarted: {
    eyebrow: 'Getting Started',
    titleLines: ['See it run on', 'your own charts.'],
    description:
      'Three steps from a demo to autonomous coding, with a coder in the loop at every one.',
    cta: {
      label: 'Book a demo',
      href: '/contact-us',
    },
    steps: [
      {
        title: 'Bring a de-identified sample',
        description:
          'We code it in front of you, show the evidence behind every line, and you tell us where it is wrong.',
      },
      {
        title: 'It codes beside your coders',
        description:
          'CurieCode codes beside your coders, one specialty at a time, on your own volume, until the accuracy holds at the level they require.',
      },
      {
        title: 'Autonomous, reviewed by exception',
        description:
          'Every claim is still held to the payment behavior CurieCode has mapped. Your coders confirm the exceptions.',
      },
    ],
    beats: [0.5, 4.4, 8.4],
    disclaimer:
      'CurieCode is licensed software. You begin with one specialty rather than a whole department, and nothing codes autonomously until your coders say the accuracy holds. Terms follow the demo, once the volume and the specialty mix are known.',
    backgroundImage: '/images/himer/bg_you_payay_for_the_work.png',
  },
} satisfies CurieCodePageData;
