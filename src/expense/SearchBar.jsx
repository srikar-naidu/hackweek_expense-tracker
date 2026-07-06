import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <FaSearch />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, category, or amount..."
      />
    </div>
  );
};

export default SearchBar;

