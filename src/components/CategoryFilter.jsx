export default function CategoryFilter({ categories, active, onChange, counts = {} }) {
  return (
    <div className="filter" role="group" aria-label="Filter by category">
      <button
        type="button"
        className={`filter__chip${active === 'All' ? ' is-active' : ''}`}
        onClick={() => onChange('All')}
        aria-pressed={active === 'All'}
      >
        All
        <span className="filter__count">{counts.All ?? 0}</span>
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter__chip${active === category ? ' is-active' : ''}`}
          onClick={() => onChange(category)}
          aria-pressed={active === category}
        >
          {category}
          <span className="filter__count">{counts[category] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
