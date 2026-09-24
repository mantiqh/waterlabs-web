import { defineArrayMember, defineField, defineType } from 'sanity';

export const solutionPageSchema = defineType({
  name: 'solutionPage',
  title: 'Solution Page',
  type: 'document',
  groups: [
    { name: 'general', title: '00 · General & Navigation' },
    { name: 'hero', title: '01 · Hero Section' },
    { name: 'problem', title: '02 · The Problem' },
    { name: 'closes', title: '03 · How Waterlabs Closes' },
    { name: 'statsAndHuman', title: '04 · Stats & Human in the Loop' },
    { name: 'platformAndFeatures', title: '05 · Platform & Three Things' },
    { name: 'cta', title: '06 · CTA Section' },
    { name: 'seo', title: '07 · SEO' },
  ],
  fields: [
    // ── 00 · GENERAL & NAVIGATION ──
    defineField({
      name: 'title',
      title: 'Solution Name / Title',
      type: 'string',
      group: 'general',
      description: 'The primary name of the solution (e.g. Prior Authorization, Eligibility & Benefits Verification)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL',
      type: 'slug',
      group: 'general',
      description: 'Used in the URL: /solutions/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navLabel',
      title: 'Navbar Dropdown Label',
      type: 'string',
      group: 'general',
      description: 'Short label to display in the "Agentic RCM Solutions" navbar dropdown (defaults to Title if blank)',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'general',
      description: 'Ordering number in the dropdown and lists (e.g. 1, 2, 3...)',
      initialValue: 1,
    }),

    // ── 01 · HERO SECTION ──
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow / Tag',
      type: 'string',
      group: 'hero',
      description: 'Top tag beside the blue dot (e.g. "Agentic RCM Solutions · Prior Authorization")',
      initialValue: 'Agentic RCM Solutions',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (H1)',
      type: 'string',
      group: 'hero',
      description: 'Main heading in the hero banner (e.g. "Prior authorization in 24 to 48 hours.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Paragraph text below the hero headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Get a Demo',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Button Link',
      type: 'string',
      group: 'hero',
      initialValue: '/contact-us',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Right Image',
      type: 'image',
      group: 'hero',
      description: 'Main feature graphic on the right side of the hero banner',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroBanner',
      title: 'Hero Background Pattern (Optional)',
      type: 'image',
      group: 'hero',
      description: 'Optional custom background banner overlay',
      options: { hotspot: true },
    }),

    // ── 02 · THE PROBLEM SECTION ──
    defineField({
      name: 'problemTag',
      title: 'Problem Eyebrow Tag',
      type: 'string',
      group: 'problem',
      initialValue: 'The problem',
    }),
    defineField({
      name: 'problemHeadline',
      title: 'Problem Headline',
      type: 'string',
      group: 'problem',
      description: 'First part of headline (e.g. "How backlogged is your authorization process")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problemHeadlineHighlight',
      title: 'Problem Headline Highlight (Blue text)',
      type: 'string',
      group: 'problem',
      description: 'Ending highlighted part of headline (e.g. "right now?")',
    }),
    defineField({
      name: 'problemDescription',
      title: 'Problem Main Description',
      type: 'text',
      rows: 3,
      group: 'problem',
      description: 'First paragraph explaining the core pain point',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problemDescriptionSecondary',
      title: 'Problem Secondary Description (Optional)',
      type: 'text',
      rows: 3,
      group: 'problem',
      description: 'Optional second paragraph under the problem',
    }),
    defineField({
      name: 'problemQuoteText',
      title: 'Problem Quote Text (Optional)',
      type: 'string',
      group: 'problem',
      description: 'E.g. "1 in 3 physicians say prior authorization delays have caused serious harm to a patient."',
    }),
    defineField({
      name: 'problemQuoteAuthor',
      title: 'Problem Quote Author / Source (Optional)',
      type: 'string',
      group: 'problem',
      description: 'E.g. "American Medical Association"',
    }),
    defineField({
      name: 'problemImage',
      title: 'Problem Left Image',
      type: 'image',
      group: 'problem',
      description: 'Image displayed on the left side of the problem card',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    // ── 03 · HOW WATERLABS CLOSES ──
    defineField({
      name: 'closesSectionTitle',
      title: 'Closes Section Title',
      type: 'string',
      group: 'closes',
      initialValue: 'How Waterlabs',
    }),
    defineField({
      name: 'closesSectionHighlight',
      title: 'Closes Section Highlight (Teal text)',
      type: 'string',
      group: 'closes',
      initialValue: 'closes the gap',
    }),
    defineField({
      name: 'closesSubtitle',
      title: 'Closes Subtitle',
      type: 'text',
      rows: 2,
      group: 'closes',
      description: 'Subheading paragraph explaining how the solution closes the gap',
    }),
    defineField({
      name: 'closesImage',
      title: 'Closes Feature Graphic',
      type: 'image',
      group: 'closes',
      description: 'Graphic shown on the left of the interactive step list',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'closesSteps',
      title: 'Step-by-step Process',
      type: 'array',
      group: 'closes',
      description: 'List of steps shown in the interactive scrolling section',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),

    // ── 04 · STATS & HUMAN IN THE LOOP ──
    defineField({
      name: 'statsTitle',
      title: 'Stats Heading',
      type: 'string',
      group: 'statsAndHuman',
      initialValue: 'Our Stats',
    }),
    defineField({
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      group: 'statsAndHuman',
      description: '2 to 3 prominent metrics shown in the stats panel',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Stat Value',
              type: 'string',
              description: 'e.g. Under 2%, 24-48-hour, 75%, 4 days to 1 day',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Stat Description',
              type: 'string',
              description: 'e.g. Authorization denial rate, turnaround time',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'humanHeading',
      title: 'Human in the Loop Heading',
      type: 'string',
      group: 'statsAndHuman',
      initialValue: 'Human in the loop, by design',
    }),
    defineField({
      name: 'humanHeadingHighlight',
      title: 'Human in the Loop Highlight (Blue text)',
      type: 'string',
      group: 'statsAndHuman',
      initialValue: 'Human in the loop,',
    }),
    defineField({
      name: 'humanParagraphs',
      title: 'Human in the Loop Paragraphs',
      type: 'array',
      group: 'statsAndHuman',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
      description: 'One or two paragraphs detailing how human oversight is integrated',
    }),
    defineField({
      name: 'humanImage',
      title: 'Human in the Loop Image (Desktop)',
      type: 'image',
      group: 'statsAndHuman',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'humanImageMobile',
      title: 'Human in the Loop Image (Mobile - Optional)',
      type: 'image',
      group: 'statsAndHuman',
      options: { hotspot: true },
    }),

    // ── 05 · PLATFORM (HIMER AI OS) & THE THREE THINGS ──
    defineField({
      name: 'platformEyebrow',
      title: 'Platform Card Eyebrow',
      type: 'string',
      group: 'platformAndFeatures',
      description: 'e.g. "This isn\'t just a prior authorization tool"',
    }),
    defineField({
      name: 'platformHeading',
      title: 'Platform Card Headline',
      type: 'string',
      group: 'platformAndFeatures',
      initialValue: 'It is one application within an operating system that manages the full revenue cycle.',
    }),
    defineField({
      name: 'platformDescription',
      title: 'Platform Card Description',
      type: 'text',
      rows: 3,
      group: 'platformAndFeatures',
      description: 'Explaining how this solution runs on HIMER AI OS',
    }),
    defineField({
      name: 'platformCtaText',
      title: 'Platform CTA Button Text',
      type: 'string',
      group: 'platformAndFeatures',
      initialValue: 'Explore HIMER AI OS',
    }),
    defineField({
      name: 'platformCtaLink',
      title: 'Platform CTA Button Link',
      type: 'string',
      group: 'platformAndFeatures',
      initialValue: '/products/himer',
    }),
    defineField({
      name: 'platformImage',
      title: 'Platform Card Image',
      type: 'image',
      group: 'platformAndFeatures',
      options: { hotspot: true },
    }),
    defineField({
      name: 'threeThingsHeading',
      title: 'Three Things Section Heading',
      type: 'string',
      group: 'platformAndFeatures',
      initialValue: 'The three things that usually stop people. None of them apply here.',
    }),
    defineField({
      name: 'threeThingsHeadingHighlight',
      title: 'Three Things Highlight (Blue text)',
      type: 'string',
      group: 'platformAndFeatures',
      initialValue: 'The three things that usually',
    }),
    defineField({
      name: 'threeThingsCards',
      title: 'Three Things Cards',
      type: 'array',
      group: 'platformAndFeatures',
      description: '3 cards: Start small, Go live fast, Data remains secure',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Card Icon',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }),
      ],
    }),

    // ── 06 · CTA SECTION ──
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Section Headline',
      type: 'string',
      group: 'cta',
      description: 'e.g. "Discover how this solution integrates with your authorization queue."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'cta',
      initialValue: 'Get a Demo',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact-us',
    }),

    // ── 07 · SEO ──
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Browser tab title and search engine result title',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Search engine snippet summary',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      order: 'order',
      media: 'heroImage',
    },
    prepare({ title, slug, order, media }) {
      return {
        title: title || 'Untitled Solution',
        subtitle: `${order ? `#${order} · ` : ''}/solutions/${slug || ''}`,
        media,
      };
    },
  },
});
