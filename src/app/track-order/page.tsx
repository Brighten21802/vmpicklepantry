'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';

export default function TrackOrderPage() {
  const [reference, setReference] = useState('');
  const [phone, setPhone] = useState('');

  const href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi VM Pickle Pantry, could you share the status of my order?\nOrder reference: ${reference}\nPhone: ${phone}`
  )}`;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 pb-24">
      <PageHeader
        title="Track your order"
        intro="Orders ship every Wednesday and usually arrive in 2 to 4 business days. Send us your order reference and we will reply with the latest status."
      />

      <form
        className="p-6 sm:p-8 rounded-[28px] bg-white border border-forest-800/10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
        }}
      >
        <div className="space-y-1.5">
          <label htmlFor="ref" className="text-sm font-medium text-forest-900">Order reference</label>
          <input
            id="ref"
            required
            placeholder="e.g. VM-123456"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-forest-900">Phone number used for the order</label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors">
          Ask for status on WhatsApp
        </button>
      </form>
    </div>
  );
}
