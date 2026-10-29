'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart, CartItem } from '@/context/CartContext';
import { SITE_CONFIG, PRODUCTS, ProductSize } from '@/config/products';import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    freeShippingProgress,
    pincode,
    setPincode,
    pincodeStatus,
    checkPincode,
    paymentMethod,
    setPaymentMethod,
    addItem,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [orderLink, setOrderLink] = useState('');
  const [formError, setFormError] = useState('');

  // Cross-sell item candidate (e.g. Curd Rice mix or Gunpowder Podi)
  const crossSellItem = PRODUCTS[0].goesWellWith[0];

  // Close on Escape, and stop the page scrolling behind the open drawer
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  // Add-ons (e.g. a spice mix) ride on a jar's product record, so name the line by the add-on
  // Single-size products (the gift box) are named by the product alone, to avoid "Name (Name)" repeats.
  const itemLabel = (i: CartItem) =>
    i.size.id.startsWith('addon-')
      ? i.size.name
      : i.product.sizes.length === 1
      ? i.product.name
      : `${i.product.name} (${i.size.name})`;

  const paymentLabel = { upi: 'UPI', card: 'Card / Net banking', cod: 'Cash on delivery' }[paymentMethod];

  const handlePincodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await checkPincode(pincode);
  };

  // There is no payment gateway yet, so the order is sent to us on WhatsApp and we confirm payment there.
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!customerName.trim()) return setFormError('Enter your name.');
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleanPhone)) return setFormError('Enter a valid 10-digit mobile number.');
    if (address.trim().length < 10) return setFormError('Enter your full delivery address.');
    if (!/^[1-9]\d{5}$/.test(pincode)) return setFormError('Enter a valid 6-digit pincode.');
    setFormError('');

    const ref = `VM-${Math.floor(100000 + Math.random() * 900000)}`;
    const message = [
      `New order ${ref}`,
      ...items.map((i) => `• ${itemLabel(i)} x ${i.quantity} = ₹${i.size.price * i.quantity}`),
      `Subtotal: ₹${subtotal}`,
      `Shipping: ${shippingFee === 0 ? 'Free' : `₹${shippingFee}`}`,
      `Total: ₹${total}`,
      `Payment: ${paymentLabel}`,
      '',
      `Name: ${customerName.trim()}`,
      `Phone: ${cleanPhone}`,
      `Address: ${address.trim()}, ${pincode}`,
    ].join('\n');
    const link = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

    setOrderRef(ref);
    setOrderLink(link);
    setOrderComplete(true);
    window.open(link, '_blank', 'noopener,noreferrer');
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
          className="w-screen max-w-md bg-parchment-100 border-l border-forest-800/10 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-forest-800/10 bg-parchment-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-800" />
              <h2 className="font-display text-lg text-forest-900 tracking-tight">
                Your Pantry Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close shopping bag"
              className="p-2 rounded-full text-forest-800 hover:bg-parchment-300/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-forest-800 text-parchment-100 p-3.5 px-6 text-xs">
            <div className="flex items-center justify-between font-semibold mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-olive-400" />
                {freeShippingProgress.isFree
                  ? 'You unlocked free shipping'
                  : `Add ₹${freeShippingProgress.needed} more for FREE shipping`}
              </span>
              <span className="text-olive-400 font-bold">{freeShippingProgress.percentage}%</span>
            </div>
            <div className="w-full bg-forest-900 h-2 rounded-full overflow-hidden border border-forest-700">
              <div
                className="bg-olive-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl text-forest-900">
                  Send your order on WhatsApp
                </h3>
                <p className="text-xs text-forest-800/80 leading-relaxed max-w-xs mx-auto">
                  Thank you, <strong className="text-forest-900">{customerName}</strong>. We opened WhatsApp with your order. Press send there to confirm it, and we will reply with payment details.
                </p>
                <div className="p-4 bg-parchment-200 rounded-xl text-left text-xs space-y-1 text-forest-800">
                  <div>Reference: {orderRef}</div>
                  <div>Payment: {paymentLabel}</div>
                  <div>Delivery to pincode {pincode}</div>
                </div>
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
                >
                  WhatsApp didn&apos;t open? Open it again
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOrderComplete(false);
                    setCheckoutStep('cart');
                    closeCart();
                  }}
                  className="w-full py-3 bg-forest-800 text-parchment-100 font-bold text-xs rounded-xl hover:bg-forest-900"
                >
                  Continue shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-parchment-200 text-forest-800/75 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg text-forest-900">Your cart is empty</h3>
                <p className="text-xs text-forest-800/75 max-w-xs mx-auto">
                  Discover our small-batch, homemade Narthangai Citron and Garlic Inferno pickles.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 py-2.5 px-6 rounded-xl bg-forest-800 text-parchment-100 text-xs font-bold hover:bg-forest-900"
                >
                  Explore Pantry
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size.id}-${idx}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-forest-800/10 shadow-xs"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-parchment-200 shrink-0">
                        {/* Look up the live product so carts saved before an update still show the current image */}
                        <Image
                          src={(PRODUCTS.find((p) => p.id === item.product.id) || item.product).image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-xs text-forest-900 truncate pr-2">
                            {item.size.id.startsWith('addon-') ? item.size.name : item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id, item.size.id)}
                            className="text-forest-800/75 hover:text-red-700 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-forest-800 text-parchment-100 ">
                            {item.size.id.startsWith('addon-') ? item.size.volume : `${item.size.name} (${item.size.volume})`}
                          </span>
                          {!item.size.id.startsWith('addon-') && (
                            <span className="text-[10px] text-forest-800/75">
                              ₹{item.size.pricePer100g}/100g
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-forest-800/20 rounded-lg overflow-hidden bg-parchment-100">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product.id, item.size.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-parchment-200 text-forest-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-forest-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product.id, item.size.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-parchment-200 text-forest-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-display text-sm text-forest-900">
                            ₹{item.size.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Click Cross-Sell */}
                {crossSellItem && (
                  <div className="p-3.5 rounded-xl bg-parchment-200/80 border border-forest-800/15">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-forest-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                        Goes Best With
                      </span>
                      <span className="text-xs font-display text-forest-900">₹{crossSellItem.price}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white shrink-0 border border-forest-800/10">
                        <Image
                          src={crossSellItem.image}
                          alt={crossSellItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-forest-900 truncate">
                          {crossSellItem.name}
                        </h5>
                        <p className="text-[10px] text-forest-800/75 line-clamp-1">
                          {crossSellItem.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          addItem(
                            PRODUCTS[0],
                            {
                              // Own id so the add-on doesn't merge into the 250g jar line
                              id: `addon-${crossSellItem.id}` as ProductSize['id'],
                              name: crossSellItem.name,
                              volume: '250g',
                              volumeMl: 250,
                              price: crossSellItem.price,
                              pricePer100g: 99,
                            },
                            1
                          );
                        }}
                        className="py-1 px-2.5 rounded-lg bg-forest-800 text-parchment-100 text-[10px] font-bold hover:bg-forest-900 shrink-0"
                      >
                        + 1-Click Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Pincode Delivery Check */}
                <div className="p-3.5 rounded-xl bg-white border border-forest-800/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-forest-900">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest-800" />
                      Pincode
                    </span>
                    {pincodeStatus === 'serviceable' && (
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Valid pincode
                      </span>
                    )}
                  </div>
                  <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      aria-label="Delivery pincode"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode (e.g. 560001)"
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-forest-800/20 bg-parchment-100 focus:outline-none focus:border-forest-800"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-forest-800 text-parchment-100 rounded-lg text-xs font-bold hover:bg-forest-900"
                    >
                      Check
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Checkout Details Step */
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center justify-between border-b border-forest-800/10 pb-2">
                  <h3 className="font-display text-base text-forest-900">Shipping & Payment</h3>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-forest-800/75 underline"
                  >
                    Back to cart
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-semibold text-forest-900 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ananya Ramesh"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-forest-800/20 bg-white focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-semibold text-forest-900 mb-1">
                      Phone Number (for Delivery Updates) *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-forest-800/20 bg-white focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-semibold text-forest-900 mb-1">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      id="checkout-address"
                      autoComplete="street-address"
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat, House no., Building, Street, Area"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-forest-800/20 bg-white focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  {/* Payment Method Switcher */}
                  <div role="group" aria-labelledby="checkout-payment-label">
                    <span id="checkout-payment-label" className="block text-xs font-semibold text-forest-900 mb-1.5">
                      Select Payment Method *
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2 rounded-xl text-center border transition-all text-xs flex flex-col items-center justify-center ${
                          paymentMethod === 'upi'
                            ? 'bg-forest-800 text-parchment-100 border-forest-800 font-bold'
                            : 'bg-white border-forest-800/15 text-forest-900'
                        }`}
                      >
                        <span className="font-bold">UPI</span>
                        <span className="text-[9px] opacity-80">Pay on confirm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded-xl text-center border transition-all text-xs flex flex-col items-center justify-center ${
                          paymentMethod === 'card'
                            ? 'bg-forest-800 text-parchment-100 border-forest-800 font-bold'
                            : 'bg-white border-forest-800/15 text-forest-900'
                        }`}
                      >
                        <span className="font-bold">Card / Net</span>
                        <span className="text-[9px] opacity-80">Payment link</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded-xl text-center border transition-all text-xs flex flex-col items-center justify-center ${
                          paymentMethod === 'cod'
                            ? 'bg-forest-800 text-parchment-100 border-forest-800 font-bold'
                            : 'bg-white border-forest-800/15 text-forest-900'
                        }`}
                      >
                        <span className="font-bold">COD</span>
                        <span className="text-[9px] opacity-80">Cash on Del.</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="checkout-pincode" className="block text-xs font-semibold text-forest-900 mb-1">
                      Pincode *
                    </label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-digit pincode"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-forest-800/20 bg-white focus:outline-none focus:border-forest-800"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {formError}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && !orderComplete && (
            <div className="p-4 sm:p-6 border-t border-forest-800/10 bg-parchment-200/80 space-y-3">
              <div className="space-y-1.5 text-xs text-forest-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold ">Free</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-display text-forest-900 pt-2 border-t border-forest-800/10">
                  <span>Total (INR)</span>
                  <span className="text-xl">₹{total}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 rounded-xl bg-forest-800 text-parchment-100 font-bold text-xs hover:bg-forest-900 flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Alternative WhatsApp Checkout */}
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hi VM Pickle Pantry! I'd like to order:\n${items
                        .map(
                          (i) =>
                            `• ${itemLabel(i)} x ${i.quantity} = ₹${
                              i.size.price * i.quantity
                            }`
                        )
                        .join('\n')}\nTotal: ₹${total}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-800/10 text-emerald-900 border border-emerald-800/20 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-800/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Quick Order on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 rounded-xl bg-forest-800 text-parchment-100 font-bold text-xs hover:bg-forest-900 flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-olive-400" />
                  <span>Send order on WhatsApp · ₹{total}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
