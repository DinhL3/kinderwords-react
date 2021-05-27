import api from "../api";
import * as types from "../constants/reply.constants";
// import { routeActions } from "./route.action";

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

export const replyActions = {
  getInbox,
};
