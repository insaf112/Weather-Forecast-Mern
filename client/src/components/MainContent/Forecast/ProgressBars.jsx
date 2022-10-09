import React, { useContext } from "react";
import TemperatureType from "../../../hooks/TemperatureType";
import { DataContext } from "../../../context/DataContext";

import "./ProgressBars.css";
import "../MergeStyles.css";

let ProgressBars = () => {
  const { units, weatherData, aqi } = useContext(DataContext);
  const { Round } = TemperatureType();

  let windSpeed;

  if (units) {
    windSpeed = Round(weatherData.current.wind_speed * 3.6);
  } else {
    windSpeed = Round(weatherData.current.wind_speed * 1.609);
  }

  let UV = Round(weatherData.current.uvi);
  let beaufortValue;
  let beaufortColor;
  let beaufortDesc = "";
  let aqiValue = aqi.list[0] && Round(aqi.list[0].components.o3);
  let aqiTitle;
  let aqiDesc;
  let aqiBg;

  let bgUV = "";
  let descUV = "";

  // AQI
  if (aqiValue <= 50) {
    aqiTitle = "Good";
    aqiBg = "greenyellow";
    aqiDesc =
      "Air quality is satisfactory, and air pollution poses little or no risk.";
  } else if (aqiValue <= 100) {
    aqiTitle = "Moderate";
    aqiBg = "yellow";
    aqiDesc =
      "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
  } else if (aqiValue <= 150) {
    aqiTitle = "Unhealthy for Sensitive Groups";
    aqiBg = "orange";
    aqiDesc =
      "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
  } else if (aqiValue <= 200) {
    aqiTitle = "Unhealthy";
    aqiBg = "red";
    aqiDesc =
      "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.";
  } else if (aqiValue <= 300) {
    aqiTitle = "Very Unhealthy";
    aqiBg = "purple";
    aqiDesc =
      "Health alert: The risk of health effects is increased for everyone.";
  } else if (aqiValue >= 301) {
    aqiTitle = "Hazardous";
    aqiBg = "maroon";
    aqiDesc =
      "Health warning of emergency conditions: everyone is more likely to be affected.";
  }

  //Beaufort

  if (windSpeed < 2) {
    beaufortValue = 0;
    beaufortDesc = "Calm";
    beaufortColor = "#0099FF";
  } else if (windSpeed <= 5) {
    beaufortValue = 1;
    beaufortDesc = "Light Air";
    beaufortColor = "#66CBFF";
  } else if (windSpeed <= 11) {
    beaufortValue = 2;
    beaufortDesc = "	Light breeze";
    beaufortColor = "#78CEC1";
  } else if (windSpeed <= 19) {
    beaufortValue = 3;
    beaufortDesc = "Gentle breeze";
    beaufortColor = "#00E300";
  } else if (windSpeed <= 29) {
    beaufortValue = 4;
    beaufortDesc = "Moderate breeze";
    beaufortColor = "#66FF33";
  } else if (windSpeed <= 39) {
    beaufortValue = 5;
    beaufortDesc = "Fresh breeze";
    beaufortColor = "#CBFE33";
  } else if (windSpeed <= 50) {
    beaufortValue = 6;
    beaufortDesc = "Strong breeze";
    beaufortColor = "#E2FE9A";
  } else if (windSpeed <= 61) {
    beaufortValue = 7;
    beaufortDesc = "Near gale	";
    beaufortColor = "#FEFF99";
  } else if (windSpeed <= 74) {
    beaufortValue = 8;
    beaufortDesc = "Gale";
    beaufortColor = "#FADC56";
  } else if (windSpeed <= 87) {
    beaufortValue = 9;
    beaufortDesc = "Strong gale";
    beaufortColor = "#FFC000";
  } else if (windSpeed <= 101) {
    beaufortValue = 10;
    beaufortDesc = "Whole gale (Storm)";
    beaufortColor = "#FF9A66";
  } else if (windSpeed <= 116) {
    beaufortValue = 11;
    beaufortDesc = "Violent storm";
    beaufortColor = "#FF6600";
  } else if (windSpeed >= 117) {
    beaufortValue = 12;
    beaufortDesc = "Hurricane";
    beaufortColor = "#CD3301";
  }

  // UV Condition Styles
  if (UV <= 2) {
    bgUV = "greenyellow";
    descUV = "Low";
  } else if (UV <= 5) {
    bgUV = "yellow";
    descUV = "Medium";
  } else if (UV <= 7) {
    bgUV = "orange";
    descUV = "High";
  } else if (UV <= 10) {
    bgUV = "red";
    descUV = "Very High";
  } else if (UV > 10) {
    bgUV = "purple";
    descUV = "Extreme";
  }
  return (
    <div className="uv-beaufort-aqi">
      {/* <!-- AQI Bars --> */}
      {/* <!-- UV Index --> */}
      <div className="uv-index">
        <h1 className="uv-heading">UV Index</h1>
        <p className="margin-p">
          <i
            className="wi wi-day-sunny progress-icon"
            style={{ color: `${bgUV}` }}
          ></i>
          {Math.round(weatherData.current.uvi)}, {descUV}
        </p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${Math.round(weatherData.current.uvi) * 8.33}%`,
              backgroundColor: `${bgUV}`,
            }}
            aria-valuenow={weatherData.current.uvi}
            aria-valuemin="0"
            aria-valuemax="12"
          ></div>
        </div>
      </div>
      {/* <!-- Beaufort --> */}
      <div className="beaufort">
        <h1 className="beaufort-heading">Beaufort</h1>
        <p className="margin-p">
          <i
            className={`wi wi-wind-beaufort-${beaufortValue} progress-icon`}
            style={{
              color: `${beaufortColor}`,
            }}
          ></i>
          {beaufortDesc}
        </p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${beaufortValue * 8.33}%`,
              backgroundColor: `${beaufortColor}`,
            }}
            aria-valuenow={beaufortValue}
            aria-valuemin="0"
            aria-valuemax="12"
          ></div>
        </div>
      </div>
      {/* <!-- Air Quality Index --> */}
      <div className="aqi">
        <h1 className="aqi-heading">Air Quality Index</h1>
        <div className="aqi-info">
          <h1 className="aqi-number" style={{ color: `${aqiBg}` }}>
            {aqiValue}
          </h1>
          <div className="aqi-desc">
            <h1 className="aqi-head">
              {aqiValue ? aqiTitle : "No Data Available."}
            </h1>
            <p className="aqi-paragraph">{aqiDesc}</p>
          </div>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${aqiValue / 5}%`, backgroundColor: `${aqiBg}` }}
            aria-valuenow={aqiValue}
            aria-valuemin="0"
            aria-valuemax="400"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;
