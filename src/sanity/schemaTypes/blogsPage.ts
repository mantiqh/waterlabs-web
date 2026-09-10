import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogsPageSchema = defineType({
  name: 'blogsPage',
  title: 'Blogs Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Filter Categories / Tabs',
      type: 'array',
      description: 'The category filter pills shown in the tabs section (e.g. Features, Use Cases, Company News, Case Studies). Note: "All" is prepended automatically.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: ['Features', 'Use Cases', 'Company News', 'Case Studies'],
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Input Placeholder',
      type: 'string',
      description: 'Placeholder text inside search inputs',
      initialValue: 'Search',
    }),
    defineField({
      name: 'filterByLabel',
      title: 'Mobile Filter Dropdown Label',
      type: 'string',
      description: 'Label on mobile filter button',
      initialValue: 'Filter by',
    }),
    defineField({
      name: 'readBlogButtonText',
      title: 'Read Blog Button Text',
      type: 'string',
      description: 'Text displayed on article card CTA buttons (e.g. Read blog)',
      initialValue: 'Read blog',
    }),
  ],
  preview: {
    select: {
      categories: 'categories',
    },
    prepare({ categories }) {
      const count = Array.isArray(categories) ? categories.length : 0;
      return {
        title: 'Blogs Page Settings',
        subtitle: `${count} categories configured`,
      };
    },
  },
});
