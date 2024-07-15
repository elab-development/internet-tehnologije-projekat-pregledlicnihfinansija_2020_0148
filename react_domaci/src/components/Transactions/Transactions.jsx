import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="page-trans">
      <a href="#" className="btn btn-add">
        Add New Transaction
      </a>
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
                  <a href="#" className="btn btn-primary">
                    Update
                  </a>
                  <a href="#" className="btn-del">
                    Delete
                  </a>
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
