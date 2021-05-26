import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";
import BackBtn from "../components/BackBtn";

const Register = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);
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
    e.target.reset();
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div className="container">
      <BackBtn />
      <h1 className="title">[Kinder Words]</h1>
      <h3 className="subtitle">create your account</h3>
      <form
        className="form"
        // autoComplete="off"
        onSubmit={handleRegisterSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          required
          ref={nameInputRef}
          className="default"
        />
        <input
          type="text"
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
