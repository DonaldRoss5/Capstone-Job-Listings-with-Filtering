/**
 * A list of category tags. Pass onSelect to make each tag a button
 * (used for filtering); without it the tags are plain labels.
 */
function TagList({ tags, onSelect }) {
  if (tags.length === 0) return null;

  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li className="tag-list__item" key={tag}>
          {onSelect ? (
            <button
              className="tag-list__tag tag-list__tag--button"
              type="button"
              onClick={() => onSelect(tag)}
            >
              {tag}
            </button>
          ) : (
            <span className="tag-list__tag">{tag}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
