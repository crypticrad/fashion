import { CartItem } from '../cart.data';

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}
