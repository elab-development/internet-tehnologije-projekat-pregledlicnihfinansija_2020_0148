import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";
import TransactionForm from "./TransactionForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    isEdit: false,
    id: null,
  });
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);

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

    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        setError(error);
      });

    fetchTransactions();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
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
          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction.id === response.data.transaction.id
                ? response.data.transaction
                : transaction
            )
          );

          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false,
            id: null,
          });
          setShowForm(false);

          fetchTransactions();
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTransactions([...transactions, response.data.transaction]);

          setFormData({
            category: "",
            amount: "",
            description: "",
            isEdit: false,
            id: null,
          });
          setShowForm(false);

          fetchTransactions();
        })
        .catch((error) => {
          setError(error.response.data.message);
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
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== transactionId
        );
        setTransactions(updatedTransactions);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleSortByDate = () => {
    const token = sessionStorage.getItem("auth_token");
    const userId = sessionStorage.getItem("user_id");

    axios
      .get(
        `http://127.0.0.1:8000/api/users/${userId}/transactions_sort_by_date`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTransactions(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const generateReport = () => {
    const token = sessionStorage.getItem("auth_token");
    const userId = sessionStorage.getItem("user_id");

    axios
      .get(
        `http://127.0.0.1:8000/api/users/${userId}/category-spending-report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReportData(response.data);
        console.log("Response from Laravel:", response.data);
        setShowReport(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
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
      <button onClick={toggleForm} className="btn btn-add">
        Add New Transaction
      </button>

      <button onClick={handleSortByDate} className="btn btn-sort">
        Sort by Date
      </button>

      <button onClick={generateReport} className="btn btn-report">
        Generate Report
      </button>

      {showForm && (
        <TransactionForm
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          setTransactions={setTransactions}
          refreshTransactions={fetchTransactions}
          handleSubmit={handleSubmit}
        />
      )}

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

      {showReport && (
        <div className="report-popup">
          <button
            onClick={() => setShowReport(false)}
            className="btn-close"
          ></button>
          <h2>Category Spending Report</h2>
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.category_name}>
                  <td>{item.category_name}</td>
                  <td>{item.total_spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
