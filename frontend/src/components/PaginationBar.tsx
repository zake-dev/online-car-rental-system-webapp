import * as React from 'react';

import { ReactComponent as NextArrow } from '@assets/icons/next-arrow.svg';
import { ReactComponent as PreviousArrow } from '@assets/icons/previous-arrow.svg';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Paginated } from '@/interfaces';

type Props = {
  pagination?: Paginated<any>['pagination'];
};

export default function PaginationBar({
  pagination = { page: 1, size: 10, totalPage: 0, totalCount: 0 },
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isActivePage = (page: number) => page === pagination.page;

  const clamp = React.useCallback(
    (n: number, min: number, max: number) => Math.min(max, Math.max(min, n)),
    [],
  );
  const pageRanges = React.useMemo(() => {
    if (!pagination.totalCount) return [];

    let low: number;
    if (pagination.page >= pagination.totalPage - 1) {
      low = clamp(pagination.totalPage - 4, 1, pagination.totalPage);
    } else if (pagination.page <= 2) {
      low = 1;
    } else {
      low = clamp(pagination.page - 2, 1, pagination.totalPage);
    }

    const high = clamp(low + 5, 1, pagination.totalPage + 1);
    return Array.from({ length: high - low }, (_, i) => i + low);
  }, [pagination]);
  const onPreviousPage = () => {
    const page = clamp(pagination.page - 1, 1, pagination.totalPage) || 1;
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  const onNextPage = () => {
    const page = clamp(pagination.page + 1, 1, pagination.totalPage) || 1;
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  const onPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-row items-center gap-[8px] p-2">
      <button
        className="w-8 h-8 flex justify-center items-center rounded-[16px] transition-colors duration-200 bg-white hover:bg-black-100"
        onClick={onPreviousPage}
      >
        <PreviousArrow />
      </button>

      {!pagination.totalPage ? (
        <button className="w-8 h-8 flex justify-center items-center rounded-[16px] transition-colors duration-200 text-subhead-1 bg-black text-white">
          1
        </button>
      ) : null}
      {pageRanges.map((page) => (
        <button
          key={page}
          className={classNames(
            'w-8 h-8 flex justify-center items-center rounded-[16px] transition-colors duration-200 text-subhead-1',
            {
              'bg-black text-white': isActivePage(page),
              'bg-white text-black hover:bg-black-100': !isActivePage(page),
            },
          )}
          onClick={() => onPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="w-8 h-8 flex justify-center items-center rounded-[16px] transition-colors duration-200 bg-white hover:bg-black-100"
        onClick={onNextPage}
      >
        <NextArrow />
      </button>
    </div>
  );
}
