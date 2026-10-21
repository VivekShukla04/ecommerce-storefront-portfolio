import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import StarRating from './StarRating';
import { formatPrice } from '../data/media';

export default function ProductCard({ product, store, onAdd }) {
  const detailUrl = `/${store.slug}/product/${product.id}`;

  return (
    <article className="product-card">
      <Link to={detailUrl} className="product-card__media" aria-label={`View ${product.title}`}>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <ProductImage
          src={product.image}
          alt={product.title}
          fallbackLabel={product.title.charAt(0)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">
          <Link to={detailUrl}>{product.title}</Link>
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} size="sm" />

        <div className="product-card__footer">
          <p className="product-card__price">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="price-compare">{formatPrice(product.compareAt)}</span>
            )}
          </p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => onAdd(product)}>
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
