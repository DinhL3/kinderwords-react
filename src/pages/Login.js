import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

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
    e.target.reset();
  };

  useEffect(() => {
    if (redirectTo) {
      // console.log(redirectTo);
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div className="container--flex">
      <h1 className="title">[Kinder Words]</h1>
      <h3 className="subtitle">write nice letters to real people</h3>
      <form
        className="form--flex form--login"
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
        <button className="default btn" type="submit">
          Log In
        </button>
        <span>
          Don&apos;t have an account?{" "}
          <span className="default btn link" onClick={handleRegisterClick}>
            Register
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
