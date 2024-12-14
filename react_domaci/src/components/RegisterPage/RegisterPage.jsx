import React from "react";
import { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  let navigate = useNavigate();

  function handleInput(e) {
    let newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    setError("");
  }

  function handleRegister(e) {
    e.preventDefault();
    if (userData.password !== userData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/register", userData)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        setError("An error occurred. Please try again later.");
      });
  }

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleRegister}>
                    {error && <p className="text-danger">{error}</p>}

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="yourName"
                        name="name"
                        className="form-control form-control-lg"
                        onInput={handleInput}
                        required
                        autoComplete="name" 
                      />
                      <label className="form-label" htmlFor="yourName">
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="yourEmail"
                        name="email"
                        className="form-control form-control-lg"
                        onInput={handleInput}
                        required
                        autoComplete="email" 
                      />
                      <label className="form-label" htmlFor="yourEmail">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="yourPassword"
                        name="password"
                        className="form-control form-control-lg"
                        onInput={handleInput}
                        required
                        autoComplete="new-password"
                      />
                      <label className="form-label" htmlFor="yourPassword">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        className="form-control form-control-lg"
                        onInput={handleInput}
                        required
                        autoComplete="new-password" 
                      />
                      <label className="form-label" htmlFor="repeatPassword">
                        Repeat your password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="agreeTerms"
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
