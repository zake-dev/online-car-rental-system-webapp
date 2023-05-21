import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import { Paginated } from '@/interfaces';

import { Car } from '../interfaces';

export function useFilteredCars({
  category,
  name,
  page = '1',
  size = '6',
}: {
  category?: string;
  name?: string;
  page?: string;
  size?: string;
}) {
  const { data: cars, ...useQueryResult } = useQuery(
    ['cars'],
    api.cars.getCars,
  );
  const filteredCars = React.useMemo(
    () =>
      cars
        ?.filter((car) => !category || car.category === category)
        .filter(
          (car) =>
            !name ||
            [car.brand, car.model, car.modelYear.toString()].some((query) =>
              new RegExp(name, 'i').test(query),
            ),
        ) ?? [],
    [cars, category, name],
  );
  const paginatedCars = React.useMemo<Paginated<Car>>(() => {
    const pageOffset = +page - 1;
    const pageSize = +size;
    const paginatedItems = filteredCars.slice(
      pageOffset * pageSize,
      pageOffset * pageSize + pageSize,
    );
    return {
      pagination: {
        page: pageOffset + 1,
        size: pageSize,
        totalPage: Math.max(1, Math.ceil(filteredCars.length / pageSize)),
        totalCount: filteredCars.length,
      },
      content: paginatedItems,
    };
  }, [filteredCars, page, size]);

  return {
    paginatedCars,
    ...useQueryResult,
  };
}
