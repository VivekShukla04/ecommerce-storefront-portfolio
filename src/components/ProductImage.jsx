import { useState } from 'react';

/**
 * Product image with a loading placeholder and a branded fallback
 * so a failed remote image never renders as a broken icon.
 */
export default function ProductImage({
  src,
  alt,
  className = '',
  fallbackLabel = '',
  sizes,
  priority = false,
}) {
  const [status, setStatus] = useState('loading');

  return (
    <div className={`product-image ${className}`} data-status={status}>
      {status === 'loading' && <div className="product-image__skeleton" aria-hidden="true" />}
      {status === 'error' ? (
        <div className="product-image__fallback" role="img" aria-label={alt}>
          <span className="product-image__fallback-mark">{fallbackLabel || alt.charAt(0)}</span>
          <span className="product-image__fallback-text">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}
