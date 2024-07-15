import React from "react";
import "./Preferences.css";

const Preferences = () => {
  return (
    <div className="preferences-container">
      <iframe
        title="Preferences"
        src="http://127.0.0.1:8000/api/preferences"
        className="preferences-iframe"
      ></iframe>
    </div>
  );
};

export default Preferences;
