import React from 'react';

interface MapEmbedProps {
  /** What Google Maps should search for, e.g. "mks cooking marol". */
  query: string;
  title: string;
  /** A short, small map for tight spots like the footer. */
  compact?: boolean;
}

/** A responsive Google Map. It loads only when scrolled near, so it doesn't slow the page. */
export const MapEmbed: React.FC<MapEmbedProps> = ({ query, title, compact = false }) => (
  <div
    className={`relative w-full overflow-hidden border border-forest-800/10 bg-parchment-200 ${
      compact ? 'h-40 rounded-2xl' : 'aspect-[4/3] sm:aspect-[16/9] rounded-[28px]'
    }`}
  >
    <iframe
      title={title}
      src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=14&ie=UTF8&iwloc=B&output=embed`}
      className="absolute inset-0 w-full h-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
);
