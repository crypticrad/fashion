'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { Rate } from 'antd';
import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { ProductInfoProps as Props } from './ProductInfo.interface';

const CheckMark = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3.5 8.5L6.5 11.5L12.5 5"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Minus = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Plus = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Product info panel — Figma node 1:2 (right of the gallery).
 *
 * Stack: title → rating row (gold stars + "x/5") → price row (current; optional
 * struck original + red "-N%" badge) → description → rule → colour swatches →
 * rule → size pills → rule → quantity stepper + full-width "Add to Cart".
 *
 * Owns the local selection state (colour, size, quantity) — hence a Client
 * Component. Add-to-cart is a stub until cart wiring lands.
 */
export const ProductInfo = ({
  name,
  rating,
  price,
  originalPrice,
  discountPercent,
  description,
  colors,
  sizes
}: Props) => {
  const [color, setColor] = useState(colors[0]?.name);
  const [size, setSize] = useState(sizes[2] ?? sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3.5">
        <Heading type="h1" size={40} weight="bold" className="uppercase leading-10">
          {name}
        </Heading>

        <div className="flex items-center gap-4">
          <Rate
            disabled
            allowHalf
            value={rating}
            className="leading-none"
            style={{ fontSize: 24 }}
          />
          <Body type="normal" weight="regular" color="#000">
            {rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </Body>
        </div>

        <div className="flex items-center gap-2.5">
          <Heading type="h3" size={32} weight="bold" color="#000">
            ${price}
          </Heading>
          {originalPrice != null && (
            <Heading
              type="h3"
              size={32}
              weight="bold"
              color="rgba(0,0,0,0.4)"
              className="line-through"
            >
              ${originalPrice}
            </Heading>
          )}
          {discountPercent != null && (
            <Body
              type="medium"
              weight="semi500"
              color="#FF3333"
              className="rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 leading-none"
            >
              -{discountPercent}%
            </Body>
          )}
        </div>

        <Body type="normal" weight="regular" color="rgba(0,0,0,0.6)" className="mt-1.5 leading-5.5">
          {description}
        </Body>
      </div>

      <hr className="border-t border-black/10" />

      <fieldset className="flex flex-col gap-4">
        <legend className="body-normal-regular text-black/60">Select Colors</legend>
        <div className="flex items-center gap-4">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              aria-pressed={color === c.name}
              onClick={() => setColor(c.name)}
              style={{ backgroundColor: c.hex }}
              className="grid size-9 place-items-center rounded-full transition-transform hover:scale-105"
            >
              {color === c.name && <CheckMark />}
            </button>
          ))}
        </div>
      </fieldset>

      <hr className="border-t border-black/10" />

      <fieldset className="flex flex-col gap-4">
        <legend className="body-normal-regular text-black/60">Choose Size</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={classNames(
                'body-normal-regular rounded-full px-6 py-2.5 leading-5.5 transition-colors',
                size === s
                  ? 'bg-black text-white'
                  : 'bg-[#F0F0F0] text-black/60 hover:bg-black/10'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <hr className="border-t border-black/10" />

      <div className="flex items-center gap-5">
        <div className="flex items-center justify-between rounded-full bg-[#F0F0F0] px-5 py-3.5">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid size-6 place-items-center text-black transition-opacity hover:opacity-60"
          >
            <Minus />
          </button>
          <Body type="normal" weight="semi500" color="#000" className="w-12 text-center">
            {quantity}
          </Body>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="grid size-6 place-items-center text-black transition-opacity hover:opacity-60"
          >
            <Plus />
          </button>
        </div>

        <button
          type="button"
          className="body-normal-semi500 flex-1 rounded-full bg-black py-3.5 leading-5.5 text-white transition-opacity hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
