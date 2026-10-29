import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SITE_CONFIG } from '@/config/products';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SHARE_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Only Fraunces (the headings) is loaded. Inter, Plus Jakarta Sans, Outfit and Caveat used to be loaded
// too, but globals.css asks for them by plain name, which never matched the names Next 14 registered,
// so they never rendered: body text has always used the visitor's default sans-serif.
// They are no longer downloaded, which keeps the look identical and saves four font downloads per visit.
// To switch the intended fonts on, load them here again (and see the font variables in globals.css).

// Icons come from src/app/icon.png, apple-icon.png and favicon.ico (Next.js picks these up by file name).
// Each page sets its own canonical URL through pageMetadata(); there is deliberately no site-wide canonical here.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F3A1A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only facts the site itself states: the brand, its logo, its founder and its WhatsApp number.
  // No ratings, reviews, addresses or opening hours.
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/assets/logo.png'),
    description: DEFAULT_DESCRIPTION,
    founder: { '@type': 'Person', name: 'Vimal Magesh' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${SITE_CONFIG.whatsappNumber}`,
      },
    ],
  };
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <html
      lang="en-IN"
      className={fraunces.variable}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      </head>
      <body className="bg-[#EFE9DD] text-[#1F3A1A] antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-[#1F3A1A] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
