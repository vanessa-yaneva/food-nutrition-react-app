import React, { useState } from "react";
import "./SearchBar.css"; // Ensure this file contains the necessary styles

const SearchBar = ({ onSearch, foodItems, onSelectItem, hasSearched }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for food..."
        value={query}
        onChange={handleChange}
      />
      {hasSearched && query && (
        <div className="search-results-dropdown">
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => onSelectItem(item.id)}
              >
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <div className="search-result-item">
              <span>No results found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
