import React from "react";
import "./Preferences.css";

const Preferences = () => {
  return (
    <div className="preferences-container">
      <h1 className="preferences-header">User Preferences</h1>
      <iframe
        title="Preferences"
        src="http://127.0.0.1:8000/api/preferences"
        className="preferences-iframe"
      ></iframe>
    </div>
  );
};

export default Preferences;
