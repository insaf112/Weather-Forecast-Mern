import React, { useContext } from "react";
import TemperatureType from "../../../hooks/TemperatureType";
import { DataContext } from "../../../context/DataContext";
import DetailBox from "../../DryComponents/DetailBox";
import BackgroundImage from "../../DryComponents/BackGroundImage";
import "./DailyAnalysis.css";
import "../MergeStyles.css";

function DailyAnalysis() {
  const { weatherData } = useContext(DataContext);
  const { Wind, Temp, Round, Time } = TemperatureType();

  const daily = weatherData.daily;

  return (
    <>
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundSize: BackgroundImage().size,
          backgroundPosition: BackgroundImage().position,
        }}
        className="daily-analysis default-styles sidebar-open"
      >
        <div className="dark-transparent">
          <div className="daily-container">
            <h1 className="heading-daily">Daily Details</h1>
            <div className="daily-box">
              {daily.map((day, index) => (
                <div className="daily-item" key={index}>
                  <div className="bar">
                    <p className="date">{Time(day.dt).weekdayDay}</p>
                    <p className="high">{Round(day.temp.max)}&deg;</p>
                    <div className="daily-progress-bar"></div>
                    <p className="low">{Round(day.temp.min)}&deg;</p>
                    <i
                      className={`wi wi-owm-${day.weather[0].id} bar-icon`}
                    ></i>
                    {/* <p className="description">
                  {day.weather[0].main} <br />({day.weather[0].description})
                </p> */}
                    <p className="main-description">{day.weather[0].main}</p>
                    <p className="sub-description">
                      {day.weather[0].description}
                    </p>
                  </div>
                  <div className="other-content">
                    {day.rain && (
                      <DetailBox
                        title={"Rain"}
                        icon={"wi wi-rain"}
                        description={`${day.rain}mm`}
                      />
                    )}

                    {day.snow && (
                      <DetailBox
                        title={"Snow"}
                        icon={"wi wi-snow"}
                        description={`${day.snow}mm`}
                      />
                    )}

                    <DetailBox
                      title={"Precipitation"}
                      icon={"wi wi-umbrella"}
                      description={`${Round(day.pop * 100)}%`}
                    />

                    <DetailBox
                      title={"Cloudiness"}
                      icon={"wi wi-cloudy"}
                      description={`${day.clouds}%`}
                    />

                    <DetailBox
                      title={"Feels Like"}
                      icon={"wi wi-thermometer"}
                      description={Temp(day.feels_like.day)}
                    />
                    <DetailBox
                      title={"UVI"}
                      icon={"wi wi-horizon-alt"}
                      description={Round(day.uvi * 8.33)}
                    />

                    <DetailBox
                      title={"Humidity"}
                      icon={"wi wi-humidity"}
                      description={`${day.humidity}%`}
                    />

                    <DetailBox
                      title={"Pressure"}
                      icon={"wi wi-barometer"}
                      description={`${day.pressure} mb`}
                    />
                    <DetailBox
                      title={"Wind Gust"}
                      icon={"wi wi-cloudy-gusts"}
                      description={Wind(day.wind_gust)}
                    />

                    <DetailBox
                      title={"Wind"}
                      icon={"wi wi-strong-wind"}
                      description={Wind(day.wind_speed)}
                    />

                    <DetailBox
                      title={"Sunrise"}
                      icon={"wi wi-sunrise"}
                      description={Time(day.sunrise).hourMinute}
                    />
                    <DetailBox
                      title={"Sunset"}
                      icon={"wi wi-sunset"}
                      description={Time(day.sunset).hourMinute}
                    />

                    <DetailBox
                      title={"Moonrise"}
                      icon={"wi wi-moonrise"}
                      description={
                        day.moonrise
                          ? Time(day.moonrise).hourMinute
                          : "Not Available"
                      }
                    />

                    <DetailBox
                      title={"Moonset"}
                      icon={"wi wi-moonset"}
                      description={
                        day.moonset
                          ? Time(day.moonset).hourMinute
                          : "Not Available"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DailyAnalysis;
