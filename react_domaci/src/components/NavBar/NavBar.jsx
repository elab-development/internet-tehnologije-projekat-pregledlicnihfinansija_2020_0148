import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ token }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(true);
  }, [location]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Personal Finance Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-expanded={!isCollapsed ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {/* {token == null ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              )} */}

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/transactions">
                  My transactions
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/crypto">
                  CryptoPrices
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/quiz">
                  FinanceQuiz
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  onClick={handleToggle}
                  aria-expanded={!isCollapsed ? "true" : "false"}
                >
                  Admin panel
                </button>
                <ul
                  className={`dropdown-menu ${isCollapsed ? "" : "show"}`}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/preferences">
                      Preferences
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
