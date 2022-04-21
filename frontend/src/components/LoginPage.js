import React, { useRef, useContext } from "react";
import  { useNavigate } from 'react-router-dom';
import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";

export default function LoginPage() {

  // Get the auth context.
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;

  // Get the alert context.
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // useRef Hooks.
  const emailID = useRef(null);
  const password = useRef(null);

  // useNavigate hook.
  const navigate = useNavigate();

  // This function triggers when login form is submitted.
  const handleLogin = async (event) => {
      event.preventDefault();
      let loginBody = {
          "emailID": emailID.current.value,
          "password": password.current.value
      }

      // Log in routine.      
      const {success, message } = await loginUser(loginBody);

      if (success) {
        showAlert("success", message);
        navigate("/");
      } else {
        showAlert("danger", message);

        // Clear all the form elements
        emailID.current.value = "";
        password.current.value = "";
      }
  }

return (
  <>
    <form className="container my-3 mt-5 text-dark bg-warning bg-opacity-50 p-5" onSubmit={handleLogin}>
        <h2>Log in here</h2>
      <div className="mb-3 my-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          ref={emailID}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          ref={password}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <button type="submit" className="btn btn-dark">
        Log In
      </button>
    </form>
  </>
);
}
