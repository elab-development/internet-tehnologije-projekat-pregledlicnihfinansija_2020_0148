import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Logout.css";

const LogoutPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    console.log("Korisnik je izlogovan.");
    setShowConfirmation(false);
    setLoggedOut(true);
  };

  const handleCancel = () => {
    setShowConfirmation(true);
    setLoggedOut(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (loggedOut) {
      const timeout = setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [loggedOut]);

  return (
    <div className="logout-container">
      <img src="/images/image2.jpg" alt="Image 2" className="logout-image" />
      {showConfirmation ? (
        <div className="logout-confirmation">
          <h2>You are about to log out. Are you sure?</h2>
          <button onClick={handleLogout}>Yes</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1 className="logout-title">Logout</h1>
          <p className="logout-text">You have been successfully logged out.</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
