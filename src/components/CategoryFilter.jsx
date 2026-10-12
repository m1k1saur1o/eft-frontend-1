import { ALL_CATEGORIES } from '../utils/constants.js';

export default function CategoryFilter({ categories, totalCount, selectedCategory, onSelectCategory }) {
  const options = [{ name: ALL_CATEGORIES, count: totalCount }, ...categories];

  return (
    <div className="category-filter" role="group" aria-label="Filtrar por categoría">
      {options.map((option) => {
        const isActive = option.name === selectedCategory;
        return (
          <button
            key={option.name}
            type="button"
            className={`btn btn-filter${isActive ? ' active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelectCategory(option.name)}
          >
            {option.name}
            <span className="filter-count">{option.count}</span>
          </button>
        );
      })}
    </div>
  );
}
