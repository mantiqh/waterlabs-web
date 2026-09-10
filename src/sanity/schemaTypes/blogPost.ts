import { defineArrayMember, defineField, defineType } from 'sanity';

import { BoldTextInput } from '../components/BoldTextInput';

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog Article',
  type: 'document',
  groups: [
    { name: 'general', title: '01 · General Info & Card' },
    { name: 'hero', title: '02 · Hero Section' },
    { name: 'content', title: '03 · Article Sections (TOC)' },
    { name: 'related', title: '04 · Related Articles' },
  ],
  fields: [
    // 01 · GENERAL INFO & CARD THUMBNAIL
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'general',
      description: 'The main headline of the blog article (e.g. What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL Identifier',
      type: 'slug',
      group: 'general',
      description: 'Used in the article route (e.g. /blogs/what-is-agentic-rcm)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Tab',
      type: 'string',
      group: 'general',
      description: 'Category for tab filtering on /blogs (e.g. Features, Use Cases, Company News, Case Studies)',
      options: {
        list: [
          { title: 'Features', value: 'Features' },
          { title: 'Use Cases', value: 'Use Cases' },
          { title: 'Company News', value: 'Company News' },
          { title: 'Case Studies', value: 'Case Studies' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Features',
    }),
    defineField({
      name: 'tag',
      title: 'Eyebrow Tag',
      type: 'string',
      group: 'general',
      description: 'First part of the eyebrow tag above the title (e.g. Article, Guide, Lorem)',
      initialValue: 'Lorem',
    }),
    defineField({
      name: 'subTag',
      title: 'Sub Tag / Meta',
      type: 'string',
      group: 'general',
      description: 'Second part of the eyebrow tag (e.g. Lorem Ipsum, Jun 26, 2025)',
      initialValue: 'Lorem Ipsum',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'general',
      description: 'Numerical sort order (e.g. 1, 2, 3...) on the /blogs tabs section grid',
      initialValue: 1,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'general',
      description: 'Publication date used for sorting and metadata',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'desktopImage',
      title: 'Card Thumbnail Image (Desktop)',
      type: 'image',
      group: 'general',
      description: 'Image displayed on desktop in the /blogs article card (227x188 aspect ratio recommended)',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Card Thumbnail Image (Mobile - Optional)',
      type: 'image',
      group: 'general',
      description: 'Optional custom image displayed on mobile screens on /blogs cards (defaults to desktop image if omitted)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt / Card Summary',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'A brief 1-2 sentence preview of the article for cards and SEO meta description',
    }),

    // 02 · HERO SECTION
    defineField({
      name: 'titleAccent',
      title: 'Title Accent Text (Blue)',
      type: 'string',
      group: 'hero',
      description: 'Optional first part of title highlighted in blue accent color (e.g. "What Is Agentic RCM?")',
    }),
    defineField({
      name: 'titleRest',
      title: 'Title Remainder Text (Dark)',
      type: 'string',
      group: 'hero',
      description: 'Optional second part of title in dark navy (e.g. " The Definitive Guide to the Autonomous Revenue Cycle")',
    }),
    defineField({
      name: 'heroBannerDesktop',
      title: 'Hero Banner Image (Desktop)',
      type: 'image',
      group: 'hero',
      description: 'Large banner image displayed at the top of the blog detail page on desktop (1096px x 350px recommended)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerMobile',
      title: 'Hero Banner Image (Mobile)',
      type: 'image',
      group: 'hero',
      description: 'Banner image for mobile devices (362px x 245px recommended)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroParagraphs',
      title: 'Hero Intro Paragraphs',
      type: 'text',
      rows: 6,
      group: 'hero',
      description: 'Introductory paragraphs displayed below the hero image banner. Separate multiple paragraphs with an empty line. Highlight text and click Make Bold (Ctrl+B) to bold words.',
      components: {
        input: BoldTextInput,
      },
    }),

    // 03 · ARTICLE SECTIONS & TABLE OF CONTENTS (TOC)
    defineField({
      name: 'sections',
      title: 'Article Sections & Topics (TOC)',
      type: 'array',
      group: 'content',
      description: 'The body sections of the blog article. Each section automatically appears in the left sticky indicator (TOC) and the article body. Highlight text and click Make Bold (Ctrl+B) to add bold emphasis.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'blogSection',
          title: 'Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Heading (H4)',
              type: 'string',
              description: 'e.g. "What does agentic RCM actually mean?" (displayed in heading and in the left indicator TOC)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'id',
              title: 'Section Anchor ID (Optional)',
              type: 'string',
              description: 'Anchor slug used for indicator links (e.g. "what-does-agentic-rcm-actually-mean"). If left blank, it is automatically derived from the heading.',
            }),
            defineField({
              name: 'content',
              title: 'Section Paragraphs',
              type: 'text',
              rows: 8,
              description: 'Section text. Separate paragraphs with an empty line. Highlight text and click Make Bold (Ctrl+B) to bold words.',
              components: {
                input: BoldTextInput,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
          },
        }),
      ],
    }),

    // 04 · RELATED ARTICLES
    defineField({
      name: 'relatedArticles',
      title: 'Related Blog Articles (Max 3)',
      type: 'array',
      group: 'related',
      description: 'Optionally select up to 3 blog articles to feature in the "Related Blogs" section. If left empty, the 3 most recent articles will be displayed automatically.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogPost' }],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order',
      media: 'desktopImage',
    },
    prepare({ title, category, order, media }) {
      return {
        title: title || 'Untitled Article',
        subtitle: `[#${order || '-'}] ${category || 'Uncategorized'}`,
        media,
      };
    },
  },
});

export default blogPostSchema;
