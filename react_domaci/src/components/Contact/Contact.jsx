import React from "react";
import "./Contact.css";
import Footer from "../Footer/Footer";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        <p>
          If you have any questions or need further assistance, please reach out
          to us through one of the methods below:
        </p>

        <div className="contact-method">
          <h2>Email</h2>
          <p>
            You can reach us at <a href="info@example.com">info@example.com</a>
          </p>
        </div>

        <div className="contact-method">
          <h2>Phone</h2>
          <p>Call us at: 123-456-7890</p>
        </div>

        <div className="contact-method">
          <h2>Address</h2>
          <p>1234 Street Address, City, State, 12345</p>
        </div>

        <div className="contact-method">
          <h2>Office Hours</h2>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        </div>

        <div className="contact-method">
          <h2>Social Media</h2>
          <p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>{" "}
            |
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a>{" "}
            |
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
