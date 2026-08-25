import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700,800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased bg-[#F4F6F9]`}>
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
