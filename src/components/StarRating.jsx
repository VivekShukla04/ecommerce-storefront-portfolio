export default function StarRating({ rating = 0, reviews, size = 'md', showCount = true }) {
  const rounded = Math.round(rating * 2) / 2;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`rating rating--${size}`}>
      <span className="rating__stars" aria-hidden="true">
        {stars.map((star) => {
          const filled = rating >= star;
          const half = !filled && rounded >= star - 0.5;
          return (
            <span
              key={star}
              className={`rating__star${filled ? ' is-filled' : ''}${half ? ' is-half' : ''}`}
            >
              &#9733;
            </span>
          );
        })}
      </span>
      <span className="sr-only">{rating} out of 5 stars</span>
      {showCount && reviews != null && (
        <span className="rating__count">
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
}
