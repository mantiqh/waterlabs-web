import './globals.css';

import type { Metadata } from 'next';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { Footer } from '@/components/common/footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const generalSans = localFont({
  src: [
    { path: '../../public/fonts/general-sans/200.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/general-sans/300.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/general-sans/400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/general-sans/500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/general-sans/600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/general-sans/700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Waterlabs Web',
  description: 'Waterlabs Next.js Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${generalSans.variable} ${ibmPlexSans.variable}`}>
      <body className={`${inter.variable} ${generalSans.variable} ${ibmPlexSans.variable} antialiased bg-[#F4F6F9]`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
