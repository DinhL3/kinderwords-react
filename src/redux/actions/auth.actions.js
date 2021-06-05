import { routeActions } from "./route.actions";
import api from "../api";
import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST_START, payload: null });
    const res = await api.post("auth/login", data);
    localStorage.setItem("accessToken", res.data.data.token);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    // console.log(res);
    dispatch({
      type: types.LOGIN_REQUEST_SUCCESS,
      payload: res.data.data.token,
    });
    toast.success("Logged in!");
  } catch (error) {
    dispatch({ type: types.LOGIN_REQUEST_FAIL, payload: null });
    console.log(error.message);
    toast.error("Wrong email or password. Please try again.");
  }
};

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST_START, payload: null });
    const res = await api.post("/users", data);
    console.log(res.data);

    dispatch(routeActions.redirect("/login"));

    dispatch({ type: types.REGISTER_REQUEST_SUCCESS, payload: null });
    toast.success("Account created! Please log in.");
  } catch (err) {
    dispatch({ type: types.REGISTER_REQUEST_FAIL, payload: null });
    console.log("REGISTER ERROR: ", err.message);
  }
};

const loginFacebookRequest = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_FACEBOOK_START, payload: null });
    const res = await api.post("auth/login/facebook", { access_token });
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    api.defaults.headers["authorization"] =
      "Bearer " + res.data.data.accessToken;
    // console.log(res);
    toast.success("Logged in with Facebook!");
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAIL, payload: null });
    console.log(error.message);
    toast.error("Login with Facebook failed. Please try again.");
  }
};

export const authActions = { login, register, loginFacebookRequest };
