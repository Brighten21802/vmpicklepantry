import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/config/products';
import { PageHeader } from '@/components/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ways to Eat Pickle',
  description: "Simple meals that go with each VM Pickle Pantry pickle, from curd rice to biryani.",
  path: '/recipes',
});

const pairings = [
  { dish: 'Curd rice', slug: 'narthangai-citron-pickle', how: 'A little citron pickle on the side cuts through the cool curd.' },
  { dish: 'Hot ghee rice', slug: 'mixed-pickle', how: 'Mix a spoon into rice with a teaspoon of ghee. Tangy, spicy and rich together.' },
  { dish: 'Dosa and idli', slug: 'garlic-pickle', how: 'Put a few garlic cloves on the side in place of chutney.' },
  { dish: 'Chapati roll', slug: 'mango-pickle', how: 'Spread it thin inside a hot chapati with a little curd or butter.' },
  { dish: 'Biryani and pulao', slug: 'chicken-pickle', how: 'Serve a spoonful beside the rice for a sharp, spicy bite.' },
  { dish: 'Plain rice and rasam', slug: 'mutton-pickle', how: 'Mutton pickle is rich enough to be the main flavour on a simple plate.' },
];

export default function RecipesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 pb-24">
      <PageHeader
        title="Ways to eat it"
        intro="Pickle is a side dish that does a lot of work. Here is what we put it with at home."
      />

      <div className="grid sm:grid-cols-2 gap-5">
        {pairings.map(({ dish, slug, how }) => {
          const product = PRODUCTS.find((p) => p.slug === slug);
          if (!product) return null;
          return (
            <Link
              key={dish}
              href={`/product/${slug}`}
              className="card-lift group p-7 rounded-[28px] bg-white border border-forest-800/10 space-y-2"
            >
              <h2 className="font-display font-semibold text-2xl text-forest-900">{dish}</h2>
              <p className="text-sm text-forest-800/75 leading-relaxed">{how}</p>
              <p className="pt-2 text-sm font-semibold text-accent-500 group-hover:underline underline-offset-4">
                {product.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
