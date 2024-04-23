import React, { useState } from "react";
import "./Categories.css";

const Transportation = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: 50.0,
      description: "Vehicle Maintenance",
      date: "2024-04-09",
    },
    { id: 2, amount: 20.0, description: "Parking Fees", date: "2024-04-08" },
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleDelete = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setSelectedTransaction(transactionToEdit);
    setShowEditPopup(true);
  };

  const handleAddNewTransaction = () => {
    setShowAddPopup(true);
    setNewTransaction({
      id: "",
      amount: "",
      description: "",
      date: "",
    });
  };

  const handleSaveEdit = () => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === selectedTransaction.id
        ? selectedTransaction
        : transaction
    );
    setTransactions(updatedTransactions);
    setShowEditPopup(false);
  };

  const handleSaveNewTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setShowAddPopup(false);
  };

  return (
    <div className="body-trans">
      <div className="img-container-trans">
        <img src="/images/transportation.jpg" alt="Transportation" />
      </div>
      <div className="container-trans">
        <div className="title-trans">
          <h2>Transactions for Transportation</h2>
          <button onClick={handleAddNewTransaction}>Add New Transaction</button>
        </div>
        <table className="table-trans">
          <thead className="thead-trans">
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="tbody-trans">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
                <td>
                  <button onClick={() => handleEdit(transaction.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditPopup && (
        <div className="popup-trans">
          <div className="popup-inner-trans">
            <h2>Edit Transaction</h2>
            <label htmlFor="editAmount">Amount:</label>
            <input
              type="text"
              id="editAmount"
              value={selectedTransaction.amount}
              onChange={(e) =>
                setSelectedTransaction({
                  ...selectedTransaction,
                  amount: e.target.value,
                })
              }
            />
            <label htmlFor="editDescription">Description:</label>
            <input
              type="text"
              id="editDescription"
              value={selectedTransaction.description}
              onChange={(e) =>
                setSelectedTransaction({
                  ...selectedTransaction,
                  description: e.target.value,
                })
              }
            />
            <label htmlFor="editDate">Date:</label>
            <input
              type="text"
              id="editDate"
              value={selectedTransaction.date}
              onChange={(e) =>
                setSelectedTransaction({
                  ...selectedTransaction,
                  date: e.target.value,
                })
              }
            />
            <div className="button-container-trans">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setShowEditPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showAddPopup && (
        <div className="popup-trans">
          <div className="popup-inner-trans">
            <h2>Add New Transaction</h2>
            <label htmlFor="newAmount">Amount:</label>
            <input
              type="text"
              id="newAmount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, amount: e.target.value })
              }
            />
            <label htmlFor="newDescription">Description:</label>
            <input
              type="text"
              id="newDescription"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
            />
            <label htmlFor="newDate">Date:</label>
            <input
              type="text"
              id="newDate"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, date: e.target.value })
              }
            />
            <div className="button-container-trans">
              <button onClick={handleSaveNewTransaction}>Save</button>
              <button onClick={() => setShowAddPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transportation;
