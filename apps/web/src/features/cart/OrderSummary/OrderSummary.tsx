import { Icon } from '@/components/Icon';
import { Body } from '@/components/Typography/Body';
import { OrderSummaryProps as Props } from './OrderSummary.interface';

/**
 * Order summary panel — Figma node 31:645.
 *
 * All money values arrive already computed from the cart container, so this stays
 * a pure presentational Server Component: Subtotal → Discount (red) → Delivery Fee
 * → rule → Total, then the promo-code input + Apply, then "Go to Checkout".
 */
export const OrderSummary = ({
  subtotal,
  discount,
  discountPercent,
  deliveryFee,
  total
}: Props) => {
  return (
    <div className="flex flex-col gap-6 rounded-[20px] border border-black/10 px-6 py-5">
      <Body type="extralarge" size={24} weight="bold" color="#000" className="leading-none">
        Order Summary
      </Body>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Body type="large" weight="regular" color="rgba(0,0,0,0.6)">
            Subtotal
          </Body>
          <Body type="large" weight="bold" color="#000">
            ${subtotal}
          </Body>
        </div>

        <div className="flex items-center justify-between">
          <Body type="large" weight="regular" color="rgba(0,0,0,0.6)">
            Discount (-{discountPercent}%)
          </Body>
          <Body type="large" weight="bold" color="#FF3333">
            -${discount}
          </Body>
        </div>

        <div className="flex items-center justify-between">
          <Body type="large" weight="regular" color="rgba(0,0,0,0.6)">
            Delivery Fee
          </Body>
          <Body type="large" weight="bold" color="#000">
            ${deliveryFee}
          </Body>
        </div>

        <hr className="border-t border-black/10" />

        <div className="flex items-center justify-between">
          <Body type="large" weight="regular" color="#000">
            Total
          </Body>
          <Body type="extralarge" size={24} weight="bold" color="#000" className="leading-none">
            ${total}
          </Body>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[62px] bg-[#F0F0F0] px-4 py-3">
          <Icon iconType="tag filled" width={24} height={24} color="rgba(0,0,0,0.4)" />
          <input
            type="text"
            placeholder="Add promo code"
            className="body-medium-regular w-full bg-transparent leading-none text-black placeholder:text-black/40 focus:outline-none"
          />
        </label>
        <button
          type="button"
          className="body-medium-semi500 rounded-[62px] bg-black px-9 py-3 leading-none text-white transition-opacity hover:opacity-90"
        >
          Apply
        </button>
      </div>

      <button
        type="button"
        className="flex h-[60px] items-center justify-center gap-3 rounded-[62px] bg-black px-13.5 text-white transition-opacity hover:opacity-90"
      >
        <Body type="medium" weight="semi500" color="#FFF" className="leading-none">
          Go to Checkout
        </Body>
        <Icon iconType="arrow right filled" width={24} height={24} color="#FFF" />
      </button>
    </div>
  );
};
