import { Product } from '@/features/storefront/Listing/ProductCard';

/** Color swatch options for the detail page. Hex paints the circle. */
export const PRODUCT_COLORS = [
  { name: 'Olive', hex: '#4F4631' },
  { name: 'Forest', hex: '#314F4A' },
  { name: 'Navy', hex: '#31344F' }
] as const;

/** Size options. The selected one fills dark; the rest read on a grey ground. */
export const PRODUCT_SIZES = ['Small', 'Medium', 'Large', 'X-Large'] as const;

/** Thumbnail gallery — images omitted so neutral tiles render until photos land. */
export const PRODUCT_GALLERY: { id: string; image?: string }[] = [
  { id: 'thumb-1' },
  { id: 'thumb-2' },
  { id: 'thumb-3' }
];

/**
 * A customer review — a testimonial with a posted date, so the same card body
 * from the Testimonials section can be reused under the Rating & Reviews tab.
 */
export interface ProductReview {
  name: string;
  rating: number;
  quote: string;
  /** Pre-formatted posted date, e.g. "Posted on August 14, 2023". */
  postedOn: string;
}

/** Demo reviews matching the Figma "All Reviews (451)" grid. */
export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    name: 'Samantha D.',
    rating: 4.5,
    quote:
      '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    postedOn: 'Posted on August 14, 2023'
  },
  {
    name: 'Alex M.',
    rating: 4,
    quote:
      '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    postedOn: 'Posted on August 15, 2023'
  },
  {
    name: 'Ethan R.',
    rating: 3.5,
    quote:
      '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    postedOn: 'Posted on August 16, 2023'
  },
  {
    name: 'Olivia P.',
    rating: 4,
    quote:
      '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
    postedOn: 'Posted on August 17, 2023'
  },
  {
    name: 'Liam K.',
    rating: 4,
    quote:
      '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
    postedOn: 'Posted on August 18, 2023'
  },
  {
    name: 'Ava H.',
    rating: 4.5,
    quote:
      '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."',
    postedOn: 'Posted on August 19, 2023'
  }
];

/** Demo "You might also like" products, mirroring the Figma row. */
export const RELATED_PRODUCTS: Product[] = [
  { id: '10', name: 'Polo with Contrast Trims', rating: 4.0, price: 212, originalPrice: 242, discountPercent: 20 },
  { id: '1', name: 'Gradient Graphic T-shirt', rating: 3.5, price: 145 },
  { id: '2', name: 'Polo with Tipping Details', rating: 4.5, price: 180 },
  { id: '3', name: 'Black Striped T-shirt', rating: 5.0, price: 120, originalPrice: 150, discountPercent: 30 }
];
