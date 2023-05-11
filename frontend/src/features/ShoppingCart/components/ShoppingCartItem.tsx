import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as Minus } from '@assets/icons/minus.svg';
import { ReactComponent as Plus } from '@assets/icons/plus.svg';

import { Product, ProductImage } from '@/features/Product';
import { useShoppingCartStore } from '@/stores';

type Props = {
  item: Product & { quantity: number };
};

export default function ShoppingCartItem({ item }: Props) {
  const { removeItem, increaseItem, decreaseItem } = useShoppingCartStore();

  const onRemoveItem = () => removeItem(item);
  const onIncreaseItem = () => increaseItem(item);
  const onDecreaseItem = () => decreaseItem(item);

  return (
    <div className="w-full flex flex-row items-center gap-2 p-2 rounded-[16px] bg-white border border-black-200">
      <ProductImage className="w-20 h-20" productId={item.id} />
      <div className="flex-1 h-full gap-1 flex flex-col justify-between items-stretch">
        <div className="flex flex-row gap-2">
          <span className="text-subhead-2 h-10 line-clamp-2 text-ellipsis align-text-center">
            {item.name}
          </span>
          <button
            className="w-8 h-8 flex justify-center items-center"
            onClick={onRemoveItem}
          >
            <Close className="w-4 h-4 text-black-400" fill="currentColor" />
          </button>
        </div>
        <div className="flex flex-row items-center">
          <span className="flex-1 text-caption">${item.price.toFixed(2)}</span>
          <div className="flex flex-row items-center gap-3 p-1">
            <button
              className="rounded-[4px] p-1 border border-black-400"
              onClick={onDecreaseItem}
            >
              <Minus />
            </button>
            <span className="text-subhead-3">{item.quantity}</span>
            <button
              className="rounded-[4px] p-1 border border-blue-light-1"
              onClick={onIncreaseItem}
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
