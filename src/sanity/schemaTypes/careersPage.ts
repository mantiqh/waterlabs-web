import { defineArrayMember, defineField, defineType } from 'sanity';

export const careersPageSchema = defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'openRolesTag',
      title: 'Section Tag',
      type: 'string',
      initialValue: 'Open Roles',
      description: 'Badge tag displayed above the heading (e.g. Open Roles)',
    }),
    defineField({
      name: 'openRolesHeading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Where you would fit.',
      description: 'Main section heading (e.g. Where you would fit.)',
    }),
    defineField({
      name: 'categories',
      title: 'Role Categories / Tabs',
      type: 'array',
      description:
        'Add filter tabs (e.g., Engineering, Product & Delivery). Each tab contains its own job roles list.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'roleCategory',
          title: 'Category Tab',
          fields: [
            defineField({
              name: 'tabName',
              title: 'Tab / Category Name',
              type: 'string',
              description:
                'e.g. Engineering, Product & Delivery, Client Success, RCM & Ops',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'roles',
              title: 'Roles in this Category',
              type: 'array',
              description: 'Add job openings for this specific category tab',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'jobRole',
                  title: 'Job Role',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Job Title',
                      type: 'string',
                      description:
                        'e.g. Python Developer – Agentic AI / Machine Learning',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'experience',
                      title: 'Experience',
                      type: 'string',
                      description:
                        'e.g. 3–8 years, 1–3 yrs (Junior) / 5+ yrs (Senior)',
                    }),
                    defineField({
                      name: 'category',
                      title: 'Category',
                      type: 'string',
                      description: 'e.g. Developer, Lead, Manager',
                      initialValue: 'Developer',
                    }),
                    defineField({
                      name: 'eligibility',
                      title: 'Eligibility',
                      type: 'string',
                      description: 'e.g. Agentic AI & LLMs, Node.js & React',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Application Link / Email',
                      type: 'string',
                      description:
                        'URL (e.g. Greenhouse/Lever link) or email (mailto:...)',
                      initialValue: 'mailto:careers@waterlabs.ai',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      category: 'category',
                      experience: 'experience',
                    },
                    prepare({ title, category, experience }) {
                      return {
                        title: title || 'Untitled Role',
                        subtitle: [category, experience]
                          .filter(Boolean)
                          .join(' • '),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'tabName',
              roles: 'roles',
            },
            prepare({ title, roles }) {
              const count = Array.isArray(roles) ? roles.length : 0;
              return {
                title: title || 'Untitled Category',
                subtitle: `${count} ${count === 1 ? 'role' : 'roles'}`,
              };
            },
          },
        }),
      ],
    }),
  ],
});
