import { defineArrayMember, defineField, defineType } from 'sanity';

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 · Hero & Header' },
    { name: 'client', title: '02 · The Client' },
    { name: 'content', title: '03 · Challenge & Solution' },
    { name: 'results', title: '04 · Results & Outcomes' },
    { name: 'metrics', title: '05 · Highlight Metrics' },
    { name: 'cta', title: '06 · CTA Section' },
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
      name: 'client',
      title: 'Client Information',
      type: 'object',
      group: 'client',
      fields: [
        defineField({
          name: 'name',
          title: 'Organization / Client Name',
          type: 'string',
          description: 'e.g. Multi-State Rural Health Alliance',
        }),
        defineField({
          name: 'specialties',
          title: 'Specialties / Department Scope',
          type: 'string',
          description: 'e.g. 13 Clinical Specialties, Outpatient & Surgery',
        }),
        defineField({
          name: 'systemType',
          title: 'System / Facility Type',
          type: 'string',
          description: 'e.g. Acute & Ambulatory Health Network',
        }),
      ],
    }),
    defineField({
      name: 'clientSummary',
      title: 'Client Overview Paragraph',
      type: 'text',
      rows: 4,
      group: 'client',
      description: 'Introductory summary under 02 · THE CLIENT',
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
      description: 'Detailed description of the operational and documentation challenge. Paragraphs separated by blank lines.',
    }),
    defineField({
      name: 'whatWaterlabsDid',
      title: '04 · What Waterlabs Did',
      type: 'text',
      rows: 10,
      group: 'content',
      description: 'Detailed implementation story and AI agent workflow. Paragraphs separated by blank lines.',
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
          description: 'Key impact takeaways (e.g. labor savings, accelerated A/R, hours returned)',
        }),
      ],
    }),
    defineField({
      name: 'outcomes',
      title: '06 · Outcomes',
      type: 'text',
      rows: 8,
      group: 'results',
      description: 'Operational, financial, and strategic outcomes. Paragraphs separated by blank lines.',
    }),
    defineField({
      name: 'bottomLine',
      title: '07 · The Bottom Line',
      type: 'text',
      rows: 4,
      group: 'results',
      description: 'Concluding synthesis and summary statement',
    }),

    // 05 · HIGHLIGHT METRICS
    defineField({
      name: 'metrics',
      title: 'Key Impact Metrics (Cards)',
      type: 'array',
      group: 'metrics',
      description: '3 highlighted metric cards shown at top of the study',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'metric',
          title: 'Metric Card',
          fields: [
            defineField({
              name: 'value',
              title: 'Metric Value',
              type: 'string',
              description: 'e.g. "24 hrs", "98.6%", "$3.4M"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Metric Label / Description',
              type: 'string',
              description: 'e.g. "Claim release turnaround down from 10 days"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'change',
              title: 'Change / Delta Indicator',
              type: 'string',
              description: 'e.g. "-90%", "+14%", "Accelerated"',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
              change: 'change',
            },
            prepare({ title, subtitle, change }) {
              return {
                title: `${title || ''} (${change || 'N/A'})`,
                subtitle: subtitle || 'No label',
              };
            },
          },
        }),
      ],
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
