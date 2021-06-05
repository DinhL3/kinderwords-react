import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";
import BackBtn from "../components/BackBtn";

import { motion } from "framer-motion";

const Register = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const [submitStatus, setSubmitStatus] = useState("Create");
  const [disabled, setDisabled] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const object = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(authActions.register(object));
    setDisabled(true);
    setSubmitStatus("Creating...");
  };

  useEffect(() => {
    if (redirectTo) {
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
      <div className="container--flex">
        <BackBtn />
        <h1 className="title">[Kinder Words]</h1>
        <h3 className="subtitle">create your account</h3>
        <form
          className="form--flex form--login"
          autoComplete="off"
          onSubmit={handleRegisterSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            maxLength="15"
            required
            ref={nameInputRef}
            className="default input--change-name mb-0"
          />
          <p className="mb-07">Your name is visible to only you</p>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            required
            ref={emailInputRef}
            className="default"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            ref={passwordInputRef}
            className="default"
          />
          <button className="default btn" type="submit" disabled={disabled}>
            {submitStatus}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
