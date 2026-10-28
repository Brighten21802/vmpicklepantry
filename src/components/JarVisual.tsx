import React, { useId } from 'react';
import { Product } from '@/config/products';

interface JarVisualProps {
  product: Product;
  className?: string;
  size?: number;
}

type Chunk = { x: number; y: number; r: number; fill: string; shape: 'clove' | 'cube' | 'wedge' | 'chilli' | 'leaf' | 'meat' | 'seed' };

interface Visuals {
  oilTop: string;
  oilBot: string;
  label: string; // label paper colour
  band: string; // brand colour band
  foil: string; // foil accent
  ink: string; // name ink colour
  ingredientTag: string;
  motif: string; // small illustrated emblem
  chunks: Chunk[];
}

// Each product gets its own oil colour, ingredient shapes and label palette
const VISUALS: Record<string, Visuals> = {
  'garlic-pickle': {
    oilTop: '#C4621A', oilBot: '#5E2208', label: '#FBF5E6', band: '#1F3A12', foil: '#D4AF5A', ink: '#1F3A12',
    ingredientTag: 'Whole Roasted Garlic Cloves', motif: 'garlic',
    chunks: [
      { x: 118, y: 392, r: 15, fill: '#F3E6C4', shape: 'clove' }, { x: 160, y: 404, r: 17, fill: '#EAD7A6', shape: 'clove' },
      { x: 238, y: 398, r: 16, fill: '#F3E6C4', shape: 'clove' }, { x: 280, y: 388, r: 14, fill: '#EAD7A6', shape: 'clove' },
      { x: 200, y: 410, r: 6, fill: '#9E1F14', shape: 'chilli' }, { x: 300, y: 408, r: 5, fill: '#9E1F14', shape: 'chilli' },
      { x: 104, y: 150, r: 4, fill: '#2F1B0A', shape: 'seed' }, { x: 296, y: 152, r: 4, fill: '#2F1B0A', shape: 'seed' },
    ],
  },
  'mixed-pickle': {
    oilTop: '#A8341A', oilBot: '#4C120A', label: '#FBF1EC', band: '#6B1F2E', foil: '#E0B46D', ink: '#6B1F2E',
    ingredientTag: 'Citron · Lime · Ginger · Chilli', motif: 'lime',
    chunks: [
      { x: 118, y: 394, r: 16, fill: '#E9C94A', shape: 'wedge' }, { x: 162, y: 406, r: 12, fill: '#7FB04A', shape: 'chilli' },
      { x: 236, y: 400, r: 15, fill: '#E9C94A', shape: 'wedge' }, { x: 282, y: 390, r: 13, fill: '#D9B98A', shape: 'cube' },
      { x: 200, y: 410, r: 7, fill: '#B8231A', shape: 'chilli' },
      { x: 104, y: 152, r: 9, fill: '#5E8A3A', shape: 'leaf' }, { x: 296, y: 150, r: 9, fill: '#5E8A3A', shape: 'leaf' },
    ],
  },
  'mango-pickle': {
    oilTop: '#C9781A', oilBot: '#6E2A08', label: '#FFF8E4', band: '#9A6A12', foil: '#F0C24E', ink: '#7A4E0A',
    ingredientTag: 'Raw Avakaya Mango · Mustard', motif: 'mango',
    chunks: [
      { x: 118, y: 392, r: 17, fill: '#F2B33A', shape: 'cube' }, { x: 162, y: 406, r: 15, fill: '#E39A22', shape: 'cube' },
      { x: 238, y: 400, r: 16, fill: '#F2B33A', shape: 'cube' }, { x: 282, y: 390, r: 14, fill: '#E39A22', shape: 'cube' },
      { x: 200, y: 412, r: 6, fill: '#A0200F', shape: 'chilli' },
      { x: 104, y: 152, r: 4, fill: '#2F1B0A', shape: 'seed' }, { x: 296, y: 150, r: 4, fill: '#2F1B0A', shape: 'seed' },
    ],
  },
  'narthangai-citron-pickle': {
    oilTop: '#B0901A', oilBot: '#5A440A', label: '#F8FAEC', band: '#3E5E26', foil: '#D9C46A', ink: '#3E5E26',
    ingredientTag: 'Sun-Cured Citron · Sesame Oil', motif: 'citron',
    chunks: [
      { x: 118, y: 394, r: 17, fill: '#E6CF4E', shape: 'wedge' }, { x: 162, y: 406, r: 15, fill: '#CDBB3E', shape: 'wedge' },
      { x: 238, y: 400, r: 17, fill: '#E6CF4E', shape: 'wedge' }, { x: 282, y: 390, r: 14, fill: '#CDBB3E', shape: 'wedge' },
      { x: 200, y: 410, r: 5, fill: '#7A3C10', shape: 'seed' },
      { x: 104, y: 152, r: 9, fill: '#4F7A2E', shape: 'leaf' }, { x: 296, y: 150, r: 9, fill: '#4F7A2E', shape: 'leaf' },
    ],
  },
  'chicken-pickle': {
    oilTop: '#962018', oilBot: '#3A0A08', label: '#FFF4EE', band: '#801B1B', foil: '#E5A93B', ink: '#801B1B',
    ingredientTag: 'Boneless Chicken · Guntur Chilli', motif: 'chilli',
    chunks: [
      { x: 118, y: 392, r: 17, fill: '#B9683E', shape: 'meat' }, { x: 162, y: 406, r: 15, fill: '#9C4E2A', shape: 'meat' },
      { x: 238, y: 400, r: 16, fill: '#B9683E', shape: 'meat' }, { x: 282, y: 390, r: 15, fill: '#9C4E2A', shape: 'meat' },
      { x: 200, y: 410, r: 7, fill: '#D9341A', shape: 'chilli' },
      { x: 104, y: 152, r: 9, fill: '#3E6B2A', shape: 'leaf' }, { x: 296, y: 150, r: 9, fill: '#3E6B2A', shape: 'leaf' },
    ],
  },
  'mutton-pickle': {
    oilTop: '#5A1A22', oilBot: '#1C070B', label: '#FBF2F2', band: '#3E1424', foil: '#D4AF37', ink: '#3E1424',
    ingredientTag: 'Tender Mutton · Black Pepper', motif: 'pepper',
    chunks: [
      { x: 118, y: 392, r: 18, fill: '#7E3424', shape: 'meat' }, { x: 162, y: 406, r: 16, fill: '#62261A', shape: 'meat' },
      { x: 238, y: 400, r: 17, fill: '#7E3424', shape: 'meat' }, { x: 282, y: 390, r: 15, fill: '#62261A', shape: 'meat' },
      { x: 200, y: 412, r: 5, fill: '#1A1210', shape: 'seed' },
      { x: 104, y: 152, r: 4, fill: '#1A1210', shape: 'seed' }, { x: 296, y: 150, r: 4, fill: '#1A1210', shape: 'seed' },
    ],
  },
};

function ChunkShape({ c, i }: { c: Chunk; i: number }) {
  const rot = ((i * 37) % 60) - 30;
  const t = `rotate(${rot} ${c.x} ${c.y})`;
  switch (c.shape) {
    case 'clove':
      return <path transform={t} fill={c.fill} stroke="#00000022" d={`M ${c.x} ${c.y - c.r} C ${c.x + c.r} ${c.y - c.r * 0.4}, ${c.x + c.r * 0.8} ${c.y + c.r}, ${c.x} ${c.y + c.r} C ${c.x - c.r * 0.8} ${c.y + c.r}, ${c.x - c.r} ${c.y - c.r * 0.4}, ${c.x} ${c.y - c.r} Z`} />;
    case 'cube':
      return <rect transform={t} x={c.x - c.r} y={c.y - c.r * 0.8} width={c.r * 2} height={c.r * 1.6} rx={c.r * 0.3} fill={c.fill} stroke="#00000022" />;
    case 'wedge':
      return <path transform={t} fill={c.fill} stroke="#00000022" d={`M ${c.x - c.r} ${c.y + c.r * 0.5} A ${c.r} ${c.r} 0 0 1 ${c.x + c.r} ${c.y + c.r * 0.5} Z`} />;
    case 'chilli':
      return <path transform={t} fill="none" stroke={c.fill} strokeWidth={c.r} strokeLinecap="round" d={`M ${c.x - c.r * 2.2} ${c.y} Q ${c.x} ${c.y - c.r * 1.6} ${c.x + c.r * 2.2} ${c.y + c.r * 0.6}`} />;
    case 'leaf':
      return <ellipse transform={t} cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.45} fill={c.fill} />;
    case 'meat':
      return <path transform={t} fill={c.fill} stroke="#00000033" d={`M ${c.x - c.r} ${c.y - c.r * 0.4} Q ${c.x - c.r * 0.6} ${c.y - c.r} ${c.x + c.r * 0.5} ${c.y - c.r * 0.8} Q ${c.x + c.r * 1.1} ${c.y} ${c.x + c.r * 0.6} ${c.y + c.r * 0.8} Q ${c.x - c.r * 0.4} ${c.y + c.r} ${c.x - c.r} ${c.y - c.r * 0.4} Z`} />;
    default:
      return <circle cx={c.x} cy={c.y} r={c.r} fill={c.fill} />;
  }
}

// Small illustrated emblem printed on the label, unique per product
function Motif({ kind, colour, foil }: { kind: string; colour: string; foil: string }) {
  const cx = 200;
  const cy = 236;
  switch (kind) {
    case 'garlic':
      return (
        <g>
          <path d={`M ${cx} ${cy - 16} C ${cx + 18} ${cy - 6}, ${cx + 16} ${cy + 14}, ${cx} ${cy + 14} C ${cx - 16} ${cy + 14}, ${cx - 18} ${cy - 6}, ${cx} ${cy - 16} Z`} fill="none" stroke={colour} strokeWidth="2" />
          <path d={`M ${cx} ${cy - 14} L ${cx} ${cy + 12} M ${cx - 7} ${cy - 8} Q ${cx - 9} ${cy + 4} ${cx - 5} ${cy + 12} M ${cx + 7} ${cy - 8} Q ${cx + 9} ${cy + 4} ${cx + 5} ${cy + 12}`} fill="none" stroke={colour} strokeWidth="1.2" />
          <path d={`M ${cx} ${cy - 16} Q ${cx + 2} ${cy - 24} ${cx + 6} ${cy - 26}`} fill="none" stroke={foil} strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'lime':
      return (
        <g>
          <circle cx={cx} cy={cy} r="15" fill="none" stroke={colour} strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1={cx} y1={cy} x2={(cx + 13 * Math.cos((a * Math.PI) / 180)).toFixed(2)} y2={(cy + 13 * Math.sin((a * Math.PI) / 180)).toFixed(2)} stroke={foil} strokeWidth="1.4" />
          ))}
        </g>
      );
    case 'mango':
      return (
        <g>
          <path d={`M ${cx - 4} ${cy - 15} C ${cx + 18} ${cy - 14}, ${cx + 16} ${cy + 16}, ${cx - 2} ${cy + 15} C ${cx - 16} ${cy + 14}, ${cx - 14} ${cy - 6}, ${cx - 4} ${cy - 15} Z`} fill="none" stroke={colour} strokeWidth="2" />
          <path d={`M ${cx - 4} ${cy - 15} Q ${cx + 4} ${cy - 26} ${cx + 14} ${cy - 22} Q ${cx + 6} ${cy - 16} ${cx - 4} ${cy - 15}`} fill={foil} />
        </g>
      );
    case 'citron':
      return (
        <g>
          <ellipse cx={cx} cy={cy} rx="17" ry="13" fill="none" stroke={colour} strokeWidth="2" />
          <ellipse cx={cx} cy={cy} rx="10" ry="7" fill="none" stroke={foil} strokeWidth="1.4" />
          <path d={`M ${cx + 14} ${cy - 10} Q ${cx + 22} ${cy - 20} ${cx + 28} ${cy - 16}`} fill="none" stroke={colour} strokeWidth="1.6" />
        </g>
      );
    case 'chilli':
      return (
        <g>
          <path d={`M ${cx - 18} ${cy + 8} Q ${cx} ${cy - 16} ${cx + 16} ${cy - 2}`} fill="none" stroke={colour} strokeWidth="6" strokeLinecap="round" />
          <path d={`M ${cx + 16} ${cy - 2} Q ${cx + 22} ${cy - 8} ${cx + 20} ${cy - 14}`} fill="none" stroke={foil} strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    default:
      return (
        <g>
          {[[-10, -4], [0, -10], [10, -4], [-6, 7], [6, 7], [0, 0]].map(([dx, dy], i) => (
            <circle key={i} cx={cx + dx} cy={cy + dy} r="4" fill={i % 2 ? foil : colour} />
          ))}
        </g>
      );
  }
}

function splitName(name: string): string[] {
  const clean = name.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+Pickle$/i, '').trim();
  const words = clean.split(' ');
  if (clean.length <= 11 || words.length === 1) return [clean];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

const JAR_PATH = 'M 142,92 L 142,112 Q 142,128 116,144 Q 66,174 66,220 L 66,404 Q 66,446 108,446 L 292,446 Q 334,446 334,404 L 334,220 Q 334,174 284,144 Q 258,128 258,112 L 258,92 Z';

function SingleJar({ product, uid }: { product: Product; uid: string }) {
  const v = VISUALS[product.id] || VISUALS['garlic-pickle'];
  const nameLines = splitName(product.name);
  const id = (k: string) => `${k}-${uid}`;

  return (
    <g>
      <defs>
        <linearGradient id={id('oil')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.oilTop} />
          <stop offset="100%" stopColor={v.oilBot} />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="78%" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={id('lid')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A6A2A" />
          <stop offset="22%" stopColor="#F3DC9A" />
          <stop offset="45%" stopColor="#B8913E" />
          <stop offset="70%" stopColor="#E8CC80" />
          <stop offset="100%" stopColor="#6E5220" />
        </linearGradient>
        <linearGradient id={id('foil')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={v.foil} />
          <stop offset="50%" stopColor="#FFF1C4" />
          <stop offset="100%" stopColor={v.foil} />
        </linearGradient>
        <linearGradient id={id('paper')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.label} />
          <stop offset="100%" stopColor="#EDE4CF" />
        </linearGradient>
        <clipPath id={id('clip')}>
          <path d={JAR_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="200" cy="466" rx="128" ry="12" fill="#000" opacity="0.18" />

      {/* Contents */}
      <g clipPath={`url(#${id('clip')})`}>
        <rect x="60" y="120" width="280" height="340" fill={`url(#${id('oil')})`} />
        <rect x="60" y="120" width="280" height="10" fill="#FFFFFF" opacity="0.12" />
        {v.chunks.map((c, i) => (
          <ChunkShape key={i} c={c} i={i} />
        ))}
      </g>

      {/* Glass */}
      <path d={JAR_PATH} fill={`url(#${id('glass')})`} />
      <path d={JAR_PATH} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M 86,190 Q 80,300 84,420" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.35" />
      <path d="M 314,200 Q 318,300 314,410" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.18" />

      {/* Label */}
      <rect x="84" y="176" width="232" height="196" rx="8" fill={`url(#${id('paper')})`} />
      <rect x="84" y="176" width="232" height="196" rx="8" fill="none" stroke={`url(#${id('foil')})`} strokeWidth="3" />
      <rect x="92" y="184" width="216" height="180" rx="5" fill="none" stroke={v.band} strokeWidth="0.8" strokeOpacity="0.45" />

      <text x="200" y="205" textAnchor="middle" fill={v.band} fontSize="9" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="3.2">
        VM PICKLE PANTRY
      </text>

      <Motif kind={v.motif} colour={v.band} foil={v.foil} />

      {nameLines.length === 1 ? (
        <text x="200" y="290" textAnchor="middle" fill={v.ink} fontSize={nameLines[0].length > 8 ? 30 : 36} fontWeight="700" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif">
          {nameLines[0]}
        </text>
      ) : (
        <>
          <text x="200" y="278" textAnchor="middle" fill={v.ink} fontSize="26" fontWeight="700" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif">
            {nameLines[0]}
          </text>
          <text x="200" y="305" textAnchor="middle" fill={v.ink} fontSize="26" fontWeight="700" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif">
            {nameLines[1]}
          </text>
        </>
      )}

      <text x="200" y={nameLines.length === 1 ? 308 : 322} textAnchor="middle" fill={v.band} fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="4">
        PICKLE
      </text>

      <line x1="130" y1="332" x2="270" y2="332" stroke={`url(#${id('foil')})`} strokeWidth="1.5" />
      <text x="200" y="348" textAnchor="middle" fill="#4A3728" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif">
        {v.ingredientTag}
      </text>

      {/* FSSAI-style veg / non-veg mark */}
      <rect x="282" y="190" width="14" height="14" rx="1.5" fill="#FFFFFF" stroke={product.isVeg ? '#15803D' : '#B91C1C'} strokeWidth="1.6" />
      <circle cx="289" cy="197" r="3.6" fill={product.isVeg ? '#15803D' : '#B91C1C'} />

      {/* Neck + gold lid */}
      <rect x="146" y="88" width="108" height="20" rx="3" fill="#E7DFCB" opacity="0.85" />
      <rect x="132" y="50" width="136" height="42" rx="7" fill={`url(#${id('lid')})`} />
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={i} x1={140 + i * 8.6} y1="54" x2={140 + i * 8.6} y2="88" stroke="#5A4218" strokeWidth="1" opacity="0.35" />
      ))}
      <rect x="132" y="50" width="136" height="8" rx="4" fill="#FFFFFF" opacity="0.35" />
      <rect x="132" y="84" width="136" height="8" rx="3" fill="#000000" opacity="0.15" />
    </g>
  );
}

export const JarVisual: React.FC<JarVisualProps> = ({ product, className = '', size = 400 }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  if (product.category === 'bundle') {
    // Gift box: three jars from the bundle, arranged as a trio
    const trio = ['narthangai-citron-pickle', 'garlic-pickle', 'chicken-pickle'];
    const stub = (pid: string): Product => ({ ...product, id: pid, name: VISUAL_NAMES[pid], isVeg: pid !== 'chicken-pickle', category: 'veg' });
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 800 520" width={size} height={(size * 520) / 800} className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={product.name}>
          <g transform="translate(20 70) scale(0.82)"><SingleJar product={stub(trio[0])} uid={`${uid}a`} /></g>
          <g transform="translate(472 70) scale(0.82)"><SingleJar product={stub(trio[2])} uid={`${uid}c`} /></g>
          <g transform="translate(200 10) scale(1)"><SingleJar product={stub(trio[1])} uid={`${uid}b`} /></g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 490" width={size} height={(size * 490) / 400} className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${product.name} jar`}>
        <SingleJar product={product} uid={uid} />
      </svg>
    </div>
  );
};

const VISUAL_NAMES: Record<string, string> = {
  'narthangai-citron-pickle': 'Narthangai (Citron) Pickle',
  'garlic-pickle': 'Garlic Pickle',
  'chicken-pickle': 'Chicken Pickle',
};
