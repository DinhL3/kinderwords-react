import api from "../api";
import * as types from "../constants/reply.constants";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getInbox = () => async (dispatch) => {
  try {
    dispatch({ type: types.REPLIES_REQUEST_START, payload: null });
    const res = await api.get(`/replies/my_inbox`);
    // console.log("Replies fetched: ", res.data.data);
    dispatch({
      type: types.REPLIES_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: types.REPLIES_REQUEST_FAIL, payload: null });
    console.log("Error getting replies", err.message);
  }
};

const newReply = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.NEWREPLY_REQUEST_START, payload: null });
    await api.post(`/replies/requests/${id}`, data);
    // console.log("New request posted: ", res.data);
    dispatch(routeActions.redirect("/requests"));
    dispatch({
      type: types.NEWREPLY_REQUEST_SUCCESS,
      payload: null,
    });
    toast.success("Your reply is sent. Thank you!");
  } catch (err) {
    dispatch({ type: types.NEWREPLY_REQUEST_FAIL, payload: null });
    console.log("Error posting reply", err.message);
  }
};

export const replyActions = {
  getInbox,
  newReply,
};
