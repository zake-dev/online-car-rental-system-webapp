import { CartItem } from '@/features/ShoppingCart';

import { CustomerDetails } from './customerDetails';

export interface BookingForm {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  bondAmount: number;
}
