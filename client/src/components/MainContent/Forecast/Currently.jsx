import React from "react";
import TemperatureType from "../../../hooks/TemperatureType";
import "../MergeStyles.css";
import "./Currently.css";

function Currently({ weatherData, location, author }) {
  const { Temp, Round, DayNight, Time } = TemperatureType();

  let iconId = weatherData && weatherData.current.weather[0].id;
  const { username, link } = author;

  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      {/* <!-- Current weather INFO Starts --> */}

      <div className="row1" id="parallax">
        {/* <!-- City & Country --> */}
        <div className="city-area">
          <h1 className="city-country">
            {location[0].name}, {location[0].state && `${location[0].state},`}{" "}
            {location[0].country}
          </h1>
          <p className="local-time">{`${location[0].name} Time  ${
            Time(weatherData.current.dt).hourMinute
          }`}</p>
        </div>
        {/* <!-- Current Temperature --> */}

        <div className="current-temp-col">
          <h1 className="current-temp">{Temp(weatherData.current.temp)}</h1>
          <div className="high-low">
            <p className="current-high high-low-arrow-haze">
              {Round(weatherData.daily[0].temp.max)}&deg;
              <i
                className="wi wi-direction-up
"
              ></i>
            </p>
            <p className="current-low high-low-arrow-haze">
              {Round(weatherData.daily[0].temp.min)}&deg;
              <i
                className="wi wi-direction-down
"
              ></i>
            </p>
          </div>
          <div className="description">
            <p className="high-low-arrow-haze">
              {weatherData.current.weather[0].main}
            </p>
            <p className="update-time">Updated at {time} </p>
          </div>
        </div>
        <div className="icon-author">
          <i
            className={
              `wi wi-owm-${DayNight()}-${iconId}`
              // DayNight(iconId)
            }
          ></i>
          <p className="author-credits">
            Photo by{" "}
            <a href={link} rel="noreferrer" target="_blank">
              {username} (Unsplash)
            </a>
          </p>
        </div>
      </div>

      {/* Current weather INFO ENDS  */}
    </>
  );
}

export default Currently;
