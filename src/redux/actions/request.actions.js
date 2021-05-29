// import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import * as types from "../constants/request.constants";
import { routeActions } from "./route.actions";

const getRequests = () => async (dispatch) => {
  try {
    dispatch({ type: types.REQUESTS_REQUEST_START, payload: null });
    const res = await api.get(`/requests`);
    // console.log("Request fetched: ", res.data.data);
    dispatch({
      type: types.REQUESTS_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.REQUESTS_REQUEST_FAIL, payload: null });
    console.log("Error getting requests", err.message);
  }
};

const newRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.NEWREQUEST_REQUEST_START, payload: null });
    await api.post(`/requests`, data);
    // console.log("New request posted: ", res.data);
    dispatch(routeActions.redirect("/"));
    dispatch({
      type: types.NEWREQUEST_REQUEST_SUCCESS,
      payload: null,
    });
  } catch (err) {
    dispatch({ type: types.NEWREQUEST_REQUEST_FAIL, payload: null });
    console.log("Error posting new request", err.message);
  }
};

export const requestActions = {
  getRequests,
  newRequest,
};
