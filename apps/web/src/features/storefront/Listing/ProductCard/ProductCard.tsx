import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { Body } from '@/components/Typography/Body';
import { ProductCardProps as Props } from './ProductCard.interface';

/**
 * Single product card — used by the NEW ARRIVALS / TOP SELLING grids and the
 * catalog listing.
 *
 * Stack: square image tile on a neutral #F0F0F0 ground (20px radius) → product
 * name → rating row (gold antd Rate + "x/5") → price row (current price;
 * optional struck-through original + red "-N%" badge).
 *
 * The whole card is a link to the product detail page (`/catalog/[id]`).
 *
 * `size` toggles the scale: `default` is the large homepage card (20px name,
 * 22px price); `compact` tones the type and gaps down for the denser catalog
 * grid (16px name, 20px price). `image` is optional so the layout renders
 * before product photography lands; absent, the tile stays an empty placeholder.
 */
export const ProductCard = ({ product, size = 'default' }: Props) => {
  const { id, name, rating, price, originalPrice, discountPercent, image } =
    product;
  const compact = size === 'compact';

  return (
    <Link
      to={`/catalog/${id}`}
      aria-label={name}
      className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-3'}
    >
      <div
        className="aspect-square w-full overflow-hidden rounded-[20px] bg-[#F0F0F0] bg-cover bg-center"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
        role={image ? 'img' : undefined}
        aria-label={image ? name : undefined}
      />

      <Body
        type={compact ? 'normal' : 'large'}
        weight="bold"
        color="#000"
        className={compact ? 'leading-snug' : 'leading-6.75'}
      >
        {name}
      </Body>

      <div className={compact ? 'flex items-center gap-2' : 'flex items-center gap-3'}>
        <Rate
          disabled
          allowHalf
          value={rating}
          style={compact ? { fontSize: 16 } : undefined}
          className="leading-none"
        />
        <Body
          type={compact ? 'extrasmall' : 'small'}
          weight="regular"
          color="#000"
        >
          {rating.toFixed(1)}
          <span className="text-black/60">/5</span>
        </Body>
      </div>

      <div className="flex items-center gap-2.5">
        <Body type={compact ? 'large' : 'extralarge'} weight="bold" color="#000">
          ${price}
        </Body>
        {originalPrice != null && (
          <Body
            type={compact ? 'large' : 'extralarge'}
            weight="bold"
            color="rgba(0,0,0,0.4)"
            className="line-through"
          >
            ${originalPrice}
          </Body>
        )}
        {discountPercent != null && (
          <Body
            type={compact ? 'extrasmall' : 'small'}
            weight="semi500"
            color="#FF3333"
            className={
              compact
                ? 'rounded-full bg-[#FF3333]/10 px-2.5 py-1 leading-none'
                : 'rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 leading-none'
            }
          >
            -{discountPercent}%
          </Body>
        )}
      </div>
    </Link>
  );
};
