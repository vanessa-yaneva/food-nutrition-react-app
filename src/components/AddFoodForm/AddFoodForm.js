import React, { useState } from "react";
import "./AddFoodForm.css"; // Ensure this is pointing to the correct CSS file

const AddFoodForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      formData.calories === "" ||
      formData.protein === "" ||
      formData.carbs === "" ||
      formData.fats === ""
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }
    onAdd({
      ...formData,
      calories: parseFloat(formData.calories),
      protein: parseFloat(formData.protein),
      carbs: parseFloat(formData.carbs),
      fats: parseFloat(formData.fats),
    });
    setFormData({ name: "", calories: "", protein: "", carbs: "", fats: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="add-food-form">
      <table className="nutrition-table">
        <tbody>
          <tr>
            <td>Food Name:</td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Calories:</td>
            <td>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Protein (g):</td>
            <td>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Carbs (g):</td>
            <td>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Fats (g):</td>
            <td>
              <input
                type="number"
                name="fats"
                value={formData.fats}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit" className="submit-btn">
                Add Food Item
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddFoodForm;
