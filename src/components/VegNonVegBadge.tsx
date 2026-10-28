import React from 'react';

interface VegNonVegBadgeProps {
  isVeg: boolean;
  className?: string;
  showText?: boolean;
}

export const VegNonVegBadge: React.FC<VegNonVegBadgeProps> = ({
  isVeg,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div
        className={`w-4 h-4 border flex items-center justify-center rounded-sm bg-white shrink-0 ${
          isVeg ? 'border-emerald-700' : 'border-red-700'
        }`}
        title={isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isVeg ? 'bg-emerald-700' : 'bg-red-700'
          }`}
        />
      </div>
      {showText && (
        <span
          className={`text-xs font-semibold ${
            isVeg ? 'text-emerald-800' : 'text-red-800'
          }`}
        >
          {isVeg ? '100% Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
