// SearchBar.js
import React, { useState } from "react";
import "./SearchBar.css"; // Import the CSS file here

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Assuming `onSearch` is a prop function to handle the search logic
  };

  return (
    <div className="search-bar">
      <div className="input-container">
        {" "}
        {/* New wrapper */}
        <input
          type="text"
          placeholder="Search for food..."
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
