import { CaseStudy } from '@/types/case-study';

export const caseStudy4: CaseStudy = {
  id: 'case-study-4',
  slug: 'behavioral-health-practice',
  aliases: ['regional-health-system-ar'],
  categoryTag: 'Case Study · Behavioral Health',
  title: 'How a behavioral health practice used Waterlabs to cut benefits verification from 4 days to 1.',
  titleHighlight: 'cut benefits verification from 4 days to 1.',
  subtitle: 'An outpatient intake operation where every new patient waited on a phone call before anyone could book them in.',
  heroImage: '/images/case-study/case-study-4-behavioral/Frame%202147226953%20(3).png',
  heroImageAlt: 'Behavioral health practice clinical and intake coordination team with Waterlabs',
  tags: ['Behavioral Health', 'Eligibility and Benefits', 'Patient Intake', 'HIMER AI OS'],
  clientSummary:
    'An outpatient behavioral health practice verifying benefits for every new patient before a first appointment could be scheduled. Behavioral health coverage includes visit limits and prior authorization requirements that vary widely across payers and plans within the same payer.',
  statBadges: [
    { text: 'Outpatient behavioral health' },
    { text: 'High new-patient referral volume' },
    { text: 'Behavioral health benefits verification' },
  ],
  challenge:
    'Every new patient needed benefits confirmed before intake could finish, which required a phone call. Staff spent hours on hold with payers to determine what a plan covered.\n\nBehavioral health was harder than most specialties. Visit limits and prior authorization requirements varied by payer and plan, so there was no rule of thumb to fall back on and no way to shortcut a familiar payer. Each verification had to be done from scratch.\n\nVerification took an average of 4 days, and first appointments could not be scheduled until it cleared. For patients newly seeking behavioral health care, 4 days was long enough to change their mind, causing the practice to lose people during the wait.\n\nQuality varied as well. How thorough a verification was depended on the staff member and their familiarity with the payer. These inconsistencies later caused billing problems.',
  whatWaterlabsDid:
    'Waterlabs deployed agentic AI that verifies eligibility and benefits as soon as a visit is booked, without any calls.\n\nTriggered on scheduling. Our agents start as soon as an appointment is booked. Previously, verification began when staff picked the case from a queue.\n\nReal-time eligibility inquiry. Our agents submit an EDI 270 request to the payer and parse the 271 response immediately. Previously, staff called the payer or manually used the portal for every new patient.\n\nPortal navigation when required. If a payer does not return the required data electronically, our agents work directly in the portal. Previously, this was the default rather than the exception.\n\nBehavioral health rules applied. Our agents apply specialty-specific visit limits and prior authorization logic to the response. Previously, staff manually cross-checked plan rules, with accuracy depending on their familiarity with the payer.\n\nBenefits summary delivered. A structured summary reaches the intake team the same day. Previously, results took days to return.\n\nExceptions to people. Manual payer calls now happen only for cases our agents cannot resolve. Previously, every patient required a call.',
  resultsBlock: {
    headline: '4 days → 1 day',
    subheadline: 'Average verification turnaround, reducing time by about 75%.',
    details:
      'Same-day benefits summary. Intake receives a structured summary on the day the visit is booked, so scheduling no longer has to wait for verification.\n\nManual payer calls only for exceptions. Staff who spent their day on hold now handle only cases that genuinely need a person.\n\nLower verification labor cost per patient. With fewer missed and delayed visits due to patient disengagement while waiting.\n\nConsistent interpretation, every time. Rules-based benefit interpretation is applied identically to every patient, replacing verification quality that varied by staff member and payer familiarity.',
  },
  outcomes:
    'Operationally, the path from scheduling to first appointment no longer depends on how quickly someone can reach a payer by phone. Verification runs the same way regardless of the payer or who is at their desk that morning.\n\nFinancially, the labor cost of verifying each patient fell, and fewer patients disengaged during the wait, so fewer booked visits went unfilled.\n\nStrategically, the practice can handle referral volume without adding verification staff, and every new patient receives the same specialty-aware reading of their plan.',
  bottomLine:
    'A patient who decides to seek behavioral health care no longer has to wait 4 days to find out whether their plan will cover it. Verification finishes the day the visit is booked, staff are off the phones, and every plan is read the same way.',
  client: {
    name: 'Integrated Behavioral Health Alliance',
    specialties: 'Outpatient Psychiatry & Psychotherapy',
    systemType: 'Regional Behavioral Health Network',
  },
  metrics: [
    { value: '4d → 1d', label: 'Average verification turnaround reduction', change: '-75%' },
    { value: 'Same day', label: 'Structured benefits delivered to intake', change: 'Real time' },
    { value: 'Zero calls', label: 'Routine phone calls eliminated', change: 'Automated' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: '15-minute call to see what Waterlabs would do on your numbers.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
