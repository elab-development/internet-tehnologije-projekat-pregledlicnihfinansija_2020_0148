import React from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="yourName"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="yourName">
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="yourEmail"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="yourEmail">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="yourPassword"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="yourPassword">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="repeatPassword"
                        className="form-control form-control-lg"
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
                        type="button"
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
