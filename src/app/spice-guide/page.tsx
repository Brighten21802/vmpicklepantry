import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pickle Spice Guide',
  description: "Find the right pickle for your heat tolerance, from mild citron to fiery Guntur chilli.",
  path: '/spice-guide',
});

export default function SpiceGuidePage() {
  const jars = PRODUCTS.filter((p) => p.category !== 'bundle').sort((a, b) => a.spiceLevel - b.spiceLevel);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader
        title="Find your heat"
        intro="Every jar is rated from 1 to 5. Start low if you're new to South Indian pickles, and work your way up."
      />

      <div className="space-y-4">
        {jars.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="card-lift group flex items-center gap-5 sm:gap-8 p-4 sm:p-5 rounded-[28px] bg-white border border-forest-800/10"
          >
            <div
              className={`shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex items-center justify-center ${
                p.imageBg ? '' : 'bg-gradient-to-b from-[#F9F4EA] to-[#EFE6D2]'
              }`}
              style={p.imageBg ? { backgroundColor: p.imageBg } : undefined}
            >
              {p.imageBg ? (
                <Image src={p.image} alt={p.name} width={128} height={128} className="h-full w-full object-contain" />
              ) : (
                <Image src={p.image} alt={p.name} width={110} height={120} className="max-h-24 sm:max-h-28 w-auto object-contain drop-shadow-md" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="flex gap-1" aria-label={`Spice level ${p.spiceLevel} of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={`h-2 w-5 rounded-full ${n <= p.spiceLevel ? 'bg-accent-500' : 'bg-stone-200'}`} />
                  ))}
                </span>
                <span className="text-sm font-semibold text-accent-500">{p.spiceLabel}</span>
              </div>
              <h2 className="font-display font-semibold text-xl sm:text-2xl text-forest-900 group-hover:text-accent-500 transition-colors">
                {p.name}
              </h2>
              <p className="text-sm text-forest-800/75 leading-relaxed">{p.tasteProfile.join(' · ')}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-[28px] bg-forest-800 text-parchment-100 p-8 sm:p-10 text-center space-y-3">
        <h2 className="font-display font-semibold text-2xl sm:text-3xl">Can't decide?</h2>
        <p className="text-sm text-parchment-100/80 max-w-md mx-auto">
          The Pickle Trio gives you three different jars to try at a lower price than buying them separately.
        </p>
        <Link href="/product/pickle-trio-bundle" className="inline-block mt-2 px-7 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors">
          View the Pickle Trio
        </Link>
      </div>
    </div>
  );
}
