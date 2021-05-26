import * as types from "../constants/user.constants";
import api from "../api";
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
    console.log("Error from getMyProfile", err.message);
  }
};

export const userActions = { getMyProfile };
