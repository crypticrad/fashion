import { Product } from './ProductCard';

/** Dummy demo products for the NEW ARRIVALS grid. */
export const NEW_ARRIVALS: Product[] = [
  {
    id: '11',
    name: 'T-shirt with Tape Details',
    rating: 4.5,
    price: 120
  },
  {
    id: '4',
    name: 'Skinny Fit Jeans',
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discountPercent: 20
  },
  { id: '5', name: 'Checkered Shirt', rating: 4.5, price: 180 },
  {
    id: '6',
    name: 'Sleeve Striped T-shirt',
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discountPercent: 30
  }
];

/** Dummy demo products for the TOP SELLING grid. */
export const TOP_SELLING: Product[] = [
  {
    id: '7',
    name: 'Vertical Striped Shirt',
    rating: 5.0,
    price: 212,
    originalPrice: 232,
    discountPercent: 20
  },
  {
    id: '8',
    name: 'Courage Graphic T-shirt',
    rating: 4.0,
    price: 145
  },
  {
    id: '9',
    name: 'Loose Fit Bermuda Shorts',
    rating: 3.0,
    price: 80
  },
  { id: '12', name: 'Faded Skinny Jeans', rating: 4.5, price: 210 }
];
