import { ProductReview } from '../product.data';

export interface ProductTabsProps {
  reviews: ProductReview[];
  /** Total review count shown beside the "All Reviews" heading. */
  reviewCount: number;
}
