import type { Metadata } from 'next';
import { PRODUCTS } from '@/config/products';

// The product page itself is a client component, so its title and description are set here.
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: product.name, description: product.tagline, images: [product.image] },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
