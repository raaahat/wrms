import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import localFont from 'next/font/local';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { ModalProvider } from '@/providers/modal-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/providers/query-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
export const metadata: Metadata = {
  title: 'Work Request Management System',
  description:
    'A streamlined system for managing work requests between departments, enabling efficient request handling and task management for maintenance teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            geistSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <ModalProvider />
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
