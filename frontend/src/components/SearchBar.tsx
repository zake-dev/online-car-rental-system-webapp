import * as React from 'react';

import { ReactComponent as Search } from '@assets/icons/search.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = React.useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onInput = (event: React.FormEvent<HTMLInputElement>) =>
    setQuery(event.currentTarget.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSearch();
  };

  const onSearch = () => {
    searchParams.set('name', query);
    searchParams.set('page', '1');
    searchParams.delete('categoryId');
    searchParams.delete('subcategoryId');
    navigate({ pathname: '/browse', search: `?${searchParams.toString()}` });
  };

  React.useEffect(() => {
    if (!searchParams.has('name')) setQuery('');
  }, [searchParams]);

  return (
    <div className="flex-1 relative flex flex-row rounded-[32px] overflow-hidden border border-black-400">
      <input
        className="flex-1 rounded-[32px] h-14 px-8 py-2 outline-none bg-black-100 text-body-1"
        placeholder="Search products"
        value={query}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
      <button
        className="absolute top-0 end-0 w-14 h-14 rounded-[50%] flex justify-center items-center transition-colors duration-200 hover:bg-black-200"
        onClick={onSearch}
      >
        <Search />
      </button>
    </div>
  );
}
