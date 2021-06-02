/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { requestActions } from "../redux/actions/request.actions";
import { userActions } from "../redux/actions/user.actions";
import { replyActions } from "../redux/actions/reply.actions";
import { routeActions } from "../redux/actions/route.actions";

import BackBtn from "../components/BackBtn";
import BeatLoader from "react-spinners/BeatLoader";

import { motion } from "framer-motion";

const CreateReply = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const user = useSelector((state) => state.user.user);
  const loadingUser = useSelector((state) => state.user.loadingUser);
  const singleRequest = useSelector((state) => state.request.singleRequest);
  const loadingSingleRequest = useSelector(
    (state) => state.request.loadingSingleRequest
  );
  const { id } = useParams();

  const contentInputRef = useRef();

  const [submitStatus, setSubmitStatus] = useState("Send");
  const [disabled, setDisabled] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const content = contentInputRef.current.value;

    const object = {
      content: content,
    };
    dispatch(replyActions.newReply(id, object));
    setDisabled("true");
    setSubmitStatus("Sending...");
  };

  useEffect(() => {
    dispatch(requestActions.getSingleRequest(id));
    dispatch(userActions.getMyProfile());
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
        {loadingSingleRequest || loadingUser ? (
          <div className="container--flex">
            <BeatLoader color={"white"} className="spinner" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container--flex">
              <form
                className="form--flex form--request"
                onSubmit={handleReplySubmit}
              >
                <div className="default my-request">
                  <p>Replying to request:</p>
                  <p>{singleRequest.content}</p>
                  <p className="uppercase">- {singleRequest.user.name[0]}</p>
                </div>
                <div
                  className="form__square"
                  style={{
                    background: `url(${process.env.PUBLIC_URL + "/reply.jpg"})`,
                  }}
                >
                  <textarea
                    type="text"
                    className="form__input form__input--reply"
                    required
                    maxLength="180"
                    placeholder="Enter text..."
                    ref={contentInputRef}
                  />
                </div>
                <p className="form__signature blue">- {user.name[0]}</p>
                <button
                  className="default btn"
                  type="submit"
                  disabled={disabled}
                >
                  <span className="material-icons">send</span>
                  {submitStatus}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateReply;
