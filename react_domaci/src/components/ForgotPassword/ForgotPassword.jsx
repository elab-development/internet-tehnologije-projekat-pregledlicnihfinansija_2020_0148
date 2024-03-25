import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Sending password reset request for email:", email);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage("Request for password reset sent successfully!");
      setEmail("");
    } catch (error) {
      setMessage("An error occurred while sending password reset request!");
    }
  };

  return (
    <div className="forgot-container">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email address:
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mr-2">
            Send Request
          </button>
          <Link to="/login" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
