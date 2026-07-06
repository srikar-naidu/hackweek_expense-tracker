import React from "react";

const Sort = ({ value, onChange }) => {
  return (
    <div className="sort-select">
      <label>
        <span>Sort</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </label>
    </div>
  );
};

export default Sort;

