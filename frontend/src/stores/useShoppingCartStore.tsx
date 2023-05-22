import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Car } from '@/features/Car';
import { CartItem } from '@/features/ShoppingCart';

type ShoppingCartStore = {
  items: CartItem[];
  totalPrice: number;
  addItem: (target: Car) => void;
  removeItem: (target: Car) => void;
  increaseItem: (target: Car) => void;
  decreaseItem: (target: Car) => void;
  clearItems: () => void;
};

export const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      addItem: (target: Car) => {
        const { items } = get();

        let item = items.find((item) => item.id === target.id);
        if (!item) {
          item = { ...target, rentalDays: 1 };
          items.push(item);
        }

        set({
          items: [...items],
          totalPrice: getTotalPrice(items),
        });
      },
      removeItem: (target: Car) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== target.id);

        set({
          items: newItems,
          totalPrice: getTotalPrice(newItems),
        });
      },
      increaseItem: (target: Car) => {
        const { items } = get();

        let item = items.find((item) => item.id === target.id);
        if (item) item.rentalDays++;

        set({
          items: [...items],
          totalPrice: getTotalPrice(items),
        });
      },
      decreaseItem: (target: Car) => {
        const { items, totalPrice, removeItem } = get();
        const item = items.find((item) => item.id === target.id);
        if (!item) return;
        if (item.rentalDays <= 1) return removeItem(target);
        item.rentalDays--;

        set({
          items,
          totalPrice: totalPrice - target.pricePerDay,
        });
      },
      clearItems: () => set({ items: [], totalPrice: 0 }),
    }),
    { name: 'shopping-cart-store' },
  ),
);

function getTotalPrice(items: CartItem[]): number {
  return items
    .map((item) => item.pricePerDay * item.rentalDays)
    .reduce((a, b) => a + b, 0);
}
