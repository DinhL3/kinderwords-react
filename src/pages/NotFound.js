import React from "react";
import { useHistory } from "react-router";

import { motion } from "framer-motion";

const NotFound = () => {
  const history = useHistory();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
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
    </motion.div>
  );
};

export default NotFound;
