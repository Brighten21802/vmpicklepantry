import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Shop Pickles Online',
  description: "Shop VM Pickle Pantry's veg and non-veg pickles and gift sets. Pick your pack size and order online or on WhatsApp.",
  path: '/shop',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
