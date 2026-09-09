import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutUsPageSchema = defineType({
  name: 'aboutUsPage',
  title: 'Leadership Section',
  type: 'document',
  fields: [
    defineField({
      name: 'leadersTag',
      title: 'Eyebrow Tag',
      type: 'string',
      initialValue: 'Leadership',
      description: 'Badge tag above the leadership grid (e.g. Leadership)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leaders',
      title: 'Leadership Team Members',
      type: 'array',
      description: 'Executive leaders displayed in the leadership grid',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'leader',
          title: 'Leader',
          fields: [
            defineField({
              name: 'name',
              title: 'Full Name',
              type: 'string',
              description: 'e.g. Daphne Oberlander, Sravan Aditya',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title / Role',
              type: 'string',
              description: 'e.g. Chief Revenue Officer, Chief Technology Officer',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Portrait photo of the leader',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'linkedinUrl',
              title: 'LinkedIn URL',
              type: 'url',
              description: 'Optional link to LinkedIn profile',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      tag: 'leadersTag',
      leaders: 'leaders',
    },
    prepare({ tag, leaders }) {
      const count = Array.isArray(leaders) ? leaders.length : 0;
      return {
        title: 'Leadership Section',
        subtitle: `${tag || 'Leadership'} (${count} leaders)`,
      };
    },
  },
});
