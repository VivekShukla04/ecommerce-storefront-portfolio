import { createContext } from 'react';

export const CartContext = createContext(null);

export const STORAGE_KEY = 'portfolio-storefront-carts-v1';

export function readStoredCarts() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function cartTotals(items) {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shipping = count === 0 ? 0 : subtotal >= 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  return { count, subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.carts };
    case 'add': {
      const { store, product, quantity } = action;
      const existing = state[store] || [];
      const match = existing.find((item) => item.id === product.id);
      const next = match
        ? existing.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [
            ...existing,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
              sku: product.sku,
              quantity,
            },
          ];
      return { ...state, [store]: next };
    }
    case 'quantity': {
      const { store, id, quantity } = action;
      const existing = state[store] || [];
      if (quantity <= 0) {
        return { ...state, [store]: existing.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        [store]: existing.map((item) => (item.id === id ? { ...item, quantity } : item)),
      };
    }
    case 'remove': {
      const { store, id } = action;
      const existing = state[store] || [];
      return { ...state, [store]: existing.filter((item) => item.id !== id) };
    }
    case 'clear':
      return { ...state, [action.store]: [] };
    default:
      return state;
  }
}
