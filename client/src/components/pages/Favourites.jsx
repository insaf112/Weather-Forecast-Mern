import React, { useEffect, useContext } from "react";
import "./Favourites.css";
import "../MainContent/MergeStyles.css";
import UpdateDeleteFav from "../MainContent/Forecast/UpdateDeleteFav";
import BackgroundImage from "../DryComponents/BackGroundImage";
import { useNavigate } from "react-router-dom";
import { FavouriteContext } from "../../context/FavouriteContext";
import { AuthContext } from "../../context/AuthContext";

const Favourites = () => {
  const { favourites, dispatch } = useContext(FavouriteContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const pageAccess = async () => {
      const response = await fetch("/api/favourites", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
      });
      let data = await response.json();
      if (response.status === 200) {
        dispatch({ type: "GET_FAVOURITE", payload: data });
      } else {
        console.log("You are not allowed to access this page");
        navigate("/login");
      }
    };

    pageAccess();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundPosition: BackgroundImage().position,
          backgroundSize: BackgroundImage().size,
        }}
        className="favourites default-styles sidebar-open"
      >
        <div className="dark-transparent">
          <div className="city-wrapper">
            <h1>Favourites</h1>
            <div className="city-container">
              {favourites &&
                favourites.map((city) => (
                  <UpdateDeleteFav key={city._id} city={city} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
