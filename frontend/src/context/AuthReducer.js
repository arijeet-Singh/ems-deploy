const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin: null,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        admin: null,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        admin: null,
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGIN_ADMIN_SUCCESS":
      return {
        admin: action.payload,
        user: null,
        isFetching: false,
        error: false,
      };
    case "LOGOUT":
      return {
        admin: null,
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
