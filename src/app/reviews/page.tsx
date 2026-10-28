import React from 'react';
import Link from 'next/link';
import { Star, BadgeCheck } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Customer Reviews',
  description: 'What customers say about our small-batch pickles.',
};

export default function ReviewsPage() {
  const jars = PRODUCTS.filter((p) => p.category !== 'bundle');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader title="What customers say" intro="Real notes from people who've opened a jar." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {jars.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="card-lift flex items-center justify-between p-4 rounded-2xl bg-white border border-forest-800/10"
          >
            <span className="font-semibold text-sm text-forest-900">{p.name}</span>
            <span className="flex items-center gap-1.5 text-sm text-forest-800">
              <Star className="w-4 h-4 fill-[#DE9B27] text-[#DE9B27]" />
              <strong>{p.rating.toFixed(1)}</strong>
              <span className="text-forest-800/50">({p.reviewCount})</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {REVIEWS.map((r) => (
          <figure key={r.id} className="card-lift p-6 rounded-[28px] bg-white border border-forest-800/10 flex flex-col gap-4">
            <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#DE9B27] text-[#DE9B27]" />
              ))}
            </div>
            <blockquote className="text-sm text-forest-800/90 leading-relaxed flex-1">“{r.comment}”</blockquote>
            <figcaption className="pt-4 border-t border-forest-800/10 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-forest-800 text-parchment-100 text-xs font-semibold flex items-center justify-center">
                {r.initials}
              </span>
              <div className="text-xs">
                <div className="font-semibold text-forest-900 flex items-center gap-1">
                  {r.author}
                  {r.verifiedPurchase && <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" aria-label="Verified purchase" />}
                </div>
                <div className="text-forest-800/60">{r.productName} · {r.date}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
