import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionForm = ({
  formData,
  handleInputChange,
  setFormData,
  setTransactions,
  refreshTransactions, // Function to refresh transactions
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedCategories = response.data.data;

        // Assigning numbers to categories
        const numberedCategories = fetchedCategories.map((category, index) => ({
          ...category,
          number: index + 1,
        }));

        setCategories(numberedCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmitWrapper = (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (category) => category.name === formData.category
    );

    if (selectedCategory) {
      const newFormData = {
        ...formData,
        category_id: selectedCategory.number,
      };

      if (formData.isEdit) {
        handleUpdateWrapper(newFormData);
      } else {
        handleCreateWrapper(newFormData);
      }
    } else {
      console.error("Category not found");
    }
  };

  const handleCreateWrapper = (newFormData) => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .post(
        "http://127.0.0.1:8000/api/transactions",
        {
          category_id: newFormData.category_id,
          amount: newFormData.amount,
          description: newFormData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (setTransactions && typeof setTransactions === "function") {
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            response.data.transaction,
          ]);
        } else {
          console.error("setTransactions is not a function or is undefined");
        }
        if (setFormData && typeof setFormData === "function") {
          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false, // Reset the isEdit flag
          });
        } else {
          console.error("setFormData is not a function or is undefined");
        }
        refreshTransactions(); // Call refreshTransactions to update transactions list
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        setError(error);
      });
  };

  const handleUpdateWrapper = (newFormData) => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .put(
        `http://127.0.0.1:8000/api/transactions/${newFormData.id}`,
        {
          category_id: newFormData.category_id,
          amount: newFormData.amount,
          description: newFormData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        refreshTransactions(); // Call refreshTransactions to update transactions list
        if (setFormData && typeof setFormData === "function") {
          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false, // Reset the isEdit flag
          });
        } else {
          console.error("setFormData is not a function or is undefined");
        }
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
        setError(error);
      });
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmitWrapper}>
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        placeholder="Amount"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">{formData.isEdit ? "Update" : "Submit"}</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default TransactionForm;
