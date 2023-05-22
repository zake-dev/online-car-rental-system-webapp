import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as Minus } from '@assets/icons/minus.svg';
import { ReactComponent as Plus } from '@assets/icons/plus.svg';

import { CarImage } from '@/features/Car';
import { useShoppingCartStore } from '@/stores';

import { CartItem } from '../interfaces';

type Props = {
  item: CartItem;
};

export default function ShoppingCartItem({ item }: Props) {
  const { removeItem, increaseItem, decreaseItem } = useShoppingCartStore();

  const onRemoveItem = () => removeItem(item);
  const onIncreaseItem = () => increaseItem(item);
  const onDecreaseItem = () => decreaseItem(item);

  return (
    <div className="w-full flex flex-row items-center gap-2 p-2 rounded-[16px] bg-white border border-black-200">
      <div className="w-[100px] h-[100px] flex flex-row justify-center items-center">
        <CarImage className="w-full" carId={item.id} />
      </div>
      <div className="flex-1 h-full gap-1 flex flex-col justify-between items-stretch">
        <div className="flex flex-row gap-2">
          <span className="flex-1 text-subhead-2 h-10 line-clamp-2 text-ellipsis flex items-center">
            {item.brand} {item.model}
          </span>
          <button
            className="w-8 h-8 flex justify-center items-center"
            onClick={onRemoveItem}
          >
            <Close className="w-4 h-4 text-black-400" fill="currentColor" />
          </button>
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="px-3 rounded-full bg-black-300 text-black text-subhead-3">
            {item.category}
          </span>
          <span className="px-3 rounded-full bg-blue-light-4 text-black text-subhead-3">
            {item.modelYear}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <p className="flex-1 flex flex-row gap-1">
            <span className="text-subhead-2">
              {item.pricePerDay.toFixed(2)} AUD
            </span>
            <span className="text-caption">per day</span>
          </p>
          <div className="flex flex-row items-center gap-3 p-1">
            <button
              className="rounded-[4px] p-1 border border-black-400"
              onClick={onDecreaseItem}
            >
              <Minus />
            </button>
            <span className="text-subhead-3">{item.rentalDays} Days</span>
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
