import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NutritionTable from "./components/NutritionTable";
import AddFoodForm from "./components/AddFoodForm";
import staticFoodData from "./foodData.json";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFoodItems([]);
      setHasSearched(false);
      return;
    }
    const searchResults = staticFoodData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoodItems(searchResults);
    setHasSearched(true);
  };

  const handleSubmit = (foodData) => {
    const newFoodItem = { ...foodData, id: Math.random().toString() };
    setSelectedItems([...selectedItems, newFoodItem]);
    setShowAddForm(false); // Hide the form after adding a new item
  };

  const handleSelectItem = (itemId) => {
    const itemToAdd = staticFoodData.find((item) => item.id === itemId);
    // Always add the selected item without checking if it's already been added
    setSelectedItems([...selectedItems, itemToAdd]);
  };

  const handleRemoveItem = (itemIndex) => {
    setSelectedItems((currentItems) =>
      currentItems.filter((_, index) => index !== itemIndex)
    );
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    // Reset hasSearched to hide search results when toggling forms
    if (!showAddForm) setHasSearched(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nutrition Information Tracker</h1>
        {!showAddForm && <SearchBar onSearch={handleSearch} />}
        {!showAddForm ? (
          <>
            {hasSearched && (
              <div className="search-results-dropdown">
                {foodItems.map((item) => (
                  <div key={item.id} className="search-result-item">
                    <span>{item.name}</span>
                    <button onClick={() => handleSelectItem(item.id)}>
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={toggleAddForm} className="add-new-item-btn">
              Add New Food Item
            </button>
            <NutritionTable
              items={selectedItems}
              onRemoveItem={handleRemoveItem}
            />
          </>
        ) : (
          <>
            <AddFoodForm onAdd={handleSubmit} />
            <button onClick={toggleAddForm} className="go-back-btn">
              Go Back
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
