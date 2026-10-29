'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, hasFssai } from '@/config/products';
import { MapEmbed } from '@/components/MapEmbed';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-[#1F3A1A] text-[#FAF8F2] border-t border-[#2A4E26] pt-16 pb-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <Link className="inline-block bg-[#FAF8F2] p-3 rounded-2xl" href="/">
              <Image
                src="/assets/logo-nav.png"
                alt="VM Pickle Pantry"
                width={120}
                height={36}
                className="w-[120px] h-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              VM Pickle Pantry is a small-batch, artisanal kitchen established in 2024. Bold flavors. Real ingredients. Made from the heart with pure wood-pressed oils.
            </p>
            <div className="text-xs text-white/60 space-y-1 font-mono">
              {hasFssai && <div>FSSAI Central Lic: {SITE_CONFIG.fssaiNumber}</div>}
            </div>
          </div>

          {/* Col 2: Pantry Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-sm text-[#DE9B27] ">The Pantry</h4>
            <ul className="text-xs space-y-2 text-white/80">
              <li><Link className="hover:text-white transition-colors" href="/#featured-trio">Signature Trio</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/product/garlic-pickle">Garlic Pickle</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/product/mixed-pickle">Mixed Pickle</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/product/mango-pickle">Mango Pickle</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/product/chicken-pickle">Chicken Pickle</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/gift-sets">Gift Sets</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/spice-guide">Spice Guide</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/recipes">Ways to Eat It</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/process">How We Make It</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/reviews">Reviews</Link></li>
            </ul>
          </div>

          {/* Col 3: Care & Orders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-sm text-[#DE9B27] ">Orders &amp; Care</h4>
            <ul className="text-xs space-y-2 text-white/80">
              <li>
                WhatsApp Orders:{' '}
                <a className="text-emerald-300 font-bold hover:underline" href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li>Email: <a className="hover:underline" href="mailto:namaste@vmpicklepantry.in">namaste@vmpicklepantry.in</a></li>
              <li>Pan-India Express: 2-4 Days</li>
              <li>Leak-Proof Glass Replacement Guarantee</li>
              <li><Link className="hover:text-white transition-colors" href="/corporate-gifting">Corporate &amp; Wedding Hampers</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/contact">Contact Us</Link></li>
              <li><a className="hover:text-white transition-colors" href={SITE_CONFIG.mksCookingUrl} target="_blank" rel="noopener noreferrer">Find MKS Cooking, Marol</a></li>
              <li><Link className="hover:text-white transition-colors" href="/track-order">Track Your Order</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/privacy">Privacy</Link> · <Link className="hover:text-white transition-colors" href="/terms">Terms</Link></li>
            </ul>
          </div>

          {/* Col 4: Batch Notifications */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-sm text-[#DE9B27] ">Batch Alerts</h4>
            <p className="text-xs text-white/70">
              Be the first to know when limited batches of Nellore Mutton and seasonal mango are bottled.
            </p>
            <a
              className="block w-full text-center bg-[#DE9B27] hover:bg-[#B87A14] text-[#122410] font-bold py-2.5 rounded-xl text-xs transition-colors"
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi VM Pickle Pantry, please add me to your batch alerts.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get batch alerts on WhatsApp
            </a>

            <div className="pt-4 space-y-2">
              <h4 className="font-['Outfit',sans-serif] font-bold text-sm text-[#DE9B27]">Find MKS Cooking</h4>
              <MapEmbed query={SITE_CONFIG.mksCookingCoords} title="Map showing MKS Cooking in Marol, Mumbai" compact />
              <a
                className="inline-block text-xs text-white/80 hover:text-white underline underline-offset-4"
                href={SITE_CONFIG.mksCookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            {SITE_CONFIG.copyright}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-[11px] flex-wrap">
            <span>Accepted:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15">UPI (GPay / PhonePe)</span>
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15">RuPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15">Cards / Netbanking</span>
            <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15">Cash On Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
