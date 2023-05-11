import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/features/Product';

type ShoppingCartStore = {
  items: (Product & { quantity: number })[];
  totalQuantity: number;
  totalPrice: number;
  shouldPlaceOrder: boolean;
  addItem: (target: Product) => void;
  removeItem: (target: Product) => void;
  increaseItem: (target: Product) => void;
  decreaseItem: (target: Product) => void;
  clearItems: () => void;
  checkout: () => void;
  placeOrder: () => void;
};

export const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      shouldPlaceOrder: false,
      addItem: (target: Product) => {
        const { items } = get();

        let item = items.find((item) => item.id === target.id);
        if (!item) {
          item = { ...target, quantity: 0 };
          items.push(item);
        }
        item.quantity = Math.min(item.quantity + 1, 20, item.inStock);

        set({
          items: [...items],
          totalQuantity: getTotalQuantity(items),
          totalPrice: getTotalPrice(items),
        });
      },
      removeItem: (target: Product) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== target.id);

        set({
          items: newItems,
          totalQuantity: getTotalQuantity(newItems),
          totalPrice: getTotalPrice(newItems),
        });
      },
      increaseItem: (target: Product) => get().addItem(target),
      decreaseItem: (target: Product) => {
        const { items, totalQuantity, totalPrice, removeItem } = get();
        const item = items.find((item) => item.id === target.id);
        if (!item) return;
        if (item.quantity === 1) return removeItem(target);
        item.quantity--;

        set({
          items,
          totalQuantity: totalQuantity - 1,
          totalPrice: totalPrice - target.price,
        });
      },
      clearItems: () => set({ items: [], totalQuantity: 0, totalPrice: 0 }),
      checkout: () => set({ shouldPlaceOrder: true }),
      placeOrder: () =>
        set({
          shouldPlaceOrder: false,
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        }),
    }),
    { name: 'shopping-cart-store' },
  ),
);

function getTotalQuantity(items: (Product & { quantity: number })[]): number {
  return items.map((item) => item.quantity).reduce((a, b) => a + b);
}

function getTotalPrice(items: (Product & { quantity: number })[]): number {
  return items.map((item) => item.price).reduce((a, b) => a + b);
}
