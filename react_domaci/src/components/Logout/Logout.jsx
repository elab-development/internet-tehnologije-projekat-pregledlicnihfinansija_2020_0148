import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Logout.css";
import axios from "axios";

const LogoutPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(false);
    setLoggedOut(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/logout",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.removeItem("auth_token");
        window.sessionStorage.removeItem("user_id");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setShowConfirmation(true);
    setLoggedOut(false);
    navigate("/");
  };

  useEffect(() => {
    if (loggedOut) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [loggedOut, navigate]);

  return (
    <div className="logout-container">
      <img src="/images/image2.jpg" alt="logout" className="logout-image" />
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
