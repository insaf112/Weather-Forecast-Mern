import { toast } from "react-toastify";
import axios from "axios";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherApi = () => {
  const getGeoData = async ({ q: city }) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => toast.error("No Connectivity"));
  };

  // Weather

  const getOneCallData = async (lat, lon, units) => {
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely&appid=${API_KEY}`;

    const response = await fetch(oneCallUrl);

    const data = await response.json();
    toast.success("Data Fetched");
    return data;
  };

  // AQI

  const getAqiData = async (lat, lon) => {
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    return fetch(aqiUrl)
      .then((response) => response.json())
      .then((resData) => resData);
  };

  // Date for api News

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();

  let dateNow = `${year}/${month}/${date}`;
  let dateYesterday = `${year}/${month}/${date - 1}`;
  console.log(dateYesterday);
  console.log(dateNow);
  // News
  const getNewsData = async () => {
    var options = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      // url: "https://api.newscatcherapi.com/v2/latest_headlines",
      params: {
        q: "Weather",
        from: `${dateYesterday}`,
        to: `${dateNow}`,
        lang: "en",
        sort_by: "relevancy",
        page: "1",
        page_size: "100",
      },
      headers: {
        "x-api-key": `${process.env.REACT_APP_NEWS_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    return response.data;
  };
  //   let NewsApiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${dateYesterday}&to=${dateNow}&sortBy=relevancy&apiKey=3548f93c7ee44377a44b36115e94346b`;
  //   const response = await fetch(NewsApiUrl);
  //   const data = await response.json();
  //   return data;

  // Unsplash photo API
  const unsplashApiCall = async (weatherDesc, dt, sunrise, sunset) => {
    const DayNight = () => {
      if ((dt < sunrise && dt < sunset) || (dt > sunrise && dt > sunset)) {
        return "night";
      } else if (dt > sunrise || dt < sunset) {
        return "day";
      } else if (dt < sunrise || dt > sunset) {
        return "night";
      }
    };
    switch (weatherDesc) {
      case "Clouds":
        weatherDesc =
          DayNight() === "day" ? "cloudy weather day" : `cloudy weather`;
        break;
      case "Clear":
        weatherDesc = `clear ${DayNight()}`;
        break;
      case "Thunderstorm":
        weatherDesc = `thunderstorm ${DayNight()}`;
        break;
      case "Rain":
        weatherDesc =
          DayNight() === "day" ? "raining" : "raining dark background";
        break;
      case "Snow":
        weatherDesc =
          DayNight() === "day" ? "snowy weather forest" : "snowing night";
        break;
      case "Haze":
        weatherDesc =
          DayNight() === "day" ? "hazy weather day" : "hazy weather night";
        break;
      case "Smoke":
        weatherDesc =
          DayNight() === "day" ? "smoke weather city" : "smokey city night";
        break;
      case "Drizzle":
        weatherDesc = DayNight() === "day" ? "drizzle" : "drizzle night";
        break;

      default:
        return weatherDesc;
    }

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${weatherDesc}&page=1&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
    let response = await fetch(unsplashUrl);
    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log("ERROR LOADING PHOTO");
    }
  };

  return {
    getOneCallData,
    getGeoData,
    getNewsData,
    getAqiData,
    unsplashApiCall,
  };
};

export default WeatherApi;
