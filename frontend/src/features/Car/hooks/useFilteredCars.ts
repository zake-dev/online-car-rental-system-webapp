import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';

export function useFilteredCars({
  category,
  name,
}: {
  category?: string;
  name?: string;
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

  return {
    filteredCars,
    ...useQueryResult,
  };
}
