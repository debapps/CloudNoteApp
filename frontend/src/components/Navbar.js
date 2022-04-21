import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

export default function Navbar() {
  // Get the route pathname.
  let path = useLocation().pathname;

  // Get the auth context.
  const authContext = useContext(AuthContext);
  const { authToken, logOutUser } = authContext;

  // useNavigate hook.
  const navigate = useNavigate();

  // This function log out the user.
  const handleLogOut = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#FFF56D", color: "#3E065F" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: "#3E065F" }} to="/">
          <em>CloudNote</em>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${path === "/home" ? "active" : ""}`}
                style={{ color: "#3E065F" }}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${path === "/about" ? "active" : ""}`}
                style={{ color: "#3E065F" }}
                to="/contact"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {authToken ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-dark"
                to="/userdetails"
                role="button"
              >
                My Account
              </Link>
              <button className="btn btn-outline-dark mx-2" onClick={handleLogOut}>
                Log Out
              </button>
            </form>
          ) : (
            <form className="d-flex">
              <Link
                className="btn btn-outline-dark mx-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link className="btn btn-outline-dark" to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
