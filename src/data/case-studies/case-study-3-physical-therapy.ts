import { CaseStudy } from '@/types/case-study';

export const caseStudy3: CaseStudy = {
  id: 'case-study-3',
  slug: 'multi-site-physical-therapy-network',
  aliases: ['multi-site-behavioral-health'],
  categoryTag: 'Case Study · Physical Therapy Network',
  title: 'How a multi-site physical therapy network used Waterlabs to run intake with 4 people instead of 60.',
  titleHighlight: 'run intake with 4 people instead of 60.',
  subtitle: 'Clinics across multiple locations, taking referrals by fax, email and patient portal.',
  heroImage: '/images/case-study/case-study-3-multi-site/Frame%202147226953%20(2).png',
  heroImageAlt: 'Physical therapy clinical team and automated intake workflow with Waterlabs',
  tags: ['Multi-site Network', 'Patient Intake', 'Document Classification', 'HIMER AI OS'],
  clientSummary:
    'A multi-site physical therapy and outpatient rehabilitation practice received referrals by fax, email, and portal uploads in varying formats. Each referral required classification and manual data entry before processing.',
  statBadges: [
    { text: 'Multiple clinic locations' },
    { text: 'High and constant referral volume' },
    { text: 'Physical therapy and outpatient rehabilitation' },
  ],
  challenge:
    'Referrals arrived in multiple formats, including fax, portal uploads, and email attachments, with no standardization. Staff had to manually review each document, identify its type, and enter the details into the practice management system.\n\nThis approach was manageable with low volume, but as the network expanded, it became unsustainable. Increased intake required additional staff, and manual entry led to errors such as incorrect policy numbers or dates of birth, causing issues in scheduling and billing. Missing information was often discovered only during patient booking.\n\nAs operations scaled, intake required 60 staff members, each performing repetitive tasks: reading, naming, entering, and checking documents, then identifying missing information before moving to the next. Rising intake capacity directly increased payroll, limiting operational growth.',
  whatWaterlabsDid:
    'Waterlabs deployed agentic AI that processes referrals from arrival to completion without manual intervention.\n\nCapture. Regardless of source, our agents automatically retrieve referrals as they arrive, whether by fax, email, or portal upload. Previously, staff manually monitored and collected documents from three separate inboxes.\n\nClassification. Using OCR and computer vision, our agents identify document types directly from scanned content. Previously, staff manually classified each document before processing.\n\nExtraction. Our agents extract demographic, payer, and clinical details directly from each document. Previously, staff manually entered every field into the practice management system.\n\nValidation. A rules-based layer ensures data is complete and accurate before further processing. Previously, errors were often detected only later in the workflow.\n\nEntry. The completed record is entered directly into the practice management and EHR systems. Previously, manual entry led to demographic and insurance errors that affected scheduling and billing.\n\nExceptions. Any referral that cannot be processed automatically is reviewed by a team of four. Previously, all 60 staff members handled every case, regardless of complexity.',
  resultsBlock: {
    headline: '60 people → 4',
    subheadline:
      'Intake operations now require only four team members, allowing 56 staff to transition to higher-value work. This represents a 93% reduction in intake headcount.',
    details:
      'Intake labor costs down approximately 90%. Remaining expenses are focused on review rather than data entry.\n\nDays → same day. A referral used to spend days in the manual queue. It now clears on the day it arrives, in real time, so the backlog never gets a chance to form.\n\nAround the clock. Our agents classify documents independent of staffing shifts, with far fewer keying and misclassification errors reaching the PM and EHR.',
  },
  outcomes:
    'Operationally, intake capacity now rises with referral volume on its own, and it holds through nights and weekends without anyone rostered on. Every referral source is read to one standard, so classification no longer depends on who happened to be at their desk.\n\nFinancially, the cost of processing each intake dropped while throughput held, and cleaner data at the front end meant fewer expensive corrections at the back.\n\nStrategically, the network stopped tying growth to headcount and now has a compelling case for bringing agentic AI across the rest of its front office. What worked for intake now serves as a foundation for enterprise-scale adoption elsewhere in the operation.',
  bottomLine:
    'A room full of people sorting and typing referrals became a small team handling only what genuinely needs a person. Referrals clear the day they land, and the mistakes that used to travel into scheduling and billing mostly stop at the front door.',
  client: {
    name: 'Integrated Physical Therapy Alliance',
    specialties: 'Physical Therapy & Outpatient Rehabilitation',
    systemType: 'Multi-Site Outpatient Healthcare Network',
  },
  metrics: [
    { value: '60 → 4', label: 'Intake headcount reduction achieved', change: '-93%' },
    { value: '90%', label: 'Reduction in intake operational labor expense', change: '-90%' },
    { value: 'Same day', label: 'Referral clearance turnaround achieved', change: 'Real time' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: '15-minute call to see what Waterlabs would do on your numbers.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
