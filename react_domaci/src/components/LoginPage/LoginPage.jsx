import React from "react";
import { useState, useContext } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const LoginPage = ({ addToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleInput(e) {
    let newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    console.log("Email:", newUserData.email);
    console.log("Password:", newUserData.password);
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        userData
      );

      if (response.data.success === true) {
        const { access_token } = response.data;

        window.sessionStorage.setItem("auth_token", access_token);
        addToken(access_token);

        const userResponse = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const { id, email } = userResponse.data;

        setUser({ id, email });

        navigate("/");
      } else {
        console.log("Login failed:", response.data.message);

        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      alert("An error occurred while logging in. Please try again later.");
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your email and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      onInput={handleInput}
                      name="email"
                      autoComplete="email"
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onInput={handleInput}
                      name="password"
                      autoComplete="current-password"
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="/forgot-password">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a
                      href="https://www.facebook.com"
                      className="text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a
                      href="https://www.instagram.com"
                      className="text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-lg mx-4 px-2"></i>
                    </a>
                    <a
                      href="https://www.google.com"
                      className="text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
