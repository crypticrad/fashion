'use client';

import { Icon } from '@/components/Icon';
import { Body } from '@/components/Typography/Body';
import { CartItemRowProps as Props } from './CartItemRow.interface';

const Minus = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Plus = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 5V15M5 10H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Single cart line item — Figma node 31:520.
 *
 * Layout: square product thumbnail → title + size/colour + price (left), with a
 * red delete icon and a quantity stepper (− n +) stacked on the right. The whole
 * row reports quantity edits and removals up to the cart container, which owns
 * the items and recomputes the order summary.
 */
export const CartItemRow = ({ item, onQuantityChange, onRemove }: Props) => {
  const { id, name, price, size, color, quantity, image } = item;

  return (
    <div className="flex items-center gap-4">
      <div
        className="size-[124px] shrink-0 rounded-[8.658px] bg-[#F0EEED] bg-cover bg-center"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
        role={image ? 'img' : undefined}
        aria-label={image ? name : undefined}
      />

      <div className="flex min-w-0 flex-1 items-center justify-between">
        <div className="flex h-[118px] flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <Body type="large" weight="bold" color="#000" className="leading-none">
              {name}
            </Body>
            <Body type="small" weight="regular" color="#000">
              Size: <span className="text-black/60">{size}</span>
            </Body>
            <Body type="small" weight="regular" color="#000">
              Color: <span className="text-black/60">{color}</span>
            </Body>
          </div>
          <Body type="extralarge" size={24} weight="bold" color="#000" className="leading-none">
            ${price}
          </Body>
        </div>

        <div className="flex h-[124px] flex-col items-end justify-between">
          <button
            type="button"
            aria-label={`Remove ${name}`}
            onClick={() => onRemove(id!)}
            className="transition-opacity hover:opacity-60"
          >
            <Icon iconType="trash filled" width={24} height={24} color="#FF3333" />
          </button>

          <div className="flex items-center justify-center gap-5 rounded-[62px] bg-[#F0F0F0] px-5 py-3">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => onQuantityChange(id!, Math.max(1, quantity - 1))}
              className="grid size-5 place-items-center text-black transition-opacity hover:opacity-60"
            >
              <Minus />
            </button>
            <Body type="small" weight="semi500" color="#000" className="leading-none">
              {quantity}
            </Body>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => onQuantityChange(id!, quantity + 1)}
              className="grid size-5 place-items-center text-black transition-opacity hover:opacity-60"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
