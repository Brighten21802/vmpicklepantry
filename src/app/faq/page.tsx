import React from 'react';
import { SITE_CONFIG } from '@/config/products';
import { HelpCircle, ShieldCheck } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Frequently Asked Questions',
  description: "Answers about VM Pickle Pantry's pickles: storage, shelf life, delivery and the replacement policy.",
  path: '/faq',
});


export default function FAQPage() {
  const faqs = [
    {
      q: 'Do your pickles contain added preservatives or synthetic acids?',
      a: 'Absolutely zero. We use 100% natural preservation methods — cold-pressed sesame oil, sun-curing with rock salt, and natural spice oils. We never add sodium benzoate, acetic acid, or synthetic food colors.',
    },
    {
      q: 'How should I store the pickles after opening?',
      a: 'For Veg pickles (Narthangai Citron, Garlic Inferno), store in a cool dry pantry. Always use a clean, dry spoon and ensure a thin layer of oil remains over the top of the pickle. For Non-Veg pickles (Chicken, Mutton), refrigerate after opening.',
    },
    {
      q: 'What is the shelf life of VM Pickle Pantry jars?',
      a: 'Unopened Veg jars last up to 9 months. Non-Veg jars last up to 6 months unopened. Once opened, consume within 3-6 months for peak aroma.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Orders are shipped in fresh weekly batches every Wednesday. Standard delivery across India takes 2 to 4 business days depending on your pincode.',
    },
    {
      q: 'What is your Taste Guarantee / Replacement policy?',
      a: SITE_CONFIG.tastePromise,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-olive-600">
          Help & Guidance
        </span>
        <h1 className="font-display text-4xl text-forest-900">
          Frequently asked questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-forest-800/10 shadow-xs space-y-2"
          >
            <h3 className="font-bold text-sm text-forest-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-forest-800/80 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
