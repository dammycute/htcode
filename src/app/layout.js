import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Shell from '@/components/Shell';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });

const description =
  'Damilola Olawoore is a full-stack and backend developer in Ibadan, Nigeria, building APIs, data-driven systems and Next.js applications.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Damilola Olawoore | Full-stack and backend developer', template: '%s | Ht-code' },
  description,
  openGraph: { title: 'Damilola Olawoore | Full-stack and backend developer', description, type: 'website', siteName: 'Ht-code' },
  twitter: { card: 'summary_large_image', title: 'Damilola Olawoore | Full-stack and backend developer', description },
};

export const viewport = { themeColor: '#09090b' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
