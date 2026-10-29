import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/config/products';

const BASE = 'https://vmpicklepantry.com';

const PAGES = [
  '',
  '/shop',
  '/gift-sets',
  '/spice-guide',
  '/recipes',
  '/process',
  '/story',
  '/reviews',
  '/faq',
  '/contact',
  '/corporate-gifting',
  '/shipping-returns',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${BASE}${path}` })),
    ...PRODUCTS.map((p) => ({ url: `${BASE}/product/${p.slug}` })),
  ];
}
