import React, { useState, useEffect } from "react";
import UserForm from "../UserForm/UserForm";
import "./Users.css";
import "../UserForm/UserForm.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      const fetchedUsers = data.results.map((user, index) => ({
        id: index + 1,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container2">
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img src="/images/image3.jpg" alt="Users" className="3rd-image" />
      <div style={{ marginBottom: "20px" }}></div>
      <ul>
        {currentUsers.map((user) => (
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

      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            <span style={{ marginRight: "5px" }}>{i + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
