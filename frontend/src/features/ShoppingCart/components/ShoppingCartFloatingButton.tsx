import { ReactComponent as Cart } from '@assets/icons/cart.svg';

import { useShoppingCartStore } from '@/stores';

type Props = {
  onOpen: () => void;
};

export default function ShoppingCartFloatingButton({ onOpen }: Props) {
  const totalQuantity = useShoppingCartStore((state) => state.totalQuantity);

  return (
    <button
      className="relative rounded-[40px] p-5 bg-blue-primary-dark shadow-[4px_8px_16px_rgba(0,0,0,0.12)] transition-opacity duration-200 hover:opacity-90"
      onClick={onOpen}
    >
      <Cart className="w-10 h-10" />
      <span className="absolute top-0 right-0 px-2 rounded-[20px] text-subhead-1 text-white bg-point-red">
        {totalQuantity}
      </span>
    </button>
  );
}
