export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductInfoProps {
  name: string;
  /** 0–5, half steps allowed. */
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  colors: readonly ProductColor[];
  sizes: readonly string[];
}
