export interface ProductSize {
  id: '250g' | '500g' | '1kg';
  name: string; // "250g", "500g", "1kg"
  volume: string; // "250g", "500g", "1kg"
  volumeMl: number;
  price: number;
  pricePer100g: number;
  badge?: string; // "Most Loved", "Best Value"
  savingsText?: string;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'veg' | 'non-veg' | 'bundle';
  isVeg: boolean;
  tagline: string;
  description: string;
  tasteProfile: string[];
  spiceLevel: number; // 1 to 5
  spiceLabel: string; // "Mild", "Gentle", "Spicy", "High", "Extreme"
  image: string;
  imageBg?: string; // background colour behind the product photo, when it isn't the default cream
  labelColor: string; // primary label color for jar visual
  accentColor: string;
  badges: string[];
  sizes: ProductSize[];
  ingredients: string[];
  howToStore: string;
  shelfLife: string;
  goesWellWith: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
  featured?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar: string;
  initials: string;
}

export const SITE_CONFIG = {
  name: "VM Pickle Pantry",
  parentCompany: "House of MKS Cooking",
  fullBrandName: "VM Pickle Pantry — House of MKS Cooking",
  tagline: "Bold Flavors. Real Ingredients. Made From The Heart.",
  established: "2024",
  founder: "Vimal",
  currency: "₹",
  freeShippingThreshold: 799,
  defaultShippingFee: 60,
  fssaiNumber: "[ADD FSSAI NO.]",
  customerCountPlaceholder: "[ADD REAL NUMBER]",
  nextBatchDate: "October 8th",
  whatsappNumber: "919082218134", // digits only, used in wa.me links
  whatsappDisplay: "+91 90822 18134", // how the number is shown to visitors
  mksCookingUrl: "https://www.google.com/maps?ll=19.119911,72.878208&z=14&t=m&hl=en&gl=US&mapclient=embed&cid=1242274247848054733", // Google Maps listing for MKS Cooking, Marol, Mumbai
  mksCookingCoords: "19.119911,72.878208", // exact map pin used by the embedded maps
  whatsappMessage: "Hi VM Pickle Pantry! I'd like to place an order directly on WhatsApp.",
  tastePromise: "100% Taste Promise: Handcrafted in small batches using traditional South Indian recipes in ceramic Bharanis. If your jar arrives damaged or taste doesn't satisfy, we replace it free of charge within 24 hours.",
  batchNotice: "Small batch — made fresh weekly with 0% added preservatives.",
  copyright: "© 2026 VM Pickle Pantry — A House of MKS Cooking brand. All rights reserved.",
  trustBadges: [
    { title: "Whole Plant Extracts", subtitle: "100% natural spices, no artificial colors or essences.", icon: "Leaf" },
    { title: "Bulk & Alternative Packs", subtitle: "Custom 500g & 1kg jar options for big families.", icon: "Package" },
    { title: "Zero Artificial Preservatives", subtitle: "Cured naturally with salt, oil & sun heat in Bharanis.", icon: "ShieldCheck" },
    { title: "Organic Sea Salt Curing", subtitle: "Hand-harvested unrefined rock salt for gut health.", icon: "Sparkles" },
  ],
};

/** False until a real FSSAI number replaces the "[ADD ...]" placeholder, so the site never shows the placeholder. */
export const hasFssai = !SITE_CONFIG.fssaiNumber.startsWith('[');

export const PRODUCTS: Product[] = [
  {
    id: "garlic-pickle",
    slug: "garlic-pickle",
    name: "Garlic Pickle",
    subtitle: "Whole Roasted Garlic Cloves in Pungent Sesame & Red Chilli Oil",
    category: "veg",
    isVeg: true,
    tagline: "Whole garlic cloves steeped in pure gingelly oil with hand-roasted spices",
    description: "Made the traditional way: farm-fresh garlic cloves, peeled by hand and slow-cooked in pure cold-pressed gingelly (sesame) oil with mustard seeds, curry leaves, Kashmiri chillies, tamarind and a pinch of hing. Rock salt and gingelly oil are the only preservatives, so every clove stays crisp, savoury and full of kick.",
    tasteProfile: ["Bold Garlic Pungency", "Fiery Red Chilli", "Rich Roasted Spice"],
    spiceLevel: 4,
    spiceLabel: "High Heat",
    image: "/assets/jars/garlic-pickle.jpg",
    imageBg: "#000000",
    labelColor: "#1F3A12",
    accentColor: "#9DB04F",
    badges: ["100% Veg", "Best Seller"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 329,
        pricePer100g: 132,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 549,
        pricePer100g: 110,
        badge: "Most Loved",
        isPopular: true,
        savingsText: "Save ₹109 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 999,
        pricePer100g: 100,
        badge: "Best Value",
        savingsText: "Save ₹317 vs buying 4×250g",
      },
    ],
    ingredients: [
      "Native Farm-Fresh Garlic Cloves",
      "Cold-Pressed Sesame (Gingelly) Oil",
      "Kashmiri Red Chilli Powder",
      "Tamarind Extract",
      "Mustard Seeds & Curry Leaves",
      "Rock Salt & Asafoetida (Hing)",
    ],
    howToStore: "Store in a cool dry place. Keep garlic submerged under the oil layer in ceramic Bharani for peak freshness.",
    shelfLife: "9 months unopened. 6 months after opening.",
    goesWellWith: [
      {
        id: "curd-rice-mix",
        name: "Tempered Curd Rice Spice Mix",
        description: "Mustard, curry leaves & ginger crispies for instant hotel-style curd rice.",
        price: 149,
        image: "/assets/jars/garlic-pickle.jpg",
      },
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "mixed-pickle",
    slug: "mixed-pickle",
    name: "Mixed Pickle",
    subtitle: "Citron, Wild Lime, Ginger & Green Chillies in Sun-Cured Gingelly Oil",
    category: "veg",
    isVeg: true,
    tagline: "Citron, wild lime, ginger & green chillies sun-cured in pure gingelly oil",
    description: "Our signature all-vegetarian pickle. Hand-cut citron and lime wedges, fresh ginger and green chillies are cured in rock salt, then sun-dried and steeped in pure cold-pressed gingelly oil with roasted fenugreek and mustard in ceramic Bharanis, just as it is done in South Indian homes. No vinegar, no artificial preservatives.",
    tasteProfile: ["Citron Sourness", "Wild Lime Kick", "Zesty Ginger Heat"],
    spiceLevel: 3,
    spiceLabel: "Classic Spicy",
    image: "/assets/jars/mixed-pickle.jpg",
    imageBg: "#000000",
    labelColor: "#7A1C1C",
    accentColor: "#E0A96D",
    badges: ["Most Loved", "100% Veg"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 349,
        pricePer100g: 140,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 599,
        pricePer100g: 120,
        badge: "Most Loved",
        isPopular: true,
        savingsText: "Save ₹99 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 1099,
        pricePer100g: 110,
        badge: "Best Value",
        savingsText: "Save ₹297 vs buying 4×250g",
      },
    ],
    ingredients: [
      "Sun-Cured Citron & Lime Wedges",
      "Fresh Ginger Juliennes",
      "Green Chillies",
      "Cold-Pressed Gingelly Oil",
      "Roasted Fenugreek & Mustard",
      "Unrefined Sea Salt",
    ],
    howToStore: "Store in a cool dry pantry. Always use clean dry spoon.",
    shelfLife: "9 months unopened.",
    goesWellWith: [
      {
        id: "dosa-podi",
        name: "Traditional Gunpowder Dosa Podi",
        description: "Roasted lentils & red chilli spice blend for dosas and idlis.",
        price: 199,
        image: "/assets/jars/mixed-pickle.jpg",
      },
    ],
    featured: true,
    rating: 5.0,
    reviewCount: 215,
  },
  {
    id: "mango-pickle",
    slug: "mango-pickle",
    name: "Mango Pickle",
    subtitle: "Raw Avakaya Mango Chunks in Gingelly Oil & Guntur Chilli Spice",
    category: "veg",
    isVeg: true,
    tagline: "Raw Avakaya mango chunks in pure gingelly oil and Guntur chilli spice blend",
    description: "Crisp raw green mangoes, cut by hand and tossed with stone-ground mustard, sun-dried Guntur red chillies, roasted fenugreek, garlic and rock salt. Cured in pure cold-pressed gingelly oil following the Avakaya tradition, with no vinegar and no artificial preservatives.",
    tasteProfile: ["Raw Mango Sourness", "Mustard Pungency", "Fiery Red Chilli"],
    spiceLevel: 5,
    spiceLabel: "Extreme Fire",
    image: "/assets/jars/mango-pickle.jpg",
    imageBg: "#000000",
    labelColor: "#B5821B",
    accentColor: "#1F3A12",
    badges: ["100% Veg", "Traditional Avakaya"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 319,
        pricePer100g: 128,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 529,
        pricePer100g: 106,
        badge: "Most Loved",
        isPopular: true,
        savingsText: "Save ₹109 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 949,
        pricePer100g: 95,
        badge: "Best Value",
        savingsText: "Save ₹327 vs buying 4×250g",
      },
    ],
    ingredients: [
      "Hand-Cut Raw Avakaya Mangoes",
      "Pungent Mustard Powder",
      "Guntur Red Chilli Powder",
      "Cold-Pressed Gingelly Oil",
      "Peeled Garlic & Rock Salt",
    ],
    howToStore: "Store in cool dry place. Keep oil covering mango chunks.",
    shelfLife: "12 months unopened.",
    goesWellWith: [],
    featured: true,
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "narthangai-citron-pickle",
    slug: "narthangai-citron-pickle",
    name: "Narthangai (Citron) Pickle",
    subtitle: "Heritage South Indian Sun-Cured Bitter-Sweet Citrus",
    category: "veg",
    isVeg: true,
    tagline: "Sun-cured citron fruit steeped in sesame oil and hand-roasted spices",
    description: "Hand-picked Narthangai (citron) cured in rock salt and sun-dried for 14 days in ceramic Bharanis, then steeped in pure cold-pressed gingelly oil with toasted fenugreek, Kashmiri chillies and hing. A heritage South Indian recipe: no vinegar, no artificial preservatives.",
    tasteProfile: ["Sun-Cured Citrus", "Toasted Mustard-Fenugreek", "Warm Tangy Finish"],
    spiceLevel: 2,
    spiceLabel: "Gentle Warmth",
    image: "/assets/jars/narthangai-citron.jpg",
    imageBg: "#000000",
    labelColor: "#4A6B2F",
    accentColor: "#EDE8DA",
    badges: ["Hero Product", "100% Veg", "Heritage Recipe"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 349,
        pricePer100g: 140,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 599,
        pricePer100g: 120,
        badge: "Family Pack",
        isPopular: true,
        savingsText: "Save ₹99 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 1099,
        pricePer100g: 110,
        badge: "Best Value",
        savingsText: "Save ₹297 vs 4×250g",
      },
    ],
    ingredients: [
      "Sun-Cured Narthangai (Citron)",
      "Cold-Pressed Gingelly Oil",
      "Kashmiri Red Chilli Powder",
      "Roasted Fenugreek",
      "Asafoetida & Rock Salt",
    ],
    howToStore: "Store in a cool, dry pantry. Always use a clean dry spoon.",
    shelfLife: "9 months unopened.",
    goesWellWith: [],
    featured: true,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "chicken-pickle",
    slug: "chicken-pickle",
    name: "Chicken Pickle",
    subtitle: "Slow-Roasted Boneless Chicken Cuts in Fiery Guntur Red Chilli Gravy",
    category: "non-veg",
    isVeg: false,
    tagline: "Slow-roasted boneless chicken cuts in fiery Guntur red chilli and spices",
    description: "Fresh boneless chicken marinated in ginger, garlic and turmeric, then slow-cooked in pure cold-pressed gingelly oil with roasted Guntur red chillies, coriander and cumin. Traditional spices and gingelly oil keep it rich, deep and free of artificial preservatives.",
    tasteProfile: ["Crisp Boneless Chicken", "Guntur Chilli Fire", "Deep Roasted Gravy"],
    spiceLevel: 5,
    spiceLabel: "Fiery Fire",
    image: "/assets/jars/chicken-pickle.jpg",
    imageBg: "#000000",
    labelColor: "#801B1B",
    accentColor: "#E5A93B",
    badges: ["100% Boneless", "Artisanal Non-Veg"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 499,
        pricePer100g: 200,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 849,
        pricePer100g: 170,
        badge: "Family Pack",
        isPopular: true,
        savingsText: "Save ₹149 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 1599,
        pricePer100g: 160,
        badge: "Best Value",
        savingsText: "Save ₹397 vs 4×250g",
      },
    ],
    ingredients: [
      "Boneless Farm Chicken",
      "Fresh Ginger & Garlic",
      "Cold-Pressed Sesame Oil",
      "Guntur Red Chilli Powder",
      "Coriander & Cumin Seeds",
    ],
    howToStore: "Refrigerate after opening.",
    shelfLife: "6 months unopened.",
    goesWellWith: [],
    featured: true,
    rating: 4.9,
    reviewCount: 215,
  },
  {
    id: "mutton-pickle",
    slug: "mutton-pickle",
    name: "Mutton Pickle",
    subtitle: "Succulent Mutton Cuts Cooked Low & Slow with Black Pepper & Crushed Spices",
    category: "non-veg",
    isVeg: false,
    tagline: "Succulent mutton cuts cooked low and slow with black pepper & crushed spices",
    description: "Tender cuts of young goat meat slow-simmered in pure cold-pressed gingelly oil with whole spices, roasted black pepper, star anise, red chillies and garlic until the meat absorbs every drop of the gravy. Made the traditional way with no artificial preservatives.",
    tasteProfile: ["Tender Goat Cuts", "Peppery Black Spice", "Deep Aromatic Gravy"],
    spiceLevel: 5,
    spiceLabel: "Extreme Fire",
    image: "/assets/jars/mutton-pickle.jpg",
    imageBg: "#000000",
    labelColor: "#4A1B2A",
    accentColor: "#D4AF37",
    badges: ["Premium Tier", "Tender Mutton"],
    sizes: [
      {
        id: "250g",
        name: "250g",
        volume: "250g",
        volumeMl: 250,
        price: 649,
        pricePer100g: 260,
      },
      {
        id: "500g",
        name: "500g",
        volume: "500g",
        volumeMl: 500,
        price: 1099,
        pricePer100g: 220,
        badge: "Family Pack",
        isPopular: true,
        savingsText: "Save ₹199 vs 250g rate",
      },
      {
        id: "1kg",
        name: "1kg",
        volume: "1kg",
        volumeMl: 1000,
        price: 2099,
        pricePer100g: 210,
        badge: "Best Value",
        savingsText: "Save ₹497 vs 4×250g",
      },
    ],
    ingredients: [
      "Select Prime Mutton Cuts",
      "Roasted Black Pepper & Star Anise",
      "Cold-Pressed Gingelly Oil",
      "Red Chillies & Garlic",
    ],
    howToStore: "Refrigerate upon arrival.",
    shelfLife: "6 months unopened.",
    goesWellWith: [],
    featured: true,
    rating: 5.0,
    reviewCount: 76,
  },
  {
    id: "pickle-trio-bundle",
    slug: "pickle-trio-bundle",
    name: "The Pickle Trio Gift Box",
    subtitle: "1 Veg Citron + 1 Garlic Pickle + 1 Chicken Pickle (250g each)",
    category: "bundle",
    isVeg: false,
    tagline: "The Ultimate Pantry Tasting Experience — Save ₹78",
    description: "Can't decide? Experience our three most iconic pickles in one beautifully packaged gift box. Includes 1× Narthangai Citron (250g), 1× Garlic Pickle (250g), and 1× Chicken Pickle (250g). Perfect for gifting or spice connoisseurs.",
    tasteProfile: ["Citron Sour-Bitter", "Garlic Punch", "Fiery Meat Indulgence"],
    spiceLevel: 4,
    spiceLabel: "Variety Pack",
    image: "/assets/hero-trio-jars.png",
    labelColor: "#1F3A12",
    accentColor: "#9DB04F",
    badges: ["Gift Box", "Best Value Bundle", "Save ₹78"],
    sizes: [
      {
        id: "250g",
        name: "Trio Bundle (3 × 250g)",
        volume: "750g Total",
        volumeMl: 750,
        price: 1099,
        pricePer100g: 146,
        badge: "Best Value",
        isPopular: true,
        savingsText: "Save ₹78 vs ₹1,177 individual total",
      },
    ],
    ingredients: [
      "1 Jar Narthangai Citron Pickle (250g)",
      "1 Jar Garlic Pickle (250g)",
      "1 Jar Chicken Pickle (250g)",
    ],
    howToStore: "Store in a cool dry pantry. Refrigerate chicken pickle after opening.",
    shelfLife: "6 to 9 months depending on jar.",
    goesWellWith: [],
    featured: true,
    rating: 5.0,
    reviewCount: 89,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Ananya Raghunath",
    location: "Verified Buyer • Chennai",
    rating: 5,
    date: "2 days ago",
    productName: "Narthangai (Citron) Pickle",
    comment: "The Narthangai pickle took me straight back to my grandmother's house in Madurai! You can actually taste the real citron and sun-curing without any synthetic sour 'vinegar' sting. Ordering my third batch today!",
    verifiedPurchase: true,
    avatar: "AR",
    initials: "AR",
  },
  {
    id: "r2",
    author: "Raziya Prasad",
    location: "Verified Buyer • Bengaluru",
    rating: 5,
    date: "1 week ago",
    productName: "Chicken Pickle",
    comment: "Finding an authentic non-veg pickle online without synthetic vinegar was impossible... until VM Pickle Pantry! Chicken is juicy, oil is deep red and spicy, and delivery came in 2 days.",
    verifiedPurchase: true,
    avatar: "RP",
    initials: "RP",
  },
  {
    id: "r3",
    author: "Dhruv Mukherjee",
    location: "Verified Buyer • Hyderabad",
    rating: 5,
    date: "2 weeks ago",
    productName: "Garlic Pickle",
    comment: "Garlic Pickle is an absolute powerhouse of flavor! Whole roasted garlic cloves that stay crisp inside red spicy oil. Arrived perfectly wrapped with zero leaks.",
    verifiedPurchase: true,
    avatar: "DM",
    initials: "DM",
  },
];
