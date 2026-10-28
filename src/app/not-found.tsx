import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-5">
      <h1 className="font-display font-semibold text-5xl text-forest-900 tracking-tight">We couldn&apos;t find that page</h1>
      <p className="text-base text-forest-800/70">
        The link may be old or mistyped. The pickles are still here.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link href="/shop" className="px-7 py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors">
          Shop all pickles
        </Link>
        <Link href="/" className="px-7 py-3 rounded-full border border-forest-800/20 text-forest-900 text-sm font-semibold hover:bg-white transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
