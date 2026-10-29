import React from 'react';
import { ProductSize } from '@/config/products';
import { Check } from 'lucide-react';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
  compact?: boolean;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  compact = false,
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-forest-800/80 flex items-center gap-1">
          <span>Select Size</span>
        </label>
        <span className="text-xs font-medium text-forest-800">
          ₹{selectedSize.pricePer100g}
          <span className="text-forest-800/75 font-normal">/100g</span>
        </span>
      </div>

      <div className={`grid ${compact ? 'grid-cols-3 gap-1.5' : 'grid-cols-3 gap-2.5'}`}>
        {sizes.map((size) => {
          const isSelected = selectedSize.id === size.id;
          const isPopular = size.isPopular;

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`relative flex flex-col items-center justify-between text-left rounded-xl transition-all duration-200 border text-forest-800 ${
                compact ? 'p-2' : 'p-3.5'
              } ${
                isSelected
                  ? 'bg-forest-800 text-parchment-100 border-forest-800 shadow-md ring-2 ring-forest-800/30 ring-offset-1 ring-offset-parchment-200'
                  : isPopular
                  ? 'bg-parchment-100 border-forest-800/30 hover:border-forest-800 hover:bg-white'
                  : 'bg-parchment-100/60 border-forest-800/15 hover:border-forest-800/40 hover:bg-white'
              }`}
            >
              {/* Top Badge */}
              {size.badge && (
                <span
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-xs whitespace-nowrap ${
                    isSelected
                      ? 'bg-olive-500 text-forest-900 border-olive-400'
                      : isPopular
                      ? 'bg-forest-800 text-parchment-100 border-forest-700'
                      : 'bg-parchment-200 text-forest-800 border-forest-800/20'
                  }`}
                >
                  {size.badge}
                </span>
              )}

              {/* Visual Cup / Jar Size Icon Indicator */}
              <div className="w-full flex items-center justify-between mb-1">
                <div className="flex items-end gap-0.5">
                  <div
                    className={`rounded-sm transition-all ${
                      size.id === '250g'
                        ? 'w-2.5 h-4'
                        : size.id === '500g'
                        ? 'w-3 h-5'
                        : 'w-3.5 h-6'
                    } ${isSelected ? 'bg-olive-400' : 'bg-forest-800/40'}`}
                  />
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-olive-400 shrink-0" />
                )}
              </div>

              {/* Name & Volume */}
              <div className="w-full text-left mt-0.5">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-semibold text-xs tracking-tight ${
                      isSelected ? 'text-parchment-100' : 'text-forest-900'
                    }`}
                  >
                    {size.name}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? 'text-parchment-200/80' : 'text-forest-800/75'
                    }`}
                  >
                    {size.volume}
                  </span>
                </div>

                {/* Price & Price per 100g */}
                <div className="mt-1 flex items-baseline justify-between">
                  <span
                    className={`font-display text-base ${
                      isSelected ? 'text-olive-400' : 'text-forest-800'
                    }`}
                  >
                    ₹{size.price}
                  </span>
                  {!compact && (
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-parchment-200/70' : 'text-forest-800/75'
                      }`}
                    >
                      ₹{size.pricePer100g}/100g
                    </span>
                  )}
                </div>

                {/* Savings Callout */}
                {size.savingsText && !compact && (
                  <div
                    className={`mt-1.5 text-[9.5px] leading-tight font-medium ${
                      isSelected ? 'text-olive-300' : 'text-emerald-800'
                    }`}
                  >
                    {size.savingsText}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
