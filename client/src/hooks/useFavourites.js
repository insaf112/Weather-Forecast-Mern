import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import TemperatureType from "./TemperatureType";
import { toast } from "react-toastify";
const useFavourites = () => {
  const { dispatch } = useContext(FavouriteContext);
  const { location, weatherData, photo, unitsValue } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { Temp, Round, Wind, BackgroundImage } = TemperatureType();

  let user_id = user && user.user._id;
  let finalData;
  if (weatherData) {
    finalData = {
      temp: Temp(weatherData.current.temp),
      high: weatherData.daily[0].temp.max,
      low: weatherData.daily[0].temp.min,
      description: weatherData.current.weather[0].main,
      photoUrl: photo && photo,
      wind: Wind(weatherData.current.wind_speed),
      precipitation: Round(weatherData.daily[0].pop * 100),
    };
  }
  // Add Favourite City
  const AddFav = async () => {
    const response = await fetch(
      "/api/favourites",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          location,
          finalData,
          user_id: user_id,
        }),
      },
      { withCredentials: true }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success(`${location[0].name} added to Favourites`);
      dispatch({ type: "ADD_FAVOURITE", payload: data });
      // Add Cities to LocalStorage
      if (localStorage.getItem("Cities") == null) {
        localStorage.setItem("Cities", "[]");
      }
      let getOldCities = JSON.parse(localStorage.getItem("Cities"));
      getOldCities.push(data.city);
      localStorage.setItem("Cities", JSON.stringify(getOldCities));
    } else {
      toast.error(`Error, Try again`);
    }
  };

  //   Delete Favourite City
  const DeleteFav = async (city) => {
    let response = await fetch(`/api/favourites/${city._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(`${city.city} Removed`);
      dispatch({ type: "DELETE_FAVOURITE", payload: data });
      let getLocalCities = JSON.parse(localStorage.getItem("Cities"));
      if (getLocalCities) {
        let newLocalCities = getLocalCities.filter(
          (city) => city !== data.city
        );
        localStorage.setItem("Cities", JSON.stringify(newLocalCities));
      }
    } else if (!response.ok) {
      toast.error("Error, Try Again");
    }
  };

  // Update Fvourite City

  const UpdateFav = async (city) => {
    let newData;

    // API call For Update Data

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=${unitsValue}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    let res = await fetch(apiUrl);
    const resData = await res.json();

    // API CALL for PHOTO UPDATE
    let weatherDesc = resData && resData.weather[0].main;
    let unsplashUrl = `https://api.unsplash.com/search/photos?page=1&orientation=landscape&per_page=1&query=${BackgroundImage(
      weatherDesc
    )}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
    let responseUnsplash = await fetch(unsplashUrl);
    let dataUnsplash = await responseUnsplash.json();

    let updatePhotoUrl = dataUnsplash && dataUnsplash.results[0].urls.regular;

    newData = {
      temp: Temp(resData.main.temp),
      high: resData.main.temp_max,
      low: resData.main.temp_min,
      description: resData.weather[0].main,
      photoUrl: updatePhotoUrl,
      wind: Wind(resData.wind.speed),
      // precipitation: Round(weatherData.daily[0].pop * 100),
    };

    // UPdate RESTFUL API
    const response = await fetch(`/api/favourites/${city._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newData }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(`${city.city} Updated`);
      dispatch({ type: "UPDATE_FAVOURITE", payload: data.updateCity });
    } else {
      toast.error(data.error);
    }
  };

  return { DeleteFav, AddFav, UpdateFav };
};

export default useFavourites;
