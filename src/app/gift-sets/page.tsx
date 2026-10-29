import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/config/products';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pickle Gift Sets',
  description: "Pickle gift boxes from VM Pickle Pantry for festivals, weddings and thank-yous.",
  path: '/gift-sets',
});

export default function GiftSetsPage() {
  const sets = PRODUCTS.filter((p) => p.category === 'bundle');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader
        title="Gift sets"
        intro="Three of our most loved pickles in one box. A good gift for anyone who cooks, or anyone who misses home cooking."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {sets.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="rounded-[28px] bg-white border border-forest-800/10 p-8 sm:p-10 text-center space-y-3">
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-forest-900">Need many boxes, or your own mix?</h2>
        <p className="text-sm text-forest-800/75 max-w-md mx-auto leading-relaxed">
          For weddings, festivals, teams and clients, we can pack custom hampers and deliver to several addresses.
        </p>
        <Link
          href="/corporate-gifting"
          className="inline-block mt-2 px-7 py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors"
        >
          Ask for a quote
        </Link>
      </div>
    </div>
  );
}
