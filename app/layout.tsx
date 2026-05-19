import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from './providers';
import { Footer } from '@/components/footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'FitCheck',
  description: 'A full-stack fitness tracking app with BMI, TDEE, goals, and personalized plans.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(manrope.variable, spaceGrotesk.variable)} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const storedTheme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
              document.documentElement.classList.toggle('dark', shouldUseDark);
            } catch (error) {
              document.documentElement.classList.remove('dark');
            }
          })();`}
        </Script>
      </head>
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <Providers>
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
