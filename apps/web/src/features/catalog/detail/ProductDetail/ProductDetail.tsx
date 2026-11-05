import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ProductGallery } from '../ProductGallery';
import { ProductInfo } from '../ProductInfo';
import { ProductTabs } from '../ProductTabs';
import { RelatedProducts } from '../RelatedProducts';
import { ProductDetailProps as Props } from './ProductDetail.interface';
import {
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  PRODUCT_GALLERY,
  PRODUCT_REVIEWS,
  RELATED_PRODUCTS
} from '../product.data';

/**
 * Product detail page body — Figma node 1:2.
 *
 * Top to bottom: breadcrumb (Home > Catalog > {name}) → gallery + info panel
 * two-column hero → tab strip (Product Details / Rating & Reviews / FAQs) →
 * "You might also like" grid. Header and Footer come from the (user) layout.
 *
 * Product copy/price are hardcoded demo values until product data lands; the
 * breadcrumb name is the only piece threaded in from the route for now.
 */
export const ProductDetail = ({ name }: Props) => (
  <div className="mx-auto mb-[170px] flex w-full max-w-[1240px] flex-col gap-8 px-4 pt-6 pb-20">
    <Breadcrumb
      className="mb-6"
      items={[
        { title: <Link to="/">Home</Link> },
        { title: <Link to="/catalog">Catalog</Link> },
        { title: name }
      ]}
    />

    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
      <ProductGallery images={PRODUCT_GALLERY} name={name} />
      <ProductInfo
        name={name}
        rating={4.5}
        price={260}
        originalPrice={300}
        discountPercent={40}
        description="This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."
        colors={PRODUCT_COLORS}
        sizes={PRODUCT_SIZES}
      />
    </div>

    <div className="mt-14 lg:mt-20">
      <ProductTabs reviews={PRODUCT_REVIEWS} reviewCount={451} />
    </div>

    <div className="mt-16 lg:mt-20">
      <RelatedProducts products={RELATED_PRODUCTS} />
    </div>
  </div>
);
