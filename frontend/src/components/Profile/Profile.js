import React from "react";
import { useState, useEffect, useRef } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";
import axios from "axios";

function Profile({ email }) {
  const { admin } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [primary, setPrimary] = useState({});
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const emailID = params.email || email;

  const [found, setFound] = useState(true);
  const [wantsToSearch, setWantsToSearch] = useState(false);
  const [, setRequested] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const emailId = useRef();
  const fullName = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/employee/${emailID}`);
        setPrimary(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [emailID]);

  const handleEmailFilter = async (e) => {
    e.preventDefault();
    const enteredEmail = emailId.current.value;
    try {
      const res = await axios.get(`/api/employee/search/email/${enteredEmail}`);
      if (res.data !== null) {
        setFound(true);
        setUser(res.data);
        setWantsToSearch(false);
        setRequested(true);
        setShowMyProfile(false);
        setShowSearch(true);
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
        setUser(res.data[0]);
        setWantsToSearch(false);
        setRequested(true);
        setShowMyProfile(false);
        setShowSearch(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const wantsToUpdate = (e) => {
    e.preventDefault();
    localStorage.clear();
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.name);
    localStorage.setItem("employeeID", user.employeeID);
    localStorage.setItem("aadhaar", user.aadhaar);
    localStorage.setItem("phoneNumber", user.phoneNumber);
    localStorage.setItem("permanentAddress", user.permanentAddress);
    localStorage.setItem("department", user.department);
    setUpdate(true);
  };

  const handleSearch = () => {
    setWantsToSearch(!wantsToSearch);
    setRequested(false);
    setShowSearch(false);
    setShowMyProfile(true);
  };

  const handleBack2 = () => {
    setWantsToSearch(!wantsToSearch);
    setShowSearch(false);
    setShowMyProfile(true);
  };

  return (
    <>
      {!admin && (
        <button onClick={handleSearch} className="logout-btn">
          {!wantsToSearch ? (
            "Search"
          ) : (
            <KeyboardBackspaceIcon onClick={handleBack2} />
          )}
        </button>
      )}
      {wantsToSearch && (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search By Email ID"
              className="search-bar-1"
              ref={emailId}
            />
            <SearchIcon className="search-icon" onClick={handleEmailFilter} />
            <input
              type="text"
              placeholder="Search By Name"
              className="search-bar-1"
              ref={fullName}
            />
            <SearchIcon className="search-icon" onClick={handleNameFilter} />
          </div>
          {!found && <p className="no-match">No Match Found</p>}
        </>
      )}
      {showMyProfile && (
        <>
          {!update ? (
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
                    <span className="profile-span">{primary.email}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{primary.name}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{primary.employeeID}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{primary.aadhaar}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{primary.phoneNumber}</span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">
                      {primary.permanentAddress}
                    </span>
                  </p>
                  <p className="profile-detail">
                    <span className="profile-span">{primary.department}</span>
                  </p>
                </div>
              </div>
              <button
                className="logout-btn"
                onClick={wantsToUpdate}
                disabled={!admin}
              >
                {!admin ? "" : "Update Profile"}
              </button>
            </>
          ) : (
            <>
              <Redirect to="/employeeRegistration" />
            </>
          )}
        </>
      )}
      {showSearch && (
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
                <span className="profile-span">{user.permanentAddress}</span>
              </p>
              <p className="profile-detail">
                <span className="profile-span">{user.department}</span>
              </p>
            </div>
          </div>
          <button
            className="logout-btn"
            onClick={wantsToUpdate}
            disabled={!admin}
          >
            {!admin ? "" : "Update Profile"}
          </button>
        </>
      )}
    </>
  );
}

export default Profile;