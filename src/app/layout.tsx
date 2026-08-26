import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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

import { RootProvider } from '@/context/root-provider';

export const metadata: Metadata = {
  title: 'Waterlabs Web',
  description: 'Waterlabs Next.js Application',
};

import { Footer } from '@/components/common/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${generalSans.variable}`}>
      <body className={`${inter.variable} ${generalSans.variable} antialiased bg-[#F4F6F9]`}>
        <RootProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
