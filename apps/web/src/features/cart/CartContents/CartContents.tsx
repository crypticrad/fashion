'use client';

import { useMemo, useState } from 'react';
import { Body } from '@/components/Typography/Body';
import { CartItemRow } from '../CartItemRow';
import { OrderSummary } from '../OrderSummary';
import { CartContentsProps as Props } from './CartContents.interface';

/**
 * Cart body — Figma node 31:32 (items panel + order summary).
 *
 * Owns the cart items as local state so quantity steppers and the delete button
 * mutate live, then derives the order summary (subtotal → discount → delivery →
 * total) from the current lines on every render. Demo data only; swap the seed
 * for real cart persistence later.
 */
export const CartContents = ({ items: seed, discountRate, deliveryFee }: Props) => {
  const [items, setItems] = useState(seed);

  const handleQuantityChange = (id: string, quantity: number) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

  const handleRemove = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const { subtotal, discount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = Math.round(subtotal * discountRate);
    const hasItems = items.length > 0;
    return {
      subtotal,
      discount,
      total: hasItems ? subtotal - discount + deliveryFee : 0
    };
  }, [items, discountRate, deliveryFee]);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-6 rounded-[20px] border border-black/10 px-6 py-5">
        {items.length === 0 ? (
          <Body type="large" weight="regular" color="rgba(0,0,0,0.6)">
            Your cart is empty.
          </Body>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="flex flex-col gap-6">
              {i > 0 && <hr className="border-t border-black/10" />}
              <CartItemRow
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            </div>
          ))
        )}
      </div>

      <div className="lg:w-[505px] lg:shrink-0">
        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          discountPercent={Math.round(discountRate * 100)}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </div>
  );
};
