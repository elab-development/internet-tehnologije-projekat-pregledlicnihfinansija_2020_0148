import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCategoryForm from "./AddCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [jwtToken, setJwtToken] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      setJwtToken(token);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/categories`;
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.get(url, config);
      console.log("API Response:", response.data);

      const fetchedCategories = response.data.data.map((category, index) => ({
        id: index + 1,
        name: category.name,
        description: category.description,
      }));
      console.log("Fetched Categories:", fetchedCategories);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = () => {
    setShowAddForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = () => {
    fetchCategories();
    handleCloseForm();
  };

  return (
    <div className="cat-container">
      <h1 className="cat-heading">Categories</h1>
      <div className="cat-buttons">
        <button onClick={handleAddCategory} className="cat-button">
          Add new category
        </button>
      </div>
      <ul className="cat-list">
        {categories.map((category) => (
          <li key={category.id} className="cat-item">
            <div className="cat-name">
              Name: <strong>{category.name}</strong>
            </div>
            <div className="cat-description">
              Description: {category.description}
            </div>
            <div className="cat-actions">
              <button
                onClick={() => handleEditCategory(category)}
                className="cat-button"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showAddForm && (
        <AddCategoryForm
          onClose={handleCloseForm}
          onSave={handleSaveCategory}
        />
      )}

      {showUpdateForm && (
        <UpdateCategoryForm
          category={editingCategory}
          onClose={handleCloseForm}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default Categories;
