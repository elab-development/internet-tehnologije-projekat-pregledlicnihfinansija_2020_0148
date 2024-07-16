import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryForm.css";

const UpdateCategoryForm = ({ category, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !category.id) {
      console.error("Category ID is undefined or null");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/categories/${category.id}`, {
        name,
        description,
      });
      onSave();
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
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="cat-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="cat-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="cat-button">
              Update
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

export default UpdateCategoryForm;
