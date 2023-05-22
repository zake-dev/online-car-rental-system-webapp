import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';

export function useCar(id: number) {
  const { data: cars, ...useQueryResult } = useQuery(
    ['cars'],
    api.cars.getCars,
  );
  const car = React.useMemo(
    () => cars?.find((car) => car.id === id),
    [cars, id],
  );

  return {
    car,
    ...useQueryResult,
  };
}
