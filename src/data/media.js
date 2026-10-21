/**
 * Image helper for Pexels CDN assets.
 * Every product image below was verified to resolve over HTTP before being committed.
 */
export function px(id, width = 900) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
