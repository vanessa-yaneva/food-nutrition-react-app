import React from "react";
import "./NutritionTable.css";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // for the chart

const NutritionTable = ({ items, onRemoveItem, onClearAll }) => {
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

  const chartData = [
    { name: "Calories", value: totals.calories },
    { name: "Protein", value: totals.protein },
    { name: "Carbs", value: totals.carbs },
    { name: "Fats", value: totals.fats },
  ];

  return (
    <div className="nutrition-content">
      <div className="nutrition-table-container">
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
            <tr className="totals-row">
              <td>Total</td>
              <td>{totals.calories.toFixed(2)}</td>
              <td>{totals.protein.toFixed(2)}</td>
              <td>{totals.carbs.toFixed(2)}</td>
              <td>{totals.fats.toFixed(2)}</td>
              <td>
                {/*Clear All button */}
                <button onClick={onClearAll} className="clear-all-btn">
                  Clear All
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="chart-container">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default NutritionTable;
