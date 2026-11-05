export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  /** Pre-formatted posted date, e.g. "Posted on August 14, 2023". Shown when set. */
  postedOn?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  /**
   * Width behaviour. `fixed` (default) is the 400px marquee card; `fluid` fills
   * its grid cell — used by the product page's Rating & Reviews tab.
   */
  width?: 'fixed' | 'fluid';
}
