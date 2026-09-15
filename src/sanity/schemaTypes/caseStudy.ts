import { defineArrayMember, defineField, defineType } from 'sanity';

import { BoldTextInput } from '../components/BoldTextInput';

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'card', title: '01 · Listing Card (Tabs Section)' },
    { name: 'hero', title: '02 · Hero & Header' },
    { name: 'client', title: '03 · The Client' },
    { name: 'content', title: '04 · Challenge & Solution' },
    { name: 'results', title: '05 · Results & Outcomes' },
    { name: 'related', title: '06 · Related Cases' },
    { name: 'cta', title: '07 · CTA Section' },
  ],
  fields: [
    // 01 · LISTING CARD (TABS SECTION)
    defineField({
      name: 'cardCategory',
      title: 'Category Tab',
      type: 'string',
      group: 'card',
      description:
        'Category for tab filtering on /case-studies (e.g. Features, Use Cases, Company News, Case Studies)',
      options: {
        list: [
          { title: 'Features', value: 'Features' },
          { title: 'Use Cases', value: 'Use Cases' },
          { title: 'Company News', value: 'Company News' },
          { title: 'Case Studies', value: 'Case Studies' },
        ],
      },
      initialValue: 'Features',
    }),
    defineField({
      name: 'cardTag',
      title: 'Eyebrow Tag (with blue dot)',
      type: 'string',
      group: 'card',
      description:
        'Tag shown beside the blue dot on the listing card (e.g. Rural Health System, Enterprise RCM, Multi-site Network)',
      initialValue: 'Rural Health System',
    }),
    defineField({
      name: 'cardStat',
      title: 'Stat Headline',
      type: 'string',
      group: 'card',
      description:
        'Main prominent stat/metric headline on the listing card (e.g. "5 to 10 days → under 24 hours", "2 to 4 days → same day", "60 people → 4")',
    }),
    defineField({
      name: 'cardSubtitle',
      title: 'Card Subtitle',
      type: 'string',
      group: 'card',
      description:
        'Descriptive subtitle below the stat on the card (e.g. "13 Clinical Specialties", "7 Coding Disciplines", "Patient Intake Automation")',
    }),
    defineField({
      name: 'desktopImage',
      title: 'Card Thumbnail Image (Desktop)',
      type: 'image',
      group: 'card',
      description:
        'Image displayed on desktop in the /case-studies card (227x174 aspect ratio recommended)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mobileImage',
      title: 'Card Thumbnail Image (Mobile - Optional)',
      type: 'image',
      group: 'card',
      description:
        'Optional custom image displayed on mobile screens on /case-studies cards (defaults to desktop image if omitted)',
      options: { hotspot: true },
    }),

    // 02 · HERO & HEADER
    defineField({
      name: 'title',
      title: 'Title (H1)',
      type: 'string',
      group: 'hero',
      description: 'The main case study heading (e.g. How a multi-state rural health system...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL',
      type: 'slug',
      group: 'hero',
      description: 'Used in the URL: /case-study/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryTag',
      title: 'Category Eyebrow Tag',
      type: 'string',
      group: 'hero',
      description: 'Eyebrow badge above heading (e.g. Case Study · Rural Health System)',
      initialValue: 'Case Study · Healthcare RCM',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Text',
      type: 'string',
      group: 'hero',
      description: 'Specific phrase within the title that will be styled in blue accent color',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (H2)',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Secondary heading summary below the H1',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      description: 'Main visual graphic for the hero and preview cards',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Descriptive text for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Topic Tags / Pills',
      type: 'array',
      group: 'hero',
      description: 'Tags shown as filter pills (e.g. Rural Health System, Multi-specialty)',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),

    // 02 · THE CLIENT
    defineField({
      name: 'clientSummary',
      title: 'Client Overview Paragraph',
      type: 'text',
      rows: 4,
      group: 'client',
      description: 'Introductory summary under 02 · The Client. Use Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),
    defineField({
      name: 'statBadges',
      title: 'Stat / Scale Badges',
      type: 'array',
      group: 'client',
      description: 'Key statistics pills (e.g. "$2B+ net revenue", "13 specialties", "8,000 to 12,000 held claims a month")',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statBadge',
          title: 'Stat Badge',
          fields: [
            defineField({
              name: 'text',
              title: 'Badge Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text' },
          },
        }),
      ],
    }),

    // 03 · CHALLENGE & SOLUTION
    defineField({
      name: 'challenge',
      title: '03 · The Challenge',
      type: 'text',
      rows: 8,
      group: 'content',
      description: 'Detailed description of the operational and documentation challenge. Highlight text and click Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),
    defineField({
      name: 'whatWaterlabsDid',
      title: '04 · What Waterlabs Did',
      type: 'text',
      rows: 10,
      group: 'content',
      description: 'Detailed implementation story and AI agent workflow. Highlight text and click Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),

    // 04 · RESULTS & OUTCOMES
    defineField({
      name: 'resultsBlock',
      title: '05 · The Results Banner',
      type: 'object',
      group: 'results',
      description: 'Blue gradient result showcase banner',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline Metric / Range',
          type: 'string',
          description: 'e.g. "5 to 10 days → under 24 hours" or "75% → 94% first-pass clean rate"',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          description: 'Brief summary of the primary metric gain',
        }),
        defineField({
          name: 'details',
          title: 'Detailed Result Bullets / Description',
          type: 'text',
          rows: 8,
          description: 'Key impact takeaways. Highlight text and click Make Bold (Ctrl+B) to bold words.',
          components: {
            input: BoldTextInput,
          },
        }),
      ],
    }),
    defineField({
      name: 'outcomes',
      title: '06 · Outcomes',
      type: 'text',
      rows: 8,
      group: 'results',
      description: 'Operational, financial, and strategic outcomes. Highlight text and click Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),
    defineField({
      name: 'bottomLine',
      title: '07 · The Bottom Line',
      type: 'text',
      rows: 4,
      group: 'results',
      description: 'Concluding synthesis and summary statement. Highlight text and click Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),

    // 05 · RELATED CASES
    defineField({
      name: 'relatedCasesHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'related',
      description: 'Heading displayed above the related case study cards (defaults to "Related Cases")',
      initialValue: 'Related Cases',
    }),
    defineField({
      name: 'relatedCases',
      title: 'Related Case Studies (Max 3)',
      type: 'array',
      group: 'related',
      description:
        'Optionally select up to 3 case studies to feature in the "Related Cases" section. You can reference existing case studies or create custom cards. If left empty, other case studies will be selected automatically.',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Case Study Reference',
          to: [{ type: 'caseStudy' }],
        }),
        defineArrayMember({
          type: 'object',
          name: 'customRelatedCase',
          title: 'Custom Case Study Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link / Destination URL',
              type: 'string',
              description: 'e.g. /case-study/enterprise-rcm-organization',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // 06 · CTA SECTION
    defineField({
      name: 'cta',
      title: 'Bottom CTA Box',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'tagText',
          title: 'Eyebrow Tag',
          type: 'string',
          initialValue: 'Talk to us.',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Schedule a 15-minute call to see how Waterlabs can impact your organization’s results.',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get a Demo',
        }),
        defineField({
          name: 'buttonHref',
          title: 'Button Destination URL',
          type: 'string',
          initialValue: '/contact-us',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'card',
      description: 'Integer to order case studies in the tabs grid (e.g. 1, 2, 3...)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cardStat: 'cardStat',
      cardTag: 'cardTag',
      categoryTag: 'categoryTag',
      media: 'desktopImage',
      heroMedia: 'heroImage',
      slug: 'slug.current',
    },
    prepare({ title, cardStat, cardTag, categoryTag, media, heroMedia, slug }) {
      const subtitle = cardStat
        ? `${cardTag ? `${cardTag} · ` : ''}${cardStat}`
        : categoryTag || (slug ? `/case-study/${slug}` : 'Draft Case Study');
      return {
        title: title || 'Untitled Case Study',
        subtitle,
        media: media || heroMedia,
      };
    },
  },
});
