import { URLSearchParams } from 'url';

import { Product } from '@/features/Product';
import { Paginated } from '@/interfaces';

import axios from './config';

export function getProducts(searchParams: URLSearchParams) {
  return axios.get<Paginated<Product>>('/products', { params: searchParams });
}

export function getProduct(id: number) {
  return axios.get<Product>(`/products/${id}`);
}
