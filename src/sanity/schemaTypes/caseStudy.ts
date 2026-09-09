import { defineArrayMember, defineField, defineType } from 'sanity';

import { BoldTextInput } from '../components/BoldTextInput';

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 · Hero & Header' },
    { name: 'client', title: '02 · The Client' },
    { name: 'content', title: '03 · Challenge & Solution' },
    { name: 'results', title: '04 · Results & Outcomes' },
    { name: 'cta', title: '05 · CTA Section' },
  ],
  fields: [
    // 01 · HERO & HEADER
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

    // 05 · CTA SECTION
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
      description: 'Integer to order case studies (e.g. 1, 2, 3...)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryTag',
      media: 'heroImage',
      slug: 'slug.current',
    },
    prepare({ title, subtitle, media, slug }) {
      return {
        title: title || 'Untitled Case Study',
        subtitle: subtitle || (slug ? `/case-study/${slug}` : 'Draft Case Study'),
        media,
      };
    },
  },
});
