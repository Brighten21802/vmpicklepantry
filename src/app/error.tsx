'use client';

import React from 'react';
import Link from 'next/link';

// Shown if something unexpected fails while a page is rendering, instead of a blank screen.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-5">
      <h1 className="font-display font-semibold text-4xl sm:text-5xl text-forest-900 tracking-tight">
        Something went wrong
      </h1>
      <p className="text-base text-forest-800/75">
        This page didn&apos;t load properly. Try again, or order directly on WhatsApp.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={reset}
          className="px-7 py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-7 py-3 rounded-full border border-forest-800/20 text-forest-900 text-sm font-semibold hover:bg-white transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
