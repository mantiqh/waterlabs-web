'use client';

import React from 'react';

import ContactUsContactForm from './contact-form';
import ContactUsCTASection from './cta-section';
import ContactUsHeroSection from './hero-section';
import ContactUsOperatingInfo from './operating-info';

export const ContactUsPage: React.FC = () => {
  return (
    <main className="w-full flex flex-col">
      <ContactUsHeroSection />
      <ContactUsOperatingInfo />
      <ContactUsContactForm />
      <ContactUsCTASection />
    </main>
  );
};

export default ContactUsPage;
