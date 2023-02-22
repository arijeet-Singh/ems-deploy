import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { logOutCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./AdminView.css";
import Profile from "../Profile/Profile";
function AdminView() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [found, setFound] = useState(true);
  const [user, setUser] = useState(null);
  const [wantsToSearch, setWantsToSearch] = useState(false);
  const [requested, setRequested] = useState(false);
  const [wantsToRegister, setWantsToRegister] = useState(false);
  const [wantsToUpdate, setWantsToUpdate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const email = useRef();
  const fullName = useRef();
  const employeeID = useRef();
  const aadhaar = useRef();
  const phoneNumber = useRef();
  const department = useRef();

  const generateUniqueId = () => {
    const d = new Date();
    const timestamp = d.getTime();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };

  const handleDeleteProfile = async () => {
    const enteredEmail = email.current.value;
    try {
      const res = await axios.delete(
        `/api/employee/delete/email/${enteredEmail}`
      );
      if (res.data === "Record Deleted") {
        alert("Record Deleted")
      }
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handleEmailFilter = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    try {
      const res = await axios.get(`/api/employee/search/email/${enteredEmail}`);
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameFilter = async (e) => {
    e.preventDefault();
    const enteredName = fullName.current.value;
    try {
      const res = await axios.get(`/api/employee/search/name/${enteredName}`);
      if (res.data.length !== 0) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIDFilter = async (e) => {
    e.preventDefault();
    const enteredID = employeeID.current.value;
    try {
      const res = await axios.get(`/api/employee/search/${enteredID}`);
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAadhaarFilter = async (e) => {
    e.preventDefault();
    const enteredAadhaar = aadhaar.current.value;
    try {
      const res = await axios.get(
        `/api/employee/search/aadhaar/${enteredAadhaar}`
      );
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePhoneFilter = async (e) => {
    e.preventDefault();
    const enteredPhone = phoneNumber.current.value;
    try {
      const res = await axios.get(`/api/employee/search/phone/${enteredPhone}`);
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDepartmentFilter = async (e) => {
    e.preventDefault();
    const enteredDepartment = department.current.value;
    try {
      const res = await axios.get(
        `/api/employee/search/department/${enteredDepartment}`
      );
      if (res.data.length !== 0) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    setWantsToSearch(!wantsToSearch);
    setRequested(false);
    setWantsToUpdate(false);
    setShowProfile(false);
    setWantsToDelete(false);
  };

  const handleRegister = () => {
    setWantsToRegister(!wantsToRegister);
  };
  const handleUpdate = () => {
    setWantsToUpdate(!wantsToUpdate);
    setWantsToSearch(false);
    setRequested(false);
    setShowProfile(false);
    setWantsToDelete(false);
  };
  const handleProfile = () => {
    setShowProfile(!showProfile);
    setWantsToUpdate(false);
    localStorage.setItem("EMAILIDPROFILE", email.current.value);
  };
  const handleBack = () => {
    setShowProfile(false);
  };
  const handleBack2 = () => {
    setWantsToSearch(!wantsToSearch);
  };
  const handleLogOut = () => {
    logOutCall(dispatch);
    history.push("/");
  };
  const handleDelete = () => {
    setWantsToDelete(true);
    setShowProfile(false);
    setWantsToSearch(false);
    setRequested(false);
    setWantsToUpdate(false);
  };
  return (
    <>
      <button onClick={handleSearch} className="logout-btn">
        {!wantsToSearch ? (
          "Search"
        ) : (
          <KeyboardBackspaceIcon onClick={handleBack2} />
        )}
      </button>
      <button onClick={handleRegister} className="logout-btn">
        Register an Employee
      </button>
      <button onClick={handleUpdate} className="logout-btn">
        {!showProfile ? (
          "Update Employee Profile"
        ) : (
          <KeyboardBackspaceIcon onClick={handleBack} />
        )}
      </button>
      <button onClick={handleDelete} className="logout-btn">
        Delete Employee Data
      </button>
      <button onClick={handleLogOut} className="logout-btn">
        Log Out
      </button>
      {wantsToRegister && <Redirect to="/employeeRegistration" />}
      {wantsToUpdate && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Email ID of Employee"
            className="search-bar-1"
            ref={email}
          />
          <SendIcon className="search-icon" onClick={handleProfile} />
        </div>
      )}
      {wantsToDelete && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Email ID of Employee"
            className="search-bar-1"
            ref={email}
          />
          <DeleteIcon className="search-icon" onClick={handleDeleteProfile} />
        </div>
      )}
      {showProfile && (
        <Profile email={localStorage.getItem("EMAILIDPROFILE")} />
      )}
      {wantsToSearch && (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search By Email ID"
              className="search-bar-1"
              ref={email}
            />
            <SearchIcon className="search-icon" onClick={handleEmailFilter} />
            <input
              type="text"
              placeholder="Search By Name"
              className="search-bar-1"
              ref={fullName}
            />
            <SearchIcon className="search-icon" onClick={handleNameFilter} />
            <input
              type="text"
              placeholder="Search By Employee ID"
              className="search-bar-1"
              ref={employeeID}
            />
            <SearchIcon className="search-icon" onClick={handleIDFilter} />

            <input
              type="text"
              placeholder="Search By Aadhaar Number"
              className="search-bar-1"
              ref={aadhaar}
            />
            <SearchIcon className="search-icon" onClick={handleAadhaarFilter} />
            <input
              type="text"
              placeholder="Search By Phone Number"
              className="search-bar-1"
              ref={phoneNumber}
            />
            <SearchIcon className="search-icon" onClick={handlePhoneFilter} />
            <input
              type="text"
              placeholder="Search By Department"
              className="search-bar-1"
              ref={department}
            />
            <SearchIcon
              className="search-icon"
              onClick={handleDepartmentFilter}
            />
          </div>
          {!found && <p className="no-match">No Match Found</p>}
        </>
      )}
      {requested && (
        <>
          {user.length === undefined && (
            <>
              <div className="profile-container">
                <div className="profile-entries">
                  <p className="profile-detail">
                    <span className="profile-span">Email ID</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Full Name</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Employee ID</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Aadhar Number</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Phone Number</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Permanent Address</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">Department</span>
                  </p>
                </div>
                <div className="profile-values">
                  <p className="profile-detail">
                    <span className="profile-span">{user.email}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.name}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.employeeID}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.aadhaar}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.phoneNumber}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">
                      {user.permanentAddress}
                    </span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{user.department}</span>
                  </p>
                </div>
              </div>
            </>
          )}
          {user &&
            user.length &&
            user.map((user) => (
              <div
                key={generateUniqueId()}
                className="profile-search-container"
              >
                <div className="profile-container-1">
                  <div className="profile-entries">
                    <p className="profile-detail">
                      <span className="profile-span">Email ID</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Full Name</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Employee ID</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Aadhar Number</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Phone Number</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Permanent Address</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">Department</span>
                    </p>
                  </div>
                  <div className="profile-values">
                    <p className="profile-detail">
                      <span className="profile-span">{user.email}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.name}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.employeeID}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.aadhaar}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.phoneNumber}</span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">
                        {user.permanentAddress}
                      </span>
                    </p>
                    <p className="profile-detail">
                      <span className="profile-span">{user.department}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default AdminView;
