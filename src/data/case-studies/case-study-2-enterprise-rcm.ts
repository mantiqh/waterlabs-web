import { CaseStudy } from '@/types/case-study';

export const caseStudy2: CaseStudy = {
  id: 'case-study-2',
  slug: 'enterprise-rcm-organization',
  aliases: ['enterprise-rcm-automation'],
  categoryTag: 'Case Study · Enterprise RCM',
  title: 'How a $5B enterprise RCM organization used Waterlabs to code every chart the same day.',
  titleHighlight: 'code every chart the same day.',
  subtitle: 'Health systems, physician groups, and community hospitals, coded across 7 disciplines.',
  heroImage: '/images/case-study/case-study-2-enterprise/Frame%202147226953%20(1).png',
  heroImageAlt: 'Enterprise RCM analytics and autonomous coding dashboard powered by Waterlabs',
  tags: ['Enterprise RCM', 'Multi-specialty Coding', 'Autonomous Coding', 'CurieCode', 'HIMER AI OS'],
  clientSummary:
    'An enterprise revenue cycle management organization codes for providers nationwide. Its portfolio spans health systems, physician groups, and community hospitals across outpatient, emergency department, professional fee, surgery, radiology, evaluation and management, and multi-specialty physician coding.',
  statBadges: [
    { text: '$5B+ in annual healthcare revenue' },
    { text: '7 coding disciplines' },
    { text: 'Millions of encounters' },
  ],
  challenge:
    'As the portfolio expanded, coding became a bottleneck. Labor costs increased, clients wanted faster turnaround times, and incoming documentation became more complex and harder to interpret.\n\nQuality was inconsistent. Coding varied between individuals; the operation relied heavily on a few senior auditors, and each period of growth made staffing challenges harder to address.\n\nAt any time, thousands of charts awaited processing. This backlog affected key metrics, including DNFB, billing turnaround, cash flow, and staffing budgets, by slowing completion and delaying downstream revenue activities.\n\nLeadership sought a solution that would accelerate coding, reduce reliance on labor, maintain compliance, and enable growth without increasing headcount.',
  whatWaterlabsDid:
    'Waterlabs deployed CurieCode, our agentic coding engine, built on a proprietary code book developed over years of specialty coding experience. CurieCode is also available on HIMER AI OS, our agentic operating system for the revenue cycle.\n\nCurieCode captures the knowledge and connections an experienced coder possesses, including clinical terminology, physician narratives, diagnoses, procedures, guidelines, specialty language, and the ICD-10-CM, CPT, and HCPCS code sets. This enables our agents to interpret the actual content of each chart rather than relying on templates.\n\nIngestion. Our agents process physician notes, operative reports, discharge summaries, ED notes, consults, and ancillary documents within seconds. Previously, coders manually opened and reviewed each document in sequence.\n\nInterpretation. Using CurieCode, our agents identify diagnoses, procedures, conditions, comorbidities, risk-adjusting factors, and specialty-specific details that are often overlooked. Previously, interpretation depended on each coder’s specialty experience.\n\nCode assignment. Our agents assign ICD-10, CPT, and HCPCS codes and modifiers supported by the documentation. Previously, assignment was manual and chart by chart, at the team’s pace.\n\nConfidence scoring. Each chart receives a confidence score. Charts with high scores are auto-coded with minimal review, moderate cases receive a quick coder check, and complex cases are escalated to a senior specialist. Previously, all charts received the same level of human review regardless of complexity.\n\nContinuous learning. Each time a coder validates or audits a chart, their feedback is incorporated into the system, improving coding accuracy over time. Previously, knowledge gained by senior coders was not shared across the team.',
  resultsBlock: {
    headline: '2 to 4 days → same day',
    subheadline:
      'Coding turnaround is now often within 24 hours, enabling faster claims submission, reducing DNFB, and supporting quicker cash flow.',
    details:
      'Coding headcount requirements down 60% to 70%. Most charts are now processed by our agents, allowing coders to focus on validation and exception handling.\n\n$4.5M in annual savings on coding labor alone.\n\n$5M to $7M in total annual economic impact, including savings from reduced recruiting, overtime, temporary staffing, attrition, and onboarding costs. The exact amount depends on volume and staffing models, which affect both labor needs and savings.\n\nMore consistent than manual coding. By leveraging clinical relationships and specialty rules instead of pattern matching, coding accuracy surpassed manual benchmarks and improved guideline adherence.',
  },
  outcomes:
    'Operationally, the business can onboard new clients without extensive hiring, and all centers now code to a unified standard rather than individual practices. Audits are more efficient because coding is consistent.\n\nFinancially, administrative and outsourced coding costs have decreased, and faster billing has improved margins for every client served.\n\nStrategically, coding is no longer a barrier to growth. The organization can now accept higher volumes that were previously unmanageable, and clients benefit from faster turnaround and consistent coding during volume spikes.',
  bottomLine:
    'Coding is no longer the limiting factor for business growth. Senior staff now focus on judgment calls and audits, charts are processed faster than they arrive, and growth is driven by the agents rather than by hiring.',
  client: {
    name: 'Enterprise Revenue Cycle Alliance',
    specialties: '7 Specialty Coding Disciplines',
    systemType: 'Nationwide Enterprise RCM Provider',
  },
  metrics: [
    { value: 'Same day', label: 'Coding turnaround reduced from 2 to 4 days', change: 'Same day' },
    { value: '60%–70%', label: 'Drop in coding headcount requirements', change: '-70%' },
    { value: '$4.5M', label: 'Annual labor savings on coding alone', change: 'Saved' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: '15-minute call to see what Waterlabs would do on your numbers.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
