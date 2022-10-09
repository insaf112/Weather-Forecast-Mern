import React from "react";
import "./DetailBox.css";
const DetailBox = (props) => {
  return (
    <div className="detail">
      <p className="detail-title">{props.title}</p>
      <i className={props.icon}></i>
      <p className="detail-desc">{props.description}</p>
    </div>
  );
};

export default DetailBox;
