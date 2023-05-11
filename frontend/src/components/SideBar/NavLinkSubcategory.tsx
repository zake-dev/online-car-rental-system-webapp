import * as React from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Subcategory } from '@/features/Category';

type Props = {
  categoryId: number;
  subcategory: Subcategory;
};

export default function NavLinkSubcategory({ categoryId, subcategory }: Props) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isActive = React.useMemo(
    () =>
      location.pathname.startsWith('/browse') &&
      searchParams.get('categoryId') === categoryId.toString() &&
      searchParams.get('subcategoryId') === subcategory.id.toString(),
    [location.pathname, searchParams],
  );

  const onNavigate = () => {
    searchParams.set('categoryId', categoryId.toString());
    searchParams.set('subcategoryId', subcategory.id.toString());
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
      <span className="flex-1 text-left">{subcategory.name}</span>
      <span
        className={classNames(
          'text-subhead-1 px-3 rounded-[20px] transition-colors duration-200',
          {
            'bg-black text-white': isActive,
            'bg-black-200 text-black-400': !isActive,
          },
        )}
      >
        {subcategory.productCount}
      </span>
    </button>
  );
}
