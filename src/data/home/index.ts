import { HomePageData } from '@/types/home';

export const DEFAULT_HOME_DATA: HomePageData = {
  // 01 · Hero Section
  heroSubheading: 'Agentic RCM built from inside healthcare',
  heroHeading: "Don't just automate your revenue cycle. Apply intelligence to it.",
  heroDescription:
    'We provide the platform that runs your revenue cycle. You measure it, we improve it.',
  heroCtaText: 'Get a demo',
  heroCtaLink: '/contact-us',
  heroSecondaryCtaText: 'See how it works',
  heroSecondaryCtaLink: '#discover',
  heroBackgroundImageDesktop: '/images/home/hero-bg.png',
  heroBackgroundImageMobile: '/images/home/hero-bg-mobile.png',

  // 02 · Marquee / Video Section
  marqueeItems: [
    {
      _key: 'mq-1',
      text: 'No development fee',
      image: '/images/home/corousel-images/corousel-img-1.png',
    },
    {
      _key: 'mq-2',
      text: 'Live in weeks, not months',
      image: '/images/home/corousel-images/corousel-img-2.png',
    },
    {
      _key: 'mq-3',
      text: 'Billing starts day 15',
      image: '/images/home/corousel-images/corousel-img-1.png',
    },
  ],
  marqueeMobileText: 'No development fee, Live in weeks, not months',
  bannerImageDesktop: '/images/home/corousel-images/corousel-banner-img.png',
  bannerImageMobile: '/images/home/corousel-images/corousel-banner-mobile-img.png',

  // 03 · Trusted Brands
  brandHeading: 'Trusted at the scale',
  brandHeadingHighlight: 'healthcare runs at',
  brandLogos: [
    {
      _key: 'brand-1',
      name: 'BrightView',
      logo: '/images/home/brand-slider-images/brightview_logo.png',
    },
    {
      _key: 'brand-2',
      name: 'Therapy Partners Group',
      logo: '/images/home/brand-slider-images/therapy_partners_group_logo.png',
    },
    {
      _key: 'brand-3',
      name: 'SkinCure Oncology',
      logo: '/images/home/brand-slider-images/skincure_oncology.png',
    },
    {
      _key: 'brand-4',
      name: 'Metro Anesthesia',
      logo: '/images/home/brand-slider-images/metro_anesthesia_logo.png',
    },
    {
      _key: 'brand-5',
      name: 'NCH',
      logo: '/images/home/brand-slider-images/nch_north_country_healthcare_logo.png',
    },
    {
      _key: 'brand-6',
      name: 'Healthcare Express',
      logo: '/images/home/brand-slider-images/healthcare_express_logo.png',
    },
    {
      _key: 'brand-7',
      name: 'Angels of Care',
      logo: '/images/home/brand-slider-images/angels_of_care_logo.png',
    },
  ],

  // 04 · Products Section
  productsHeadingPart1: 'Two products. One system.',
  productsHeadingHighlight: 'Every stage of the cycle.',
  product1: {
    name: 'HIMER AI OS',
    description: 'Orchestrate and build through commands. Just describe your task.',
    image: '/images/home/products-images/img_himer_ai_os.png',
    ctaText: 'Explore HIMER',
    ctaLink: '/solutions/prior-authorization',
  },
  product2: {
    name: 'CurieCode',
    description: 'Optimize reimbursements through automated, intelligent coding.',
    image: '/images/home/products-images/img_curiecode.png',
    ctaText: 'Explore CurieCode',
    ctaLink: '/solutions/charge-capture-and-coding',
  },

  // 05 · Eligibility to Coding
  eligibilityTag: 'Front to Back. No Handoffs.',
  eligibilityHeading: 'We offer end-to-end coverage:\nfrom Eligibility to Coding.',
  eligibilitySubtag: 'Waterlabs covers every stage:',
  eligibilitySubheading: 'Eligibility to Coding.',
  eligibilityDiagramImage: '/images/home/eligibility-images/img_eliigibility_to_coding.png',
  eligibilityDescription:
    'Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-the-loop model. Agentic intelligence learns and evolves based on your scenarios.',
  eligibilityBgDesktop:
    '/images/home/eligibility-images/we_offer_end_to_end_coverage_desktop.png',
  eligibilityBgMobile:
    '/images/home/eligibility-images/we_offer_end_to_end_coverage_mobile.png',

  // 06 · Features & Stats
  featuresTag: 'Every Stage, Owned.',
  featuresHeading: 'Run end-to-end.',
  featuresHeadingHighlight: 'start with one function.',
  featuresDescription:
    'The agents stay accountable either way. Prior Authorization:\nSubmitted, tracked, followed up. 24/7, no human in the queue.',
  card1Title: 'Explore Eligibility & Benefits',
  card1Description: 'Verified in real time. Coverage gaps caught before they cost you.',
  card1Image: '/images/home/features-images/img_explore_eligibility_and_benefits.png',
  card2Title: 'Improve Denial Prevention',
  card2Description: 'Catch and fix claims before they leave, not after they come back.',
  card2Image: '/images/home/features-images/img_denial_prevention.png',
  securityTag: 'Healthcare-grade by default.',
  securityHeadingHighlight: 'Your patient data',
  securityHeading: 'never leaves your environment.',
  securityDescription:
    "Our agents work inside your systems. The data stays where it is. Nothing is copied, moved, or stored on our side. After Change Healthcare showed what concentration risk really costs, this isn't a feature. It's the baseline for working in healthcare.",
  securityImage:
    '/images/home/features-images/img_your_patient_data_never_leaves_your_environment.png',
  statsTag: 'Measured against HFMA. Drawn from production.',
  statsHeading: 'Our stats',
  stats: [
    {
      _key: 'stat-1',
      icon: '/images/home/features-images/icon_30_to_70_percent_reduction.png',
      stat: '30 to 70%',
      label: 'Reduction in cost to collect',
    },
    {
      _key: 'stat-2',
      icon: '/images/home/features-images/Icon.png',
      stat: '95%+',
      label: 'Clean claim rate',
    },
    {
      _key: 'stat-3',
      icon: '/images/home/features-images/r_days.png',
      stat: '15–35',
      unit: 'days',
      label: 'Reduction in A/R days',
    },
    {
      _key: 'stat-4',
      icon: '/images/home/features-images/icon_80_percent_touchless.png',
      stat: '~80%',
      label: 'Touchless resolution rate',
    },
  ],
  caseStudyTitle: '60 outsourced staff → 3 in-house managers.',
  caseStudySubtitle: 'Multi-state anesthesia group.',
  caseStudyImage:
    '/images/home/features-images/img_60_outsourced_staff_3_in_house_managers.png',
  caseStudyCtaText: 'Read the case',
  caseStudyCtaLink: '/case-studies',

  // 07 · Testimonials
  testimonials: [
    {
      _key: 't-1',
      name: 'Terri Edwards',
      role: 'Vice President of Intake',
      quote:
        '“Our partnership has become a valuable extension of our front-office operations. The team provides critical support with eligibility verification, fax management, authorization processing and retrieval, plan of care tracking, and other essential administrative functions. Through a strong collaborative partnership, ongoing training, and continuous process improvement, we have achieved increased efficiency, reduced denials, lowered operational costs, and been able to leverage automation more effectively. Their commitment to our quality required, turnaround times and adaptability has made them a trusted partner in supporting our growth and success.”',
      image: '/images/home/features-images/AdobeStock_588310218%204.png',
    },
    {
      _key: 't-2',
      name: 'Lorem Ipsum',
      role: 'Lorem Ipsum',
      quote:
        '“Waterlabs has been a great partner for our billing, coding, and follow-up needs. Their team is responsive, helpful, and always willing to work with us when issues arise. Since partnering with Waterlabs, we have seen an increase in collections and improvement in our A/R. We truly work together as a team with the same goal of maximizing reimbursement and maintaining a clean, healthy A/R.”',
      image: '/images/home/features-images/img_testimonial_02.png',
    },
  ],

  // 08 · Calculate Section
  calculateHeading: 'Calculate what you will save.\nUse your real numbers.',
  calculateImage: '/images/home/calculate-img/img_calcluate_what_you_will_save.png',

  // 09 · Billing Model
  billingTag: 'Proven before you pay.',
  billingHeadingHighlight: 'Our billing model allows you flexibility.',
  billingHeading: 'We charge you when our AI is live in your environment.',
  billingDescription:
    'No development fee. No software license. We charge after it works.',
  billingSteps: [
    {
      _key: 'step-1',
      num: '01',
      title: 'Study the Work',
      day: 'Day 1–7',
      dayVariant: 'active',
      desc: 'You show us your process. We learn and integrate.',
    },
    {
      _key: 'step-2',
      num: '02',
      title: 'Develop and Deploy the Agents',
      day: 'Day 8 - 21',
      dayVariant: 'outline',
      desc: 'We develop our agents to mirror your customized needs. Agents start working in your environment.',
    },
    {
      _key: 'step-3',
      num: '03',
      title: 'Bill on Day',
      day: 'Day 22 →',
      dayVariant: 'outline',
      desc: 'We invoice after our agents are live in your system.',
    },
  ],
  billingPoints: [
    'No development fee',
    'No software license',
    'You pay only when agents are live',
  ],

  // 10 · CTA Section
  ctaTag: 'See it run on your payer mix.',
  ctaHeading: 'Get in touch with us.',
  ctaPrimaryButtonText: 'Get a demo',
  ctaPrimaryButtonLink: '/contact-us',
  ctaSecondaryButtonText: 'Talk to a specialist',
  ctaSecondaryButtonLink: '/contact-us',
  ctaBackgroundImage: '/images/home/get-in-touch/img_get_in_touch%20(1).png',

  // 11 · SEO
  metaTitle: 'Waterlabs AI | Agentic Revenue Cycle Management',
  metaDescription:
    'Agentic AI built to own your revenue cycle, not just automate it. Autonomous RCM for health systems and healthcare providers.',
};

export function getDefaultHomeData(): HomePageData {
  return DEFAULT_HOME_DATA;
}
