import { useParams } from 'react-router-dom';
import { ProductDetail } from '@/features/catalog/detail/ProductDetail';
import { ProductPageProps as Props } from './ProductPage.interface';
import cn from './ProductPage.module.scss';

export const ProductPage = (_props: Props) => {
  const { id } = useParams();

  // TODO(API): load the product and related products by `id`.
  return (
    <main className={cn.productPage}>
      <ProductDetail name={id ? `One Life Graphic T-shirt` : 'Product'} />
    </main>
  );
};
