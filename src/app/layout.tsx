import type { Metadata } from 'next';
import { Fraunces, Inter, Caveat, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SITE_CONFIG, PRODUCTS } from '@/config/products';

const ALL_PRICES = PRODUCTS.flatMap((p) => p.sizes.map((s) => s.price));

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vmpicklepantry.com'),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: 'Purely homemade Indian pickles — Garlic, Mango, Mixed, Narthangai Citron, Boneless Chicken & Mutton pickles made with cold-pressed oils & zero added preservatives.',
  keywords: [
    'VM Pickle Pantry',
    'homemade Indian pickle',
    'Narthangai Citron pickle',
    'Garlic Inferno pickle',
    'boneless chicken pickle',
    'mutton pickle',
    'south indian pickle online',
  ],
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    images: ['/assets/hero-floating-trio.png'],
    locale: 'en_IN',
    type: 'website',
    url: 'https://vmpicklepantry.com',
  },
  alternates: {
    canonical: 'https://vmpicklepantry.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    url: 'https://vmpicklepantry.com',
    logo: 'https://vmpicklepantry.com/assets/logo.png',
    currenciesAccepted: 'INR',
    priceRange: `₹${Math.min(...ALL_PRICES)} - ₹${Math.max(...ALL_PRICES)}`,
    servesCuisine: 'South Indian Homemade Pickles',
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${outfit.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#EFE9DD] text-[#1F3A1A] antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
