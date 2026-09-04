import { CaseStudy } from '@/types/case-study';

export const caseStudy5: CaseStudy = {
  id: 'case-study-5',
  slug: 'hospital-emergency-department',
  aliases: ['specialty-surgical-hospital'],
  categoryTag: 'Case Study · Emergency Department',
  title: 'How a hospital emergency department used Waterlabs to code 90% of encounters without a coder.',
  titleHighlight: 'code 90% of encounters without a coder.',
  subtitle: 'A high-volume ED in which every discharge produced physician, nursing, and ancillary documentation that had to be reconciled before a claim could move.',
  heroImage: '/images/case-study/case-study-5-hospital/Frame%202147226957.png',
  heroImageAlt: 'Hospital emergency department command center and autonomous coding workflow with Waterlabs',
  tags: ['Hospital Emergency Department', 'Emergency Medicine', 'Autonomous Coding', 'CurieCode', 'HIMER AI OS'],
  clientSummary:
    'A high-volume hospital emergency department requiring full encounter coding at discharge. Every visit generates physician notes, nursing documentation, and ancillary records that must be read and reconciled before assigning diagnosis and procedure codes.',
  statBadges: [
    { text: 'High-volume emergency department' },
    { text: 'Full encounter coding at discharge' },
    { text: 'Emergency medicine' },
  ],
  challenge:
    'Every ED encounter had to be coded by a person, and each encounter included documentation from three sources that had to be reconciled first.\n\nThe work demands precision. Diagnosis assignment, CPT, and evaluation and management level selection require clinical interpretation, and the difference between levels is a matter of judgment. Medical necessity and coverage rules differ across payer contracts, so a defensible code under one contract is not automatically defensible under another.\n\nThis created a bottleneck between discharge and billing. Coding moved at the pace coders could review, and claims waited. When volume rose, the backlog grew because the only way to code faster was to hire more staff.\n\nConsistency was another problem. Coding varied by individual interpretation, leading to denials and audit exposure that no one could predict in advance.',
  whatWaterlabsDid:
    'Waterlabs deployed CurieCode, our agentic coding engine, to read ED documentation and assign codes directly, with payer guidelines built into the work.\n\nIngestion at discharge. Our agents take in the full encounter record as documentation is finalized. Previously, a coder opened and reviewed physician, nursing, and ancillary notes in sequence.\n\nClinical extraction. Our agents identify diagnosis and procedure evidence in the documentation as written. Previously, this depended on each coder’s reading of the record.\n\nCode assignment. Our agents assign ICD-10-CM, CPT, and evaluation and management codes supported by the documentation. Previously, assignment was manual, on an encounter-by-encounter basis, at the team’s pace.\n\nPayer guideline validation. Our agents check every code against the payer’s policy for the claim. Previously, coders cross-checked payer-specific policy by hand.\n\nConfidence routing. Encounters our agents can clear are submitted. Anything flagged routes to a coder with the reasoning attached. Previously, every encounter received the same review regardless of complexity.',
  resultsBlock: {
    headline: '90% of coding volume handled autonomously',
    subheadline: 'Nine encounters in 10 now reach billing without a coder having to open the chart.',
    details:
      'The complex 10% go to specialists. Coders work only on the encounters that require judgment, achieving higher throughput per coder on the remaining work.\n\nReal-time coding replaces the backlog. Diagnosis and CPT assignment happen as documentation is finalized, so the queue that used to form between discharge and billing does not form.\n\nLower cost to code per encounter. With a faster reimbursement cycle and fewer days to bill.\n\nGuideline-validated coding, applied consistently. Payer policy is checked the same way on every encounter, reducing denial-driving errors that arose from coder-by-coder interpretation.',
  },
  outcomes:
    'Operationally, coding throughput no longer depends on coder capacity. Claim submission occurs as encounters close rather than waiting in a queue, so volume spikes do not create a backlog.\n\nFinancially, the cost of coding each case is lower, and reimbursement arrives sooner because claims leave the department days earlier than they did.\n\nStrategically, denial and audit exposure dropped, because coding is consistent and every code carries the payer policy check behind it. Coder expertise now applies to encounters in which it changes the outcome.',
  bottomLine:
    'Nine ED encounters in 10 now go from discharge to billing without a coder touching them. The queue between the two has gone. Coding is defensible the same way every time, and the coders work the 10% of cases where their judgment is worth something.',
  client: {
    name: 'Metropolitan Emergency Medical Center',
    specialties: 'Emergency Medicine & Acute Care',
    systemType: 'High-Volume Regional Hospital',
  },
  metrics: [
    { value: '90%', label: 'Encounters coded autonomously without touch', change: '+90%' },
    { value: '10%', label: 'Complex cases escalated to specialists', change: 'Focused' },
    { value: 'Real-time', label: 'Coding turnaround upon discharge', change: 'Instant' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: '15-minute call to see what Waterlabs would do on your numbers.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
