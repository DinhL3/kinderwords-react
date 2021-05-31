import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userActions } from "../redux/actions/user.actions";
import { routeActions } from "../redux/actions/route.actions";

import BackBtn from "../components/BackBtn";

import BeatLoader from "react-spinners/BeatLoader";
import { motion } from "framer-motion";

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const user = useSelector((state) => state.user.user);
  const loadingUser = useSelector((state) => state.user.loadingUser);

  const nameInputRef = useRef();

  const handleUpdateProfileSubmit = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const object = {
      name: name,
    };
    dispatch(userActions.updateMyProfile(object));
    e.target.reset();
  };

  useEffect(() => {
    dispatch(userActions.getMyProfile());
    if (redirectTo) {
      // console.log(redirectTo);
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        <BackBtn />
        {loadingUser ? (
          <div className="container--flex">
            <BeatLoader color={"white"} />
          </div>
        ) : (
          <div className="container--flex">
            <h2 className="form__heading">Change your name, {user.name}?</h2>
            <form
              className="form--flex form--login form--change-name"
              autoComplete="off"
              onSubmit={handleUpdateProfileSubmit}
            >
              <input
                type="text"
                placeholder="Enter new name here"
                id="name"
                name="name"
                maxLength="15"
                required
                ref={nameInputRef}
                className="default"
              />
              <button className="default btn" type="submit">
                OK
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default User;
