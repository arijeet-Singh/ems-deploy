import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "./Auth.css";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const email = useRef();
  const password = useRef();
  const confirm = useRef();

  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    const enteredConfirm = confirm.current.value;

    let emailFlag, passwordFlag, confirmFlag;

    if (enteredEmail === "admin@gmail.com") {
      alert("Reserved Email ID (Admin)");
    } else {
      // EMAIL VALIDATION
      let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (pattern.test(enteredEmail) && enteredEmail.includes("@gmail.com")) {
        emailFlag = 1;
      } else {
        alert("Invalid Email ID");
        setEmailValue("");
      }

      // PASSWORD VALIDATION
      if (enteredPassword.length < 6 || enteredPassword.length > 20) {
        alert("Password must be between 6-20 characters.");
      } else {
        passwordFlag = 1;
      }

      // CONFIRM PASSWORD VALIDATION
      if (enteredConfirm !== enteredPassword) {
        alert("Passwords do not match");
      } else {
        confirmFlag = 1;
      }

      if (emailFlag && passwordFlag && confirmFlag) {
        const body = {
          email: enteredEmail,
          password: enteredPassword,
        };
        try {
          const res = await axios.post("/api/auth/register", body);
          if (res.status === 200) {
            history.push("/login");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleAlready = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
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
          {!showConfirmPassword ? (
            <>
              <input
                className="form-input"
                type="password"
                placeholder="Confirm Password"
                ref={confirm}
                required
              />
              <VisibilityIcon
                className="visible"
                onClick={handleShowConfirmPassword}
                style={{ cursor: "pointer" }}
              />
            </>
          ) : (
            <>
              <input
                className="form-input"
                type="text"
                placeholder="Confirm Password"
                ref={confirm}
                required
              />
              <VisibilityOffIcon
                className="not-visible"
                onClick={handleShowConfirmPassword}
                style={{ cursor: "pointer" }}
              />
            </>
          )}

          <br />
          <button onClick={handleSignUp} className="auth-button">
            Register
          </button>
          <br />
          <p onClick={handleAlready} className="auth-choice">
            Already have an account? Log In
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
