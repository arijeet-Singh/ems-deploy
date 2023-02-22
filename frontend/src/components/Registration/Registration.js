import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import "./Registration.css";
function Registration() {
  const history = useHistory();
  const email = useRef();
  const fullName = useRef();
  const employeeId = useRef();
  const aadhar = useRef();
  const permanentAddress = useRef();
  const phoneNumber = useRef();
  const department = useRef();

  const [emailValue, setEmailValue] = useState(
    localStorage.getItem("email") || ""
  );

  const [nameValue, setNameValue] = useState(
    localStorage.getItem("name") !== "undefined" &&
      localStorage.getItem("name") !== null
      ? localStorage.getItem("name")
      : ""
  );
  const [eidValue, setEidValue] = useState(
    localStorage.getItem("employeeID") !== "undefined" &&
      localStorage.getItem("employeeID") !== null
      ? localStorage.getItem("employeeID")
      : ""
  );

  const [aadharValue, setAadhaarValue] = useState(
    localStorage.getItem("aadhaar") !== "undefined" &&
      localStorage.getItem("aadhaar") !== null
      ? localStorage.getItem("aadhaar")
      : ""
  );
  const [phoneValue, setPhoneValue] = useState(
    localStorage.getItem("phoneNumber") !== "undefined" &&
      localStorage.getItem("phoneNumber") !== null
      ? localStorage.getItem("phoneNumber")
      : ""
  );
  const [permanentValue, setPermanentValue] = useState(
    localStorage.getItem("permanentAddress") !== "undefined" &&
      localStorage.getItem("permanentAddress") !== null
      ? localStorage.getItem("permanentAddress")
      : ""
  );
  const [departmentValue, setDepartmentValue] = useState(
    localStorage.getItem("department") !== "undefined" &&
      localStorage.getItem("department") !== null
      ? localStorage.getItem("department")
      : ""
  );
  const [characters, setCharacters] = useState(
    localStorage.getItem("permanentAddress") !== "undefined" &&
      localStorage.getItem("permanentAddress") !== null
      ? localStorage.getItem("permanentAddress").length
      : 0
  );

  const [btnText, setBtnText] = useState("Update Profile");

  const handleRegister = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredName = fullName.current.value;
    const enteredEmployeeID = employeeId.current.value;
    const enteredAadhar = aadhar.current.value;
    const enteredPermanentAddress = permanentAddress.current.value;
    const enteredPhoneNumber = phoneNumber.current.value;
    const enteredDepartment = department.current.value;

    let emailFlag, eidFlag, aadhaarFlag, permanentAddressFlag, phoneFlag;

    // EMAIL ID VERIFICATION

    let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!pattern.test(enteredEmail)) {
      alert("Invalid Email ID");
    } else {
      emailFlag = 1;
    }

    // EMPLOYEE ID VERIFICATION
    if (enteredEmployeeID.length !== 6) {
      alert("Employee ID is 6 Characters Long");
    } else {
      eidFlag = 1;
    }

    //AADHAAR VERIFICATION
    let regexp = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!regexp.test(enteredAadhar)) {
      alert("Invalid Aadhaar Number");
    } else {
      aadhaarFlag = 1;
    }

    //PERMANENT ADDRESS VALIDATION
    if (enteredPermanentAddress.length < 30) {
      permanentAddressFlag = 1;
    } else {
      alert("Only 30 Characters Allowed");
    }

    // PHONE NUMBER VERIFICATION
    if (enteredPhoneNumber.length === 10) {
      phoneFlag = 1;
    } else {
      alert("Enter valid Phone Number");
    }

    if (
      emailFlag &&
      eidFlag &&
      aadhaarFlag &&
      phoneFlag &&
      permanentAddressFlag
    ) {
      const body = {
        email: enteredEmail,
        name: enteredName,
        employeeID: enteredEmployeeID,
        aadhaar: enteredAadhar,
        permanentAddress: enteredPermanentAddress,
        phoneNumber: enteredPhoneNumber,
        department: enteredDepartment,
      };
      try {
        const res = await axios.put(
          `/api/employee/registration/${enteredEmail}`,
          body
        );
        if (res.status === 200) {
          setBtnText("Done!");
          localStorage.clear();
        }
      } catch (err) {
        alert(err.response.data);
      }
    }
  };
  const goBack = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push(`/adminsview`);
  };
  return (
    <>
      <KeyboardBackspaceIcon
        className="back"
        onClick={goBack}
        sx={{ color: "white" }}
      />
      <div className="registration-form-container">
        <form className="registration-form">
          <article className="email-name-article">
            <input
              className="form-input"
              type="email"
              placeholder="Email ID"
              ref={email}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <input
              className="form-input"
              type="text"
              placeholder="Full Name"
              ref={fullName}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              required
            />
          </article>
          <input
            className="form-input"
            type="text"
            placeholder="Employee ID (6 Alphanumeric Characters)"
            ref={employeeId}
            value={eidValue}
            onChange={(e) => setEidValue(e.target.value)}
            required
          />
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="12-Digit Aadhar Number (Without Spaces)"
            ref={aadhar}
            value={aadharValue}
            onChange={(e) => setAadhaarValue(e.target.value)}
            required
          />
          <br />

          <input
            className="form-input"
            type="text"
            placeholder="Permanent Address (Max 30 Characters)"
            ref={permanentAddress}
            value={permanentValue}
            onChange={(e) => {
              setCharacters(e.target.value.length);
              setPermanentValue(e.target.value);
            }}
            required
          />
          <div className="characters">{characters}/30</div>
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="Phone Number (Without Country Code)"
            ref={phoneNumber}
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            required
          />
          <br />

          <input
            className="form-input"
            type="text"
            placeholder="Department"
            ref={department}
            value={departmentValue}
            onChange={(e) => setDepartmentValue(e.target.value)}
            required
          />
          <br />
          <button onClick={handleRegister} className="registration-button">
            {btnText}
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;