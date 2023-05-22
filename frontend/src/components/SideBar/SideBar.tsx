import * as React from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import NavLinkCategoryDefault from '@/components/SideBar/NavLinkCategoryDefault';
import { useCategories } from '@/features/Category';

import SizedBox from '../SizedBox';
import NavLinkBrowse from './NavLinkBrowse';
import NavLinkCategory from './NavLinkCategory';
import NavLinkCheckout from './NavLinkCheckout';

export default function SideBar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get('name');

  const { categories } = useCategories({ name: nameQuery });
  const title = React.useMemo(() => {
    if (location.pathname === '/checkout') return 'Checkout';
    if (!searchParams.has('category')) return 'All Cars';
    return searchParams.get('category');
  }, [location.pathname, searchParams, categories]);

  return (
    <div className="side-bar flex flex-col items-start p-6 ps-14 border-r border-r-black-200">
      <h1 className="h-[42px] text-display-3 text-black">{title}</h1>
      <SizedBox height={24} />
      <div className="w-full flex-1 flex flex-col items-stretch gap-[4px]">
        <NavLinkBrowse>
          <NavLinkCategoryDefault categories={categories} />
          {categories.map((category) => (
            <NavLinkCategory key={category.category} category={category} />
          ))}
        </NavLinkBrowse>

        <NavLinkCheckout />
      </div>
    </div>
  );
}
