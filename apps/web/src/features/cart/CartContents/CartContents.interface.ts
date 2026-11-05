import { CartItem } from '../cart.data';

export interface CartContentsProps {
  items: CartItem[];
  /** Discount applied to the subtotal, as a fraction (0.2 → -20%). */
  discountRate: number;
  /** Flat delivery fee in whole dollars. */
  deliveryFee: number;
}
