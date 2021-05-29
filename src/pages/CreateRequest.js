/* eslint-disable no-undef */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { requestActions } from "../redux/actions/request.actions";
import { routeActions } from "../redux/actions/route.actions";

import BackBtn from "../components/BackBtn";

import { motion } from "framer-motion";

const CreateRequest = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const contentInputRef = useRef();

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const content = contentInputRef.current.value;

    const object = {
      content: content,
    };
    dispatch(requestActions.newRequest(object));
    e.target.reset();
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
      <div className="container">
        <BackBtn />
        <div className="container--flex">
          <form
            className="form--flex form--request"
            onSubmit={handleRequestSubmit}
          >
            <div className="default my-request">
              <p>What are you worried about?</p>
              <p>Maybe someone else is too.</p>
            </div>
            <div
              className="form__square"
              style={{
                background: `url(${process.env.PUBLIC_URL + "/request.png"})`,
              }}
            >
              <textarea
                type="text"
                className="form__input form__input--request"
                id="content"
                name="content"
                required
                maxLength="180"
                placeholder="Enter text..."
                ref={contentInputRef}
              />
            </div>
            <p className="form__signature">- {user.name[0]}</p>
            <button className="default btn" type="submit">
              <span className="material-icons">send</span>Send
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateRequest;
