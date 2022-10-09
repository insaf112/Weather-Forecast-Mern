import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import DetailBox from "../../DryComponents/DetailBox";
import TemperatureType from "../../../hooks/TemperatureType";
import BackgroundImage from "../../DryComponents/BackGroundImage";

import "../MergeStyles.css";
import "./HourlyAnalysis.css";

const HourlyAnalysis = () => {
  const { weatherData } = useContext(DataContext);
  const { Wind, Temp, Round, Time } = TemperatureType();
  const hourly = weatherData.hourly;

  return (
    <>
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundSize: BackgroundImage().size,
          backgroundPosition: BackgroundImage().position,
        }}
        className="hourly-analysis sidebar-open default-styles"
      >
        <div className="dark-transparent">
          <div className="hourly-container">
            <h1 className="heading-hourly">Hourly Details</h1>
            <div className="hourly-box">
              {hourly.map((hour, index) => (
                <div className="hourly-item" key={index}>
                  <div className="bar">
                    <div className="date">{Time(hour.dt).weekdayHour}</div>
                    <h3 className="temp">{Temp(hour.temp)}</h3>
                    {/* <div className="hourly-progress-bar"></div> */}

                    <i
                      className={`wi wi-owm-${hour.weather[0].id} bar-icon`}
                    ></i>
                    <p className="main-description">{hour.weather[0].main}</p>
                    <p className="sub-description">
                      {hour.weather[0].description}
                    </p>
                  </div>
                  <div className="other-content">
                    {hour.rain && (
                      <DetailBox
                        title={"Rain"}
                        icon={"wi wi-rain"}
                        description={`${hour.rain["1h"]}mm`}
                      />
                    )}

                    {hour.snow && (
                      <DetailBox
                        title={"Snow"}
                        icon={"wi wi-snow"}
                        description={`${hour.snow["1h"]}mm`}
                      />
                    )}

                    <DetailBox
                      title={"Precipitation"}
                      icon={"wi wi-umbrella"}
                      description={`${Round(hour.pop * 100)}%`}
                    />

                    <DetailBox
                      title={"Cloudiness"}
                      icon={"wi wi-cloudy"}
                      description={`${hour.clouds}%`}
                    />

                    <DetailBox
                      title={"Feels Like"}
                      icon={"wi wi-thermometer"}
                      description={Temp(hour.feels_like)}
                    />
                    <DetailBox
                      title={"UVI"}
                      icon={"wi wi-horizon-alt"}
                      description={Round(hour.uvi * 8.33)}
                    />

                    <DetailBox
                      title={"Humidity"}
                      icon={"wi wi-humidity"}
                      description={`${hour.humidity}%`}
                    />

                    <DetailBox
                      title={"Pressure"}
                      icon={"wi wi-barometer"}
                      description={`${hour.pressure} mb`}
                    />
                    <DetailBox
                      title={"Wind"}
                      icon={"wi wi-strong-wind"}
                      description={Wind(hour.wind_speed)}
                    />
                    <DetailBox
                      title={"Wind Gust"}
                      icon={"wi wi-cloudy-gusts"}
                      description={Wind(hour.wind_gust)}
                    />

                    <DetailBox
                      title={"Dew Point"}
                      icon={"wi wi-raindrops"}
                      description={Temp(hour.dew_point)}
                    />
                    <DetailBox
                      title={"Visibility"}
                      icon={"wi wi-smog"}
                      description={`${hour.visibility / 1000} Km`}
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
};

export default HourlyAnalysis;
