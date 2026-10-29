'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, ProductSize, SITE_CONFIG } from '@/config/products';
import { SizeSelector } from '@/components/SizeSelector';
import { VegNonVegBadge } from '@/components/VegNonVegBadge';
import { TrustBadges } from '@/components/TrustBadges';import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const defaultSize = product.sizes.find((s) => s.isPopular) || product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'taste' | 'storage' | 'promise'>('ingredients');
  const [added, setAdded] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState('');

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[1-9]\d{5}$/.test(pincodeInput)) {
      setPincodeMessage(`Pincode ${pincodeInput} looks valid. Delivery usually takes 2 to 4 business days after dispatch.`);
    } else {
      setPincodeMessage('Please enter a valid 6-digit Indian postal code.');
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs font-semibold text-forest-800/60">
          <Link href="/" className="hover:text-forest-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-forest-900">Shop</Link>
          <span>/</span>
          <span className="text-forest-900 font-bold">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Photography & Badges */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-parchment-100 border-2 border-forest-800/15 shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <VegNonVegBadge isVeg={product.isVeg} showText className="bg-white/90 backdrop-blur-xs p-1.5 px-3 rounded-full border border-forest-800/10 shadow-sm" />
                {product.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[10px] font-bold bg-forest-800 text-parchment-100 border border-forest-700 shadow-sm text-left"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Guarantees Row */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white border border-forest-800/10">
                <span className="block text-[10px] font-bold text-forest-800/60">Shelf Life</span>
                <span className="text-xs font-bold text-forest-900">{product.shelfLife}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-forest-800/10">
                <span className="block text-[10px] font-bold text-forest-800/60">Batch</span>
                <span className="text-xs font-bold text-forest-900">Made Weekly</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-forest-800/10">
                <span className="block text-[10px] font-bold text-forest-800/60">Preservatives</span>
                <span className="text-xs font-bold text-emerald-800">0% Added</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Size Selector, Pricing & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-forest-800/60 text-xs font-normal">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>
                <span className="text-xs text-forest-800/70 font-mono">
                  SKU: {product.slug}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-forest-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-serif italic text-forest-800/80 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Sensory Tagline & Notes */}
            <div className="p-4 rounded-xl bg-parchment-100 border border-forest-800/10 space-y-2">
              <div className="text-xs font-bold text-olive-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Taste & Aroma Profile
              </div>
              <p className="text-xs text-forest-900 leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tasteProfile.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white text-forest-800 border border-forest-800/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Starbucks-Style Size & Pricing Selector */}
            <div className="p-5 rounded-2xl bg-white border border-forest-800/15 shadow-sm space-y-4">
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              <div className="pt-3 border-t border-forest-800/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-forest-800/60 font-bold ">
                    Total ({selectedSize.name} • {selectedSize.volume})
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-forest-900">
                      ₹{selectedSize.price}
                    </span>
                    <span className="text-xs text-forest-800/60">
                      (₹{selectedSize.pricePer100g}/100g)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3.5 px-8 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-forest-800 text-parchment-100 hover:bg-forest-900'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-olive-400" />
                      <span>Add to bag • ₹{selectedSize.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pincode Check Widget */}
            <div className="p-4 rounded-xl bg-parchment-100 border border-forest-800/10 space-y-2">
              <label className="block text-xs font-semibold text-forest-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-forest-800" />
                Check Delivery Availability
              </label>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-forest-800/20 bg-white focus:outline-none focus:border-forest-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-800 text-parchment-100 text-xs font-bold rounded-lg hover:bg-forest-900"
                >
                  Check
                </button>
              </form>
              {pincodeMessage && (
                <p className="text-xs font-medium text-emerald-800 pt-1">
                  {pincodeMessage}
                </p>
              )}
            </div>

            {/* Expandable Tabs Accordion */}
            <div className="border border-forest-800/15 rounded-2xl overflow-hidden bg-white">
              <div className="flex border-b border-forest-800/10 bg-parchment-100 text-xs font-bold text-forest-900">
                <button
                  type="button"
                  onClick={() => setActiveTab('ingredients')}
                  className={`flex-1 py-3 px-4 text-center border-r border-forest-800/10 ${
                    activeTab === 'ingredients' ? 'bg-white text-forest-900 border-b-2 border-b-forest-800' : 'text-forest-800/60'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('taste')}
                  className={`flex-1 py-3 px-4 text-center border-r border-forest-800/10 ${
                    activeTab === 'taste' ? 'bg-white text-forest-900 border-b-2 border-b-forest-800' : 'text-forest-800/60'
                  }`}
                >
                  Taste Notes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('storage')}
                  className={`flex-1 py-3 px-4 text-center border-r border-forest-800/10 ${
                    activeTab === 'storage' ? 'bg-white text-forest-900 border-b-2 border-b-forest-800' : 'text-forest-800/60'
                  }`}
                >
                  Storage
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('promise')}
                  className={`flex-1 py-3 px-4 text-center ${
                    activeTab === 'promise' ? 'bg-white text-forest-900 border-b-2 border-b-forest-800' : 'text-forest-800/60'
                  }`}
                >
                  Promise
                </button>
              </div>

              <div className="p-4 text-xs text-forest-800/90 leading-relaxed">
                {activeTab === 'ingredients' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'taste' && (
                  <p>{product.tagline}. Handcrafted with traditional recipe ratios to deliver clean, unadulterated flavor without diluted vinegar.</p>
                )}
                {activeTab === 'storage' && (
                  <p>{product.howToStore}</p>
                )}
                {activeTab === 'promise' && (
                  <p>{SITE_CONFIG.tastePromise}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Goes well with" CROSS-SELL SECTION */}
      {product.goesWellWith.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-parchment-100 border border-forest-800/15 space-y-6">
            <div>
              <h2 className="font-display text-2xl text-forest-900">
                Goes well with
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.goesWellWith.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-forest-800/10 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-parchment-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-forest-900">{item.name}</h4>
                      <p className="text-[10px] text-forest-800/70">{item.description}</p>
                      <span className="font-display text-xs text-forest-900 mt-1 block">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(
                        product,
                        {
                          // Own id so the add-on doesn't merge into the 250g jar line
                          id: `addon-${item.id}` as ProductSize['id'],
                          name: item.name,
                          volume: '250g',
                          volumeMl: 250,
                          price: item.price,
                          pricePer100g: Math.round(item.price / 2.5),
                        },
                        1
                      );
                    }}
                    className="py-1.5 px-3 rounded-lg bg-forest-800 text-parchment-100 text-xs font-bold hover:bg-forest-900 shrink-0"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <TrustBadges />

      {/* STICKY BOTTOM MOBILE ADD TO CART BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-parchment-100/95 backdrop-blur-md border-t border-forest-800/20 p-3 px-4 z-40 lg:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] font-bold text-forest-800/60 block">
            {selectedSize.name} ({selectedSize.volume})
          </span>
          <span className="font-display text-xl text-forest-900">₹{selectedSize.price}</span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-forest-800 text-parchment-100 font-bold text-xs hover:bg-forest-900 flex items-center justify-center gap-2 shadow-md"
        >
          <ShoppingBag className="w-4 h-4 text-olive-400" />
          <span>Add to bag</span>
        </button>
      </div>
    </div>
  );
}
