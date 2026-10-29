'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Flame, ShieldCheck, Package, MessageCircle, Star } from 'lucide-react';
import { PRODUCTS, REVIEWS, SITE_CONFIG, Product } from '@/config/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { NextDispatch } from '@/components/NextDispatch';

const SHELF = PRODUCTS.filter((p) => p.category !== 'bundle' && p.imageBg);
const FROM_PRICE = Math.min(...PRODUCTS.flatMap((p) => p.sizes.map((s) => s.price)));

const TRIO = [
  { slug: 'garlic-pickle', note: 'Whole peeled garlic in mustard oil and toasted spices.' },
  { slug: 'mixed-pickle', note: 'Citron, mango and ginger, sun-cured in gingelly oil.' },
  { slug: 'mango-pickle', note: 'Crisp raw mango with Guntur chilli and fenugreek.' },
];

const TRUST = [
  { icon: Leaf, title: 'Whole ingredients', text: 'Peeled garlic, raw mango and citron, cut by hand.' },
  { icon: Flame, title: 'Guntur chillies', text: 'Sun-roasted and stone-pounded in small lots.' },
  { icon: ShieldCheck, title: 'No preservatives', text: 'Cured with sea salt and pure gingelly oil.' },
  { icon: Package, title: 'Leak-proof packing', text: 'Glass jars, bubble-wrapped and shipped across India.' },
];

const SPICE_LEVELS = [
  { level: 1, label: 'Mild', desc: 'Best for curd rice, sensitive palates and kids.', title: 'Narthangai (Citron) Pickle', slug: 'narthangai-citron-pickle' },
  { level: 2, label: 'Gentle', desc: 'Comforting ginger warmth with citrus notes.', title: 'Mixed Pickle', slug: 'mixed-pickle' },
  { level: 3, label: 'Medium', desc: 'A balanced everyday South Indian kick with mustard aroma.', title: 'Mixed Pickle', slug: 'mixed-pickle' },
  { level: 4, label: 'Hot', desc: 'Guntur red chillies. Expect a little sweat.', title: 'Garlic Pickle', slug: 'garlic-pickle' },
  { level: 5, label: 'Fiery', desc: 'For people who already love hot pickle.', title: 'Mango Pickle', slug: 'mango-pickle' },
];

type Tab = 'all' | 'veg' | 'non-veg' | 'fiery';
const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'non-veg', label: 'Non-veg' },
  { id: 'fiery', label: 'Extra hot' },
];

const matchesTab = (p: Product, tab: Tab) =>
  tab === 'all' ||
  (tab === 'veg' && p.category === 'veg') ||
  (tab === 'non-veg' && p.category === 'non-veg') ||
  (tab === 'fiery' && p.category !== 'bundle' && p.spiceLevel >= 5);

export default function HomeClient() {
  const { addItem } = useCart();
  const [tab, setTab] = useState<Tab>('all');
  const [spice, setSpice] = useState(3);
  const [trioSizes, setTrioSizes] = useState<Record<string, string>>({
    'garlic-pickle': '500g',
    'mixed-pickle': '500g',
    'mango-pickle': '500g',
  });
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const visibleProducts = PRODUCTS.filter((p) => matchesTab(p, tab));
  const currentSpice = SPICE_LEVELS.find((s) => s.level === spice) ?? SPICE_LEVELS[2];

  const addTrio = (slug: string) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return;
    const size = product.sizes.find((s) => s.id === trioSizes[slug]) ?? product.sizes[0];
    addItem(product, size, 1);
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug(null), 1200);
  };

  return (
    <div className="bg-[#FAF8F2] text-[#1c1c18] font-sans antialiased">
      {/* Hero */}
      <section className="w-full bg-[#F1ECE0] overflow-hidden pt-10 pb-14 md:py-20 border-b border-[#1F3A1A]/[0.08]" id="hero">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 text-center lg:text-left z-10">
              <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-[64px] text-[#1F3A1A] leading-[1.05] tracking-tight">
                Bold flavours.
                <br />
                Real ingredients.
              </h1>
              <p className="mt-5 text-lg text-[#1F3A1A]/75 leading-relaxed max-w-md mx-auto lg:mx-0">
                Small-batch pickles made from the heart, with no added preservatives. Delivered across India.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1F3A1A] hover:bg-accent-500 text-[#FAF8F2] text-sm font-semibold transition-colors active:scale-95"
                >
                  Shop all pickles
                </Link>
                <Link href="/story" className="text-sm font-semibold text-accent-500 hover:underline underline-offset-4 py-2">
                  Our story
                </Link>
              </div>
              <p className="mt-6 text-sm text-[#1F3A1A]/75">
                Free shipping over ₹{SITE_CONFIG.freeShippingThreshold} · <NextDispatch />
              </p>
            </div>

            <div className="lg:col-span-7 flex items-center justify-center">
              <Image
                src="/assets/hero-floating-trio.png"
                alt="VM Pickle Pantry jars: Garlic, Mixed and Mango pickles"
                width={1024}
                height={1024}
                priority
                quality={95}
                className="w-full max-w-[620px] lg:max-w-none h-auto object-contain max-h-[580px] lg:max-h-[640px] animate-hero-float drop-shadow-jar-reflection select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Signature trio */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-trio">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1F3A1A] tracking-tight">Start with the classics.</h2>
          <p className="mt-4 text-lg text-[#1F3A1A]/75">
            Three jars we make every week. Pick a size and add it to your bag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TRIO.map(({ slug, note }) => {
            const product = PRODUCTS.find((p) => p.slug === slug);
            if (!product) return null;
            const size = product.sizes.find((s) => s.id === trioSizes[slug]) ?? product.sizes[0];
            const added = addedSlug === slug;
            return (
              <article key={slug} className="card-lift bg-white rounded-[32px] border border-[#1F3A1A]/10 p-6 sm:p-7 flex flex-col">
                <Link
                  href={`/product/${slug}`}
                  className="block w-full h-64 rounded-3xl overflow-hidden flex items-center justify-center mb-6"
                  style={{ backgroundColor: product.imageBg ?? '#F5F2EA' }}
                >
                  <Image src={product.image} alt={product.name} width={256} height={256} className="h-full w-auto object-contain" />
                </Link>
                <Link href={`/product/${slug}`}>
                  <h3 className="font-display font-semibold text-2xl text-[#1F3A1A]">{product.name}</h3>
                </Link>
                <p className="mt-2 text-sm text-[#1F3A1A]/75 leading-relaxed flex-1">{note}</p>

                <div className="mt-6 grid grid-cols-3 gap-2" role="radiogroup" aria-label={`${product.name} size`}>
                  {product.sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={trioSizes[slug] === s.id}
                      onClick={() => setTrioSizes((prev) => ({ ...prev, [slug]: s.id }))}
                      className={`py-2 rounded-xl text-sm font-medium border transition-colors ${
                        trioSizes[slug] === s.id
                          ? 'border-[#1F3A1A] bg-[#1F3A1A] text-white'
                          : 'border-[#1F3A1A]/15 text-[#1F3A1A] hover:border-[#1F3A1A]/40'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-display font-semibold text-3xl text-[#1F3A1A]">₹{size.price}</span>
                  <button
                    type="button"
                    onClick={() => addTrio(slug)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors active:scale-95 ${
                      added ? 'bg-accent-500' : 'bg-[#1F3A1A] hover:bg-accent-500'
                    }`}
                  >
                    {added ? 'Added' : 'Add to bag'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* What goes in */}
      <section className="border-y border-[#1F3A1A]/10 bg-white py-14 px-4 sm:px-6" aria-label="What goes into every jar">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST.map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-2 text-center lg:text-left">
              <Icon className="w-6 h-6 text-accent-500 mx-auto lg:mx-0" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-lg text-[#1F3A1A]">{title}</h3>
              <p className="text-sm text-[#1F3A1A]/75 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full range */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="pickles-collection">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1F3A1A] tracking-tight">The full range.</h2>
          <p className="mt-4 text-lg text-[#1F3A1A]/75">
            Made in small batches and bottled weekly. No fillers, no synthetic vinegar.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 bg-[#EFE9DD] p-1.5 rounded-full" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  tab === t.id ? 'bg-white text-[#1F3A1A] shadow-sm' : 'text-[#1F3A1A]/75 hover:text-[#1F3A1A]'
                }`}
              >
                {t.label}
                <span className="ml-1.5 text-[#1F3A1A]/75">{PRODUCTS.filter((p) => matchesTab(p, t.id)).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Spice guide */}
      <section className="py-20 bg-[#F1ECE0] border-y border-[#1F3A1A]/[0.08] px-4 sm:px-6" id="spice-meter">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1F3A1A] tracking-tight">How hot do you like it?</h2>
          <p className="mt-4 text-lg text-[#1F3A1A]/75">Choose a heat level and we&apos;ll suggest a jar.</p>

          <div className="mt-10 grid grid-cols-5 gap-2 sm:gap-3" role="radiogroup" aria-label="Heat level">
            {SPICE_LEVELS.map((s) => (
              <button
                key={s.level}
                type="button"
                role="radio"
                aria-checked={spice === s.level}
                onClick={() => setSpice(s.level)}
                className={`rounded-2xl py-4 px-1 text-center transition-colors border ${
                  spice === s.level ? 'bg-[#1F3A1A] border-[#1F3A1A] text-white' : 'bg-white border-[#1F3A1A]/10 text-[#1F3A1A] hover:border-[#1F3A1A]/40'
                }`}
              >
                <div className="font-display font-semibold text-2xl">{s.level}</div>
                <div className="text-xs sm:text-sm mt-0.5">{s.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-3xl border border-[#1F3A1A]/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <h3 className="font-display font-semibold text-xl text-[#1F3A1A]">{currentSpice.title}</h3>
              <p className="text-sm text-[#1F3A1A]/75 mt-1">{currentSpice.desc}</p>
            </div>
            <Link
              href={`/product/${currentSpice.slug}`}
              className="shrink-0 px-6 py-3 rounded-full bg-[#1F3A1A] hover:bg-accent-500 text-white text-sm font-semibold transition-colors"
            >
              View this jar
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="founder-story">
        <div className="bg-white rounded-[36px] border border-[#1F3A1A]/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16">
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#1F3A1A] leading-tight tracking-tight">
                From the flavours of Kanyakumari to the heart of Mumbai.
              </h2>
              <p className="mt-6 text-base text-[#1c1c18]/75 leading-relaxed max-w-xl">
                VM Pickle Pantry is built around the passion and vision of its founder, Vimal Magesh, an entrepreneur from the coastal region of Kanyakumari, Tamil Nadu. Her love of cooking and of traditional South Indian flavours is what this brand is made from.
              </p>
              <p className="mt-6 font-display font-semibold text-xl text-[#1F3A1A]">Tradition in every taste.</p>
              <Link href="/story" className="mt-6 inline-block text-sm font-semibold text-accent-500 hover:underline underline-offset-4">
                Read our story
              </Link>
            </div>
            <div className="lg:col-span-5 bg-black">
              <div className="relative aspect-square">
                <Image
                  src="/assets/jars/mixed-pickle.jpg"
                  alt="A jar of VM Pickle Pantry Mixed Pickle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews */}
      <section className="py-20 bg-white border-y border-[#1F3A1A]/10 px-4 sm:px-6" aria-label="Customer reviews">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1F3A1A] tracking-tight">Loved across India.</h2>
            <p className="mt-4 text-lg text-[#1F3A1A]/75">From Bengaluru to Delhi, and a few kitchens in between.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure key={r.id} className="p-7 rounded-[28px] bg-[#FAF8F2] border border-[#1F3A1A]/10 flex flex-col">
                <div className="flex gap-0.5 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#DE9B27] text-[#DE9B27]" />
                  ))}
                </div>
                <blockquote className="text-[15px] text-[#1c1c18]/80 leading-relaxed flex-1">&ldquo;{r.comment}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[#1F3A1A]/10 text-sm">
                  <div className="font-semibold text-[#1F3A1A]">{r.author}</div>
                  <div className="text-[#1c1c18]/75">{r.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/reviews" className="text-sm font-semibold text-accent-500 hover:underline underline-offset-4">
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      {/* The shelf: black jar photos sit on a black band so the jars appear to float */}
      <section className="bg-black py-20 sm:py-28 px-4 sm:px-6" aria-label="The whole pantry">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl text-white tracking-tight">Six jars. One kitchen.</h2>
            <p className="mt-4 text-lg text-white/60">
              Each one made the way it was at home, with nothing added to make it last.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-8 sm:gap-x-4">
            {SHELF.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group block text-center">
                <div className="relative aspect-square">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 font-display font-semibold text-lg text-white">{p.name.replace(' Pickle', '')}</div>
                <div className="text-sm text-white/50">from ₹{Math.min(...p.sizes.map((s) => s.price))}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Order bar: always one tap from ordering */}
      <aside
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-40 bg-[#122410]/95 backdrop-blur-md text-white p-3 pl-4 rounded-full shadow-2xl border border-white/10 flex items-center justify-between gap-3"
        aria-label="Quick order"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">Order fresh pickles</div>
          <div className="text-xs text-white/60">From ₹{FROM_PRICE} · Free shipping over ₹{SITE_CONFIG.freeShippingThreshold}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center transition-colors"
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <Link href="/shop" className="px-5 py-2.5 rounded-full bg-[#FAF8F2] hover:bg-white text-[#1F3A1A] text-sm font-semibold transition-colors">
            Shop
          </Link>
        </div>
      </aside>
    </div>
  );
}
