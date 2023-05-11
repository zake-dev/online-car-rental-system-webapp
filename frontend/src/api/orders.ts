import { OrderForm } from '@/features/Order';

import axios from './config';

export function placeOrder(orderForm: OrderForm) {
  return axios.post<OrderForm>('/orders', orderForm);
}
