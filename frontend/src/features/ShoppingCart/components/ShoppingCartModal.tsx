import { ReactComponent as CartEmpty } from '@assets/icons/cart-empty.svg';
import { ReactComponent as Cart } from '@assets/icons/cart.svg';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import ShoppingCartItem from '@/features/ShoppingCart/components/ShoppingCartItem';
import { useShoppingCartStore } from '@/stores';

type Props = {
  onClose: () => void;
};

export default function ShoppingCartModal({ onClose }: Props) {
  const navigate = useNavigate();

  const items = useShoppingCartStore((state) => state.items);
  const totalQuantity = useShoppingCartStore((state) => state.totalQuantity);
  const totalPrice = useShoppingCartStore((state) => state.totalPrice);
  const checkout = useShoppingCartStore((state) => state.checkout);

  const onClearItems = useShoppingCartStore((state) => state.clearItems);
  const onCheckout = () => {
    navigate('/checkout');
    checkout();
  };

  return (
    <div className="relative w-[300px] flex flex-col items-stretch rounded-[8px] bg-white border border-black-200 shadow-[0_4px_12px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="flex flex-row gap-1 items-center px-4 py-2 bg-blue-primary">
        <Cart className="w-6 h-6" />
        <span className="text-headline text-white">Shopping Cart</span>
      </div>
      <button
        className="absolute top-0 end-0 w-11 h-11 flex justify-center items-center"
        onClick={onClose}
      >
        <Close className="w-6 h-6 " />
      </button>

      <div className="h-[484px] flex flex-col gap-4 px-4 py-3">
        {items.length ? (
          <div className="h-[312px] overflow-x-hidden flex flex-col gap-2 items-stretch">
            {items.map((item) => (
              <ShoppingCartItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="h-[312px] flex flex-col justify-center items-center">
            <CartEmpty />
            <span className="text-subhead-long-2 text-black-200">
              Your cart is empty now!
            </span>
          </div>
        )}

        <div className="flex flex-col items-stretch pt-2 border-t-2 border-dashed border-t-black-300">
          <div className="flex flex-row justify-between items-center">
            <span className="text-subhead-long-2 text-black-500">
              Total Qty.
            </span>
            <span className="text-body-long-2 text-black-500">
              {totalQuantity} items
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-subhead-long-1">Total Price</span>
            <span className="text-body-long-1">$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <button
            className="btn btn-medium btn-secondary w-fit"
            onClick={onClearItems}
          >
            Clear
          </button>
          <button
            className="btn btn-medium btn-primary"
            disabled={!items.length}
            onClick={onCheckout}
          >
            <span>Checkout</span>
            <RightArrow
              className={classNames('transition-colors duration-200', {
                'text-white': items.length,
                'text-black-500': !items.length,
              })}
              fill="currentColor"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
