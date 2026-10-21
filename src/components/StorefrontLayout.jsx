import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import CartDrawer from './CartDrawer';

const YEAR = new Date().getFullYear();

const OTHER_STORE = {
  'urban-thread': { slug: 'pureglow', name: 'PureGlow', kind: 'Skincare' },
  pureglow: { slug: 'urban-thread', name: 'Urban Thread', kind: 'Fashion' },
};

export default function StorefrontLayout({ store, children }) {
  const { itemsFor, openCart, notify } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = itemsFor(store.slug);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const other = OTHER_STORE[store.slug];

  const onSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    notify('Thanks — you are on the list (demo signup)');
  };

  return (
    <div className={`store theme-${store.theme}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="announce">
        <p>Complimentary shipping over $150</p>
        <p className="announce__sep" aria-hidden="true">
          &bull;
        </p>
        <p>30-day returns</p>
        <p className="announce__sep" aria-hidden="true">
          &bull;
        </p>
        <p className="announce__demo">Portfolio demo — no real orders are placed</p>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-header__home" aria-label="Portfolio home">
            <span className="site-header__home-mark" aria-hidden="true">
              ◈
            </span>
            <span>Storefront Portfolio</span>
          </Link>

          <button
            type="button"
            className="site-header__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label="Toggle navigation"
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>

          <nav
            id="primary-nav"
            className={`site-nav${menuOpen ? ' is-open' : ''}`}
            aria-label="Primary"
          >
            <Link to={`/${store.slug}`} onClick={() => setMenuOpen(false)}>
              Shop all
            </Link>
            <Link to={`/${store.slug}#collection`} onClick={() => setMenuOpen(false)}>
              New in
            </Link>
            <Link to={`/${store.slug}#craft`} onClick={() => setMenuOpen(false)}>
              Our craft
            </Link>
            <Link to={`/${store.slug}#highlights`} onClick={() => setMenuOpen(false)}>
              Why us
            </Link>
            <span className="site-nav__divider" aria-hidden="true" />
            <Link className="site-nav__switch" to={`/${other.slug}`} onClick={() => setMenuOpen(false)}>
              {other.name}
              <span className="site-nav__switch-kind">{other.kind}</span>
            </Link>
          </nav>

          <button
            type="button"
            className="bag-button"
            onClick={() => openCart(store.slug)}
            aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <span className="bag-button__icon" aria-hidden="true">
              &#9633;
            </span>
            <span className="bag-button__label">Bag</span>
            <span className="bag-button__count">{count}</span>
          </button>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="site-footer__wordmark">{store.name}</p>
            <p className="site-footer__blurb">{store.tagline}. {store.description}</p>
            <p className="site-footer__demo">
              This is a portfolio demonstration storefront. Products, prices and reviews are
              fictional and no orders can be placed.
            </p>
          </div>

          <nav className="site-footer__col" aria-label="Shop links">
            <h2 className="site-footer__heading">Shop</h2>
            <Link to={`/${store.slug}`}>All products</Link>
            {store.categories.slice(0, 5).map((category) => (
              <Link key={category} to={`/${store.slug}#collection`}>
                {category}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__col" aria-label="Studio links">
            <h2 className="site-footer__heading">Studio</h2>
            <Link to={`/${store.slug}#craft`}>Our craft</Link>
            <Link to={`/${store.slug}#highlights`}>Why {store.name}</Link>
            <Link to={`/${store.slug}#collection`}>Best sellers</Link>
            <Link to={`/${other.slug}`}>Visit {other.name}</Link>
          </nav>

          <div className="site-footer__col site-footer__newsletter">
            <h2 className="site-footer__heading">{store.newsletter.title}</h2>
            <p className="site-footer__blurb">{store.newsletter.body}</p>
            {subscribed ? (
              <p className="site-footer__success" role="status">
                You&rsquo;re on the list. This demo does not send email.
              </p>
            ) : (
              <form className="newsletter" onSubmit={onSubscribe}>
                <label className="sr-only" htmlFor={`newsletter-${store.slug}`}>
                  Email address
                </label>
                <input
                  id={`newsletter-${store.slug}`}
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" className="btn btn--primary btn--sm">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="site-footer__base">
          <p>
            &copy; {YEAR} {store.name} — built as a portfolio demo with React &
            Vite.
          </p>
          <Link to="/">Back to portfolio home</Link>
        </div>
      </footer>

      <CartDrawer store={store} />
    </div>
  );
}
