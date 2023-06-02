import React from "react";
import "./Spinner.css";

const Spinner = () => {
  // Return the JSX element
  return (
    <div className="spinner">
      {/* Use a div element with a class name of loader to create a spinning circle */}
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
