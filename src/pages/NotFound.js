import React from "react";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="container--flex">
      <div className="opacity">
        <p className="general-scaling-text">Page not found</p>
        <p className="general-scaling-text">Are you lost?</p>
        <p className="general-scaling-text">ヾ(´･ ･｀｡)ノ”</p>
      </div>
      <button className="default btn mt-1" onClick={() => history.push("/")}>
        <span className="material-icons">home</span>
        Go back Home
      </button>
    </div>
  );
};

export default NotFound;
