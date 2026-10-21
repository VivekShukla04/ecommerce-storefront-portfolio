import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/useCart';
import ProductImage from '../components/ProductImage';
import StarRating from '../components/StarRating';
import QuantityStepper from '../components/QuantityStepper';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { formatPrice } from '../data/media';

export default function ProductPage({ store }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const product = store.products.find((item) => item.id === productId);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = store.products.filter(
      (item) => item.id !== product.id && item.category === product.category,
    );
    const others = store.products.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product, store.products]);

  if (!product) {
    return (
      <div className="section">
        <h1 className="section__title section__title--lg">Product not found</h1>
        <EmptyState
          icon="&#9906;"
          title="We couldn't find that piece"
          body="It may have been renamed or removed from the collection."
          action={
            <Link className="btn btn--primary" to={`/${store.slug}`}>
              Back to {store.name}
            </Link>
          }
        />
      </div>
    );
  }

  const variants = product.colors || product.sizes || [];
  const variantLabel = product.colors ? 'Colour' : 'Size';

  const onAdd = () => {
    addItem(store.slug, product, quantity);
    navigate(`/${store.slug}`);
  };

  return (
    <>
      <div className="section">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to={`/${store.slug}`}>{store.name}</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/${store.slug}#collection`}>{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.title}</span>
        </nav>

        <div className="pdp">
          <div className="pdp__media">
            {product.badge && <span className="pdp__badge">{product.badge}</span>}
            <ProductImage
              src={product.image}
              alt={product.title}
              fallbackLabel={product.title.charAt(0)}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className="pdp__panel">
            <p className="pdp__category">{product.category}</p>
            <h1 className="pdp__title">{product.title}</h1>
            <StarRating rating={product.rating} reviews={product.reviews} />

            <p className="pdp__price">
              <span className="price-current">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="price-compare">{formatPrice(product.compareAt)}</span>
              )}
            </p>

            <p className="pdp__description">{product.description}</p>

            {variants.length > 0 && (
              <div className="pdp__variants">
                <p className="pdp__variant-label">
                  {variantLabel}: <strong>{variants[selectedVariant]}</strong>
                </p>
                <div className="pdp__variant-list">
                  {variants.map((variant, index) => (
                    <button
                      key={variant}
                      type="button"
                      className={`swatch${selectedVariant === index ? ' is-active' : ''}`}
                      onClick={() => setSelectedVariant(index)}
                      aria-pressed={selectedVariant === index}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ul className="pdp__details">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className="pdp__buy">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button type="button" className="btn btn--primary btn--block" onClick={onAdd}>
                Add to bag — {formatPrice(product.price * quantity)}
              </button>
            </div>

            <dl className="pdp__meta">
              <div>
                <dt>SKU</dt>
                <dd>{product.sku}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>Free over $150 · 2–4 business days</dd>
              </div>
              <div>
                <dt>Returns</dt>
                <dd>30-day free returns</dd>
              </div>
            </dl>

            <p className="pdp__demo-note">
              Demo storefront — adding to the bag stores your selection locally in your browser. No
              payment is taken.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section related">
          <header className="related__header">
            <h2 className="section__title">You may also like</h2>
            <Link className="btn btn--ghost btn--sm" to={`/${store.slug}#collection`}>
              View all
            </Link>
          </header>
          <div className="product-grid product-grid--related">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                store={store}
                onAdd={(chosen) => addItem(store.slug, chosen, 1)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
