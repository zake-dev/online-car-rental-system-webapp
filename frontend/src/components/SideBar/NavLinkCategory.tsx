import * as React from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Category } from '@/features/Category';

type Props = {
  category: Category;
  children?: React.ReactNode | React.ReactNode[];
};

export default function NavLinkCategory({ category, children }: Props) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const listRef = React.useRef<HTMLDivElement>(null);

  const isActive = React.useMemo(
    () =>
      location.pathname.startsWith('/browse') &&
      searchParams.get('categoryId') === category.id.toString(),
    [location.pathname, searchParams],
  );

  const onNavigate = () => {
    searchParams.set('categoryId', category.id.toString());
    searchParams.delete('subcategoryId');
    searchParams.set('page', '1');
    navigate({ pathname: '/browse', search: `?${searchParams.toString()}` });
  };

  return (
    <div className="flex flex-col">
      <button
        className={classNames(
          'w-full flex flex-row px-3 py-2 items-center text-headline rounded-[8px] transition-colors duration-200',
          {
            'bg-black-200 text-black': isActive,
            'bg-white text-black-400 hover:bg-black-100': !isActive,
          },
        )}
        onClick={onNavigate}
      >
        <span className="flex-1 text-left">{category.name}</span>
        <DownArrow
          className={classNames('transition-transform duration-300', {
            'text-black-800 rotate-[-180deg] ': isActive,
          })}
          fill="currentColor"
        />
      </button>

      <div
        ref={listRef}
        className="h-0 overflow-hidden transition-all duration-300 flex flex-col items-stretch"
        style={{
          height: isActive ? listRef.current?.scrollHeight ?? 0 : 0,
        }}
      >
        <div className="flex flex-row gap-[8px] py-2">
          <div className="w-6 h-full border-r border-r-black-200" />
          <div className="h-40 flex-1 flex flex-col gap-[4px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
