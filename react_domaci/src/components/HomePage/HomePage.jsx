import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="home-title">Personal Finance Overview</h1>
        <img src="/images/image1.jpg" alt="Home" className="home-image" />
      </header>
      <section id="about" className="section">
        <h2>About</h2>
        <p>
          Understanding your personal finances is crucial for financial
          stability. A personal finance overview gives you insights into your
          income, expenses, savings, and debts. By analyzing these aspects, you
          can make informed decisions, set realistic goals, and work towards
          financial freedom.
        </p>
      </section>
      <section id="services" className="section">
        <h2>Services</h2>
        <ul>
          <li>Income Tracking</li>
          <li>Expense Management</li>
          <li>Savings Tracking</li>
        </ul>
      </section>
      <section id="contact" className="section-end">
        <h2>Contact</h2>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
      </section>
    </div>
  );
};

export default HomePage;
