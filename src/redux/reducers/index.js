import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import requestReducer from "./request.reducer";
import replyReducer from "./reply.reducer";

export default combineReducers({
  auth: authReducer,
  route: routeReducer,
  user: userReducer,
  request: requestReducer,
  reply: replyReducer,
});
