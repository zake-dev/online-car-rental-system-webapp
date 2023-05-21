import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import { Car } from '@/features/Car';

import { Category } from '../interfaces';

export function useCategories({ name }: { name?: string }) {
  const { data: cars, ...useQueryResult } = useQuery(
    ['cars'],
    api.cars.getCars,
  );
  const categories = React.useMemo(
    () => toFilteredCategories(cars ?? [], name),
    [cars, name],
  );

  return { categories, ...useQueryResult };
}

function toFilteredCategories(cars: Car[], name?: string) {
  const categories = cars.reduce<{ [key: string]: Car[] }>((res, car) => {
    if (!res.hasOwnProperty(car.category)) res[car.category] = [];
    if (
      !name ||
      [car.brand, car.model, car.modelYear.toString()].some((query) =>
        new RegExp(name, 'i').test(query),
      )
    )
      res[car.category].push(car);
    return res;
  }, {});

  return Object.entries(categories).reduce<Category[]>(
    (res, [category, items]) => [
      ...res,
      { category, itemsCount: (items as any[]).length },
    ],
    [],
  );
}
