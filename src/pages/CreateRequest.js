import React from "react";
import { useSelector } from "react-redux";

import BackBtn from "../components/BackBtn";

const CreateRequest = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="container">
      <BackBtn />
      <div className="container--flex">
        <form className="form--flex form--request">
          <div className="default my-request">
            <p>What are you worried about?</p>
            <p>Maybe someone else is too.</p>
          </div>
          <div
            className="form__square"
            style={{
              background: "url(request.png)",
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
  );
};

export default CreateRequest;
