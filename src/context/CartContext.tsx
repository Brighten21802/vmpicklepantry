'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, PRODUCTS, SITE_CONFIG } from '@/config/products';

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

const MAX_LINE_QUANTITY = 50;

/**
 * A saved cart holds copies of products and sizes, so after a price change it would keep charging the old
 * price. Rebuild every line from the current catalogue (price, weight, name), keep only the saved ids and
 * quantity, and drop lines whose product or size no longer exists or whose quantity is invalid.
 */
function refreshFromCatalogue(saved: unknown[]): CartItem[] {
  const addOns = PRODUCTS.flatMap((p) => p.goesWellWith);
  const refreshed: CartItem[] = [];
  for (const raw of saved) {
    const line = raw as Partial<CartItem> | null;
    const productId = line?.product?.id;
    const sizeId = line?.size?.id;
    const quantity = Math.floor(Number(line?.quantity));
    if (!productId || !sizeId || !Number.isFinite(quantity) || quantity < 1) continue;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) continue;
    const qty = Math.min(quantity, MAX_LINE_QUANTITY);

    if (sizeId.startsWith('addon-')) {
      const addOn = addOns.find((a) => `addon-${a.id}` === sizeId);
      if (!addOn || !line?.size) continue;
      // Keep the add-on's saved shape (volume, per-100g) but take its price from the catalogue.
      refreshed.push({ product, size: { ...line.size, name: addOn.name, price: addOn.price }, quantity: qty });
      continue;
    }
    const size = product.sizes.find((s) => s.id === sizeId);
    if (size) refreshed.push({ product, size, quantity: qty });
  }
  return refreshed;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, sizeId: string) => void;
  updateQuantity: (productId: string, sizeId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingProgress: {
    needed: number;
    percentage: number;
    isFree: boolean;
  };
  pincode: string;
  setPincode: (code: string) => void;
  pincodeStatus: 'idle' | 'checking' | 'serviceable' | 'unserviceable';
  checkPincode: (code: string) => Promise<boolean>;
  paymentMethod: 'upi' | 'card' | 'cod';
  setPaymentMethod: (method: 'upi' | 'card' | 'cod') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'serviceable' | 'unserviceable'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vm_pickle_pantry_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(refreshFromCatalogue(parsed));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    setHydrated(true);
  }, []);

  // Save cart to localStorage, but only after the saved cart has been read.
  // Otherwise the first render's empty cart overwrites it (Strict Mode runs the load twice).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('vm_pickle_pantry_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items, hydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (product: Product, size: ProductSize, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.size.id === size.id
      );
      if (existingIndex > -1) {
        // Copy the item rather than mutating it, so Strict Mode's double-run doesn't add twice
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_LINE_QUANTITY) }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, sizeId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size.id === sizeId))
    );
  };

  const updateQuantity = (productId: string, sizeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, sizeId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size.id === sizeId
          ? { ...i, quantity: Math.min(quantity, MAX_LINE_QUANTITY) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.size.price * item.quantity,
    0
  );

  const isFreeShipping = subtotal >= SITE_CONFIG.freeShippingThreshold || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : SITE_CONFIG.defaultShippingFee;
  const total = subtotal + shippingFee;

  const neededForFreeShipping = Math.max(0, SITE_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(
    100,
    Math.round((subtotal / SITE_CONFIG.freeShippingThreshold) * 100)
  );

  const checkPincode = async (code: string): Promise<boolean> => {
    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      setPincodeStatus('unserviceable');
      return false;
    }
    setPincodeStatus('checking');
    await new Promise((res) => setTimeout(res, 600));
    // All Indian 6-digit pincodes deliverable by BlueDart / DTDC / SpeedPost
    setPincodeStatus('serviceable');
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        shippingFee,
        total,
        freeShippingProgress: {
          needed: neededForFreeShipping,
          percentage: freeShippingPercentage,
          isFree: isFreeShipping,
        },
        pincode,
        setPincode,
        pincodeStatus,
        checkPincode,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
