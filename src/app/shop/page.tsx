'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/config/products';
import { ProductCard } from '@/components/ProductCard';
import { Sparkles } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<'all' | 'veg' | 'non-veg' | 'bundle'>(
    (categoryParam as 'all' | 'veg' | 'non-veg' | 'bundle') || 'all'
  );
  // Keep the filter in sync when navbar links change ?category while already on /shop
  useEffect(() => {
    const valid = ['all', 'veg', 'non-veg', 'bundle'];
    setActiveCategory(categoryParam && valid.includes(categoryParam) ? (categoryParam as typeof activeCategory) : 'all');
  }, [categoryParam]);

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory === 'veg') {
      list = list.filter((p) => p.category === 'veg');
    } else if (activeCategory === 'non-veg') {
      list = list.filter((p) => p.category === 'non-veg');
    } else if (activeCategory === 'bundle') {
      list = list.filter((p) => p.category === 'bundle');
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-forest-900 tracking-tight">
          All our pickles
        </h1>
        <p className="text-base text-forest-800/75">
          Purely homemade. Cold-pressed sesame oil. Zero added preservatives.
        </p>
      </div>

      {/* Filter Tabs & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-forest-800/10 pb-6">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-forest-800 text-parchment-100 shadow-sm'
                : 'bg-parchment-100 text-forest-800 hover:bg-white border border-forest-800/15'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('veg')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCategory === 'veg'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-parchment-100 text-emerald-900 hover:bg-white border border-emerald-800/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>100% Veg</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('non-veg')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCategory === 'non-veg'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-parchment-100 text-red-900 hover:bg-white border border-red-800/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Non-Veg</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('bundle')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'bundle'
                ? 'bg-forest-800 text-olive-400 shadow-sm'
                : 'bg-parchment-100 text-forest-900 hover:bg-white border border-forest-800/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-forest-600" />
            <span>Gift Boxes</span>
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-forest-900">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-1.5 px-3 rounded-lg border border-forest-800/20 bg-white text-forest-900 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-forest-800">Loading pickles...</div>}>
      <ShopContent />
    </Suspense>
  );
}
