import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";
import TransactionForm from "./TransactionForm"; // Importovanje nove komponente

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Dodajemo state za prikaz forme
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    isEdit: false,
    id: null,
  });
  const [categories, setCategories] = useState([]);

  // Function to fetch transactions from the server
  const fetchTransactions = () => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .get("http://127.0.0.1:8000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.transactions);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");

    // Dohvatanje liste kategorija sa servera
    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data); // Čuvamo listu kategorija u stanju komponente
      })
      .catch((error) => {
        setError(error);
      });

    // Pozivanje funkcije za dohvatanje transakcija
    fetchTransactions();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const toggleForm = () => {
    setShowForm(!showForm); // Funkcija za prikazivanje/skrivanje forme
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (transaction) => {
    setFormData({
      category: transaction.category_name,
      amount: transaction.amount,
      description: transaction.description,
      isEdit: true,
      id: transaction.id,
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("auth_token");

    if (formData.isEdit) {
      axios
        .put(
          `http://127.0.0.1:8000/api/transactions/${formData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Update the transactions list with the updated transaction
          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction.id === response.data.transaction.id
                ? response.data.transaction
                : transaction
            )
          );
          // Reset the form
          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false,
            id: null,
          });
          setShowForm(false);
          fetchTransactions(); // Refresh the transactions list
        })
        .catch((error) => {
          setError(error.response.data.message); // Set the error message received from the server
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Add the new transaction to the existing list
          setTransactions([...transactions, response.data.transaction]);
          // Reset the form
          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false,
            id: null,
          });
          setShowForm(false);
          fetchTransactions(); // Refresh the transactions list
        })
        .catch((error) => {
          setError(error.response.data.message); // Set the error message received from the server
        });
    }
  };

  const handleDelete = (transactionId) => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .delete(`http://127.0.0.1:8000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Filter the transactions to remove the deleted one
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== transactionId
        );
        setTransactions(updatedTransactions);
      })
      .catch((error) => {
        setError(error.response.data.message); // Set the error message received from the server
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="page-trans">
      {/* Button to show the form */}
      <button onClick={toggleForm} className="btn btn-add">
        Add New Transaction
      </button>

      {/* Form for adding or editing a transaction */}
      {showForm && (
        <TransactionForm
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          setTransactions={setTransactions}
          refreshTransactions={fetchTransactions} // Pass the refresh function
          handleSubmit={handleSubmit}
        />
      )}

      {/* List of existing transactions */}
      <ul className="transactions-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="card transaction-card">
              <div className="card-header">
                <p>Category: {transaction.category_name}</p>
              </div>
              <div className="card-body">
                <h5 className="card-title">Amount: {transaction.amount}</h5>
                <p className="card-text-trans">
                  Description: {transaction.description}
                </p>
                <div className="btn-container">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(transaction)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted">
                <p>Date: {transaction.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
