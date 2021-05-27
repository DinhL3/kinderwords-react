import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
import { replyActions } from "../redux/actions/reply.actions";
import BackBtn from "../components/BackBtn";
import BeatLoader from "react-spinners/BeatLoader";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Inbox = () => {
  const dispatch = useDispatch();
  const replies = useSelector((state) => state.reply.replies);
  const loadingReplies = useSelector((state) => state.reply.loadingReplies);

  useEffect(() => {
    dispatch(replyActions.getInbox());
  }, []);

  const sliderRef = useRef();
  const goPrevious = () => {
    sliderRef.current.slickPrev();
  };
  const goNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="requests-page">
      <BackBtn />
      {loadingReplies ? (
        <BeatLoader color={"white"} />
      ) : (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {replies.map((reply) => (
              <div className="slide" key={reply._id}>
                <div className="default my-request">
                  <p>Your Request:</p>
                  <p>{reply.request.content}</p>
                </div>
                <div className="letter-container">
                  <img className="request-bg" src="reply.png" />
                  <div className="letter-content reply">
                    <p>{reply.content}</p>
                    <p className="signature">- {reply.user.name[0]}</p>
                  </div>

                  <div className="letter-btn-bar">
                    <button className="default btn">
                      <span className="material-icons" onClick={goPrevious}>
                        arrow_left
                      </span>
                    </button>
                    <button className="default btn">
                      <span className="material-icons" onClick={goNext}>
                        arrow_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Inbox;
