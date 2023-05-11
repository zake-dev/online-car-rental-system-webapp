import * as React from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function NavLinkAllProducts() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isActive = React.useMemo(
    () =>
      location.pathname.startsWith('/browse') &&
      !searchParams.has('categoryId') &&
      !searchParams.has('subcategoryId'),
    [location.pathname, searchParams],
  );

  const onNavigate = () => {
    if (location.pathname === '/browse') {
      searchParams.delete('categoryId');
      searchParams.delete('subcategoryId');
      searchParams.set('page', '1');
      setSearchParams(searchParams);
      return;
    }

    navigate('/browse');
  };

  return (
    <button
      className={classNames(
        'w-full flex flex-row px-3 py-2 items-center text-headline rounded-[8px] transition-colors duration-200',
        {
          'bg-black-200 text-black-800': isActive,
          'bg-white text-black-400 hover:bg-black-100': !isActive,
        },
      )}
      onClick={onNavigate}
    >
      All Products
    </button>
  );
}
