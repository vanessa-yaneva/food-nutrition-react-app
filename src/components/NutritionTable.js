import React from "react";
import "./NutritionTable.css"; // Import the CSS file here

const NutritionTable = ({ items, onRemoveItem }) => {
  // Calculate totals
  const totals = items.reduce(
    (acc, item) => {
      acc.calories += parseFloat(item.calories);
      acc.protein += parseFloat(item.protein);
      acc.carbs += parseFloat(item.carbs);
      acc.fats += parseFloat(item.fats);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <table className="nutrition-table">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Calories</th>
          <th>Protein (g)</th>
          <th>Carbs (g)</th>
          <th>Fats (g)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.calories}</td>
            <td>{item.protein}</td>
            <td>{item.carbs}</td>
            <td>{item.fats}</td>
            <td>
              <button
                onClick={() => onRemoveItem(index)}
                className="remove-item-btn"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        {/* Totals row */}
        <tr className="totals-row">
          <td>Total</td>
          <td>{totals.calories.toFixed(2)}</td>
          <td>{totals.protein.toFixed(2)}</td>
          <td>{totals.carbs.toFixed(2)}</td>
          <td>{totals.fats.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NutritionTable;
