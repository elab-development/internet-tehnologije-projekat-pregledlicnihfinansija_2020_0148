import "./Transactions.css";
import React from "react";

const Transactions = () => {
  return (
    <div className="transContainer">
      <div className="transCards-container">
        <a href="/transactions/utilities">
          <div
            className="transCard text-white bg-primary mb-3"
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
        <a href="/transactions/groceries">
          <div
            className="transCard text-white bg-success mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Groceries</div>
            <div className="card-body">
              <p className="card-text">
                Track all purchases of food, beverages, and household items from
                supermarkets and markets. Monitoring this spending helps manage
                your budget and spot savings opportunities.
              </p>
            </div>
          </div>
        </a>
        <a href="/transactions/transportation">
          <div
            className="transCard text-white bg-secondary mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Transportation</div>
            <div className="card-body">
              <p className="card-text">
                This category includes all expenses related to car maintenance,
                fuel, public transport fares, and air travel. Tracking these
                helps you manage your commuting and travel costs effectively and
                optimize your budget accordingly.
              </p>
            </div>
          </div>
        </a>
        <div
          className="transCard text-white bg-danger mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Entertainment</div>
          <div className="card-body">
            <p className="card-text">
              This category covers expenses related to leisure activities such
              as movies, concerts, sporting events, and dining out. Tracking
              these helps you understand how much you're spending on fun and
              recreation, aiding in balanced budgeting.
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
