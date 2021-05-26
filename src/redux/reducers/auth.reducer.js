const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      console.log("payload", payload);
      return { ...state, user: payload };
    case "LOGIN_FAIL":
      console.log("payload", payload);
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: payload,
        loading: false,
      };

    default:
      return state; // if you dont have it, you will get the undefined error when using useSelector
  }
};

export default authReducer;
