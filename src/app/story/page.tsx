import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrustBadges } from '@/components/TrustBadges';
import { SITE_CONFIG } from '@/config/products';

export const metadata = {
  title: 'Our Story',
  description: 'VM Pickle Pantry is founded by Vimal Magesh, who brings the flavours of Kanyakumari to Mumbai.',
};

/**
 * Add Vimal's real portrait by putting the file in /public/assets and setting its path here,
 * for example '/assets/vimal-magesh.jpg'. Until then the page shows our jar photography.
 */
const FOUNDER_PORTRAIT: string | null = null;

const TERRACOTTA = '#B4634A';

const HIGHLIGHTS = [
  { label: 'Founded by', value: 'Vimal Magesh' },
  { label: 'Roots', value: 'Kanyakumari, Tamil Nadu' },
  { label: 'Based in', value: 'Mumbai, Maharashtra' },
  { label: 'Restaurant', value: 'MKS Cooking, Marol, Mumbai', href: SITE_CONFIG.mksCookingUrl },
];

export default function StoryPage() {
  return (
    <div className="pb-24">
      {/* Story */}
      <section className="bg-[#F6F1E7] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-black shadow-xl">
              {FOUNDER_PORTRAIT ? (
                <Image
                  src={FOUNDER_PORTRAIT}
                  alt="Vimal Magesh, founder of VM Pickle Pantry"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/assets/jars/narthangai-citron.jpg"
                  alt="A jar of VM Pickle Pantry Narthangai pickle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up motion-reduce:animate-none">
            <header className="space-y-4">
              <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-[#3E2A1E] leading-[1.05] tracking-tight">
                Our Story, Rooted in Tradition
              </h1>
              <p className="font-display italic text-xl sm:text-2xl text-[#1F3A1A]/80">
                From the flavours of Kanyakumari to the heart of Mumbai.
              </p>
            </header>

            <div className="space-y-5 text-[17px] leading-[1.8] text-[#3E2A1E]/85 max-w-2xl">
              <p>
                VM Pickle Pantry is built around the passion and vision of its founder, <strong className="text-[#3E2A1E]">Vimal Magesh</strong>, an entrepreneur from the beautiful coastal region of Kanyakumari, Tamil Nadu.
              </p>
              <p>
                With a genuine love for cooking and a deep appreciation for traditional South Indian flavours, Vimal brings together her culinary passion and entrepreneurial spirit to share the taste of familiar, comforting food with more people.
              </p>
              <p>
                Her journey has brought her to Mumbai, where she continues to pursue her passion for food and business. Alongside VM Pickle Pantry, she is associated with <strong className="text-[#3E2A1E]">MKS Cooking, her restaurant in Marol, Mumbai</strong>, where her food journey continues to grow.
              </p>
              <p>
                For Vimal, food is about more than taste. It is about memories, culture, the joy of sharing a meal, and the distinctive flavours that connect people to their roots.
              </p>
              <p>
                VM Pickle Pantry reflects this philosophy through its range of pickles, inspired by traditional flavours and the love of good food. Each product represents the spirit of preserving culinary traditions while building something meaningful for the future.
              </p>
              <p>
                From Kanyakumari to Mumbai, Vimal&apos;s journey reflects her commitment to turning her passion for cooking into a growing food business.
              </p>
            </div>

            <p className="font-display font-semibold text-2xl text-[#1F3A1A]">
              VM Pickle Pantry — Tradition in Every Taste.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 rounded-full bg-[#1F3A1A] hover:bg-accent-500 text-[#FAF8F2] text-sm font-semibold transition-colors"
              >
                Explore Our Pickles
              </Link>
              <a
                href={SITE_CONFIG.mksCookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent-500 hover:underline underline-offset-4"
              >
                Discover MKS Cooking
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kanyakumari to Mumbai */}
      <section className="bg-[#3E2A1E] text-[#F6F1E7] px-4 sm:px-6 lg:px-8 py-14 sm:py-16" aria-label="Kanyakumari to Mumbai">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 text-left">
              <div className="font-display font-semibold text-2xl sm:text-3xl">Kanyakumari</div>
              <div className="text-sm text-[#F6F1E7]/60">Tamil Nadu · where it began</div>
            </div>
            <div className="flex-1 flex items-center" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F6F1E7]" />
              <span className="flex-1 border-t-2 border-dashed" style={{ borderColor: `${TERRACOTTA}99` }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: TERRACOTTA }} />
            </div>
            <div className="shrink-0 text-right">
              <div className="font-display font-semibold text-2xl sm:text-3xl">Mumbai</div>
              <div className="text-sm text-[#F6F1E7]/60">Maharashtra · where it grows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder highlights */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <dl className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="rounded-[24px] bg-white border border-[#3E2A1E]/10 p-6">
              <dt className="text-sm text-[#3E2A1E]/55">{h.label}</dt>
              <dd className="mt-1 font-display font-semibold text-lg text-[#1F3A1A] leading-snug">{h.value}</dd>
              {h.href && (
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-accent-500 hover:underline underline-offset-4">
                  Discover MKS Cooking
                </a>
              )}
            </div>
          ))}
        </dl>
      </section>

      <TrustBadges />
    </div>
  );
}
