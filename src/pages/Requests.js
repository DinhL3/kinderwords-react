/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { requestActions } from "../redux/actions/request.actions";
import BackBtnHome from "../components/BackBtnHome";
import BeatLoader from "react-spinners/BeatLoader";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion } from "framer-motion";

const Requests = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const requests = useSelector((state) => state.request.requests);
  const loadingRequests = useSelector((state) => state.request.loadingRequests);

  useEffect(() => {
    dispatch(requestActions.getRequests());
  }, []);

  // const handleReplyClick = (id) => {
  //   history.push(`create_reply/${id}`);
  // };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        <BackBtnHome />
        {loadingRequests ? (
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
            <div className="slider-container">
              <Slider ref={sliderRef} {...settings}>
                {requests.map((request) => (
                  <div className="slide" key={request._id}>
                    <div className="letter-container">
                      <img
                        className="request-bg"
                        src={`${process.env.PUBLIC_URL}/request.jpg`}
                      />
                      <div className="letter-content">
                        <p>{request.content}</p>
                        <br />
                        <p className="signature">- {request.user.name[0]}</p>
                      </div>

                      <div className="letter-btn-bar">
                        <button className="default btn" onClick={goPrevious}>
                          <span className="material-icons">arrow_left</span>
                        </button>
                        <button
                          className="default btn btn--reply"
                          onClick={() =>
                            history.push(`create_reply/${request._id}`)
                          }
                        >
                          <span className="material-icons">reply</span>Reply
                        </button>
                        <button className="default btn" onClick={goNext}>
                          <span className="material-icons">arrow_right</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Requests;
