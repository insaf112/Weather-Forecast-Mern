import React, { useContext } from "react";
import "./Favourites.css";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FavouriteContext } from "../../context/FavouriteContext";
import { DataContext } from "../../context/DataContext";

const DeleteFavourite = ({ city }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(FavouriteContext);
  const { setCityName } = useContext(DataContext);

  const round = (data) => Math.round(data);
  console.log(city.precipitation);
  const getForecast = () => {
    setCityName(city.city);
    navigate("/");
  };

  // DELETE Favourites

  const deleteFavourite = async () => {
    let response = await fetch(`/favourites/delete/${city._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      dispatch({ type: "DELETE_FAVOURITE", payload: data });
      let getLocalCities = JSON.parse(localStorage.getItem("Cities"));
      if (getLocalCities) {
        let newLocalCities = getLocalCities.filter(
          (city) => city !== data.city
        );
        console.log(getLocalCities, newLocalCities);
        localStorage.setItem("Cities", JSON.stringify(newLocalCities));
      }
    }
  };

  return (
    <div className="city-item">
      <div className="top-portion">
        <h3 className="title">
          {city.city}, {city.state && `${city.state},`} {city.country}
        </h3>
        <span className="delete" onClick={deleteFavourite}>
          <BiTrashAlt />
        </span>
      </div>
      <div className="weather-data" onClick={getForecast}>
        <div className="details">
          <p className="current-temp1">{city.temp}</p>
          <p className="desc">{city.description}</p>
        </div>
        <div className="high-low">
          <p className="high-temp">
            {round(city.high)}&deg;
            <i className="wi wi-direction-up"></i>
          </p>
          <p className="low-temp">
            {round(city.low)}&deg;
            <i className="wi wi-direction-down"></i>
          </p>
        </div>
        <div className="rain-wind">
          <p className="precipitation">
            <i className="wi wi-umbrella"></i>
            {city.precipitation}%
          </p>
          <p className="wind">
            <i className="wi wi-wind-direction"></i>
            {city.wind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteFavourite;
