import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { cartTotals } from '../context/cartContext';
import { formatPrice } from '../data/media';
import ProductImage from './ProductImage';
import QuantityStepper from './QuantityStepper';

export default function CartDrawer({ store }) {
  const { itemsFor, setQuantity, removeItem, drawerStore, closeCart } = useCart();
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const isOpen = drawerStore === store.slug;

  const items = itemsFor(store.slug);
  const totals = cartTotals(items);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('no-scroll');

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="drawer-root" role="presentation">
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close bag"
        onClick={closeCart}
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${store.name} shopping bag`}
        ref={panelRef}
      >
        <header className="drawer__header">
          <div>
            <p className="drawer__eyebrow">{store.name}</p>
            <h2 className="drawer__title">
              Your bag {totals.count > 0 && <span className="drawer__count">({totals.count})</span>}
            </h2>
          </div>
          <button
            type="button"
            className="drawer__close"
            onClick={closeCart}
            ref={closeButtonRef}
            aria-label="Close bag"
          >
            &times;
          </button>
        </header>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <div className="empty-state__icon" aria-hidden="true">
              &#9633;
            </div>
            <h3 className="empty-state__title">Your bag is empty</h3>
            <p className="empty-state__body">
              Nothing here yet. Add a piece you love and it will show up in this bag.
            </p>
            <button type="button" className="btn btn--primary" onClick={closeCart}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-line">
                  <Link
                    to={`/${store.slug}/product/${item.id}`}
                    className="cart-line__media"
                    onClick={closeCart}
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      fallbackLabel={item.title.charAt(0)}
                    />
                  </Link>
                  <div className="cart-line__body">
                    <p className="cart-line__category">{item.category}</p>
                    <h3 className="cart-line__title">{item.title}</h3>
                    <p className="cart-line__sku">SKU {item.sku}</p>
                    <div className="cart-line__controls">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => setQuantity(store.slug, item.id, next)}
                        min={0}
                        label="Quantity"
                      />
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => removeItem(store.slug, item.id, item.title)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="cart-line__price">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <footer className="drawer__footer">
              <dl className="totals">
                <div className="totals__row">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(totals.subtotal)}</dd>
                </div>
                <div className="totals__row">
                  <dt>Shipping</dt>
                  <dd>{totals.shipping === 0 ? 'Complimentary' : formatPrice(totals.shipping)}</dd>
                </div>
                <div className="totals__row">
                  <dt>Estimated tax</dt>
                  <dd>{formatPrice(totals.tax)}</dd>
                </div>
                <div className="totals__row totals__row--total">
                  <dt>Total</dt>
                  <dd>{formatPrice(totals.total)}</dd>
                </div>
              </dl>
              {totals.subtotal < 150 && (
                <p className="drawer__nudge">
                  Add {formatPrice(150 - totals.subtotal)} more for complimentary shipping.
                </p>
              )}
              <Link
                to={`/${store.slug}/checkout`}
                className="btn btn--primary btn--block"
                onClick={closeCart}
              >
                Checkout — demo
              </Link>
              <p className="drawer__note">
                Demo checkout only. No payment details are collected and no order is placed.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
