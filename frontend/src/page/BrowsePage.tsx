import { ReactComponent as SearchFailed } from '@assets/icons/search-failed.svg';
import { useSearchParams } from 'react-router-dom';

import { PaginationBar } from '@/components';
import { CarListItem, useFilteredCars } from '@/features/Car';

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const { paginatedCars } = useFilteredCars(searchParams);

  const carLowCount = (() => {
    const page = paginatedCars?.pagination.page || 1;
    const size = paginatedCars?.pagination.size || 0;
    return (page - 1) * size + 1;
  })();
  const carHighCount = (() => {
    const page = paginatedCars?.pagination.page || 1;
    const size = paginatedCars?.pagination.size || 0;
    return page * size;
  })();

  const nameQuery = searchParams.get('name');

  return (
    <div className="page-container gap-[16px] items-stretch">
      {nameQuery ? (
        <>
          <span className="text-display-3 ">Results for {nameQuery}</span>
        </>
      ) : null}
      <span className="text-body-2 text-black-500">
        {carLowCount} - {carHighCount} results of{' '}
        {paginatedCars?.pagination.totalCount ?? 0}
      </span>

      {paginatedCars?.content.length ? (
        <div className="flex flex-row flex-wrap gap-[16px]">
          {paginatedCars?.content.map((car) => (
            <CarListItem key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <SearchFailed />
          <span className="text-display-4 text-black-200">No cars to show</span>
        </div>
      )}

      <div className="flex justify-center items-center">
        <PaginationBar pagination={paginatedCars?.pagination} />
      </div>
    </div>
  );
}
