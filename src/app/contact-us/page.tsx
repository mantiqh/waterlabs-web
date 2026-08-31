import type { Metadata } from 'next';

import ContactUsPage from '@/components/contact-us/page';

export const metadata: Metadata = {
  title: 'Contact Us | Waterlabs AI',
  description: 'Get in touch with Waterlabs AI. Contact us for questions, partnerships, or to learn more about our agentic AI solutions for healthcare revenue cycle management.',
};

export default function Page() {
  return <ContactUsPage />;
}
