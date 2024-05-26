import React from "react";
import "./Categories.css";
import useTransactions from "./useTransactions";

const Groceries = () => {
  const {
    transactions,
    showEditPopup,
    showAddPopup,
    selectedTransaction,
    newTransaction,
    setNewTransaction,
    setSelectedTransaction,
    setShowEditPopup,
    setShowAddPopup,
    handleDelete,
    handleEdit,
    handleAddNewTransaction,
    handleSaveEdit,
    handleSaveNewTransaction,
  } = useTransactions([
    { id: 1, amount: 3.5, description: "Milk", date: "2024-04-09" },
    { id: 2, amount: 2.0, description: "Bread", date: "2024-04-08" },
  ]);

  return (
    <div className="body-trans">
      <div className="img-container-trans">
        <img src="/images/groceries.jpeg" alt="Groceries" />
      </div>
      <div className="container-trans">
        <div className="title-trans">
          <h2>Transactions for Groceries</h2>
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

export default Groceries;
