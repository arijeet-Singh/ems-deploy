import React from "react";
import { useState, useRef, useContext } from "react";
import { logInAdmin } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./AdminLogin.css";
function AdminLogin() {
  const { dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const email = useRef();
  const password = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    if (enteredEmail === "admin@gmail.com" && enteredPassword === "admin_") {
      logInAdmin({ email: enteredEmail, password: enteredPassword }, dispatch);
    } else {
      if (enteredEmail !== "admin@gmail.com" && enteredPassword !== "admin_") {
        alert("Wrong Email ID and Password");
      } else if (enteredEmail !== "admin@gmail.com") {
        alert("Wrong Email ID");
      } else if (enteredPassword !== "admin_") {
        alert("Wrong Password");
      }
    }
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
            <VisibilityIcon className="visible" onClick={handleShowPassword} />
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
            />
          </>
        )}
        <br />
        <button onClick={handleLogIn} className="auth-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
