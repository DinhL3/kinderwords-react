import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AnimatePresence } from "framer-motion";

import ProtectedRoute from "./routes/ProtectedRoute";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import Inbox from "./pages/Inbox";
import CreateReply from "./pages/CreateReply";
import NotFound from "./pages/NotFound";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <Router>
        <AnimatePresence>
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
            <ProtectedRoute path="/user" exact component={User} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
    </div>
  );
}

export default App;
