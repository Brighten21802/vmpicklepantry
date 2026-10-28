import React from 'react';
import { SITE_CONFIG, hasFssai } from '@/config/products';
import { ShieldCheck, Flame, Home, Sparkles, Award } from 'lucide-react';

export const TrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-5 h-5 text-forest-800 shrink-0" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-forest-800 shrink-0" />,
    Flame: <Flame className="w-5 h-5 text-forest-800 shrink-0" />,
    Sparkles: <Sparkles className="w-5 h-5 text-forest-800 shrink-0" />,
  };

  return (
    <div className={`w-full bg-parchment-100/90 border-y border-forest-800/10 py-5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SITE_CONFIG.trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-parchment-200/50 border border-forest-800/5"
            >
              <div className="w-10 h-10 rounded-full bg-parchment-100 border border-forest-800/10 flex items-center justify-center shadow-xs">
                {iconMap[badge.icon] || <Award className="w-5 h-5 text-forest-800" />}
              </div>
              <div>
                <h4 className="font-bold text-xs text-forest-900 tracking-tight">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-forest-800/70 leading-snug">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FSSAI Badge Strip */}
        <div className="mt-4 pt-3 border-t border-forest-800/5 flex flex-wrap items-center justify-center gap-4 text-center">
          {hasFssai && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/5 text-forest-800 text-[11px] font-medium border border-forest-800/10">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              FSSAI License: <span className="font-mono font-bold ">{SITE_CONFIG.fssaiNumber}</span>
            </div>
          )}
          <div className="text-[11px] text-forest-800/70 font-medium">
            {SITE_CONFIG.batchNotice}
          </div>
        </div>
      </div>
    </div>
  );
};
