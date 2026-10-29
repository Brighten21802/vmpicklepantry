'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SITE_CONFIG, PRODUCTS } from '@/config/products';

export const Navbar: React.FC = () => {
  const { items, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? PRODUCTS.filter((p) =>
        [p.name, p.subtitle, p.tagline, ...p.tasteProfile, ...p.ingredients, p.category === 'non-veg' ? 'non veg non-veg' : p.category]
          .join(' ')
          .toLowerCase()
          .includes(query)
      ).slice(0, 5)
    : [];

  // Escape closes search and the menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setSearchOpen(false);
      setSearchQuery('');
      setMegaMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMegaMenu = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setMegaMenuOpen(true);
    setSearchOpen(false);
  };

  const closeMegaMenu = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleOpenSearch = () => {
    setMegaMenuOpen(false);
    setSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 80);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const fillSearch = (term: string) => {
    setSearchQuery(term);
    searchInputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 w-full font-nav transition-all">
      {/* Slim Minimal Announcement Bar (Exactly 32px height) */}
      <div
        className="w-full h-8 flex items-center justify-center border-b border-[#1F3A1A]/[0.08] text-[12px] tracking-[0.01em] text-[#1F3A1A]/85"
        style={{ backgroundColor: '#EFE9DD' }}
      >
        <div className="px-4 text-center truncate">
          <span>Free shipping over ₹{SITE_CONFIG.freeShippingThreshold} · Small-batch, made fresh weekly</span>
          <Link
            className="ml-1.5 font-medium text-[#1F3A1A] hover:opacity-75 transition-opacity underline-offset-2 hover:underline"
            href="/shop"
          >
            Shop now ›
          </Link>
        </div>
      </div>

      {/* Nav bar: 76px tall so the logo has room to be seen */}
      <nav className="w-full h-[76px] apple-nav-blur border-b border-[#1F3A1A]/[0.09] relative bg-[#EFE9DD]/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Mobile: Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Open Navigation Menu"
              className="p-1 text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <line x1="4" x2="20" y1="7" y2="7"></line>
                <line x1="4" x2="20" y1="17" y2="17"></line>
              </svg>
            </button>
          </div>

          {/* Left / Logo */}
          <Link className="flex items-center flex-shrink-0 mr-auto md:mr-0 pl-1 group" href="/" title="VM Pickle Pantry">
            <Image
              src="/assets/logo-nav.png"
              alt="VM Pickle Pantry logo"
              width={140}
              height={93}
              priority
              className="h-16 w-auto object-contain mix-blend-multiply transition-opacity duration-200 group-hover:opacity-85"
            />
          </Link>

          {/* Center Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8 h-full mx-auto">
            <div
              className="relative h-full flex items-center"
              onMouseEnter={openMegaMenu}
              onMouseLeave={closeMegaMenu}
            >
              <button
                className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3 flex items-center gap-1 focus:outline-none"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                Shop
              </button>
            </div>
            <Link className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3" href="/shop?category=veg">
              Veg
            </Link>
            <Link className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3" href="/shop?category=non-veg">
              Non-Veg
            </Link>
            <Link className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3" href="/spice-guide">
              Spice Guide
            </Link>
            <Link className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3" href="/story">
              Our Story
            </Link>
            <Link className="text-[12px] font-medium tracking-[0.01em] text-[#1F3A1A]/80 hover:text-[#1F3A1A] transition-colors duration-200 py-3" href="/gift-sets">
              Gift Sets
            </Link>
          </div>

          {/* Right Action Icons: Exactly 3 minimalist thin-line SVG icons */}
          <div className="flex items-center gap-5 sm:gap-6 text-[#1F3A1A]/80">
            {/* 1. Search Icon */}
            <button
              aria-label="Search"
              className="p-1 hover:text-[#1F3A1A] transition-colors focus:outline-none"
              onClick={handleOpenSearch}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round"></path>
              </svg>
            </button>

            {/* 2. Account / User Icon */}
            <Link aria-label="Contact us" className="hidden sm:inline-block p-1 hover:text-[#1F3A1A] transition-colors" href="/contact">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 20c0-3.5 3.5-5 8-5s8 1.5 8 5" strokeLinecap="round"></path>
              </svg>
            </Link>

            {/* 3. Shopping Bag Icon */}
            <button
              aria-label="Shopping Bag"
              className="relative p-1 hover:text-[#1F3A1A] transition-colors focus:outline-none"
              onClick={openCart}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 7h12l1 13H5L6 7z"></path>
                <path d="M9 7V5a3 3 0 016 0v2" strokeLinecap="round"></path>
              </svg>
              {totalItemsCount > 0 && (
                <span
                  className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#1F3A1A] text-white text-[10px] font-semibold leading-4 text-center"
                  aria-label={`${totalItemsCount} items in bag`}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {megaMenuOpen && (
          <div
            className="absolute top-[76px] left-0 w-full bg-[#EFE9DD]/96 backdrop-blur-xl border-b border-[#1F3A1A]/[0.08] transition-opacity duration-200 z-50 shadow-lg"
            onMouseEnter={() => {
              if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
            }}
            onMouseLeave={closeMegaMenu}
          >
            <div className="max-w-5xl mx-auto py-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <span className="text-[11px] font-bold tracking-[0.08em] text-[#1F3A1A]/75 block mb-3">By Category</span>
                <ul className="space-y-2.5 text-[13px] text-[#1F3A1A]/85 font-medium">
                  <li><Link className="hover:text-[#1F3A1A] hover:translate-x-0.5 inline-block transition-transform" href="/#featured-trio">Signature Trio (Garlic, Mixed, Mango)</Link></li>
                  <li><Link className="hover:text-[#1F3A1A] hover:translate-x-0.5 inline-block transition-transform" href="/shop?category=veg">Vegetarian Pantry Pickles</Link></li>
                  <li><Link className="hover:text-[#1F3A1A] hover:translate-x-0.5 inline-block transition-transform" href="/shop?category=non-veg">Andhra Non-Veg Specials</Link></li>
                  <li><Link className="hover:text-[#1F3A1A] hover:translate-x-0.5 inline-block transition-transform" href="/shop?category=bundle">Heirloom Podi &amp; Gift Sets</Link></li>
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-[0.08em] text-[#1F3A1A]/75 block mb-3">By Heat Level</span>
                <ul className="space-y-2.5 text-[13px] text-[#1F3A1A]/85">
                  <li><Link className="hover:text-[#1F3A1A] flex items-center justify-between" href="/#spice-meter"><span className="font-medium">Mild &amp; Tangy</span> <span className="text-[11px] text-[#1F3A1A]/75">Curd Rice Friendly</span></Link></li>
                  <li><Link className="hover:text-[#1F3A1A] flex items-center justify-between" href="/#spice-meter"><span className="font-medium">Homestyle Medium</span> <span className="text-[11px] text-[#1F3A1A]/75">Standard Kitchen</span></Link></li>
                  <li><Link className="hover:text-[#1F3A1A] flex items-center justify-between" href="/#spice-meter"><span className="font-medium">Guntur High Heat</span> <span className="text-[11px] text-[#1F3A1A]/75">S17 Sun Roasted</span></Link></li>
                  <li><Link className="hover:text-[#1F3A1A] flex items-center justify-between" href="/#spice-meter"><span className="font-medium">Garlic Inferno</span> <span className="text-[11px] text-[#6B1F2E] font-semibold">Peak Fire</span></Link></li>
                </ul>
              </div>

              <div className="bg-white/70 p-4 rounded-2xl border border-[#1F3A1A]/[0.08] flex items-center gap-4">
                <Image
                  src="/assets/hero-floating-trio.png"
                  alt="The Trio Preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-xl bg-[#EFE9DD] shadow-sm flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#B87A14] block mb-0.5">Kitchen Signature</span>
                  <Link className="font-semibold text-sm text-[#1F3A1A] hover:underline flex items-center gap-1 leading-snug" href="/#featured-trio">
                    Artisanal Trio Pack ›
                  </Link>
                  <p className="text-[11px] text-[#1F3A1A]/75 mt-1 line-clamp-2">Garlic, Mixed &amp; Mango fresh batches cured in native gingelly &amp; mustard oil.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apple-style Minimal Search Bar Overlay */}
        {searchOpen && (
          <div className="absolute top-0 left-0 w-full h-[76px] bg-[#EFE9DD]/98 border-b border-[#1F3A1A]/[0.08] z-50 px-6 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <svg className="w-4 h-4 text-[#1F3A1A]/75 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round"></path>
                </svg>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-[13px] text-[#1F3A1A] placeholder-[#1F3A1A]/40 focus:ring-0 focus:outline-none"
                  placeholder="Search pickles, e.g. garlic, mango, chicken"
                  type="text"
                  aria-label="Search products"
                />
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#1F3A1A]/75">
                <span>Popular:</span>
                <button type="button" className="hover:text-[#1F3A1A] underline underline-offset-2" onClick={() => fillSearch('Garlic Pickle')}>Garlic Pickle</button>
                <span>·</span>
                <button type="button" className="hover:text-[#1F3A1A] underline underline-offset-2" onClick={() => fillSearch('Mixed Pickle')}>Mixed Pickle</button>
                <span>·</span>
                <button type="button" className="hover:text-[#1F3A1A] underline underline-offset-2" onClick={() => fillSearch('Mango Pickle')}>Mango Pickle</button>
                <span>·</span>
                <button type="button" className="hover:text-[#1F3A1A] underline underline-offset-2" onClick={() => fillSearch('Andhra Chicken')}>Andhra Chicken</button>
              </div>
              <button
                type="button"
                className="text-[12px] font-medium text-[#1F3A1A]/75 hover:text-[#1F3A1A] px-2 py-1"
                onClick={handleCloseSearch}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Search results */}
        {searchOpen && query && (
          <div className="absolute top-[76px] left-0 w-full bg-[#EFE9DD] border-b border-[#1F3A1A]/[0.08] shadow-lg z-50">
            <div className="max-w-[1200px] mx-auto px-6 py-4">
              {searchResults.length > 0 ? (
                <ul className="divide-y divide-[#1F3A1A]/10">
                  {searchResults.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={handleCloseSearch}
                        className="flex items-center gap-4 py-3 hover:bg-white/50 rounded-xl px-2 transition-colors"
                      >
                        <span
                          className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white"
                          style={p.imageBg ? { backgroundColor: p.imageBg } : undefined}
                        >
                          <Image src={p.image} alt="" width={48} height={48} className="w-full h-full object-contain" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-[#1F3A1A]">{p.name}</span>
                          <span className="block text-xs text-[#1F3A1A]/75 truncate">{p.tagline}</span>
                        </span>
                        <span className="text-sm text-[#1F3A1A]/75">from ₹{Math.min(...p.sizes.map((s) => s.price))}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#1F3A1A]/75 py-2">
                  No pickles match &ldquo;{searchQuery.trim()}&rdquo;. Try garlic, mango, citron, chicken or mutton.
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] bg-[#EFE9DD] z-40 p-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/assets/logo-nav.png"
              alt="VM Pickle Pantry"
              width={160}
              height={107}
              className="w-40 h-auto mix-blend-multiply mb-4"
            />
            <div className="h-px w-24 bg-[#1F3A1A]/15 my-2"></div>
          </div>
          <div className="space-y-5 text-center">
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/#featured-trio" onClick={() => setMobileMenuOpen(false)}>Shop The Trio</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/shop?category=veg" onClick={() => setMobileMenuOpen(false)}>Veg Pantry</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/shop?category=non-veg" onClick={() => setMobileMenuOpen(false)}>Non-Veg Specials</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/spice-guide" onClick={() => setMobileMenuOpen(false)}>Spice Guide</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/gift-sets" onClick={() => setMobileMenuOpen(false)}>Gift Sets</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/story" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
            <Link className="block text-2xl font-bold text-[#1F3A1A] hover:opacity-75 transition-opacity" href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
          <div className="pt-8 border-t border-[#1F3A1A]/10 text-xs text-center text-[#1F3A1A]/75 space-y-1">
            <div className="font-medium">Pure Wood-Pressed Gingelly &amp; Cold Spices</div>
          </div>
        </div>
      )}

      {/* Dimming backdrop behind the mega menu and search */}
      {(megaMenuOpen || searchOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px] transition-opacity duration-200"
          onClick={() => {
            setMegaMenuOpen(false);
            handleCloseSearch();
          }}
        />
      )}
    </header>
  );
};
