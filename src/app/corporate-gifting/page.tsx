'use client';

import React, { useState } from 'react';
import { Gift, Package, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';

const perks = [
  { icon: Gift, title: 'Custom gift boxes', text: 'Pick the jars and sizes, and we pack them in our gift box.' },
  { icon: Package, title: 'Bulk quantities', text: 'Weddings, festivals and office gifting, from 10 boxes upwards.' },
  { icon: Truck, title: 'Delivered to many addresses', text: 'Send gifts to several cities in one order.' },
];

export default function CorporateGiftingPage() {
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi VM Pickle Pantry, I'd like a bulk gifting quote.\nName / company: ${company}\nQuantity: ${quantity}\nDetails: ${notes}`
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader
        title="Gifts for many people"
        intro="Hampers for weddings, festivals, teams and clients, made in the same small batches as everything else."
      />

      <div className="grid sm:grid-cols-3 gap-4">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-6 rounded-[28px] bg-white border border-forest-800/10 space-y-2">
            <Icon className="w-5 h-5 text-accent-500" />
            <h2 className="font-display font-semibold text-lg text-forest-900">{title}</h2>
            <p className="text-sm text-forest-800/75 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <form
        className="max-w-xl mx-auto p-6 sm:p-8 rounded-[28px] bg-white border border-forest-800/10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
        }}
      >
        <h2 className="font-display font-semibold text-2xl text-forest-900">Ask for a quote</h2>
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-medium text-forest-900">Your name or company</label>
          <input id="company" required value={company} onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="qty" className="text-sm font-medium text-forest-900">How many boxes?</label>
          <input id="qty" required inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="notes" className="text-sm font-medium text-forest-900">Occasion, date and delivery cities</label>
          <textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none resize-none" />
        </div>
        <button type="submit" className="w-full py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors">
          Send quote request on WhatsApp
        </button>
      </form>
    </div>
  );
}
