import * as types from "../constants/request.constants";

const initialState = {
  loadingRequests: true,
  loadingSingleRequest: true,
  requests: [],
  newRequest: [],
  newSingleRequest: {},
  newReply: {},
};

const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REQUESTS_REQUEST_START:
    case types.NEWREQUEST_REQUEST_START:
    case types.SINGLEREQUEST_REQUEST_START:
      state.loadingRequests = true;
      break;

    case types.REQUESTS_REQUEST_SUCCESS:
      state.requests = payload;
      state.loadingRequests = false;
      break;

    case types.NEWREQUEST_REQUEST_SUCCESS:
      state.newRequest.push(payload);
      state.loading = false;
      break;

    case types.SINGLEREQUEST_REQUEST_SUCCESS:
      state.singleRequest = payload;
      state.loadingSingleRequest = false;
      break;

    case types.REQUESTS_REQUEST_FAIL:
    case types.NEWREQUEST_REQUEST_FAIL:
      state.loadingRequests = false;
      break;
    default:
      break;
  }
  //   console.log("Request state: ", state);
  return { ...state };
};

export default requestReducer;
