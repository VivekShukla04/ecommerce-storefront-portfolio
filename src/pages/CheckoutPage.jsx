import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { cartTotals } from '../context/cartContext';
import ProductImage from '../components/ProductImage';
import EmptyState from '../components/EmptyState';
import { formatPrice } from '../data/media';

export default function CheckoutPage({ store }) {
  const { itemsFor, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber] = useState(() => `PG-${Math.floor(100000 + Math.random() * 899999)}`);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
  });

  const items = itemsFor(store.slug);
  const totals = cartTotals(items);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    setPlaced(true);
    clearCart(store.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <div className="section">
        <div className="checkout-success">
          <div className="checkout-success__mark" aria-hidden="true">
            &#10003;
          </div>
          <h1 className="checkout-success__title">Demo order placed</h1>
          <p className="checkout-success__body">
            Thanks {form.name || 'there'} — this is a portfolio demo, so nothing was charged, no
            payment was processed and no order was sent to a warehouse.
          </p>
          <p className="checkout-success__meta">
            Reference <strong>{orderNumber}</strong> &middot; {store.name}
          </p>
          <Link className="btn btn--primary" to={`/${store.slug}`}>
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section">
        <h1 className="section__title section__title--lg">Checkout</h1>
        <EmptyState
          icon="&#9633;"
          title="Nothing to check out"
          body="Your bag is empty. Add a product first and the demo checkout will open up."
          action={
            <Link className="btn btn--primary" to={`/${store.slug}`}>
              Browse {store.name}
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={`/${store.slug}`}>{store.name}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Checkout</span>
      </nav>

      <h1 className="section__title section__title--lg">Checkout</h1>

      <div className="checkout">
        <form className="checkout__form" onSubmit={onSubmit}>
          <div className="checkout__notice" role="note">
            <strong>Demo checkout.</strong> This form validates and previews an order only. No
            payment details are transmitted or stored, and no real order is created.
          </div>

          <fieldset className="checkout__fieldset">
            <legend>Contact</legend>
            <label className="field">
              <span className="field__label">Full name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                placeholder="Alex Moreau"
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="alex@example.com"
                autoComplete="email"
              />
            </label>
          </fieldset>

          <fieldset className="checkout__fieldset">
            <legend>Shipping address</legend>
            <label className="field">
              <span className="field__label">Address</span>
              <input
                type="text"
                required
                value={form.address}
                onChange={update('address')}
                placeholder="18 Mercer Street"
                autoComplete="street-address"
              />
            </label>
            <div className="field-row">
              <label className="field">
                <span className="field__label">City</span>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={update('city')}
                  placeholder="New York"
                  autoComplete="address-level2"
                />
              </label>
              <label className="field">
                <span className="field__label">Postcode</span>
                <input
                  type="text"
                  required
                  value={form.postcode}
                  onChange={update('postcode')}
                  placeholder="10013"
                  autoComplete="postal-code"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="checkout__fieldset">
            <legend>Payment</legend>
            <p className="checkout__mock">
              A real checkout would hand off to a payment provider here. For this demo the card
              fields are replaced with a placeholder — no card data is ever requested.
            </p>
            <div className="checkout__mock-card" aria-hidden="true">
              <span>4242 4242 4242 4242</span>
              <span>12/30 &nbsp; 123</span>
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--block">
            Place demo order
          </button>
          <p className="checkout__fineprint">
            By placing this demo order you agree that this is a portfolio demonstration and no
            purchase is being made.
          </p>
        </form>

        <aside className="checkout__summary" aria-label="Order summary">
          <h2 className="checkout__summary-title">Order summary</h2>
          <ul className="checkout__items">
            {items.map((item) => (
              <li key={item.id} className="checkout__item">
                <div className="checkout__item-media">
                  <ProductImage
                    src={item.image}
                    alt={item.title}
                    fallbackLabel={item.title.charAt(0)}
                  />
                  <span className="checkout__item-qty">{item.quantity}</span>
                </div>
                <div className="checkout__item-body">
                  <p className="checkout__item-title">{item.title}</p>
                  <p className="checkout__item-sku">SKU {item.sku}</p>
                </div>
                <p className="checkout__item-price">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

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
        </aside>
      </div>
    </div>
  );
}
