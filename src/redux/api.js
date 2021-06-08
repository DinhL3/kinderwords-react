/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
// import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_HEROKU_APP_NAME}.herokuapp.com/`,
  // baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    // let errorMsg = error.message || "";
    if (error.errors && error.errors.message)
      //   errorMsg = errorMsg + ": " + error.errors.message;
      // store.dispatch(alertActions.setAlert(errorMsg, "danger"));
      // toast.error(errorMsg);
      return Promise.reject(error);
  }
);

export default api;
