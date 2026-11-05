export interface Product {
  /** Stable slug/id, e.g. for linking to the product's detail page. Optional. */
  id?: string;
  name: string;
  /** 0–5, half steps allowed (e.g. 4.5). */
  rating: number;
  /** Current price in whole dollars. */
  price: number;
  /** Original price before discount, when on sale. */
  originalPrice?: number;
  /** Discount as a positive percentage (e.g. 20 → "-20%"), when on sale. */
  discountPercent?: number;
  /** Product photo. Falls back to a neutral placeholder tile when absent. */
  image?: string;
}

export interface ProductCardProps {
  product: Product;
  /**
   * Visual scale. `default` is the large homepage card; `compact` tones down
   * the name, price, and gaps for the denser catalog grid.
   */
  size?: 'default' | 'compact';
}
