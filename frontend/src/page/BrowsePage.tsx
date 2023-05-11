import { ReactComponent as SearchFailed } from '@assets/icons/search-failed.svg';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { api } from '@/api';
import { PaginationBar } from '@/components';
import { ProductListItem } from '@/features/Product';

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const { data: paginatedProducts } = useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => api.products.getProducts(searchParams),
  });

  const productLowCount = (() => {
    const page = paginatedProducts?.pagination.page || 1;
    const size = paginatedProducts?.pagination.size || 0;
    return (page - 1) * size + 1;
  })();
  const productHighCount = (() => {
    const page = paginatedProducts?.pagination.page || 1;
    const size = paginatedProducts?.pagination.size || 0;
    return page * size;
  })();

  const nameQuery = searchParams.get('name');
  const priceLowQuery = searchParams.get('priceLow');
  const priceHighQuery = searchParams.get('priceHigh');

  const hasSearchQueries = nameQuery || priceLowQuery || priceHighQuery;

  return (
    <div className="page-container gap-[16px] items-stretch">
      {hasSearchQueries ? (
        <>
          <span className="text-display-3 ">
            Results for {nameQuery ? `"${nameQuery}"` : null}
          </span>
          <span className="text-headline">
            Price range: ${priceLowQuery ?? 0} ~ ${priceHighQuery ?? 50}
          </span>
        </>
      ) : null}
      <span className="text-body-2 text-black-500">
        {productLowCount} - {productHighCount} results of{' '}
        {paginatedProducts?.pagination.totalCount ?? 0}
      </span>

      {paginatedProducts?.content.length ? (
        <div className="flex flex-row flex-wrap gap-[16px]">
          {paginatedProducts?.content.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <SearchFailed />
          <span className="text-display-4 text-black-200">
            No products to show
          </span>
        </div>
      )}

      <div className="flex justify-center items-center">
        <PaginationBar pagination={paginatedProducts?.pagination} />
      </div>
    </div>
  );
}
