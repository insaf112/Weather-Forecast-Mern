import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./NotFound.css";
const NotFound = () => {
  toast.error("Check Your Spellings");
  return (
    <>
      <div className="not-found sidebar-open default-styles">
        <div className="container-404">
          <h1>404 / Not Found!!!</h1>
          <p>THE PAGE OR CONTENT DOESN'T EXIST OR UNAVAILABLE!</p>
          <Link to={"/"}>
            <button>Go Back To Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
