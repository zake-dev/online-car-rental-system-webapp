import { Car } from '@/features/Car';

import axios from './config';

export async function getCars() {
  return axios.get<Car[]>('/cars');
}
