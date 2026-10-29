import React from 'react';
import { SITE_CONFIG, hasFssai } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: "How VM Pickle Pantry handles the details you share when you order.",
  path: '/privacy',
});

const sections = [
  {
    title: 'What we collect',
    body: 'When you place an order we receive your name, phone number, delivery address and pincode, along with what you ordered. If you message us on WhatsApp or email, we also see what you send.',
  },
  {
    title: 'How we use it',
    body: 'We use your details only to confirm and deliver your order, send dispatch updates, and reply to your questions. We do not sell your details.',
  },
  {
    title: 'Sharing',
    body: 'Your name, address and phone number are shared with our courier partners so they can deliver your parcel. We share nothing else with third parties.',
  },
  {
    title: 'Payments',
    body: 'We never ask for card numbers or UPI PINs on this website. Payment is arranged with you after we confirm your order, using a UPI request, a payment link or cash on delivery.',
  },
  {
    title: 'Your choices',
    body: 'To see, correct or delete the details we hold about you, message us on WhatsApp or write to namaste@vmpicklepantry.in.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 pb-24">
      <PageHeader
        title="Privacy policy"
        intro={`How ${SITE_CONFIG.name} handles the details you share with us.`}
      />
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-forest-800/10 space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-1.5">
            <h2 className="font-display font-semibold text-lg text-forest-900">{s.title}</h2>
            <p className="text-sm text-forest-800/80 leading-relaxed">{s.body}</p>
          </section>
        ))}
        {hasFssai && (
          <p className="text-sm text-forest-800/75 pt-4 border-t border-forest-800/10">
            FSSAI license number: {SITE_CONFIG.fssaiNumber}
          </p>
        )}
      </div>
    </div>
  );
}
