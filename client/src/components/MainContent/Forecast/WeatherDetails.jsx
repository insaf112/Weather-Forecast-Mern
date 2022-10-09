import React from "react";
import ProgressBars from "./ProgressBars";
import NewsApi from "./NewsApi";
import DetailBox from "../../DryComponents/DetailBox";
import TemperatureType from "../../../hooks/TemperatureType";
import "../MergeStyles.css";
import "./WeatherDetails.css";

function WeatherDetails({ weatherData, newsData }) {
  const { Temp, Round, Wind, Time } = TemperatureType();
  return (
    <div className="row3">
      {/* <!-- Details --> */}
      <div className="weather-details">
        <p className="heading-details">Details</p>
        <div className="details-box">
          {weatherData.current.rain && (
            <DetailBox
              title={"Rain"}
              icon={"wi wi-rain"}
              description={`${weatherData.current.rain["1h"]}mm`}
            />
          )}
          {weatherData.current.snow && (
            <DetailBox
              title={"Snow"}
              icon={"wi wi-snow"}
              description={`${weatherData.current.snow["1h"]}mm`}
            />
          )}

          <DetailBox
            title={"Precipitation"}
            icon={"wi wi-umbrella"}
            description={`${Round(weatherData.daily[0].pop * 100)}%`}
          />

          <DetailBox
            title={"Cloudiness"}
            icon={"wi wi-cloudy"}
            description={`${weatherData.current.clouds}%`}
          />
          <DetailBox
            title={"Feels Like"}
            icon={"wi wi-thermometer"}
            description={Temp(weatherData.current.feels_like)}
          />
          <DetailBox
            title={"Visibility"}
            icon={"wi wi-fog"}
            description={`${weatherData.current.visibility / 1000} KM`}
          />
          <DetailBox
            title={"Humidity"}
            icon={"wi wi-humidity"}
            description={`${weatherData.current.humidity}%`}
          />
          <DetailBox
            title={"Pressure"}
            icon={"wi wi-barometer"}
            description={`${weatherData.current.pressure} mb`}
          />
          <DetailBox
            title={"Wind"}
            icon={"wi wi-strong-wind"}
            description={Wind(weatherData.current.wind_speed)}
          />
          {weatherData.current.wind_gust && (
            <DetailBox
              title={"Wind Gust"}
              icon={"wi wi-cloudy-gusts"}
              description={Wind(weatherData.current.wind_gust)}
            />
          )}

          <DetailBox
            title={"Wind Direction"}
            icon={`wi wi-wind towards-${weatherData.current.wind_deg}-deg`}
            description={`Towards ${weatherData.current.wind_deg}\u00B0`}
          />
          <DetailBox
            title={"Sunrise"}
            icon={"wi wi-sunrise"}
            description={Time(weatherData.current.sunrise).hourMinute}
          />
          <DetailBox
            title={"Sunset"}
            icon={"wi wi-sunset"}
            description={Time(weatherData.current.sunset).hourMinute}
          />
          <DetailBox
            title={"Moonrise"}
            icon={"wi wi-moonrise"}
            description={
              weatherData.daily[0].moonrise
                ? Time(weatherData.daily[0].moonrise).hourMinute
                : "Not Available"
            }
          />

          <DetailBox
            title={"Moonset"}
            icon={"wi wi-moonset"}
            description={
              weatherData.daily[0].moonset
                ? Time(weatherData.daily[0].moonset).hourMinute
                : "Not Available"
            }
          />
        </div>
      </div>
      {/* <!-- /Details --> */}
      <ProgressBars />
      <NewsApi newsData={newsData} />
    </div>
  );
}

export default WeatherDetails;
