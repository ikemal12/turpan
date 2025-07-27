import { Geist } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Turpan Uyghur Restaurant | Authentic Central Asian Cuisine in London',
  description: 'Experience authentic Uyghur cuisine in the heart of London. Hand-pulled noodles, traditional lamb dishes, and tandoor breads. Book your table today.',
  keywords: 'Uyghur restaurant, Central Asian food, hand-pulled noodles, London restaurant, authentic cuisine, laghman, tandoor, halal food',
  openGraph: {
    title: 'Turpan Uyghur Restaurant',
    description: 'Authentic Uyghur cuisine bringing the flavors of Central Asia to London',
    url: 'https://turpanuyghur.com',
    siteName: 'Turpan Restaurant',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}