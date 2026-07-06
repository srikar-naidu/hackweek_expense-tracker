import React from "react";

const Filter = ({ value, onChange, categories }) => {
  return (
    <div className="filter-select">
      <label>
        <span>Filter</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;

