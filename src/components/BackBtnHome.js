import React from "react";
import { useHistory } from "react-router-dom";

const BackBtnHome = () => {
  const history = useHistory();

  return (
    <div>
      <button
        className="default btn link btn--back"
        onClick={() => history.push("/")}
      >
        <span className="material-icons">arrow_back</span>Go back Home
      </button>
    </div>
  );
};

export default BackBtnHome;
