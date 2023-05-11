import * as React from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Category } from '@/features/Category';

type Props = {
  category: Category;
};

export default function NavLinkSubcategoryDefault({ category }: Props) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const totalCount = React.useMemo(
    () =>
      category.subcategories
        .map((subcategory) => subcategory.productCount)
        .reduce((a, b) => a + b),
    [category.subcategories],
  );

  const isActive = React.useMemo(
    () =>
      location.pathname.startsWith('/browse') &&
      searchParams.get('categoryId') === category.id.toString() &&
      !searchParams.has('subcategoryId'),
    [location.pathname, searchParams],
  );

  const onNavigate = () => {
    searchParams.set('categoryId', category.id.toString());
    searchParams.delete('subcategoryId');
    searchParams.set('page', '1');
    navigate({ pathname: '/browse', search: `?${searchParams.toString()}` });
  };

  return (
    <button
      className={classNames(
        'w-full flex flex-row gap-[8px] px-3 py-2 items-center text-headline rounded-[8px] transition-colors duration-200',
        {
          'bg-black-200 text-black-800': isActive,
          'bg-white text-black-400 hover:bg-black-100': !isActive,
        },
      )}
      onClick={onNavigate}
    >
      <span className="flex-1 text-left">All {category.name}</span>
      <span
        className={classNames(
          'text-subhead-1 px-3 rounded-[20px] transition-colors duration-200',
          {
            'bg-black-800 text-white': isActive,
            'bg-black-200 text-black-400': !isActive,
          },
        )}
      >
        {totalCount}
      </span>
    </button>
  );
}
