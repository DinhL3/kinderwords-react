import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userActions } from "../redux/actions/user.actions";
import api from "../redux/api";
import { toast } from "react-toastify";

import BeatLoader from "react-spinners/BeatLoader";
import useCollapse from "react-collapsed";

import { motion } from "framer-motion";

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const loadingUser = useSelector((state) => state.user.loadingUser);

  const [renderChildren, setRenderChildren] = useState(false);
  const { getToggleProps, getCollapseProps } = useCollapse({
    defaultExpanded: false,
    onExpandStart() {
      setRenderChildren(true);
    },
    onCollapseEnd() {
      setRenderChildren(false);
    },
  });

  const handleLogOut = () => {
    localStorage.clear();
    delete api.defaults.headers.common["authorization"];
    history.push("/");
    toast.error("You are logged out.");
  };

  const handleViewRequestsClick = () => history.push("/requests");
  const handleCreateRequestClick = () => history.push("/create_request");
  const handleInboxClick = () => history.push("/inbox");
  const handlePencilClick = () => history.push("/user");

  useEffect(() => {
    dispatch(userActions.getMyProfile());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        {loadingUser ? (
          <div className="container--flex">
            <BeatLoader color={"white"} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container--flex">
              <span className="page-header">
                Welcome, {user.name}{" "}
                <span
                  className="material-icons link__header"
                  onClick={handlePencilClick}
                >
                  edit
                </span>
              </span>

              <button
                className="default btn btn--menu"
                onClick={handleViewRequestsClick}
              >
                <span className="material-icons">search</span>View Requests
              </button>
              <button
                className="default btn btn--menu"
                onClick={handleCreateRequestClick}
              >
                <span className="material-icons">history_edu</span>
                Create Request
              </button>
              <button
                className="default btn btn--menu"
                onClick={handleInboxClick}
              >
                <span className="material-icons">mail</span>
                Inbox
              </button>
              <button
                className="default btn btn--menu btn--settings"
                {...getToggleProps()}
              >
                <span className="material-icons">settings</span>
                Settings
              </button>
              <div {...getCollapseProps()}>
                {renderChildren && (
                  <div className="menu-expand" onClick={handleLogOut}>
                    <button className="default btn btn--menu">
                      <span className="material-icons">logout</span>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Homepage;
