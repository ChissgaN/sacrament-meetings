import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sacrament Meeting Planner',
    template: '%s | Sacrament Meeting Planner',
  },
  description: 'Plan, review, and print sacrament meeting programs.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-10 focus:rounded focus:bg-surface focus:p-2 print:hidden"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 print:max-w-none print:p-0"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
