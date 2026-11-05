import { Product } from '@/features/storefront/Listing/ProductCard';

export interface CartItem extends Product {
  size: string;
  color: string;
  quantity: number;
}

/**
 * Demo cart contents — seeded from the product listing data with a chosen
 * size/colour/quantity per line, standing in until real cart persistence lands.
 */
export const CART_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Gradient Graphic T-shirt',
    rating: 3.5,
    price: 145,
    size: 'Large',
    color: 'White',
    quantity: 1
  },
  {
    id: '5',
    name: 'Checkered Shirt',
    rating: 4.5,
    price: 180,
    size: 'Medium',
    color: 'Red',
    quantity: 1
  },
  {
    id: '4',
    name: 'Skinny Fit Jeans',
    rating: 3.5,
    price: 240,
    size: 'Large',
    color: 'Blue',
    quantity: 1
  }
];

/** Discount applied to the subtotal, as a fraction (0.2 → -20%). */
export const DISCOUNT_RATE = 0.2;

/** Flat delivery fee in whole dollars. */
export const DELIVERY_FEE = 15;
