import { Link } from 'react-router-dom';
import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { ListingProps as Props } from './Listing.interface';
import { ProductCard, Product } from './ProductCard';
import { NEW_ARRIVALS, TOP_SELLING } from './listing.data';

/**
 * Storefront product listings — NEW ARRIVALS and TOP SELLING in one section.
 *
 * Centred 1240px column matching the Testimonials section. Each block is a 48px
 * Integral CF bold uppercase title, a responsive 4-up product grid, then an
 * outlined "View All" pill centred below. A thin rule separates the two blocks.
 */
const Block = ({
  title,
  products,
  viewAllHref = '#'
}: {
  title: string;
  products: Product[];
  viewAllHref?: string;
}) => (
  <div>
    <Heading
      type="h2"
      size={48}
      weight="bold"
      className="text-center uppercase leading-none tracking-normal"
    >
      {title}
    </Heading>

    <div className="mt-12 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
      {products.map((product, i) => (
        <ProductCard key={`${product.name}-${i}`} product={product} />
      ))}
    </div>

    <div className="mt-9 flex justify-center">
      <Link
        to={viewAllHref}
        className="rounded-full border border-black/10 px-13.5 py-4 transition-colors hover:bg-black hover:text-white"
      >
        <Body type="normal" weight="semi500" className="leading-none">
          View All
        </Body>
      </Link>
    </div>
  </div>
);

export const Listing = (_props: Props) => {
  return (
    <section className="w-full px-4 py-12">
      <div className="mx-auto max-w-[1240px]">
        <Block title="New Arrivals" products={NEW_ARRIVALS} />
        <hr className="my-16 border-t border-black/10" />
        <Block title="Top Selling" products={TOP_SELLING} />
      </div>
    </section>
  );
};
