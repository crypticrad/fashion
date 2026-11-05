import { Heading } from '@/components/Typography/Heading';
import { ProductCard } from '@/features/storefront/Listing/ProductCard';
import { RelatedProductsProps as Props } from './RelatedProducts.interface';

/**
 * "YOU MIGHT ALSO LIKE" section — Figma node 1:2 (bottom band).
 *
 * Centred 48px Integral CF bold uppercase title over a responsive 4-up grid of
 * the shared ProductCard, mirroring the homepage listing blocks.
 */
export const RelatedProducts = ({ products }: Props) => (
  <section className="w-full">
    <Heading
      type="h2"
      size={48}
      weight="bold"
      className="text-center uppercase leading-none tracking-normal"
    >
      You might also like
    </Heading>

    <div className="mt-12 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
      {products.map((product, i) => (
        <ProductCard key={`${product.name}-${i}`} product={product} />
      ))}
    </div>
  </section>
);
