import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoute";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import Inbox from "./pages/Inbox";
import CreateReply from "./pages/CreateReply";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute path="/requests" exact component={Requests} />
          <ProtectedRoute
            path="/create_request"
            exact
            component={CreateRequest}
          />
          <ProtectedRoute path="/inbox" exact component={Inbox} />
          <ProtectedRoute
            path="/create_reply/:id"
            exact
            component={CreateReply}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
