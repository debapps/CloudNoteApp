import React, { useRef, useContext } from "react";
import  { useNavigate } from 'react-router-dom';
import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";

export default function SignUpPage() {

  // Get the auth context.
  const authContext = useContext(AuthContext);
  const { signUpUser } = authContext;

  // Get the alert context.
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  // useRef Hooks.
  const userName = useRef(null);
  const emailID = useRef(null);
  const password = useRef(null);
  const confirmPass = useRef(null);

  // useNavigate hook.
  const navigate = useNavigate();

  // This function triggered when sign up form submitted.
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password.current.value === confirmPass.current.value) {
      let signUpBody = {
        "userName": userName.current.value,
        "emailID": emailID.current.value,
        "password": password.current.value
      }

      // Sign Up routine.
      const {success, message } = await signUpUser(signUpBody);

      if (success) {
        showAlert("success", message);
        navigate("/");
      } else {
        showAlert("danger", message);

        // Clear all the form elements
        userName.current.value = "";
        emailID.current.value = "";
        password.current.value = "";
        confirmPass.current.value = "";
      }

    } else {
      showAlert("warning", "Please confirm password");
      password.current.value = "";
      confirmPass.current.value = "";
    }
  }

  return (
    <>
      <form className="container my-3 mt-5 bg-warning bg-opacity-50 p-5" onSubmit={handleSignUp}>
          <h2>Sign Up here</h2>
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            ref={userName}
            className="form-control"
            id="name"
            minLength={1}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            ref={emailID}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            ref={password}
            className="form-control"
            id="password1"
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            ref={confirmPass}
            className="form-control"
            id="password2"
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Sign Up
        </button>
      </form>
   </>
  )
}
