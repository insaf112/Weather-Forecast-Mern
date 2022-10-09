import React from "react";
// import HourlyAnalysis from "./HourlyAnalysis";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import TemperatureType from "../../../hooks/TemperatureType";
// Import CSS styles
import "../MergeStyles.css";
import "./DailyHourly.css";
// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function DailyHourly({ hourlyData, dailyData, isLoading }) {
  let hourly = hourlyData.splice(0, 15);
  let daily = dailyData;

  const { Round, Time, Wind } = TemperatureType();

  return (
    <div className="row row2">
      <div className="daily-forecast">
        <Link to="/daily-details">
          <p className="heading-forecast">
            Daily
            <span style={{ fontSize: ".7rem", marginLeft: ".7rem" }}>
              Details
            </span>
          </p>
        </Link>
        <div className="weekly-box">
          {daily.map((day, index) => (
            <div className="days" key={index}>
              <p className="high">{Round(day.temp.max)}&deg;</p>
              <div className="daily-progress-bar"></div>
              <p className="low">{Round(day.temp.min)}&deg;</p>
              <i className={`wi wi-owm-${day.weather[0].id}`}></i>
              <p>{Time(day.dt).weekdayDay}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- Hourly Forecast --> */}

      <div className="hourly-forecast">
        <Link to="/hourly-details">
          <p className="heading-hourly">
            Hourly
            <span style={{ fontSize: ".7rem", marginLeft: ".7rem" }}>
              Details
            </span>
          </p>
        </Link>
        <Swiper
          pagination={{
            type: "fraction",
            horizontalClass: "false",
          }}
          // Responsive
          breakpoints={{
            1024: {
              slidesPerView: 8,
            },
            900: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 5,
            },
            600: {
              slidesPerView: 4,
            },
            480: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            },
          }}
          slidesPerView={"8"}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <div className="hourly-box responsive">
            {hourly.map((hour, index) => (
              <SwiperSlide key={index}>
                <div className="hourly">
                  <p className="date">{Time(hour.dt).weekdayHour}</p>
                  <i className={`wi wi-owm-${hour.weather[0].id}`}></i>
                  <p className="hourly-temp">{Round(hour.temp)}&deg;</p>
                  <p className="main">{hour.weather[0].main}</p>
                  <p className="rain-forecast">
                    <i className="wi wi-raindrop"></i>
                    {Round(hour.pop * 100)}%
                  </p>
                  <p className="wind-gust">
                    <i
                      className={`wi wi-wind towards-${hour.wind_deg}-deg`}
                    ></i>
                    {Wind(hour.wind_speed)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      {/* <!-- / Hourly Forecast --> */}
    </div>
  );
}

export default DailyHourly;
