import React, { useState } from "react";
import "./App.css";
import FoodDataTable from "./components/FoodDataTable/FoodDataTable";
import NutritionTable from "./components/NutritionTable/NutritionTable";
import AddFoodForm from "./components/AddFoodForm/AddFoodForm";
import staticFoodData from "./assets/foodData.json";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [foodItems, setFoodItems] = useState(staticFoodData);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (foodData) => {
    const newFoodItem = { ...foodData, id: Math.random().toString() };
    // Add to selected items for NutritionTable
    setSelectedItems([...selectedItems, newFoodItem]);
    // Also add to foodItems for FoodDataTable
    setFoodItems([...foodItems, newFoodItem]);
    setShowAddForm(false);
  };

  const handleRemoveItem = (itemIndex) => {
    setSelectedItems(selectedItems.filter((_, index) => index !== itemIndex));
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAddItemToNutritionTable = (itemToAdd) => {
    setSelectedItems([
      ...selectedItems,
      { ...itemToAdd, uniqueId: Math.random().toString() },
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nutrition Information Tracker</h1>
        {!showAddForm ? (
          <>
            <FoodDataTable
              data={foodItems}
              onAddItem={handleAddItemToNutritionTable}
            />
            <button onClick={toggleAddForm} className="add-new-item-btn">
              Add New Food Item
            </button>
            <NutritionTable
              items={selectedItems}
              onRemoveItem={handleRemoveItem}
              onClearAll={handleClearAll}
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
