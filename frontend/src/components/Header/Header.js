import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logOutCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";
function Header() {
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const handleLogOut = (e) => {
    e.preventDefault();
    logOutCall(dispatch);
    history.push("/");
  };
  return (
    <div className="header">
      Employee Management System
      <br />
      <button onClick={handleLogOut} className="logout-btn">
        {user && "Log Out"}
      </button>
    </div>
  );
}

export default Header;
