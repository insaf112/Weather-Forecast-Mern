import React, { useState, useContext } from "react";
import { BsFillHeartFill, BsHeart, BsSearch } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { FavouriteContext } from "../../context/FavouriteContext";
import useFavourites from "../../hooks/useFavourites";
import useGeoLocation from "../../hooks/useGeoLocation";
import { toast } from "react-toastify";
// Contexts
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import "./MergeStyles.css";
import "./Topbar.css";

const Topbar = () => {
  const [searchCity, setSearchCity] = useState("");
  const { favourites } = useContext(FavouriteContext);
  const { user } = useContext(AuthContext);
  const { getUserLocation } = useGeoLocation();
  const {
    setCityName,
    units,
    toggleUnits,
    handleFavToggle,
    favToggle,
    setRefresh,
    refresh,
    location,
  } = useContext(DataContext);
  const { AddFav, DeleteFav } = useFavourites();

  let { name } = location && location[0];
  // ADD to Favourites

  const addToFavourites = async () => {
    await AddFav();
  };
  const deleteCity = () => {
    let city = favourites.find((city) => city.city === name);
    DeleteFav(city);
  };

  // Submit the search city for weather
  const handleSubmit = () => {
    if (searchCity !== "") {
      setCityName(searchCity);
      setSearchCity("");
    }
  };

  // Fetch the input City Name
  function handleChange(event) {
    setSearchCity(event.target.value);
  }
  // Handle Location Click / Current Location
  const handleLocationClick = () => {
    getUserLocation(setCityName);
  };

  // Handle Refresh Click
  const handleRefreshClick = () => {
    setRefresh(!refresh);
    toast.info("Page Refreshed");
  };

  return (
    <>
      <div className="topbar default-styles">
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={handleChange}
            type="text"
            name="cityName"
            value={searchCity}
            placeholder="City Name..."
          />
          <button type="submit" onClick={handleSubmit}>
            <i>
              <BsSearch />
            </i>
          </button>
        </form>
        <div className="icons-div">
          <div className="temp-toggler">
            <p className={units ? "celsius" : null} onClick={toggleUnits}>
              &deg;C
            </p>
            <p className={!units ? "fahrenheit" : null} onClick={toggleUnits}>
              &deg;F
            </p>
          </div>

          {user && (
            <div onClick={handleFavToggle} className="favourite-toggle">
              {favToggle ? (
                <BsFillHeartFill onClick={deleteCity} />
              ) : (
                <BsHeart onClick={addToFavourites} />
              )}
            </div>
          )}
          {navigator.geolocation && (
            <i className="location-icon">
              <GoLocation onClick={handleLocationClick} />
            </i>
          )}
          <i className="refresh-icon">
            <IoRefresh onClick={handleRefreshClick} />
          </i>
        </div>
      </div>
    </>
  );
};

export default Topbar;
