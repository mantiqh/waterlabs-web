import { CaseStudy } from '@/types/case-study';

export const caseStudy1: CaseStudy = {
  id: 'case-study-1',
  slug: 'multi-state-rural-health-system',
  categoryTag: 'Case Study · Rural Health System',
  title: 'How a multi-state rural health system used Waterlabs to cut claim release from 10 days to under 24 hours.',
  titleHighlight: 'release from 10 days to under 24 hours.',
  subtitle: 'Hospitals and physician groups across the United States, running 13 specialties on a single revenue cycle.',
  heroImage: '/images/case-study/case-study-1-multi-state/Frame%202147226953.png',
  heroImageAlt: 'Rural health system command center monitoring claims with Waterlabs',
  tags: ['Rural Health System', 'Multi-specialty', 'Claim Release', 'HIMER AI OS'],
  clientSummary:
    'A large rural health system operates hospitals and physician groups across several states. Coding was not the issue; paperwork delayed claim submission for up to a week.',
  statBadges: [
    { text: '$2B+ net revenue' },
    { text: '13 specialties' },
    { text: '8,000 to 12,000 held claims a month' },
  ],
  challenge:
    'Following a major RCM transition, thousands of coded claims were held due to missing documentation. Common issues included unsigned notes, missing provider signatures, unsigned operative reports, unclosed encounters, missing provider identification, incomplete attestations, and absent supporting documents.\n\nThese issues appeared across all specialties, with providers resolving them at different times and making readiness hard to predict. Downstream staff could not identify when a claim was ready without manually checking each one.\n\nAs a result, claims were repeatedly reviewed, often 5 to 10 times before release. Each month, 8,000 to 12,000 claims cycled through this process, requiring entire teams to monitor deficiency queues. Revenue already earned was delayed while completed paperwork awaited processing.',
  whatWaterlabsDid:
    'Waterlabs implemented agentic AI to continuously monitor documentation. Our agents track held claims and provider updates in real time, ensuring claims are processed promptly once ready.\n\nDaily claim surveillance: Our agents review all held claims each day, recording deficiency type, specialty, provider, duration, and documentation status. Previously, staff manually opened each claim to determine its status.\n\nDocumentation verification: Our agents operate within the EHR and coding workflow, identifying updates as soon as they occur, such as added signatures, finalized notes, completed attestations, filled provider names, signed operative reports, or closed encounters. Readiness was previously visible only through manual review.\n\nAutonomous decisioning: Once a claim is complete, our agents remove the hold, update its status, and release it for billing without human intervention. Resolved claims previously waited for the next manual review cycle.\n\nException management: Only claims requiring human judgment, such as those with conflicting documentation, medical necessity questions, audit flags, or high-risk coding, are escalated to staff. Specialists now focus on these cases instead of reviewing every claim.',
  resultsBlock: {
    headline: '5 to 10 days → under 24 hours',
    subheadline:
      'Cut time to release a resolved claim by 80% to 90%, reducing unnecessary waiting time.',
    details:
      'Staff monitoring deficiency queues dropped from 10–12 to 2. Our agents now perform over 90% of status checks autonomously.\n\n$500,000 in annual labor savings. Ten positions were reassigned to work requiring human expertise.\n\n$72 million in annual claim value is processed 3 to 5 days sooner, based on approximately $6 million flowing through this workflow each month, directly impacting Days in A/R.\n\nBilling delays decreased by 15% to 25%, so patients received determinations, EOBs, and final statements more quickly, resulting in fewer inquiries.\n\nOver 2,500 hours were returned to providers and clinical staff annually, creating capacity for an additional 1,500 to 2,000 visits without new hires.',
  },
  outcomes:
    'Operationally, workflow is no longer dependent on staff availability. Our agents operate continuously, ensuring consistent performance across all 13 specialties.\n\nFinancially, coded work is converted to billed claims more quickly, accelerating cash flow and reducing Days in A/R. Growth can now occur without additional hiring.\n\nStrategically, providers remain accountable for their records, reducing revenue loss between coding and billing. The health system now has a proven model for implementing agentic AI in other areas, with measurable returns in months rather than years.',
  bottomLine:
    'A backlog that previously required entire teams is now managed autonomously. Staff who once chased signatures now focus on accounts requiring real decisions, so earned revenue reaches the bank promptly instead of aging in queues.',
  client: {
    name: 'Multi-State Rural Health Alliance',
    specialties: '13 Clinical Specialties',
    systemType: 'Acute & Ambulatory Health Network',
  },
  metrics: [
    { value: '24 hrs', label: 'Claim release turnaround down from 10 days', change: '-90%' },
    { value: '98.6%', label: 'First-pass clean claim rate across all facilities', change: '+14%' },
    { value: '$3.4M', label: 'Cash flow acceleration unlocked in first 90 days', change: 'Accelerated' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: 'Schedule a 15-minute call to see how Waterlabs can impact your organization’s results.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
