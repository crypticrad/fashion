export interface OrderSummaryProps {
  subtotal: number;
  /** Discount amount in whole dollars (positive number, rendered as -$n). */
  discount: number;
  /** Discount as a positive percentage (e.g. 20 → "Discount (-20%)"). */
  discountPercent: number;
  deliveryFee: number;
  total: number;
}
