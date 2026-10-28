'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, Clock, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';
import { MapEmbed } from '@/components/MapEmbed';

const EMAIL = 'namaste@vmpicklepantry.in';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi VM Pickle Pantry, I'm ${name || 'a customer'}. ${message}`.trim()
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader title="Talk to us" intro="Questions about an order, a jar or a bulk request? We reply on WhatsApp fastest." />

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-4">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift flex items-start gap-3 p-5 rounded-2xl bg-white border border-forest-800/10"
          >
            <MessageCircle className="w-5 h-5 text-emerald-700 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-forest-900">WhatsApp</div>
              <div className="text-forest-800/70">Chat or place an order</div>
            </div>
          </a>
          <a href={`mailto:${EMAIL}`} className="card-lift flex items-start gap-3 p-5 rounded-2xl bg-white border border-forest-800/10">
            <Mail className="w-5 h-5 text-forest-800 mt-0.5" />
            <div className="text-sm min-w-0">
              <div className="font-semibold text-forest-900">Email</div>
              <div className="text-forest-800/70 break-all">{EMAIL}</div>
            </div>
          </a>
          <a
            href={SITE_CONFIG.mksCookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift flex items-start gap-3 p-5 rounded-2xl bg-white border border-forest-800/10"
          >
            <MapPin className="w-5 h-5 text-forest-800 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-forest-900">MKS Cooking</div>
              <div className="text-forest-800/70">Our restaurant in Marol, Mumbai</div>
            </div>
          </a>          <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-forest-800/10">
            <Clock className="w-5 h-5 text-forest-800 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-forest-900">Dispatch days</div>
              <div className="text-forest-800/70">Fresh batches ship every Wednesday.</div>
            </div>
          </div>
        </div>

        <form
          className="md:col-span-3 p-6 sm:p-8 rounded-[28px] bg-white border border-forest-800/10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappHref, '_blank', 'noopener,noreferrer');
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-forest-900">Your name</label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium text-forest-900">How can we help?</label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-forest-800/15 bg-parchment-50 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none resize-none"
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors">
            Send on WhatsApp
          </button>
        </form>
      </div>
      <section className="space-y-4" aria-label="Find MKS Cooking">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-forest-900">Find MKS Cooking</h2>
            <p className="text-sm text-forest-800/70">Our restaurant in Marol, Mumbai.</p>
          </div>
          <a
            href={SITE_CONFIG.mksCookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent-500 hover:underline underline-offset-4"
          >
            Open in Google
          </a>
        </div>
        <MapEmbed query={SITE_CONFIG.mksCookingCoords} title="Map showing MKS Cooking in Marol, Mumbai" />
      </section>
    </div>
  );
}
