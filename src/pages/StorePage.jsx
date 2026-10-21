import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';

function matches(product, query) {
  if (!query) return true;
  const haystack = [product.title, product.category, product.description, ...(product.colors || [])]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function StorePage({ store }) {
  const { addItem } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 320);
    return () => window.clearTimeout(timer);
  }, []);

  const counts = useMemo(() => {
    const result = { All: store.products.length };
    for (const product of store.products) {
      result[product.category] = (result[product.category] || 0) + 1;
    }
    return result;
  }, [store.products]);

  const visible = useMemo(
    () =>
      store.products.filter(
        (product) => (category === 'All' || product.category === category) && matches(product, query),
      ),
    [store.products, category, query],
  );

  const onAdd = (product) => addItem(store.slug, product, 1);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">{store.hero.eyebrow}</p>
          <h1 className="hero__title">{store.hero.title}</h1>
          <p className="hero__body">{store.hero.body}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#collection">
              {store.hero.cta}
            </a>
            <a className="btn btn--ghost" href="#craft">
              Our craft
            </a>
          </div>
          <dl className="hero__stats">
            {store.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero__media">
          <ProductImage
            src={store.hero.image}
            alt={`${store.name} — ${store.hero.eyebrow}`}
            fallbackLabel={store.name.charAt(0)}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="highlights" id="highlights">
        {store.highlights.map((item, index) => (
          <article key={item.title} className="highlight">
            <span className="highlight__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="highlight__title">{item.title}</h2>
            <p className="highlight__body">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="collection" id="collection">
        <header className="collection__header">
          <div>
            <p className="collection__eyebrow">The collection</p>
            <h2 className="collection__title">Shop {store.name}</h2>
          </div>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={`Search ${store.name}`}
            resultCount={visible.length}
          />
        </header>

        <CategoryFilter
          categories={store.categories}
          active={category}
          onChange={setCategory}
          counts={counts}
        />

        {!ready ? (
          <div className="product-grid" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-card__media" />
                <div className="skeleton-card__line" />
                <div className="skeleton-card__line skeleton-card__line--short" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            icon="&#9906;"
            title="No pieces match that search"
            body="Try a different term, or clear the filters to see the full collection again."
            action={
              <button type="button" className="btn btn--primary" onClick={resetFilters}>
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="product-grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} store={store} onAdd={onAdd} />
            ))}
          </div>
        )}
      </section>

      <section className="editorial" id="craft">
        <div className="editorial__media">
          <ProductImage
            src={store.editorial.image}
            alt={`${store.name} — ${store.editorial.title}`}
            fallbackLabel={store.name.charAt(0)}
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
        <div className="editorial__content">
          <p className="editorial__eyebrow">Editorial</p>
          <h2 className="editorial__title">{store.editorial.title}</h2>
          <p className="editorial__body">{store.editorial.body}</p>
          <p className="editorial__body">
            Every product page below lists the exact materials, construction and care instructions so
            you can judge the piece before you add it.
          </p>
          <a className="btn btn--outline" href="#collection">
            Browse the collection
          </a>
        </div>
      </section>

      <section className="crosslink">
        <div>
          <p className="crosslink__eyebrow">Also in this portfolio</p>
          <h2 className="crosslink__title">
            {store.slug === 'urban-thread' ? 'PureGlow' : 'Urban Thread'}
          </h2>
          <p className="crosslink__body">
            A second storefront built on the same shared component library, with its own palette,
            typography and product catalogue.
          </p>
          <Link
            className="btn btn--outline"
            to={store.slug === 'urban-thread' ? '/pureglow' : '/urban-thread'}
          >
            {store.slug === 'urban-thread' ? 'Visit PureGlow' : 'Visit Urban Thread'}
          </Link>
        </div>
      </section>
    </>
  );
}
