import { useState, useEffect } from "react";
// import axios from "axios";
let useWeatherData = () => {
  let [cityName, setCityName] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const appID = "c92c71b636845f60f631c6c9d55bb023#";

  const cityRequest = (city) => {
    setCityName(city);
    console.log(`Input City : ${city}`);
  };

  // if (cityName === null || cityName === "") {
  //   cityName = "Toronto";
  // }

  console.log(`CITY_NAME :${cityName}`);

  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=c92c71b636845f60f631c6c9d55bb023`;

  const geoRequest = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((resData) => setLocation(resData))
      .catch((err) => console.log(err.message));
  };
  console.log(location);

  useEffect(() => {
    geoRequest();
  }, [cityName]);

  return { cityRequest, location };
  // if (location.length === 0) {
  // }

  // if (!data) return;
  //   if (location.length === 0) {
  //     console.log("No Data Recieved APIIIII");
  //     console.log(typeof location);
  //     console.log(location.length);
  //   } else {
  //     console.log(location);
  //   }
  // };

  // console.log(navigator.geolocation.getCurrentPosition());

  //   let lat = location[0].lat;
  //   let lon = location[0].lan;

  //   console.log(lat);
  //   console.log(lon);

  // let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${!location[0]
  //   .lat}&lon=${
  //   location[0].lon
  // }&exclude=minutely&units=metric&appid=76268c1fb3d722dff4d5d212a7c940fc`;

  // let weatherApiCall = () => {
  //   fetch(weatherURL)
  //     .then((response) => response.json())
  //     .then((resData) => console.log(resData));
  // };

  // useEffect(() => {
  //   weatherApiCall();
  // });
};

// fetch(
//   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=76268c1fb3d722dff4d5d212a7c940fc`
// )
//   .then((response) => response.json())
//   .then((resData) => resData);
// let data = weatherData(34.0151, 71.5249);

// let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}& appid=76268c1fb3d722dff4d5d212a7c940fc`;

//   let apiCall = (cityName) => {
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((resData) => {
//         setData(resData);
//         console.log(resData);
//       });
//   };
export default useWeatherData;
