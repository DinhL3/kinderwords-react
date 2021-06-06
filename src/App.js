import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AnimatePresence } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";
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
  const [muted, setMuted] = useState(true);
  const [songNumber, setSongNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [muteIcon, setMuteIcon] = useState("volume_off");

  const handleToggleMute = () => {
    if (muted) {
      setMuted(false);
      setMuteIcon("volume_up");
    } else {
      setMuted(true);
      setMuteIcon("volume_off");
    }
  };

  const randomNumber = () => Math.floor(Math.random() * 5);

  const handleNextSong = () => {
    setSongNumber(randomNumber());
  };

  useEffect(() => {
    setSongNumber(randomNumber());
  }, []);

  return (
    <div className="App">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div className="container">
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
        <ReactAudioPlayer
          src={`${process.env.PUBLIC_URL}/${songNumber}.mp3`}
          autoPlay
          controls={false}
          loop={true}
          muted={muted}
          volume={0.7}
        />
        <div className="music-player">
          <button
            className="default btn--simple mr-05"
            onClick={handleToggleMute}
          >
            <span className="material-icons m-0">{muteIcon}</span>
          </button>
          <button className="default btn--simple" onClick={handleNextSong}>
            <span className="material-icons m-0">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
