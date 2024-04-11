import "./Transactions.css";
import React from "react";

const Transactions = () => {
  return (
    <div className="transContainer">
      <div className="transCards-container">
        <a href="/transactions/utilities">
          <div
            className="transCard text-white bg-success mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Utilities</div>
            <div className="card-body">
              <p className="card-text">
                Utilities cover expenses for essential services like
                electricity, water, gas, and more. Managing utility transactions
                involves tracking payments and usage for these basic
                necessities.
              </p>
            </div>
          </div>
        </a>
        <div
          className="transCard text-white bg-secondary mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Groceries</div>
          <div className="card-body">
            <h5 className="card-title">Secondary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          className="transCard text-white bg-primary mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Transportation</div>
          <div className="card-body">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          className="transCard text-white bg-danger mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Entertainment</div>
          <div className="card-body">
            <h5 className="card-title">Secondary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          className="transCard text-white bg-warning mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Shopping</div>
          <div className="card-body">
            <h5 className="card-title">Secondary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          className="transCard text-white bg-info mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Health and wellness</div>
          <div className="card-body">
            <h5 className="card-title">Secondary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
