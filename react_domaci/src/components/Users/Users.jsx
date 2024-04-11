import React, { useState } from "react";
import UserForm from "../UserForm/UserForm";
import "./Users.css";
import "../UserForm/UserForm.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Pera", email: "pera@example.com" },
    { id: 2, name: "Laza", email: "laza@example.com" },
    { id: 3, name: "Mika", email: "mika@example.com" },
  ]);
  const [editingUserId, setEditingUserId] = useState(null);

  const addUser = () => {
    setEditingUserId("new");
  };

  const updateUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleSubmit = (name, email) => {
    if (editingUserId === "new") {
      const newUser = {
        id: users.length + 1,
        name,
        email,
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...user, name, email } : user
        )
      );
    }
    setEditingUserId(null);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <img src="/images/image3.jpg" alt="Users" className="3rd-image" />
      <div style={{ marginBottom: "20px" }}></div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => updateUser(user.id)}>Update</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addUser}>Add User</button>

      {editingUserId && (
        <UserForm
          onSubmit={(name, email) => handleSubmit(name, email)}
          onCancel={handleCancel}
          initialName={
            editingUserId === "new"
              ? ""
              : users.find((user) => user.id === editingUserId)?.name || ""
          }
          initialEmail={
            editingUserId === "new"
              ? ""
              : users.find((user) => user.id === editingUserId)?.email || ""
          }
        />
      )}
    </div>
  );
};

export default Users;
