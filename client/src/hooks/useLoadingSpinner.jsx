import React from "react";
import Snow from "../../src/assets/SnowSpinner.gif";
import Search from "../../src/assets/Search.gif";
import "./HookStyles.css";
const useLoadingSpinner = () => {
  const SnowSpinner = () => {
    return (
      <div className="snow-spinner">
        <img src={Snow} alt="" />
      </div>
    );
  };

  const SearchSpinner = () => {
    return (
      <div className="search-spinner">
        <img src={Search} alt="" />
      </div>
    );
  };

  const CodedSpinner = () => {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  };
  return { SnowSpinner, SearchSpinner, CodedSpinner };
};

export default useLoadingSpinner;
