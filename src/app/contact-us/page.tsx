import type { Metadata } from 'next';

import ContactUsPage from '@/components/contact-us/page';
import { fetchContactUsPageSettings } from '@/sanity/lib/contact-us';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchContactUsPageSettings();
  return {
    title: data.metaTitle || 'Contact Us | Waterlabs AI',
    description:
      data.metaDescription ||
      'Get in touch with Waterlabs AI. Contact us for questions, partnerships, or to learn more about our agentic AI solutions for healthcare revenue cycle management.',
  };
}

export default async function Page() {
  const data = await fetchContactUsPageSettings();
  return <ContactUsPage data={data} />;
}
