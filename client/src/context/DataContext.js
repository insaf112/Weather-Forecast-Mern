import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import WeatherApi from "../components/MainContent/WeatherApi";
import { FavouriteContext } from "./FavouriteContext";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { favourites } = useContext(FavouriteContext);
  const navigate = useNavigate();
  // fetch data from WeatherApi hook
  const {
    getOneCallData,
    getGeoData,
    getNewsData,
    getAqiData,
    unsplashApiCall,
  } = WeatherApi();
  // states
  const [weatherData, setWeatherData] = useState("");
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState("");
  const [aqi, setAqi] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [units, setUnits] = useState(true);
  const [favToggle, setFavToggle] = useState(false);
  const [isFavourite, setIsFavourite] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [photo, setPhoto] = useState("");
  const [author, setAuthor] = useState({
    username: "",
    link: "",
  });

  console.log("LOCATION : ", location);
  console.log("CityName : ", cityName);
  let checkCityName = location && location[0].name;

  // Store City to LocalStorage
  if (checkCityName) {
    localStorage.setItem("City", checkCityName);
  }

  // Access CityName from Local Storage
  const defaultCity = localStorage.getItem("City");
  if (cityName === "" && defaultCity) {
    setCityName(defaultCity);
  } else if (cityName === "" && !defaultCity) {
    setCityName("London");
  }

  // Access the Local Cities Array from localStorage and check if the current city is present, if YES then Toggle the setFavToggle to true

  useEffect(() => {
    let localCitiesArray = JSON.parse(localStorage.getItem("Cities"));
    if (localCitiesArray) {
      let matchedCity = localCitiesArray.find((city) => city === checkCityName);
      if (matchedCity) {
        setFavToggle(true);
      } else {
        setFavToggle(false);
      }
    }
  }, [checkCityName]);

  // Access Units Value from Local Storage ONLY on Page Load
  useEffect(() => {
    const unitsLocalStorage = JSON.parse(localStorage.getItem("Units"));

    if (unitsLocalStorage) {
      if (unitsLocalStorage.units === false) {
        setUnits(false);
      } else if (unitsLocalStorage.units === true) {
        setUnits(true);
      }
    } else {
      console.log("NOT AVAILABLE : ", units);
    }
    // eslint-disable-next-line
  }, []);

  // Store Units Value to Local Storage Everytime Units Value Changes

  // Units Function
  const toggleUnits = () => {
    setUnits(!units);
    toast.info(!units ? "Celsius" : "Fahrenheit");
    localStorage.setItem("Units", JSON.stringify({ units: !units }));
  };

  // !d

  let unitsValue;
  if (units) {
    unitsValue = "metric";
  } else if (!units) {
    unitsValue = "imperial";
  }

  // Favourite Toggle Heart Add/Remove
  const handleFavToggle = () => {
    setFavToggle(!favToggle);
  };

  // // Check If city is Favourite

  useEffect(() => {
    let itemAvailable =
      favourites &&
      favourites.find((element) => element.city === checkCityName);
    itemAvailable ? setIsFavourite(true) : setIsFavourite(false);
  }, [location, checkCityName, favourites]);

  useEffect(() => {
    if (isFavourite) {
      setFavToggle(true);
    } else {
      setFavToggle(false);
    }
  }, [isFavourite, favourites]);

  // WEATHER & AQI & LOCATION API

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getGeoData({ q: cityName });
      if (data.length > 0) {
        setLocation(data);
        // AQI
        await getAqiData(data[0].lat, data[0].lon).then((data) => {
          setAqi(data);
        });
        // One Call
        let oneCallResponse = await getOneCallData(
          data[0].lat,
          data[0].lon,
          unitsValue
        );
        setWeatherData(oneCallResponse);
      } else {
        navigate("*");
      }
    };

    fetchWeather();
    // eslint-disable-next-line
  }, [cityName, units, refresh]);

  // NEWS API
  useEffect(() => {
    let fetchNews = async () => {
      let fetchNewsData = await getNewsData();
      // setNewsData(fetchNewsData.articles.slice(0, 100));
      setNewsData(fetchNewsData.articles);
      console.log(fetchNewsData.articles);
    };
    fetchNews();
    // eslint-disable-next-line
  }, [refresh]);

  // Unsplash Pic API

  useEffect(() => {
    let { dt, sunrise, sunset } = weatherData && weatherData.current;
    let { main: weatherDesc } = weatherData && weatherData.current.weather[0];
    let apiCall = async () => {
      let data = await unsplashApiCall(weatherDesc, dt, sunrise, sunset);
      setPhoto(data.results[0].urls.regular);
      setAuthor({
        link: data.results[0].user.links.html,
        username: data.results[0].user.name,
      });
    };
    apiCall();
    // eslint-disable-next-line
  }, [weatherData && weatherData.current.weather[0].description]);

  return (
    <DataContext.Provider
      value={{
        units,
        weatherData,
        aqi,
        newsData,
        location,
        checkCityName,
        favToggle,
        isFavourite,
        refresh,
        photo,
        unitsValue,
        handleFavToggle,
        setCityName,
        toggleUnits,
        setIsFavourite,
        setRefresh,
        author,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
