import { Category } from '@/features/Category';

import axios from './config';

export async function getCategoriesTree(searchParams: URLSearchParams) {
  return axios.get<Category[]>('/categories/tree', { params: searchParams });
}
