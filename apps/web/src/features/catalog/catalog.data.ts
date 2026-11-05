import { Product } from '@/features/storefront/Listing/ProductCard';

/**
 * Dummy catalog products — images intentionally omitted so the grid renders its
 * neutral placeholder tiles until real photography lands.
 */
export const CATALOG_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gradient Graphic T-shirt',
    rating: 3.5,
    price: 145
  },
  {
    id: '2',
    name: 'Polo with Tipping Details',
    rating: 4.5,
    price: 180
  },
  {
    id: '3',
    name: 'Black Striped T-shirt',
    rating: 5.0,
    price: 120,
    originalPrice: 150,
    discountPercent: 30
  },
  {
    id: '4',
    name: 'Skinny Fit Jeans',
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discountPercent: 20
  },
  {
    id: '5',
    name: 'Checkered Shirt',
    rating: 4.5,
    price: 180
  },
  {
    id: '6',
    name: 'Sleeve Striped T-shirt',
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discountPercent: 30
  },
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
  }
];

/** Category facet — values become the `category` URL search param. */
export const CATEGORIES = [
  'T-shirts',
  'Shorts',
  'Shirts',
  'Hoodie',
  'Jeans'
] as const;

/**
 * Colour facet — `name` becomes the `color` URL search param, `hex` paints the
 * swatch. White carries a faint ring so it reads against the card.
 */
export const COLORS = [
  { name: 'Green', hex: '#00C12B' },
  { name: 'Red', hex: '#F50606' },
  { name: 'Yellow', hex: '#F5DD06' },
  { name: 'Orange', hex: '#F57906' },
  { name: 'Blue', hex: '#063AF5' },
  { name: 'Purple', hex: '#7D06F5' },
  { name: 'Pink', hex: '#F506A4' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' }
] as const;

/** Size facet — values become the `size` URL search param. */
export const SIZES = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  'XX-Large',
  '3X-Large',
  '4X-Large'
] as const;

/** Dress-style facet — values become the `style` URL search param. */
export const DRESS_STYLES = ['Casual', 'Formal', 'Party', 'Gym'] as const;

/** Price bounds (whole dollars) for the price-range slider. */
export const PRICE_RANGE: [number, number] = [0, 500];
