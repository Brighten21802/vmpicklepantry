import type { Metadata } from 'next';

export const SITE_URL = 'https://vmpicklepantry.com';
export const SITE_NAME = 'VM Pickle Pantry';
export const DEFAULT_TITLE = 'VM Pickle Pantry | Authentic Pickles & Traditional Flavours';
export const DEFAULT_DESCRIPTION =
  'Small-batch South Indian pickles: garlic, mixed, mango, citron, chicken and mutton. Order from VM Pickle Pantry online or on WhatsApp across India.';

/** 1200x630 share image, used for Open Graph and Twitter cards. */
export const SHARE_IMAGE = {
  // Absolute on purpose: Vercel rewrites the host of relative image URLs on preview builds.
  url: `${SITE_URL}/assets/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'VM Pickle Pantry garlic, mixed and mango pickle jars',
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Trims to a whole word near `max` characters so meta descriptions don't cut off mid-word. */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—]+$/, '') + '…';
}

interface PageMeta {
  title: string;
  description: string;
  /** Path of this page, e.g. "/story". It becomes the canonical URL. */
  path: string;
  /** Use the title exactly as written, without the " | VM Pickle Pantry" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
}

/** One place that builds title, description, canonical, Open Graph and Twitter tags for a page. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, images }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const shareImages = images ?? [SHARE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: fullTitle,
      description,
      url: path,
      images: shareImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: shareImages.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
