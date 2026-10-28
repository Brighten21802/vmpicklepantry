'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductSize } from '@/config/products';
import { VegNonVegBadge } from './VegNonVegBadge';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const defaultSize = product.sizes.find((s) => s.isPopular) || product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article className="card-lift bg-white rounded-[28px] border border-stone-200 overflow-hidden flex flex-col group h-full justify-between">
      <div>
        {/* Top Image Box */}
        <div
          className={`relative flex items-center justify-center overflow-hidden border-b border-stone-100 h-64 ${
            product.imageBg ? '' : 'bg-gradient-to-b from-[#F9F4EA] to-[#EFE6D2] p-6'
          }`}
          style={product.imageBg ? { backgroundColor: product.imageBg } : undefined}
        >
          <div className="absolute top-4 left-4 z-10">
            <VegNonVegBadge isVeg={product.isVeg} />
          </div>

          {product.badges.length > 0 && (
            <span className="absolute top-4 right-4 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.badges[0]}
            </span>
          )}

          <Link href={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
            {product.imageBg ? (
              <Image
                src={product.image}
                alt={product.name}
                width={256}
                height={256}
                className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                width={220}
                height={240}
                className="max-h-52 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />
            )}
          </Link>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium truncate mr-2">{product.subtitle || product.tagline}</span>
            <span
              className="inline-flex items-center gap-1.5 text-accent-500 font-bold whitespace-nowrap"
              title={`Spice level ${product.spiceLevel} of 5`}
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-1.5 w-1.5 rounded-full ${n <= product.spiceLevel ? 'bg-accent-500' : 'bg-stone-200'}`}
                  />
                ))}
              </span>
              {product.spiceLabel}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-[#1F3A1A] group-hover:text-accent-500 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Size Selector & Action */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-semibold text-stone-500 ">
              Pack Size:
            </label>
            <span className="text-[10px] text-stone-400 font-mono">
              ₹{selectedSize.pricePer100g}/100g
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize.id === sz.id;
              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 px-1 rounded-xl text-center text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#1F3A1A] text-white border-[#1F3A1A] shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {sz.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 block -mb-0.5 font-mono">Price:</span>
              <span className="text-xl font-bold font-['Outfit',sans-serif] text-[#1F3A1A]">
                ₹{selectedSize.price}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`text-xs font-bold px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1F3A1A] hover:bg-accent-500 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <span>Add to bag</span>
                  <span className="text-base leading-none font-bold">+</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
