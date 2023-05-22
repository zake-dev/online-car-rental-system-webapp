import { ReactComponent as CartEmpty } from '@assets/icons/cart-empty.svg';
import { ReactComponent as Cart } from '@assets/icons/cart.svg';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components';
import ShoppingCartItem from '@/features/ShoppingCart/components/ShoppingCartItem';
import { useModal } from '@/hooks';
import { useShoppingCartStore } from '@/stores';

type Props = {
  onClose: () => void;
};

export default function ShoppingCartModal({ onClose }: Props) {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const items = useShoppingCartStore((state) => state.items);
  const totalPrice = useShoppingCartStore((state) => state.totalPrice);

  const onClearItems = useShoppingCartStore((state) => state.clearItems);
  const onCheckout = () => {
    if (!items.length) return openModal();
    navigate('/checkout');
  };

  return (
    <div className="relative w-[412px] flex flex-col items-stretch rounded-[8px] bg-white border border-black-200 shadow-[0_4px_12px_rgba(0,0,0,0.12)] overflow-hidden">
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
          <div className="h-[344px] overflow-x-hidden flex flex-col gap-2 items-stretch">
            {items.map((item) => (
              <ShoppingCartItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="h-[344px] flex flex-col justify-center items-center">
            <CartEmpty />
            <span className="text-subhead-long-2 text-black-200">
              Your cart is empty now!
            </span>
          </div>
        )}

        <div className="flex flex-col items-stretch pt-2 border-t-2 border-dashed border-t-black-300">
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
          <button className="btn btn-medium btn-primary" onClick={onCheckout}>
            <span>Checkout</span>
            <RightArrow
              className="text-white transition-colors duration-200"
              fill="currentColor"
            />
          </button>
        </div>
      </div>

      <Modal.Alert
        isOpen={isOpen}
        onRequestClose={closeModal}
        title="No car has been reserved!"
        message="Please add at least one car into the shopping cart before checkout."
      />
    </div>
  );
}
