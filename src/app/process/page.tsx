import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'How We Make It',
  description: 'From farm produce to a sealed jar: how every VM Pickle Pantry batch is made.',
};

// A real sequence, so the steps are numbered.
const steps = [
  {
    title: 'Choose the produce',
    text: 'Garlic, raw mangoes and citron come in whole and are sorted by hand. Anything bruised or soft goes back.',
  },
  {
    title: 'Cut and cure',
    text: 'Pieces are cut by hand and cured with unrefined rock salt. The citron is sun-cured for 14 days before it goes into a jar.',
  },
  {
    title: 'Roast and grind the spices',
    text: 'Guntur chillies, mustard and fenugreek are roasted and pounded in small lots, so each batch smells of the spice, not the shelf.',
  },
  {
    title: 'Steep in gingelly oil',
    text: 'The produce and spices rest in cold-pressed sesame oil in ceramic Bharanis. The oil, not vinegar, is what keeps the pickle.',
  },
  {
    title: 'Fill, seal and check',
    text: 'Every jar is filled by hand, sealed and looked over before it is packed.',
  },
  {
    title: 'Pack and ship',
    text: 'Glass jars are bubble-wrapped and leave on our weekly dispatch day, every Wednesday.',
  },
];

export default function ProcessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader
        title="How we make it"
        intro="Six steps, no shortcuts. It is the same way pickle was made in our family kitchens."
      />

      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-5 p-6 rounded-[28px] bg-white border border-forest-800/10">
            <span className="shrink-0 w-10 h-10 rounded-full bg-forest-800 text-parchment-100 font-display font-semibold flex items-center justify-center">
              {i + 1}
            </span>
            <div className="space-y-1">
              <h2 className="font-display font-semibold text-xl text-forest-900">{s.title}</h2>
              <p className="text-sm text-forest-800/75 leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="text-center">
        <Link href="/shop" className="inline-block px-8 py-3.5 rounded-full bg-forest-800 hover:bg-accent-500 text-white text-sm font-semibold transition-colors">
          Shop the pickles
        </Link>
      </div>
    </div>
  );
}
