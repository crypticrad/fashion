import { ProductCard } from '@/features/storefront/Listing/ProductCard';
import { ProductsProps as Props } from './Products.interface';

/**
 * Catalog product grid — reuses the storefront ProductCard in its `compact`
 * scale so the cards sit tighter in the narrower catalog column. 2-up on mobile,
 * 3-up from the medium breakpoint. Cards fall back to placeholder tiles until
 * images land.
 */
export const Products = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5">
      {products.map((product, i) => (
        <ProductCard
          key={`${product.name}-${i}`}
          product={product}
          size="compact"
        />
      ))}
    </div>
  );
};
