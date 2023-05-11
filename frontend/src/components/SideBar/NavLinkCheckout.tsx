import * as React from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { useShoppingCartStore } from '@/stores';

export default function NavLinkCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = React.useMemo(
    () => location.pathname === '/checkout',
    [location.pathname],
  );

  const items = useShoppingCartStore((state) => state.items);
  const checkout = useShoppingCartStore((state) => state.checkout);

  const onNavigate = () => {
    checkout();
    navigate('/checkout');
  };

  if (!items.length) return <></>;

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
      Checkout
    </button>
  );
}
