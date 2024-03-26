import React, { useState } from "react";
import "./FoodDataTable.css";

const FoodDataTable = ({ data, onAddItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="food-data-content">
      <div className="food-data-content-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for food..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="food-data-content-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Carbs (g)</th>
              <th>Fats (g)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => onAddItem(item)}
                className="food-data-row"
              >
                <td>{item.name}</td>
                <td>{item.calories}</td>
                <td>{item.protein}</td>
                <td>{item.carbs}</td>
                <td>{item.fats}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="page-numbers">
          {pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodDataTable;
