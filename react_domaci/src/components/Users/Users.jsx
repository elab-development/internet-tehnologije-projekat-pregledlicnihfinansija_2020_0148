import React, { useState, useEffect, useCallback } from "react";
import UserForm from "../UserForm/UserForm";
import "./Users.css";
import "../UserForm/UserForm.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      setJwtToken(token);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      let url = `http://127.0.0.1:8000/api/paginated-users?page=${currentPage}`;
      if (searchTerm.trim() !== "") {
        url = `http://127.0.0.1:8000/api/search/${searchTerm}`;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.get(url, config);
      console.log("API Response:", response.data);

      if (!response.data.meta) {
        setTotalPages(1);
      } else {
        setTotalPages(response.data.meta.last_page);
      }

      const fetchedUsers = response.data.data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
      console.log("Fetched Users:", fetchedUsers);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [currentPage, searchTerm, jwtToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const addUser = () => {
    setEditingUserId("new");
  };

  const updateUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleSubmit = async (name, email) => {
    try {
      if (!name || !email) {
        alert("Both name and email are required.");
        return;
      }

      const url = `http://127.0.0.1:8000/api/users`;
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const data = {
        name,
        email,
      };
      const response = await axios.post(url, data, config);
      console.log("Add User Response:", response.data);

      // Refresh the user list after adding a new user
      fetchUsers();

      // Reset the form or editing state
      setEditingUserId(null);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user. Make sure you have the correct permissions.");
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const deleteUser = async (userId) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!shouldDelete) {
        return;
      }

      const url = `http://127.0.0.1:8000/api/users/${userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.delete(url, config);
      console.log("Delete Response:", response.data);

      window.alert(`Response: ${response.data.message}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderUsers = users.map((user) => (
    <li key={user.id}>
      {user.name} - {user.email}
      <button onClick={() => updateUser(user.id)}>Update</button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </li>
  ));

  return (
    <div className="container2">
      <h1>Users</h1>
      <input
        type="text"
        id="searchTerm"
        name="searchTerm"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img src="/images/image3.jpg" alt="Users" className="3rd-image" />
      <div style={{ marginBottom: "20px" }}></div>
      <ul>{renderUsers}</ul>
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
