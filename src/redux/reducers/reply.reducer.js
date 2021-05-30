import * as types from "../constants/reply.constants";

const initialState = {
  loadingReplies: true,
  //   loadingSingleReply: true,
  replies: [],
  newReply: [],
};

const replyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REPLIES_REQUEST_START:
    case types.NEWREPLY_REQUEST_START:
      state.loadingReplies = true;
      break;

    case types.REPLIES_REQUEST_SUCCESS:
      state.replies = payload;
      state.loadingReplies = false;
      break;

    case types.NEWREPLY_REQUEST_SUCCESS:
      state.newReply.push(payload);
      state.loading = false;
      break;

    // case types.SINGLEREPLY_REQUEST_SUCCESS:
    //   state.singleReply = payload;
    //   state.loadingSingleReply = false;
    //   break;

    case types.REPLIES_REQUEST_FAIL:
    case types.NEWREPLY_REQUEST_FAIL:
      state.loadingReplies = false;
      break;
    default:
      break;
  }
  //   console.log("Request state: ", state);
  return { ...state };
};

export default replyReducer;
