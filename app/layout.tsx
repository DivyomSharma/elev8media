import type { Metadata } from 'next';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Display font
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

// Body font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Elev8 Media | Precision Growth Engineered',
  description:
    'Strategic media development and marketing acceleration for brands ready to transcend current limitations. Growth agency under Plot Armour Studio.',
  keywords: [
    'growth agency',
    'marketing',
    'brand strategy',
    'digital marketing',
    'performance marketing',
    'media production',
  ],
  authors: [{ name: 'Elev8 Media' }],
  openGraph: {
    title: 'Elev8 Media | Precision Growth Engineered',
    description:
      'Strategic media development and marketing acceleration for brands ready to transcend current limitations.',
    url: 'https://elev8.media',
    siteName: 'Elev8 Media',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elev8 Media | Precision Growth Engineered',
    description:
      'Strategic media development and marketing acceleration for brands ready to transcend current limitations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
