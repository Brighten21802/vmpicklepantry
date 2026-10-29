import React from 'react';
import { SITE_CONFIG } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description: "How ordering, delivery and replacements work at VM Pickle Pantry.",
  path: '/terms',
});

const sections = [
  {
    title: 'Orders and pricing',
    body: `All prices are in Indian rupees and include applicable taxes. Orders above ₹${SITE_CONFIG.freeShippingThreshold} ship free; otherwise a ₹${SITE_CONFIG.defaultShippingFee} shipping fee applies. We may cancel an order if a product is unavailable and will refund any payment made.`,
  },
  {
    title: 'Small batches',
    body: 'Our pickles are made in small batches, so colour, texture and heat can vary slightly between jars. This is normal for handmade food and does not count as a defect.',
  },
  {
    title: 'Shipping',
    body: 'We dispatch fresh batches every Wednesday. Delivery usually takes 2 to 4 business days after dispatch, depending on your pincode. Delays caused by couriers are outside our control.',
  },
  {
    title: 'Damaged or unsatisfactory jars',
    body: 'If your jar arrives damaged, send us a photo on WhatsApp within 24 hours of delivery and we will replace it free of charge. See our Shipping & Taste Promise page for details.',
  },
  {
    title: 'Storage and allergens',
    body: 'Follow the storage instructions on each product page. Our kitchen handles sesame, mustard and meat, so please check ingredients before you order if you have allergies.',
  },
  {
    title: 'Contact',
    body: 'For anything about these terms, write to namaste@vmpicklepantry.in or message us on WhatsApp.',
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 pb-24">
      <PageHeader title="Terms of service" intro="The short version of how ordering from us works." />
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-forest-800/10 space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-1.5">
            <h2 className="font-display font-semibold text-lg text-forest-900">{s.title}</h2>
            <p className="text-sm text-forest-800/80 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
