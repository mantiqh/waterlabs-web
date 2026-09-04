import { CaseStudy } from '@/types/case-study';

export const caseStudy6: CaseStudy = {
  id: 'case-study-6',
  slug: 'multi-specialty-outpatient-practice',
  aliases: ['ambulatory-infusion-center'],
  categoryTag: 'Case Study · Multi-Specialty Practice',
  title: 'How a multi-specialty practice used Waterlabs to give every patient a cost estimate before the visit, not after.',
  titleHighlight: 'cost estimate before the visit, not after.',
  subtitle: 'Scheduled visits across multiple specialties, each having its own contracted fee schedule, and no practical way to produce an estimate by hand.',
  heroImage: '/images/case-study/case-study-6-multi-specialty/Frame%202147226958.png',
  heroImageAlt: 'Multi-specialty practice patient access and automated estimation team with Waterlabs',
  tags: ['Multi-Specialty Practice', 'Patient Access', 'Cost Estimation', 'HIMER AI OS'],
  clientSummary:
    'A multi-specialty outpatient practice scheduling visits across several specialties, each billing against its own contracted fee schedule. Producing a meaningful estimate requires eligibility, accumulator status, and specialty-specific pricing, all of which must be current at the time of booking.',
  statBadges: [
    { text: 'Multi-specialty outpatient' },
    { text: 'Estimates required on every scheduled visit' },
    { text: 'Multiple contracted fee schedules' },
  ],
  challenge:
    'Patients found out what they owed after they had already received care.\n\nProducing an estimate before the visit was possible in principle and impractical in fact. It required a staff member to look up the patient’s eligibility, check their position against their deductible, coinsurance, and copay accumulators, and then match the expected charges to the contracted fee schedule for the appropriate specialty. Every step was a manual lookup, and the accumulators shifted throughout the plan year, so an estimate produced last month was no longer accurate this month.\n\nMultiply that by every scheduled visit across every specialty, and the work does not scale. Most patients received nothing before their appointment.\n\nThe consequences landed downstream. A bill that surprises a patient is disputed, and disputes slow collections and lead to write-offs. The practice was absorbing the cost of a conversation that should have happened before the visit.',
  whatWaterlabsDid:
    'Waterlabs deployed agentic AI that produces a benefits-adjusted estimate the moment a visit is booked.\n\nTriggered on booking. Our agents start when the appointment is scheduled. Previously, an estimate was produced only if a staff member had time before the visit.\n\nReal-time eligibility check. Coverage and plan details are verified at the moment of booking. Previously, staff looked up eligibility and plan details by hand.\n\nAccumulator lookup. Our agents pull current deductible, coinsurance, and copay status. Previously, this was checked manually, and only if someone got to it.\n\nSpecialty fee match. Our agents apply the contracted rate for the expected CPT set in that specialty. Previously, staff matched expected charges to the correct fee schedule themselves.\n\nEstimate delivered. A plain-language estimate is sent to the patient before the visit via portal, SMS, or email. Previously, most patients learned their responsibility after care was delivered.',
  resultsBlock: {
    headline: 'Zero manual benefit lookups per estimate',
    subheadline: 'The lookups that made estimates impractical no longer happen.',
    details:
      'Estimates before the visit, not after it. Every scheduled visit now carries a benefits-adjusted estimate delivered ahead of the date of service.\n\nEvery specialty, every fee schedule. Contracted rates applied automatically across the practice, rather than relying on someone to know which schedule applies.\n\nHigher upfront collections. With fewer billing disputes and fewer write-offs.\n\nConsistent plan-specific pricing. The same calculation on every visit, replacing manual estimation that varied with who produced it.',
  },
  outcomes:
    'Operationally, estimates are produced on every scheduled visit without adding a step to anyone’s day. Coverage of the practice is complete rather than limited to whichever visits staff had time for.\n\nFinancially, more patients pay upfront, fewer bills get disputed, and fewer disputed bills become write-offs.\n\nStrategically, the practice replaced a source of patient friction with a point of trust. A patient who knows the number in advance arrives ready to pay it, and the conversation about money happens before care rather than after.',
  bottomLine:
    'Patients now know what a visit will cost before they attend it. The manual lookups that made that impossible are gone. Estimates cover every specialty and every scheduled visit, and the practice collects more of what it is owed with fewer arguments.',
  client: {
    name: 'Advanced Multi-Specialty Physicians Group',
    specialties: 'Multi-Discipline Ambulatory Care',
    systemType: 'Outpatient Specialty Medical Practice',
  },
  metrics: [
    { value: '100%', label: 'Scheduled visits receive pre-service estimates', change: '+100%' },
    { value: '0', label: 'Manual benefit lookups required from staff', change: 'Zero' },
    { value: '+35%', label: 'Increase in upfront patient collections', change: '+35%' },
  ],
  cta: {
    tagText: 'Talk to us.',
    headline: '15-minute call to see what Waterlabs would do on your numbers.',
    buttonText: 'Get a Demo',
    buttonHref: '/contact-us',
  },
};
