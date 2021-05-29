/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";

import BackBtn from "../components/BackBtn";

import { motion } from "framer-motion";

const CreateReply = () => {
  const user = useSelector((state) => state.user.user);

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
          <form className="form--flex form--request">
            <div className="default my-request">
              <p>Replying to request:</p>
              <p>Maybe someone else is too.</p>
              <p> -S</p>
            </div>
            <div
              className="form__square"
              style={{
                background: `url(${process.env.PUBLIC_URL + "/reply.png"})`,
              }}
            >
              <textarea
                type="text"
                className="form__input form__input--request"
                required
                maxLength="180"
                placeholder="Enter text..."
              />
            </div>
            <p className="form__signature">- {user.name[0]}</p>
            <button className="default btn">
              <span className="material-icons">send</span>Send
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateReply;
