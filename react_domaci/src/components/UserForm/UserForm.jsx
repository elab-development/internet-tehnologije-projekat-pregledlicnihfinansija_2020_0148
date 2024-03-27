import React, { useState } from "react";
import "./UserForm.css";

const UserForm = ({
  onSubmit,
  onCancel,
  initialName = "",
  initialEmail = "",
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, email);
    setName("");
    setEmail("");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input type="submit" value="Save" />
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
