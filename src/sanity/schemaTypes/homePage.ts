import { defineArrayMember, defineField, defineType } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 · Hero Section' },
    { name: 'carousel', title: '02 · Marquee / Video' },
    { name: 'brands', title: '03 · Trusted Brands' },
    { name: 'products', title: '04 · Products' },
    { name: 'eligibility', title: '05 · Eligibility to Coding' },
    { name: 'features', title: '06 · Features & Stats' },
    { name: 'testimonials', title: '07 · Testimonials' },
    { name: 'calculate', title: '08 · Calculate Section' },
    { name: 'billing', title: '09 · Billing Model' },
    { name: 'cta', title: '10 · CTA Section' },
    { name: 'seo', title: '11 · SEO' },
  ],
  fields: [
    // ── 01 · HERO SECTION ──
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading / Tag',
      type: 'string',
      group: 'hero',
      initialValue: 'Agentic RCM built from inside healthcare',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (H1)',
      type: 'string',
      group: 'hero',
      initialValue: "Don't just automate your revenue cycle. Apply intelligence to it.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description Paragraph',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue:
        'We provide the platform that runs your revenue cycle. You measure it, we improve it.',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero Primary CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Get a demo',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero Primary CTA Link',
      type: 'string',
      group: 'hero',
      initialValue: '/contact-us',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'See how it works',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary CTA Link',
      type: 'string',
      group: 'hero',
      initialValue: '#discover',
    }),
    defineField({
      name: 'heroBackgroundImageDesktop',
      title: 'Hero Background Image (Desktop)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBackgroundImageMobile',
      title: 'Hero Background Image (Mobile)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── 02 · MARQUEE / VIDEO ──
    defineField({
      name: 'marqueeItems',
      title: 'Marquee Ticker Items',
      type: 'array',
      group: 'carousel',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Ticker Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Thumbnail Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'text',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'marqueeMobileText',
      title: 'Mobile Heading for Marquee Section',
      type: 'string',
      group: 'carousel',
      initialValue: 'No development fee, Live in weeks, not months',
    }),
    defineField({
      name: 'bannerImageDesktop',
      title: 'Video / Banner Preview Image (Desktop)',
      type: 'image',
      group: 'carousel',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bannerImageMobile',
      title: 'Video / Banner Preview Image (Mobile)',
      type: 'image',
      group: 'carousel',
      options: { hotspot: true },
    }),

    // ── 03 · TRUSTED BRANDS ──
    defineField({
      name: 'brandHeading',
      title: 'Brands Heading',
      type: 'string',
      group: 'brands',
      initialValue: 'Trusted at the scale',
    }),
    defineField({
      name: 'brandHeadingHighlight',
      title: 'Brands Heading Highlight',
      type: 'string',
      group: 'brands',
      initialValue: 'healthcare runs at',
    }),
    defineField({
      name: 'brandLogos',
      title: 'Brand Logos',
      type: 'array',
      group: 'brands',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Brand / Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        }),
      ],
    }),

    // ── 04 · PRODUCTS ──
    defineField({
      name: 'productsHeadingPart1',
      title: 'Products Main Heading',
      type: 'string',
      group: 'products',
      initialValue: 'Two products. One system.',
    }),
    defineField({
      name: 'productsHeadingHighlight',
      title: 'Products Heading Highlight (Blue)',
      type: 'string',
      group: 'products',
      initialValue: 'Every stage of the cycle.',
    }),
    defineField({
      name: 'product1',
      title: 'Product 1 (e.g. HIMER AI OS)',
      type: 'object',
      group: 'products',
      fields: [
        defineField({
          name: 'name',
          title: 'Product Name',
          type: 'string',
          initialValue: 'HIMER AI OS',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Product Description',
          type: 'text',
          rows: 2,
          initialValue: 'Orchestrate and build through commands. Just describe your task.',
        }),
        defineField({
          name: 'image',
          title: 'Product Preview Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Explore HIMER',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/solutions/prior-authorization',
        }),
      ],
    }),
    defineField({
      name: 'product2',
      title: 'Product 2 (e.g. CurieCode)',
      type: 'object',
      group: 'products',
      fields: [
        defineField({
          name: 'name',
          title: 'Product Name',
          type: 'string',
          initialValue: 'CurieCode',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Product Description',
          type: 'text',
          rows: 2,
          initialValue: 'Optimize reimbursements through automated, intelligent coding.',
        }),
        defineField({
          name: 'image',
          title: 'Product Preview Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Explore CurieCode',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/solutions/charge-capture-and-coding',
        }),
      ],
    }),

    // ── 05 · ELIGIBILITY TO CODING ──
    defineField({
      name: 'eligibilityTag',
      title: 'Eligibility Tagline',
      type: 'string',
      group: 'eligibility',
      initialValue: 'Front to Back. No Handoffs.',
    }),
    defineField({
      name: 'eligibilityHeading',
      title: 'Eligibility Heading',
      type: 'text',
      rows: 2,
      group: 'eligibility',
      initialValue: 'We offer end-to-end coverage:\nfrom Eligibility to Coding.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eligibilitySubtag',
      title: 'Eligibility Left Subtag',
      type: 'string',
      group: 'eligibility',
      initialValue: 'Waterlabs covers every stage:',
    }),
    defineField({
      name: 'eligibilitySubheading',
      title: 'Eligibility Left Subheading',
      type: 'string',
      group: 'eligibility',
      initialValue: 'Eligibility to Coding.',
    }),
    defineField({
      name: 'eligibilityDiagramImage',
      title: 'Eligibility Interactive Diagram Image',
      type: 'image',
      group: 'eligibility',
      options: { hotspot: true },
    }),
    defineField({
      name: 'eligibilityDescription',
      title: 'Eligibility Right Description',
      type: 'text',
      rows: 3,
      group: 'eligibility',
      initialValue:
        'Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-the-loop model. Agentic intelligence learns and evolves based on your scenarios.',
    }),
    defineField({
      name: 'eligibilityBgDesktop',
      title: 'Eligibility Background Pattern (Desktop)',
      type: 'image',
      group: 'eligibility',
      options: { hotspot: true },
    }),
    defineField({
      name: 'eligibilityBgMobile',
      title: 'Eligibility Background Pattern (Mobile)',
      type: 'image',
      group: 'eligibility',
      options: { hotspot: true },
    }),

    // ── 06 · FEATURES & STATS ──
    defineField({
      name: 'featuresTag',
      title: 'Features Tagline',
      type: 'string',
      group: 'features',
      initialValue: 'Every Stage, Owned.',
    }),
    defineField({
      name: 'featuresHeading',
      title: 'Features Heading',
      type: 'string',
      group: 'features',
      initialValue: 'Run end-to-end.',
    }),
    defineField({
      name: 'featuresHeadingHighlight',
      title: 'Features Heading Highlight (Blue)',
      type: 'string',
      group: 'features',
      initialValue: 'start with one function.',
    }),
    defineField({
      name: 'featuresDescription',
      title: 'Features Subtitle Description',
      type: 'text',
      rows: 2,
      group: 'features',
      initialValue:
        'The agents stay accountable either way. Prior Authorization:\nSubmitted, tracked, followed up. 24/7, no human in the queue.',
    }),
    defineField({
      name: 'card1Title',
      title: 'Feature Card 1 Title',
      type: 'string',
      group: 'features',
      initialValue: 'Explore Eligibility & Benefits',
    }),
    defineField({
      name: 'card1Description',
      title: 'Feature Card 1 Description',
      type: 'string',
      group: 'features',
      initialValue: 'Verified in real time. Coverage gaps caught before they cost you.',
    }),
    defineField({
      name: 'card1Image',
      title: 'Feature Card 1 Image',
      type: 'image',
      group: 'features',
      options: { hotspot: true },
    }),
    defineField({
      name: 'card2Title',
      title: 'Feature Card 2 Title',
      type: 'string',
      group: 'features',
      initialValue: 'Improve Denial Prevention',
    }),
    defineField({
      name: 'card2Description',
      title: 'Feature Card 2 Description',
      type: 'string',
      group: 'features',
      initialValue: 'Catch and fix claims before they leave, not after they come back.',
    }),
    defineField({
      name: 'card2Image',
      title: 'Feature Card 2 Image',
      type: 'image',
      group: 'features',
      options: { hotspot: true },
    }),
    defineField({
      name: 'securityTag',
      title: 'Security / Healthcare-Grade Tag',
      type: 'string',
      group: 'features',
      initialValue: 'Healthcare-grade by default.',
    }),
    defineField({
      name: 'securityHeadingHighlight',
      title: 'Security Heading Highlight (Blue)',
      type: 'string',
      group: 'features',
      initialValue: 'Your patient data',
    }),
    defineField({
      name: 'securityHeading',
      title: 'Security Heading',
      type: 'string',
      group: 'features',
      initialValue: 'never leaves your environment.',
    }),
    defineField({
      name: 'securityDescription',
      title: 'Security Description',
      type: 'text',
      rows: 3,
      group: 'features',
      initialValue:
        "Our agents work inside your systems. The data stays where it is. Nothing is copied, moved, or stored on our side. After Change Healthcare showed what concentration risk really costs, this isn't a feature. It's the baseline for working in healthcare.",
    }),
    defineField({
      name: 'securityImage',
      title: 'Security Graphic Image',
      type: 'image',
      group: 'features',
      options: { hotspot: true },
    }),
    defineField({
      name: 'statsTag',
      title: 'Stats Section Tag',
      type: 'string',
      group: 'features',
      initialValue: 'Measured against HFMA. Drawn from production.',
    }),
    defineField({
      name: 'statsHeading',
      title: 'Stats Section Heading',
      type: 'string',
      group: 'features',
      initialValue: 'Our stats',
    }),
    defineField({
      name: 'stats',
      title: 'Stats Metric Cards',
      type: 'array',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Stat Icon Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'stat',
              title: 'Metric Value (e.g. 30 to 70%, 95%+)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'unit',
              title: 'Unit (optional, e.g. days)',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'stat',
              subtitle: 'label',
              media: 'icon',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'caseStudyTitle',
      title: 'Featured Case Study Title',
      type: 'string',
      group: 'features',
      initialValue: '60 outsourced staff → 3 in-house managers.',
    }),
    defineField({
      name: 'caseStudySubtitle',
      title: 'Featured Case Study Subtitle',
      type: 'string',
      group: 'features',
      initialValue: 'Multi-state anesthesia group.',
    }),
    defineField({
      name: 'caseStudyImage',
      title: 'Featured Case Study Image',
      type: 'image',
      group: 'features',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caseStudyCtaText',
      title: 'Featured Case Study CTA Label',
      type: 'string',
      group: 'features',
      initialValue: 'Read the case',
    }),
    defineField({
      name: 'caseStudyCtaLink',
      title: 'Featured Case Study CTA Link',
      type: 'string',
      group: 'features',
      initialValue: '/case-studies',
    }),

    // ── 07 · TESTIMONIALS ──
    defineField({
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Person Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role & Organization',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'Quote Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Author Photo Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        }),
      ],
    }),

    // ── 08 · CALCULATE SECTION ──
    defineField({
      name: 'calculateHeading',
      title: 'Calculate Section Heading',
      type: 'text',
      rows: 2,
      group: 'calculate',
      initialValue: 'Calculate what you will save.\nUse your real numbers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'calculateImage',
      title: 'Calculate Section Illustration / Preview Image',
      type: 'image',
      group: 'calculate',
      options: { hotspot: true },
    }),

    // ── 09 · BILLING MODEL ──
    defineField({
      name: 'billingTag',
      title: 'Billing Section Tag',
      type: 'string',
      group: 'billing',
      initialValue: 'Proven before you pay.',
    }),
    defineField({
      name: 'billingHeadingHighlight',
      title: 'Billing Heading Highlight (Blue)',
      type: 'string',
      group: 'billing',
      initialValue: 'Our billing model allows you flexibility.',
    }),
    defineField({
      name: 'billingHeading',
      title: 'Billing Heading',
      type: 'string',
      group: 'billing',
      initialValue: 'We charge you when our AI is live in your environment.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'billingDescription',
      title: 'Billing Description Paragraph',
      type: 'text',
      rows: 2,
      group: 'billing',
      initialValue: 'No development fee. No software license. We charge after it works.',
    }),
    defineField({
      name: 'billingSteps',
      title: 'Billing Steps',
      type: 'array',
      group: 'billing',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'num',
              title: 'Step Number (e.g. 01, 02, 03)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'day',
              title: 'Day Range (e.g. Day 1–7, Day 22 →)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'dayVariant',
              title: 'Day Badge Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Active (Blue Fill)', value: 'active' },
                  { title: 'Outline (Border)', value: 'outline' },
                ],
              },
              initialValue: 'outline',
            }),
            defineField({
              name: 'desc',
              title: 'Step Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'day',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'billingPoints',
      title: 'Right-Side Key Billing Highlights',
      type: 'array',
      group: 'billing',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'No development fee',
        'No software license',
        'You pay only when agents are live',
      ],
    }),

    // ── 10 · CTA SECTION ──
    defineField({
      name: 'ctaTag',
      title: 'CTA Tagline',
      type: 'string',
      group: 'cta',
      initialValue: 'See it run on your payer mix.',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Main Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Get in touch with us.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaPrimaryButtonText',
      title: 'Primary CTA Button Label',
      type: 'string',
      group: 'cta',
      initialValue: 'Get a demo',
    }),
    defineField({
      name: 'ctaPrimaryButtonLink',
      title: 'Primary CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact-us',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'Secondary CTA Button Label',
      type: 'string',
      group: 'cta',
      initialValue: 'Talk to a specialist',
    }),
    defineField({
      name: 'ctaSecondaryButtonLink',
      title: 'Secondary CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact-us',
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Background Image Pattern',
      type: 'image',
      group: 'cta',
      options: { hotspot: true },
    }),

    // ── 11 · SEO ──
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Waterlabs AI | Agentic Revenue Cycle Management',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue:
        'Agentic AI built to own your revenue cycle, not just automate it. Autonomous RCM for health systems and healthcare providers.',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubheading',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Home Page Settings',
        subtitle: title || subtitle || 'Configure Home Page sections',
      };
    },
  },
});
