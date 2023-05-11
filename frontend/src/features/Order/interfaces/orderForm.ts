import { Product } from '@/features/Product';

import { DeliveryDetails } from './deliveryDetails';

export interface OrderForm {
  products: (Product & { quantity: number })[];
  deliveryDetails: DeliveryDetails;
  totalQuantity: number;
  totalPrice: number;
}
