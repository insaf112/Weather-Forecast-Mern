import React, { useContext } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import { IoRefresh } from "react-icons/io5";
// import useFavourites from "../../hooks/useFavourites";
import TemperatureType from "../../../hooks/TemperatureType";
import useFavourites from "../../../hooks/useFavourites";
import "../../pages/Favourites.css";

const DeleteFavourite = ({ city }) => {
  const { setCityName } = useContext(DataContext);
  const { DeleteFav, UpdateFav } = useFavourites();
  const navigate = useNavigate();
  const { Round, updateTime } = TemperatureType();

  const getForecast = () => {
    setCityName(city.city);
    navigate("/");
  };

  // Add cities present in database to localhost for favourite toggle on login
  // Add Cities to LocalStorage
  if (localStorage.getItem("Cities") == null) {
    localStorage.setItem("Cities", "[]");
  }
  let getOldCities = JSON.parse(localStorage.getItem("Cities"));
  let alreadyExists = getOldCities.includes(city.city);
  if (!alreadyExists) {
    getOldCities.push(city.city);
  }

  localStorage.setItem("Cities", JSON.stringify(getOldCities));

  // DELETE Favourites

  const deleteCity = async () => {
    await DeleteFav(city);
  };
  // Update Favourite

  const updateCity = async () => {
    await UpdateFav(city);
  };

  return (
    <div
      className="city-item"
      style={{ backgroundImage: `url(${city.photoUrl})` }}
    >
      <div className="top-portion">
        <h3 className="title">
          {city.city}, {city.state && `${city.state},`} {city.country}
        </h3>
        <span className="delete" onClick={updateCity}>
          <IoRefresh />
        </span>
        <span className="delete" onClick={deleteCity}>
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
            {Round(city.high)}&deg;
            <i className="wi wi-direction-up"></i>
          </p>
          <p className="low-temp">
            {Round(city.low)}&deg;
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
      <div className="update-time">Updated {updateTime(city.updatedAt)}</div>
    </div>
  );
};

export default DeleteFavourite;
