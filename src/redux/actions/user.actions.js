import * as types from "../constants/user.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REQUEST_START, payload: null });
    const res = await api.get("/users/me");
    dispatch({
      type: types.USER_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.USER_REQUEST_FAIL, payload: null });
    console.log("Error from getMyProfile: ", err.message);
  }
};

const updateMyProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REQUEST_START, payload: null });
    const res = await api.put("/users/me", data);
    dispatch(routeActions.redirect("/"));

    dispatch({
      type: types.USER_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("Your name has been changed!");
  } catch (err) {
    dispatch({ type: types.USER_REQUEST_FAIL, payload: null });
    console.log("Error updating my profile: ", err.message);
  }
};

export const userActions = { getMyProfile, updateMyProfile };
