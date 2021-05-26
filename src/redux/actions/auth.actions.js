import { routeActions } from "./route.actions";
import api from "../api";
import * as types from "../constants/auth.constants";

const {
  REGISTER_REQUEST_START,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAIL,
  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
} = types;

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST_START, payload: null });
    const res = await api.post("auth/login", data);
    localStorage.setItem("accessToken", res.data.data.token);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    // console.log(res);
    dispatch({
      type: LOGIN_REQUEST_SUCCESS,
      payload: res.data.data.token,
    });
  } catch (error) {
    dispatch({ type: LOGIN_REQUEST_FAIL, payload: null });
    console.log(error.message);
  }
};

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST_START, payload: null });
    const res = await api.post("/users", data);
    console.log(res.data);

    dispatch(routeActions.redirect("/login"));

    dispatch({ type: REGISTER_REQUEST_SUCCESS, payload: null });
  } catch (err) {
    dispatch({ type: REGISTER_REQUEST_FAIL, payload: null });
    console.log("REGISTER ERROR: ", err.message);
  }
};

export const authActions = { login, register };
