import React from "react";
import { useHistory } from "react-router-dom";

const BackBtn = () => {
  const history = useHistory();

  return (
    <div>
      <button className="default btn link btn--back" onClick={history.goBack}>
        <span className="material-icons">arrow_back</span>Go Back
      </button>
    </div>
  );
};

export default BackBtn;
