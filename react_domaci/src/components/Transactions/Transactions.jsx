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
                This category includes payments for essential services such as
                electricity, water, gas, internet, and telephone. Tracking these
                expenses helps you manage monthly household costs and ensure
                you're staying within your budget.
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
                This category captures all expenses related to buying food and
                household supplies from supermarkets and local markets. Tracking
                these helps you manage your spending on daily essentials and
                maintain your budget.
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
        <a href="/transactions/entertainment">
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
        </a>
        <a href="/transactions/shopping">
          <div
            className="transCard text-white bg-warning mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Shopping</div>
            <div className="card-body">
              <p className="card-text">
                This category includes expenses from purchasing clothing,
                electronics, home appliances and other retail items. Monitoring
                these transactions helps you manage discretionary spending and
                align it with your budgeting goals.
              </p>
            </div>
          </div>
        </a>
        <a href="/transactions/healthandwellness">
          <div
            className="transCard text-white bg-info mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Health and wellness</div>
            <div className="card-body">
              <p className="card-text">
                This category encompasses expenses related to medical services,
                fitness memberships, and wellness products. Tracking these helps
                you manage health-related spending and prioritize well-being
                within your budget.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Transactions;
