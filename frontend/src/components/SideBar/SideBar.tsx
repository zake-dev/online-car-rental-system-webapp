import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { api } from '@/api';
import { SizedBox } from '@/components';

import NavLinkAllProducts from './NavLinkAllProducts';
import NavLinkCategory from './NavLinkCategory';
import NavLinkCheckout from './NavLinkCheckout';
import NavLinkSubcategory from './NavLinkSubcategory';
import NavLinkSubcategoryDefault from './NavLinkSubcategoryDefault';

export default function SideBar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get('name');
  const priceLowQuery = searchParams.get('priceLow');
  const priceHighQuery = searchParams.get('priceHigh');

  const { data: categories } = useQuery({
    queryKey: ['categories', nameQuery, priceLowQuery, priceHighQuery],
    queryFn: () => api.categories.getCategoriesTree(searchParams),
  });
  const title = React.useMemo(() => {
    if (location.pathname === '/checkout') return 'Checkout';
    if (!searchParams.has('categoryId') && !searchParams.has('subcategoryId'))
      return 'All Products';

    const categoryId = +(searchParams.get('categoryId') ?? 0);
    if (!searchParams.has('subcategoryId')) {
      const categoryName = categories?.find(
        (category) => category.id === categoryId,
      )?.name;
      return `All ${categoryName}`;
    }

    const subcategoryId = +(searchParams.get('subcategoryId') ?? 0);
    const subcategoryName = categories
      ?.flatMap((category) => category.subcategories)
      .find((subcategory) => subcategory.id === subcategoryId)?.name;
    return subcategoryName;
  }, [location.pathname, searchParams, categories]);

  return (
    <div className="side-bar flex flex-col items-start pt-16 pe-6 pb-8 ps-14 border-r border-r-black-200">
      <h1 className="h-[84px] text-display-3 text-black">{title}</h1>
      <SizedBox height={16} />
      <div className="w-full flex-1 flex flex-col items-stretch gap-[4px]">
        <NavLinkAllProducts />

        {categories?.map((category) => (
          <NavLinkCategory key={category.id} category={category}>
            <NavLinkSubcategoryDefault category={category} />
            {category.subcategories.map((subcategory) => (
              <NavLinkSubcategory
                key={subcategory.id}
                categoryId={category.id}
                subcategory={subcategory}
              />
            ))}
          </NavLinkCategory>
        ))}

        <NavLinkCheckout />
      </div>
    </div>
  );
}
