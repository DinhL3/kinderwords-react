import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";

import { motion } from "framer-motion";
// import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const [submitStatus, setSubmitStatus] = useState("Log In");
  const [disabled, setDisabled] = useState(false);

  const handleRegisterClick = () => {
    history.push(`/register`);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const object = {
      email: email,
      password: password,
    };
    // console.log(object);

    dispatch(authActions.login(object));
    setDisabled(true);
    setSubmitStatus("Logging in...");
  };

  // const loginWithFacebook = (res) => {
  //   console.log("resss", res);
  //   dispatch(authActions.loginFacebookRequest(res));
  // };

  const loginWithGoogle = (res) => {
    dispatch(authActions.loginGoogleRequest(res));
  };

  useEffect(() => {
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
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container--flex">
        <h1 className="title">[Kinder Words]</h1>
        <h3 className="subtitle">write nice letters to real people</h3>
        <form
          className="form--flex form--login  mb-07"
          // autoComplete="off"
          onSubmit={handleLoginSubmit}
        >
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
        <span className="mb-07">
          Don&apos;t have an account?{" "}
          <span className="default link p-0" onClick={handleRegisterClick}>
            Register
          </span>
        </span>
        {/* <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name,email"
          callback={loginWithFacebook}
          cssClass="default btn"
          icon="fa-facebook"
        /> */}
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={loginWithGoogle}
          onFailure={(error) => {
            console.log("Google login error: ", error);
          }}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="default btn--simple"
            >
              Login with Google
            </button>
          )}
        />
      </div>
    </motion.div>
  );
};

export default Login;
