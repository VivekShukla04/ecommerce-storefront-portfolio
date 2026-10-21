export default function SearchBar({ value, onChange, placeholder = 'Search products', resultCount }) {
  return (
    <div className="searchbar">
      <div className="searchbar__field">
        <span className="searchbar__icon" aria-hidden="true">
          &#9906;
        </span>
        <label className="sr-only" htmlFor="store-search">
          Search products
        </label>
        <input
          id="store-search"
          type="search"
          className="searchbar__input"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="searchbar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
      {typeof resultCount === 'number' && (
        <p className="searchbar__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
        </p>
      )}
    </div>
  );
}
