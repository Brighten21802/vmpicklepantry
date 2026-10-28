// Renders each product's jar artwork to public/assets/products/<slug>.svg
// Run from the project root with: bun scripts/generate-product-images.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PRODUCTS } from '../src/config/products';
import { JarVisual } from '../src/components/JarVisual';

const outDir = join(process.cwd(), 'public', 'assets', 'products');
mkdirSync(outDir, { recursive: true });

for (const product of PRODUCTS) {
  const html = renderToStaticMarkup(<JarVisual product={product} size={800} />);
  const svg = html.match(/<svg[\s\S]*<\/svg>/)?.[0];
  if (!svg) throw new Error(`No SVG rendered for ${product.slug}`);
  writeFileSync(join(outDir, `${product.slug}.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n${svg.replace(' class="w-full h-auto select-none"', '')}\n`);
  console.log(`wrote ${product.slug}.svg`);
}
