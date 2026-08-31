import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SITE } from '@/lib/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Backdrop from '@/components/Backdrop';
import './globals.css';

/**
 * Built entirely from first-party constants, so the inline script carries no
 * injection risk. `isPartOf` binds the academy to zephryx.in rather than
 * letting search engines resolve it as an unrelated organisation.
 */
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  parentOrganization: { '@type': 'Organization', name: SITE.parentName, url: SITE.parentUrl },
  knowsAbout: [
    'Penetration Testing',
    'Active Directory Security',
    'Offensive Security',
    'Detection Engineering',
    'Adversary Emulation',
  ],
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Hands-on Offensive Security Training`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'offensive security training',
    'penetration testing course',
    'active directory attacks',
    'detection engineering course',
    'ethical hacking training',
    'Zephryx Academy',
  ],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Hands-on Offensive Security Training`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamzephryx',
    creator: '@iamzephryx',
    title: `${SITE.name} — Hands-on Offensive Security Training`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE.url },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#06070a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red-core focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white"
        >
          skip to content
        </a>

        <Backdrop />
        <Nav />

        {/* tabIndex lets the skip link move focus here, not just scroll here —
            without it the next Tab lands back in the nav it was meant to skip. */}
        <main id="main" tabIndex={-1} className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
