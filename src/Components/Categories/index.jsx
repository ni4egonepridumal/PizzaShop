import React from "react";

const Categories = React.memo(function Categories({
  activeCategory,
  items = [],
  onCategoriesClick,
}) {
  const selectCategories = (index) => {
    onCategoriesClick(index);
  };
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => selectCategories(null)}
        >
          Все
        </li>
        {items.map((item, index) => {
          return (
            <li
              className={activeCategory === index ? "active" : ""}
              onClick={() => selectCategories(index)}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
