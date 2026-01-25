import { create } from 'zustand'
import type { Product } from '../types/product'

interface SelectedState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearItems: () => void
}

export const useSelectedStore = create<SelectedState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      // Проверяем что товар еще не добавлен
      if (state.items.find((item) => item.id === product.id)) {
        return state
      }
      return { items: [...state.items, product] }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  clearItems: () => set({ items: [] }),
}))
