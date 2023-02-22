import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    alert(err.response.data);
  }
};

export const logInAdmin = async (adminCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/api/auth/login", adminCredential);
    dispatch({ type: "LOGIN_ADMIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    alert(err.response.data);
  }
};

export const logOutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
