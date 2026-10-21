import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import StorefrontLayout from './components/StorefrontLayout';
import Toast from './components/Toast';
import PortfolioHome from './pages/PortfolioHome';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound from './pages/NotFound';
import { urbanThread } from './stores/urbanThread';
import { pureGlow } from './stores/pureGlow';

/** Scrolls to the top on navigation, or to the hash target when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function StoreRoute({ store, children }) {
  return <StorefrontLayout store={store}>{children}</StorefrontLayout>;
}

export default function App() {
  return (
    <CartProvider>
      <ScrollManager />
      <Toast />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />

        <Route
          path="/urban-thread"
          element={
            <StoreRoute store={urbanThread}>
              <StorePage store={urbanThread} />
            </StoreRoute>
          }
        />
        <Route
          path="/urban-thread/product/:productId"
          element={
            <StoreRoute store={urbanThread}>
              <ProductPage store={urbanThread} />
            </StoreRoute>
          }
        />
        <Route
          path="/urban-thread/checkout"
          element={
            <StoreRoute store={urbanThread}>
              <CheckoutPage store={urbanThread} />
            </StoreRoute>
          }
        />

        <Route
          path="/pureglow"
          element={
            <StoreRoute store={pureGlow}>
              <StorePage store={pureGlow} />
            </StoreRoute>
          }
        />
        <Route
          path="/pureglow/product/:productId"
          element={
            <StoreRoute store={pureGlow}>
              <ProductPage store={pureGlow} />
            </StoreRoute>
          }
        />
        <Route
          path="/pureglow/checkout"
          element={
            <StoreRoute store={pureGlow}>
              <CheckoutPage store={pureGlow} />
            </StoreRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}
