import React from 'react';
import { SITE_CONFIG } from '@/config/products';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 pb-24">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-olive-600">
          Policies & Assurance
        </span>
        <h1 className="font-display text-4xl text-forest-900">
          Shipping and taste promise
        </h1>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-forest-800/10 space-y-4 text-xs text-forest-800/90 leading-relaxed">
        <h2 className="font-bold text-sm text-forest-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-forest-800" />
          <span>Domestic Shipping Policy</span>
        </h2>
        <p>
          We ship across 19,000+ pincodes in India via BlueDart, DTDC, and SpeedPost. Orders are packed in leakproof food-grade glass jars with multi-layer bubble wrap protection.
        </p>
        <p>
          Free Shipping is automatically applied on all orders above <strong>₹{SITE_CONFIG.freeShippingThreshold}</strong>. A nominal shipping fee of ₹{SITE_CONFIG.defaultShippingFee} applies on orders below ₹{SITE_CONFIG.freeShippingThreshold}.
        </p>

        <h2 className="font-bold text-sm text-forest-900 flex items-center gap-2 pt-4 border-t border-forest-800/10">
          <RefreshCw className="w-4 h-4 text-emerald-700" />
          <span>Taste Promise & Replacement Policy</span>
        </h2>
        <p>
          {SITE_CONFIG.tastePromise}
        </p>
        <p>
          If your parcel arrives broken, leaked, or damaged during transit, simply send us a quick photo on WhatsApp ({SITE_CONFIG.whatsappDisplay}) within 24 hours of delivery. We will dispatch a fresh replacement jar immediately at zero extra cost.
        </p>
      </div>
    </div>
  );
}
