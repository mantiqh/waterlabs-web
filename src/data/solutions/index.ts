import { SolutionNavItem, SolutionPageData } from '@/types/solution';

export const SOLUTIONS_DATA: Record<string, SolutionPageData> = {
  'prior-authorization': {
    id: 'prior-authorization',
    title: 'Prior Authorization',
    slug: 'prior-authorization',
    navLabel: 'Prior Authorization',
    order: 1,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Prior Authorization',
      headline: 'Prior authorization in 24 to 48 hours.',
      description: 'Our agents manage every authorization around the clock, ensuring prompt processing.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-priorauthorization/hero-section/img_banner%20(10).png',
      heroBanner: '/images/solutions/solutions-priorauthorization/hero-section/banner%20(5).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'How backlogged is your authorization process',
      headlineHighlight: 'right now?',
      description: 'Most practices lack visibility into their authorization backlog, often relying on manual counts. This lack of transparency prevents staff from providing patients with clear information.',
      quoteText: '1 in 3 physicians say prior authorization delays have caused serious harm to a patient.',
      quoteAuthor: 'American Medical Association',
      image: '/images/solutions/solutions-priorauthorization/the-problem/img_the_problem%20(3).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI manages each authorization from order entry through submission and follow-up, ensuring approval is recorded in the patient\'s chart.',
      image: '/images/solutions/solutions-priorauthorization/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Determination if an authorization is needed',
          description: 'Our agents review payer rules and procedure codes at order entry, allowing you to determine if authorization is required before proceeding.',
        },
        {
          title: 'Clinical data assembly',
          description: 'The system extracts diagnosis, procedure details, and notes directly from patient records, eliminating manual entry.',
        },
        {
          title: 'Submission',
          description: 'Authorizations are submitted to each payer\'s portal according to their requirements, ensuring accuracy on the first attempt.',
        },
        {
          title: 'Full-package requests',
          description: 'Complete documentation is submitted at the outset to reduce the risk of rejection.',
        },
        {
          title: 'Continuous follow-up',
          description: 'Agents check status around the clock and chase the ones going quiet. No tickler file, no reminders.',
        },
        {
          title: 'Denial-risk flagging',
          description: 'The system identifies potential denials before submission and addresses issues when possible.',
        },
        {
          title: 'Write-back to your EHR',
          description: 'Once approved, our agents put it back on the record. The number, the dates, the approved units, on the patient\'s chart where scheduling and billing will look for it. Nobody rekeys it from an email.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: 'Under 2%', label: 'Authorization denial rate' },
        { value: '24-48-hour', label: 'turnaround time' },
        { value: '75%', label: 'of authorizations cleared fully autonomously' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'When an authorization requires clinical judgment, peer review, a clinical call, or an appeal, it is routed to your team. The case is fully prepared, with records, payer criteria, and history consolidated for your specialist\'s review.',
        'It is one application within an operating system that manages the full revenue cycle.',
      ],
      humanImage: '/images/solutions/solutions-priorauthorization/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-priorauthorization/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just a prior authorization tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Prior authorization runs on our proprietary HIMER AI OS, which also manages eligibility, denials, accounts receivable, cash posting, and coding. The unified system enables seamless knowledge sharing across all functions.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-priorauthorization/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-priorauthorization/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-priorauthorization/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with prior authorization only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-priorauthorization/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-priorauthorization/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this solution integrates with your authorization queue.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Prior Authorization | Waterlabs AI',
      metaDescription: 'Prior authorization in 24 to 48 hours. Our agents manage every authorization around the clock, ensuring prompt processing.',
    },
  },

  'eligibility-and-benefits-verification': {
    id: 'eligibility-and-benefits-verification',
    title: 'Eligibility & Benefits Verification',
    slug: 'eligibility-and-benefits-verification',
    aliases: ['eligibility', 'solutions'],
    navLabel: 'Eligibility & Benefits Verification',
    order: 2,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Eligibility & Benefits Verification',
      headline: 'Every patient verified before they arrive.',
      description: 'Our agents check coverage, benefits, and patient responsibility ahead of the visit.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-eligibility/hero-section/img_banner%20(9).png',
      heroBanner: '/images/solutions/solutions-eligibility/hero-section/banner%20(4).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'Which patient on tomorrow\'s schedule has coverage that changed',
      headlineHighlight: 'since you checked?',
      description: 'Most practices verify once at booking and never check again. Coverage changes after the appointment, and nobody finds out until the claim returns 60 days later.',
      descriptionSecondary: 'Caught before the visit, an eligibility error costs a phone call. Caught as a denial 60 days later, it costs many times that.',
      image: '/images/solutions/solutions-eligibility/the-problem/img_the_problem%20(2).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI checks coverage continuously from appointment booking through the date of service, extracting full benefit details and updating your EHR automatically.',
      image: '/images/solutions/solutions-eligibility/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Coverage verification',
          description: 'Our agents confirm the plan is active on the service date directly with the payer, not from a cached file.',
        },
        {
          title: 'Benefit detail',
          description: 'Copays, coinsurance, deductibles, and out-of-pocket maximums are extracted directly so your front desk has the complete picture before the patient arrives.',
        },
        {
          title: 'Patient responsibility',
          description: 'Estimated patient responsibility is calculated prior to the visit, reducing surprise bills and improving upfront collection rates.',
        },
        {
          title: 'Secondary and tertiary coverage',
          description: 'When patients carry more than one plan, our agents identify and verify every layer of coverage automatically.',
        },
        {
          title: 'Re-verification',
          description: 'If anything changes between booking and the service date, coverage is re-checked so nothing is stale when the patient arrives.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: '4 days to 1 day', label: 'verification turnaround' },
        { value: '75%', label: 'faster in a behavioral health deployment.' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'When coverage is ambiguous, our agents route it to your team instead of guessing. Coordination of benefits issues, unclear plans, or patients needing a conversation about what they owe are handled. The payer response and verification history arrive attached.',
      ],
      humanImage: '/images/solutions/solutions-eligibility/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-eligibility/human-in-the-loop/img_human_in_the_loop.png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just an eligibility tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Eligibility runs on HIMER AI OS, which also manages prior authorization, denials, AR follow-up, payment posting, and coding. The same patient context flows across every stage.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-eligibility/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool.png',
      platformImageMobile: '/images/solutions/solutions-eligibility/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-eligibility/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may start with eligibility only and add stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-eligibility/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents are live and working in 14 days.',
        },
        {
          icon: '/images/solutions/solutions-eligibility/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this solution integrates with your scheduling queue.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Eligibility & Benefits Verification | Waterlabs AI',
      metaDescription: 'Every patient verified before they arrive. Our agents check coverage, benefits, and patient responsibility ahead of the visit.',
    },
  },

  'denial-management': {
    id: 'denial-management',
    title: 'Denial Management',
    slug: 'denial-management',
    navLabel: 'Denial Management',
    order: 3,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Denial Management',
      headline: 'Denials worked the day they land.',
      description: 'Our agents read the denial, identify the cause, build the appeal, and file it even when the deadline is still weeks away.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-denialmanagement/hero-section/img_banner%20(13).png',
      heroBanner: '/images/solutions/solutions-denialmanagement/hero-section/banner%20(8).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'How many denials did you write off last month',
      headlineHighlight: 'without appealing them?',
      description: 'Most denials are appealable but never appealed because working one requires a person, and people run out before the pile does. The write-off threshold in most practices was never chosen; it is whatever the team could handle.',
      descriptionSecondary: 'Initial denial rates have risen from around 10% to nearly 12% in recent years, and 41% of providers now report denial rates above 10%.',
      image: '/images/solutions/solutions-denialmanagement/the-problem/img_the_problem%20(6).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI classifies every denial instantly, determines root causes, drafts evidence-based appeals, and files them within deadlines.',
      image: '/images/solutions/solutions-denialmanagement/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Denial ingestion and classification',
          description: 'Every denial is read on arrival and sorted by cause, not just by code.',
        },
        {
          title: 'Root cause identification',
          description: 'Our agents trace the denial back to its origin, whether eligibility check, authorization, code, or documentation.',
        },
        {
          title: 'Appeal assembly',
          description: 'The record, payer\'s criteria, and supporting documentation are pulled into a filed appeal.',
        },
        {
          title: 'Deadline management',
          description: 'Every appeal window is tracked so nothing expires waiting to be addressed.',
        },
        {
          title: 'Full-pile coverage',
          description: 'Low-value denials are worked too because our agents are not the constraint.',
        },
        {
          title: 'Prevention feedback',
          description: 'What our agents learn goes back upstream so a denial that happened once is less likely to recur.',
        },
        {
          title: 'Write-back to your EHR',
          description: 'Appeal status and outcome are recorded on the claim, where AR and billing will look for them.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: '95% or higher', label: 'net collection rate' },
        { value: 'Within 48 hours', label: 'all denials addressed' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'Clinical appeals, peer-to-peer reviews and the denials worth escalating through a payer relationship are routed to your team. The denial history, the payer\'s criteria and the assembled evidence arrive in one place.',
      ],
      humanImage: '/images/solutions/solutions-denialmanagement/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-denialmanagement/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just a denial tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Denial management runs on HIMER AI OS, which also manages eligibility, prior authorization, AR follow-up, payment posting, and coding. Denial learnings immediately inform front-end workflows.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-denialmanagement/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-denialmanagement/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-denialmanagement/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with denial management only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-denialmanagement/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-denialmanagement/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your denial pile.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Denial Management | Waterlabs AI',
      metaDescription: 'Denials worked the day they land. Our agents read the denial, identify the cause, build the appeal, and file it.',
    },
  },

  'ar-follow-up': {
    id: 'ar-follow-up',
    title: 'AR Follow-up',
    slug: 'ar-follow-up',
    navLabel: 'AR Follow-up',
    order: 4,
    hero: {
      eyebrow: 'Agentic RCM Solutions · AR Follow-up',
      headline: 'Every claim followed up, including the old ones.',
      description: 'Our agents work through the entire ledger, checking statuses, chasing payers, and escalating anything that has stalled.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-AR-follow-up/hero-section/img_banner%20(14).png',
      heroBanner: '/images/solutions/solutions-AR-follow-up/hero-section/banner%20(9).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'When did anyone last work',
      headlineHighlight: 'your 120-day bucket?',
      description: 'The 30-day bucket gets worked. The 90-day bucket gets attention when someone has time. The 120-plus bucket becomes a number in a report nobody reads.',
      descriptionSecondary: 'It is an arithmetic problem: more claims than hours.',
      image: '/images/solutions/solutions-AR-follow-up/the-problem/img_the_problem%20(7).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI touches every claim regardless of age or dollar amount, checking payer portals around the clock and escalating issues proactively.',
      image: '/images/solutions/solutions-AR-follow-up/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Status checking',
          description: 'Our agents check claim status directly with the payer on cycle, not waiting for a remittance to explain itself.',
        },
        {
          title: 'Payer follow-up',
          description: 'The system works the portal, follows up on the claim, and documents what the payer said.',
        },
        {
          title: 'Aging bucket coverage',
          description: '30, 60, 90, and 120-plus are worked identically. Age does not determine priority.',
        },
        {
          title: 'Stall detection',
          description: 'Claims that have gone quiet are flagged before aging into the next bucket.',
        },
        {
          title: 'Escalation',
          description: 'Our agents push what needs pushing and route anything requiring a human to your team.',
        },
        {
          title: 'Documentation',
          description: 'Every touch is logged, so the next action always starts from the last one.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: '15-35-day', label: 'reduction in DSO' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'Payer disputes, escalations needing a human voice, and high-value claims that warrant a direct conversation are routed to your team. The full follow-up history arrives with the claim.',
      ],
      humanImage: '/images/solutions/solutions-AR-follow-up/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-AR-follow-up/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just an AR tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'AR follow-up runs on HIMER AI OS, which also manages eligibility, prior authorization, denials, payment posting, and coding. Aging trends feed back into upstream scrubbing and denial appeals.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-AR-follow-up/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-AR-follow-up/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-AR-follow-up/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with AR follow-up only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-AR-follow-up/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-AR-follow-up/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your aging report.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — AR Follow-up | Waterlabs AI',
      metaDescription: 'Every claim followed up, including the old ones. Our agents work through the entire ledger, checking statuses and chasing payers.',
    },
  },

  'charge-capture-and-coding': {
    id: 'charge-capture-and-coding',
    title: 'Charge Capture and Coding',
    slug: 'charge-capture-and-coding',
    navLabel: 'Charge Capture and Coding',
    order: 5,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Charge Capture and Coding',
      headline: 'Every charge captured. Every code supported.',
      description: 'Our agents read the documentation, assign the codes, and check them against payer rules before the claim is generated.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-charge-capture-&-coding/hero-section/img_banner%20(11).png',
      heroBanner: '/images/solutions/solutions-charge-capture-&-coding/hero-section/banner%20(6).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'Which of last month\'s claims were coded wrong,',
      headlineHighlight: 'and in which direction?',
      description: 'Most practices cannot answer without an audit, which only samples. Undercoding leaves money on every claim. Overcoding invites the review that finds it.',
      image: '/images/solutions/solutions-charge-capture-&-coding/the-problem/img_the_problem%20(4).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI analyzes clinical notes directly, cross-references documentation against the latest LCDs/NCDs, and passes high-confidence codes straight to billing.',
      image: '/images/solutions/solutions-charge-capture-&-coding/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Charge capture',
          description: 'Our agents identify services that were performed but not charged, before a claim is built.',
        },
        {
          title: 'Code assignment',
          description: 'The system reads the clinical record and assigns the diagnosis and procedure codes the documentation supports.',
        },
        {
          title: 'Compliance check',
          description: 'Coding is checked against rules before submission, not after payer objections.',
        },
        {
          title: 'Payer rule validation',
          description: 'Codes are checked against the payer\'s policy so a technically correct code that the payer will reject is caught first.',
        },
        {
          title: 'Confidence escalation',
          description: 'Anything our agents cannot clear confidently goes to a certified coder with reasoning attached.',
        },
        {
          title: 'Audit trail',
          description: 'Every code carries the evidence that produced it, recorded as the code is assigned.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'Complex cases, ambiguous documentation, and anything our agents cannot clear confidently are routed to your team. The record, candidate codes, and reasoning arrive assembled so the coder confirms rather than starts from scratch.',
      ],
      humanImage: '/images/solutions/solutions-charge-capture-&-coding/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-charge-capture-&-coding/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just a coding tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Coding runs on HIMER AI OS, which connects directly with clinical documentation, claim submission, and prior authorization to ensure documentation accuracy from start to finish.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-charge-capture-&-coding/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-charge-capture-&-coding/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-charge-capture-&-coding/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with charge capture only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-charge-capture-&-coding/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-charge-capture-&-coding/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your coding queue.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Charge Capture and Coding | Waterlabs AI',
      metaDescription: 'Every charge captured. Every code supported. Our agents read documentation, assign codes, and check against payer rules.',
    },
  },

  'payment-posting': {
    id: 'payment-posting',
    title: 'Payment Posting',
    slug: 'payment-posting',
    navLabel: 'Payment Posting',
    order: 6,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Payment Posting',
      headline: 'Every payment posted the day it lands.',
      description: 'Our agents reconcile remittances, post payments, and route what does not balance at any volume your practice handles.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-payment-posting/hero-section/img_banner%20(15).png',
      heroBanner: '/images/solutions/solutions-payment-posting/hero-section/banner%20(10).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'When did your posted cash last match your bank deposit',
      headlineHighlight: 'on the same day?',
      description: 'Posting backlogs conceal other problems. An unposted remittance delays secondary billing, prevents timely patient statements, and masks denials until weeks after receipt.',
      image: '/images/solutions/solutions-payment-posting/the-problem/img_the_problem%20(8).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI ingests ERAs and paper remittances automatically, reconciles line items to bank deposits, and routes unposted balances immediately.',
      image: '/images/solutions/solutions-payment-posting/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Remittance ingestion',
          description: 'ERAs and paper remittances are read on arrival, with line-by-line breakdown extracted automatically.',
        },
        {
          title: 'EFT matching',
          description: 'Remittance figures are reconciled against incoming bank deposits so every dollar accounted for balances.',
        },
        {
          title: 'Denial and exception routing',
          description: 'Zero-pay lines and contractual adjustments are separated and directed to denial workflows automatically.',
        },
        {
          title: 'Secondary claim generation',
          description: 'Once primary adjudication posts, secondary claims are triggered without human intervention.',
        },
        {
          title: 'Patient balance assignment',
          description: 'True patient balances are calculated and moved to statement queues with zero lag.',
        },
        {
          title: 'Write-back to your EHR',
          description: 'All payments, adjustments, and reason codes are posted directly into your billing system.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: 'Posted in 24 hours', label: 'all ERAs reconciled' },
        { value: '99.5%+', label: 'deposit-to-posting accuracy' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'When a remittance cannot be reconciled, or when unexpected recoupments and cross-over discrepancies occur, our agents pass the bundle to your team with all payment files and bank lines attached.',
      ],
      humanImage: '/images/solutions/solutions-payment-posting/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-payment-posting/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just a posting tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Payment posting on HIMER AI OS ensures that posting data triggers secondary billing, balances patient AR, and feeds accurate real-time cash analytics.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-payment-posting/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-payment-posting/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-payment-posting/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with payment posting only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-payment-posting/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-payment-posting/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your posting backlog.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Payment Posting | Waterlabs AI',
      metaDescription: 'Every payment posted the day it lands. Our agents reconcile remittances and post payments at any volume.',
    },
  },

  'claim-submission-and-scrubbing': {
    id: 'claim-submission-and-scrubbing',
    title: 'Claim Submission and Scrubbing',
    slug: 'claim-submission-and-scrubbing',
    navLabel: 'Claim Submission and Scrubbing',
    order: 7,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Claim Submission and Scrubbing',
      headline: 'Claims that go out clean the first time.',
      description: 'Our agents review each claim against payer rules before submission, preventing delays caused by requests for information you have already provided.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-claim-submission/hero-section/img_banner%20(12).png',
      heroBanner: '/images/solutions/solutions-claim-submission/hero-section/banner%20(7).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'How many claims went out last month',
      headlineHighlight: 'and came straight back?',
      description: 'Most practices track denials but do not distinguish rejections. Rejected claims never reach adjudication, so they are excluded from denial rates and the associated rework is not tracked.',
      descriptionSecondary: 'Rework is a hidden cost, reflected in increased staffing rather than as a direct expense.',
      image: '/images/solutions/solutions-claim-submission/the-problem/img_the_problem%20(5).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI scrubs claims against live payer clearinghouse edits, verifies missing modifiers, and files cleanly on the first pass.',
      image: '/images/solutions/solutions-claim-submission/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Pre-submission scrubbing',
          description: 'Each claim is validated against the payer\'s most up-to-date rules, not outdated criteria.',
        },
        {
          title: 'Format and field validation',
          description: 'Structural errors, such as transposed digits or incorrect fields, are identified before adjudication begins.',
        },
        {
          title: 'Payer-specific rule application',
          description: 'Each payer\'s requirements are applied individually, rather than using a generic ruleset.',
        },
        {
          title: 'Attachment and documentation checks',
          description: 'We ensure all required documentation is included before submission, preventing unnecessary holds.',
        },
        {
          title: 'Submission and tracking',
          description: 'Claims are filed and acknowledgments tracked to ensure nothing is lost between your system and the payer.',
        },
        {
          title: 'Rejection handling',
          description: 'Rejected claims are corrected, resubmitted, and the resolution is applied to future submissions.',
        },
        {
          title: 'Write-back to your EHR',
          description: 'Submission status, acknowledgments, and rejection history are recorded on each claim for easy access by billing and accounts receivable teams.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: '95% or higher', label: 'clean claim rate' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'If a rejection indicates an upstream issue, our agents forward it to your team for resolution. This may include coding questions, documentation gaps, or payer relationship concerns. The complete claim history is provided.',
      ],
      humanImage: '/images/solutions/solutions-claim-submission/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-claim-submission/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just a scrubbing tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Claim submission on HIMER AI OS communicates directly with charge capture and prior auth, ensuring clean claims reach clearinghouses without manual rekeying.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-claim-submission/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-claim-submission/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-claim-submission/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with claim submission only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-claim-submission/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-claim-submission/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your claim queue.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Claim Submission and Scrubbing | Waterlabs AI',
      metaDescription: 'Claims that go out clean the first time. Our agents review each claim against payer rules before submission.',
    },
  },

  'patient-estimates': {
    id: 'patient-estimates',
    title: 'Patient Estimates',
    slug: 'patient-estimates',
    navLabel: 'Patient Estimates',
    order: 8,
    hero: {
      eyebrow: 'Agentic RCM Solutions · Patient Estimates',
      headline: 'Every patient knows what they owe before they arrive.',
      description: 'Our agents generate a benefits-adjusted estimate as soon as a visit is booked and deliver it before the date of service.',
      ctaText: 'Get a Demo',
      ctaLink: '/contact-us',
      heroImage: '/images/solutions/solutions-patient-estimates/hero-section/img_banner%20(16).png',
      heroBanner: '/images/solutions/solutions-patient-estimates/hero-section/banner%20(11).png',
    },
    problem: {
      tag: 'The problem',
      headline: 'How often does a patient dispute a bill they didn\'t expect',
      headlineHighlight: 'at the front desk?',
      description: 'Patients who receive surprise bills after care are less likely to pay in full and more likely to leave negative reviews. Calculating estimates manually takes 15-20 minutes per patient.',
      image: '/images/solutions/solutions-patient-estimates/the-problem/img_the_problem%20(9).png',
    },
    closes: {
      sectionTitle: 'How Waterlabs',
      sectionTitleHighlight: 'closes the gap',
      subtitle: 'Our AI reads contracted payer rates, applies deductible accumulations, and automatically delivers clear, itemized estimates to patients.',
      image: '/images/solutions/solutions-patient-estimates/how-waterlabs-closes/img_waterlab_closes_the_gap.png',
      steps: [
        {
          title: 'Coverage and benefit extraction',
          description: 'Copays, remaining deductibles, and coinsurance tiers are pulled immediately from payer eligibility returns.',
        },
        {
          title: 'Fee schedule application',
          description: 'Contracted rates for the scheduled procedure codes are applied automatically based on active provider agreements.',
        },
        {
          title: 'Deductible and coinsurance calculation',
          description: 'Patient responsibility is computed down to the penny based on year-to-date accumulators.',
        },
        {
          title: 'Clear estimate generation',
          description: 'A compliant, easy-to-read good faith estimate is generated without front-desk manual math.',
        },
        {
          title: 'Delivery to patient',
          description: 'Estimates are sent via SMS or email prior to the visit, with clear payment options included.',
        },
        {
          title: 'Front-desk write-back',
          description: 'The expected collection amount is displayed directly on the front-desk schedule for check-in staff.',
        },
      ],
    },
    statsAndHuman: {
      statsTitle: 'Our Stats',
      stats: [
        { value: 'Up to 90%', label: 'estimates generated autonomously' },
        { value: '3x higher', label: 'point-of-service collections' },
      ],
      humanHeading: 'Human in the loop, by design',
      humanHeadingHighlight: 'Human in the loop,',
      humanParagraphs: [
        'When a complex benefit plan or multi-procedure visit creates ambiguity, our agents alert financial counselors with the full fee schedule and benefit rules pre-calculated.',
      ],
      humanImage: '/images/solutions/solutions-patient-estimates/human-in-the-loop/Frame%202147203302%20(3).png',
      humanImageMobile: '/images/solutions/solutions-patient-estimates/human-in-the-loop/img_human_in_the_loop%20(1).png',
    },
    platformAndFeatures: {
      platformEyebrow: 'This isn\'t just an estimate tool',
      platformHeading: 'It is one application within an operating system that manages the full revenue cycle.',
      platformDescription: 'Patient estimates on HIMER AI OS connect directly with eligibility verification and post-visit billing, reducing downstream bad debt and disputed statements.',
      platformCtaText: 'Explore HIMER AI OS',
      platformCtaLink: '/products/himer',
      platformImage: '/images/solutions/solutions-patient-estimates/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(1).png',
      platformImageMobile: '/images/solutions/solutions-patient-estimates/this-isn\'t-just-an-eligibility-tool/img_this_isn\'t_just_an_eligibility_tool%20(2).png',
      threeThingsHeading: 'The three things that usually stop people. None of them apply here.',
      threeThingsHeadingHighlight: 'The three things that usually',
      threeThingsCards: [
        {
          icon: '/images/solutions/solutions-patient-estimates/the-three-things/icon_start_small%20(1).png',
          title: 'Start small',
          description: 'You may begin with patient estimates only and add additional stages when ready.',
        },
        {
          icon: '/images/solutions/solutions-patient-estimates/the-three-things/icon_go_live_fast%20(1).png',
          title: 'Go live fast',
          description: 'Your agents will be live within 14 days.',
        },
        {
          icon: '/images/solutions/solutions-patient-estimates/the-three-things/icon_data_remains_source%20(1).png',
          title: 'Data remains secure',
          description: 'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
        },
      ],
    },
    cta: {
      headline: 'Discover how this works on your patient estimate workflow.',
      buttonText: 'Get a Demo',
      buttonLink: '/contact-us',
    },
    seo: {
      metaTitle: 'Solutions — Patient Estimates | Waterlabs AI',
      metaDescription: 'Every patient knows what they owe before they arrive. Our agents generate benefits-adjusted estimates.',
    },
  },
};

export const DEFAULT_SOLUTIONS_NAV: SolutionNavItem[] = [
  { label: 'Prior Authorization', href: '/solutions/prior-authorization', order: 1 },
  { label: 'Eligibility & Benefits Verification', href: '/solutions', order: 2 },
  { label: 'Denial Management', href: '/solutions/denial-management', order: 3 },
  { label: 'AR Follow-up', href: '/solutions/ar-follow-up', order: 4 },
  { label: 'Charge Capture and Coding', href: '/solutions/charge-capture-and-coding', order: 5 },
  { label: 'Payment Posting', href: '/solutions/payment-posting', order: 6 },
  { label: 'Claim Submission and Scrubbing', href: '/solutions/claim-submission-and-scrubbing', order: 7 },
  { label: 'Patient Estimates', href: '/solutions/patient-estimates', order: 8 },
];

export function getAllSolutions(): SolutionPageData[] {
  return Object.values(SOLUTIONS_DATA).sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getSolutionBySlug(slug: string): SolutionPageData | undefined {
  if (SOLUTIONS_DATA[slug]) {
    return SOLUTIONS_DATA[slug];
  }
  // Check aliases
  return Object.values(SOLUTIONS_DATA).find((item) =>
    item.slug === slug || item.aliases?.includes(slug)
  );
}
