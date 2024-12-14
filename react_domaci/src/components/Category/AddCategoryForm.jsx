import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryForm.css";

const AddCategoryForm = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories",
        {
          name,
          description,
        }
      );
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error(
        "Error saving category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="cat-form-popup">
      <div className="cat-form-container">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="cat-button">
              Add
            </button>
            <button type="button" className="cat-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
