import { defineArrayMember, defineField, defineType } from 'sanity';

export const contactUsPageSchema = defineType({
  name: 'contactUsPage',
  title: 'Contact Us Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 · Hero Section' },
    { name: 'operatingInfo', title: '02 · Operating Info & Locations' },
    { name: 'contactForm', title: '03 · Contact Form' },
    { name: 'cta', title: '04 · CTA Section' },
    { name: 'seo', title: '05 · SEO' },
  ],
  fields: [
    // ── 01 · HERO SECTION ──
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (H2)',
      type: 'string',
      group: 'hero',
      initialValue: 'Your revenue cycle, on our numbers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Hero Heading Highlight (Blue Text)',
      type: 'string',
      group: 'hero',
      initialValue: 'on our numbers',
      description: 'The highlighted portion of the hero heading',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading Paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Bring us the function that is hurting most. In 15 minutes we will show you what changes, what it costs, and how quickly it goes live.',
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
      title: 'Hero CTA Button Destination URL',
      type: 'string',
      group: 'hero',
      initialValue: '#contact-form',
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Background Image (Desktop)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero Background Image (Mobile)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── 02 · OPERATING INFO & LOCATIONS ──
    defineField({
      name: 'locations',
      title: 'Operating Info / Office Locations',
      type: 'array',
      group: 'operatingInfo',
      description: 'Office location cards displayed in the operating info section',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Location Card',
          fields: [
            defineField({
              name: 'tag',
              title: 'Location Tag',
              type: 'string',
              description: 'e.g. Operating Info - United States',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Entity / Title',
              type: 'string',
              initialValue: 'Waterlabs Inc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Full Address',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Contact Email',
              type: 'string',
              initialValue: 'info@waterlabs.ai',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hours',
              title: 'Operating Hours',
              type: 'string',
              description: 'e.g. Mon-Fri: 9:00 AM - 6:00 PM EST',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Label',
              type: 'string',
              initialValue: 'Get Directions',
            }),
            defineField({
              name: 'href',
              title: 'Directions Link / Map URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'tag',
              subtitle: 'address',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'operatingInfoBgImage',
      title: 'Operating Info Background Pattern',
      type: 'image',
      group: 'operatingInfo',
      options: { hotspot: true },
    }),

    // ── 03 · CONTACT FORM ──
    defineField({
      name: 'formTag',
      title: 'Form Section Tag',
      type: 'string',
      group: 'contactForm',
      initialValue: 'Send us a message',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Section Heading',
      type: 'string',
      group: 'contactForm',
      initialValue: 'Contact Form',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formImage',
      title: 'Form Left-side Illustration Image',
      type: 'image',
      group: 'contactForm',
      options: { hotspot: true },
    }),
    defineField({
      name: 'orgTypeOptions',
      title: 'Organization Type Options',
      type: 'array',
      group: 'contactForm',
      description: 'Options in the Organization Type dropdown selector',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: [
        'Health system',
        'Medical Group',
        'Community Health Center',
        'Outpatient Facility',
        'Hospital',
        'Other',
      ],
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Subscription Text',
      type: 'string',
      group: 'contactForm',
      initialValue:
        'Stay ahead of the curve. Sign up to receive exclusive Waterlabs updates, resources, and tips.',
    }),
    defineField({
      name: 'consentText',
      title: 'Consent Checkbox Text',
      type: 'string',
      group: 'contactForm',
      initialValue: 'I agree to receive other communications from Waterlabs.*',
    }),
    defineField({
      name: 'disclaimerText',
      title: 'Privacy Policy / Disclaimer Text',
      type: 'text',
      rows: 3,
      group: 'contactForm',
      initialValue:
        'You may unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Label',
      type: 'string',
      group: 'contactForm',
      initialValue: 'Submit',
    }),

    // ── 04 · CTA SECTION ──
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Start Building',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaHeadingHighlight',
      title: 'CTA Heading Highlight (Light Blue)',
      type: 'string',
      group: 'cta',
      initialValue: 'on Waterlabs today',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'cta',
      initialValue: 'Start Building',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/#discover',
    }),
    defineField({
      name: 'ctaBackgroundImageDesktop',
      title: 'CTA Background Image (Desktop)',
      type: 'image',
      group: 'cta',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaBackgroundImageMobile',
      title: 'CTA Background Image (Mobile)',
      type: 'image',
      group: 'cta',
      options: { hotspot: true },
    }),

    // ── 05 · SEO ──
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Contact Us | Waterlabs AI',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue:
        'Get in touch with Waterlabs AI. Contact us for questions, partnerships, or to learn more about our agentic AI solutions for healthcare revenue cycle management.',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubheading',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Contact Us Page Settings',
        subtitle: title || subtitle || 'Configure Contact Us page',
      };
    },
  },
});
