function FilterBar({ selectedTags, onRemove, onClear }) {
  if (selectedTags.length === 0) {
    return null;
  }

  return (
    <section className="filter-bar" aria-label="Active filters">
      <ul className="filter-bar__list">
        {selectedTags.map((tag) => (
          <li className="filter-bar__item" key={tag}>
            <span className="filter-bar__tag">{tag}</span>
            <button
              className="filter-bar__remove"
              type="button"
              onClick={() => onRemove(tag)}
              aria-label={`Remove filter ${tag}`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        ))}
      </ul>

      <button className="filter-bar__clear" type="button" onClick={onClear}>
        Clear all
      </button>
    </section>
  );
}

export default FilterBar;
