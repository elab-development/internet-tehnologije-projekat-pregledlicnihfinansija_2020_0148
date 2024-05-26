import { useState } from "react";

const useTransactions = (initialTransactions) => {
  const [transactions, setTransactions] = useState(initialTransactions);
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

  return {
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
  };
};

export default useTransactions;
