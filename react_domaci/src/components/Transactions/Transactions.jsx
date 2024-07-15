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

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("auth_token");

    axios
      .post("http://127.0.0.1:8000/api/transactions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Dodavanje nove transakcije u postojeću listu
        setTransactions([...transactions, response.data.transaction]);
        // Resetovanje forme
        setFormData({
          category: "",
          amount: "",
          description: "",
        });
        // Sakrij formu
        setShowForm(false);
        // Ponovno učitavanje transakcija nakon dodavanja nove
        fetchTransactions();
      })
      .catch((error) => {
        setError(error.response.data.message); // Postavi error poruku koju dobijemo od servera
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
      {/* Dugme za prikaz forme */}
      <button onClick={toggleForm} className="btn btn-add">
        Add New Transaction
      </button>

      {/* Forma za unos nove transakcije */}
      {showForm && (
        <TransactionForm
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          setTransactions={setTransactions}
          refreshTransactions={fetchTransactions} // Prosleđujemo funkciju za refresh
          handleSubmit={handleSubmit}
        />
      )}

      {/* Lista postojećih transakcija */}
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
                  <button className="btn btn-primary">Update</button>
                  <button className="btn-del">Delete</button>
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
