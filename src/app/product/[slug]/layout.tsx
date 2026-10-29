import type { Metadata } from 'next';
import { PRODUCTS } from '@/config/products';
import { SITE_NAME, SITE_URL, absoluteUrl, pageMetadata, truncate } from '@/lib/seo';

// The product page itself is a client component, so its title, description and structured data live here.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  return pageMetadata({
    title: product.name,
    description: truncate(`${product.subtitle}. ${product.description}`),
    path: `/product/${product.slug}`,
    images: [{ url: absoluteUrl(product.image), alt: `${product.name} jar by ${SITE_NAME}` }],
  });
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return children;

  const url = absoluteUrl(`/product/${product.slug}`);

  // Names, descriptions, images and prices come straight from the product data.
  // Ratings and reviews are left out on purpose, and stock status is not claimed.
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.description,
    image: [absoluteUrl(product.image)],
    sku: product.slug,
    brand: { '@type': 'Brand', name: SITE_NAME },
    url,
    offers: product.sizes.map((size) => ({
      '@type': 'Offer',
      name: `${product.name} ${size.name}`,
      price: size.price,
      priceCurrency: 'INR',
      url,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: absoluteUrl('/shop') },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  );
}
