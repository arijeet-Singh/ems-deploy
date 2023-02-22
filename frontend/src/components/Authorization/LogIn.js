import React from "react";
import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Auth.css";
function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const { dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const handleLogIn = (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    if (enteredEmail === "admin@gmail.com") {
      alert("Please log in as admin.");
    } else {
      let emailFlag, passwordFlag;

      // EMAIL VALIDATION
      let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!pattern.test(enteredEmail)) {
        setEmailValue("Invalid Email ID");
      } else {
        emailFlag = 1;
      }

      //PASSWORD VALIDATION
      if (enteredPassword.length < 6 || enteredPassword.length > 20) {
        alert("Password must be between 6-20 characters.");
      } else {
        passwordFlag = 1;
      }

      if (emailFlag && passwordFlag) {
        loginCall({ email: enteredEmail, password: enteredPassword }, dispatch);
      }
    }
  };

  const handleAlready = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    history.push("/adminlogin");
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <input
          className="form-input"
          type="email"
          placeholder="Email ID"
          ref={email}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
        />
        <br />
        {!showPassword ? (
          <>
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              ref={password}
              required
            />
            <VisibilityIcon
              className="visible"
              onClick={handleShowPassword}
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <>
            <input
              className="form-input"
              type="text"
              placeholder="Password"
              ref={password}
              required
            />
            <VisibilityOffIcon
              className="not-visible"
              onClick={handleShowPassword}
              style={{ cursor: "pointer" }}
            />
          </>
        )}
        <br />
        <button onClick={handleLogIn} className="auth-button">
          Log In
        </button>
        <p onClick={handleAdmin} className="auth-choice">
          Or, Log In as Admin
        </p>
        <p onClick={handleAlready} className="auth-choice">
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}

export default LogIn;
