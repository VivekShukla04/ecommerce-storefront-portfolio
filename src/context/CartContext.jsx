import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CartContext, STORAGE_KEY, cartReducer, readStoredCarts } from './cartContext';

export function CartProvider({ children }) {
  const [carts, dispatch] = useReducer(cartReducer, {});
  const [toast, setToast] = useState(null);
  const [drawerStore, setDrawerStore] = useState(null);

  useEffect(() => {
    dispatch({ type: 'hydrate', carts: readStoredCarts() });
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
    } catch {
      /* storage unavailable — cart still works for the session */
    }
  }, [carts]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message, tone = 'success') => {
    setToast({ message, tone, id: Date.now() });
  }, []);

  const addItem = useCallback(
    (store, product, quantity = 1) => {
      dispatch({ type: 'add', store, product, quantity });
      notify(`${product.title} added to bag`);
    },
    [notify],
  );

  const setQuantity = useCallback((store, id, quantity) => {
    dispatch({ type: 'quantity', store, id, quantity });
  }, []);

  const removeItem = useCallback(
    (store, id, title) => {
      dispatch({ type: 'remove', store, id });
      notify(`${title || 'Item'} removed from bag`, 'info');
    },
    [notify],
  );

  const clearCart = useCallback((store) => {
    dispatch({ type: 'clear', store });
  }, []);

  const itemsFor = useCallback((store) => carts[store] || [], [carts]);

  const value = useMemo(
    () => ({
      carts,
      itemsFor,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      notify,
      toast,
      dismissToast: () => setToast(null),
      drawerStore,
      openCart: (store) => setDrawerStore(store),
      closeCart: () => setDrawerStore(null),
    }),
    [carts, itemsFor, addItem, setQuantity, removeItem, clearCart, notify, toast, drawerStore],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
