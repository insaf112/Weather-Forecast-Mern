import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { DateTime } from "luxon";

const TemperatureType = () => {
  const { units, weatherData } = useContext(DataContext);
  const { dt, sunrise, sunset } = weatherData && weatherData.current;
  const { timezone } = weatherData;

  const Time = (timestamp) => {
    if (!timestamp) {
      return console.log("Internet Problem");
    }
    let time = DateTime.fromSeconds(timestamp, { zone: timezone });

    let formattedTime = {
      hourMinuteSec: time.toFormat("hh:mm:ss a"),
      hourMinute24: time.toFormat("HHmm"),
      hourMinute: time.toFormat("hh:mm a"),
      weekdayDay: time.toFormat("ccc dd"),
      weekdayHour: time.toFormat("ccc hh a"),
    };
    return formattedTime;
  };

  // Time Ago for Update City

  const updateTime = (time) => {
    const getDifference = DateTime.now().diff(
      DateTime.fromISO(time)
    ).milliseconds;
    const getAgoTime = DateTime.local().minus(getDifference).toRelative();
    return getAgoTime;
  };

  const Round = (data) => Math.round(data);

  const Temp = (temp) => {
    if (units) {
      return `${Round(temp)}\u00B0C`;
    } else {
      return `${Round(temp)}\u00B0F`;
    }
  };

  const Wind = (wind) => {
    if (units) {
      return `${Round(wind * 3.6)} km/h`;
    } else {
      return `${Round(wind)} miles/h`;
    }
  };

  const DayNight = () => {
    if ((dt < sunrise && dt < sunset) || (dt > sunrise && dt > sunset)) {
      return "night";
    } else if (dt > sunrise || dt < sunset) {
      return "day";
    } else if (dt < sunrise || dt > sunset) {
      return "night";
    }
  };

  //  Background Image Description
  const BackgroundImage = (weatherDesc) => {
    switch (weatherDesc) {
      case "Clouds":
        // weatherDesc =
        return DayNight() === "day" ? "cloudy weather day" : `cloudy weather`;
      // break;
      case "Clear":
        return `clear ${DayNight()}`;
      // break;
      case "Thunderstorm":
        return `thunderstorm ${DayNight()}`;
      // break;
      case "Rain":
        // weatherDesc = `rainy ${DayNight()}`;
        return DayNight() === "day" ? "raining" : "raining dark background";
      // break;
      case "Snow":
        return DayNight() === "day" ? "snowy weather forest" : "snowing night";
      // break;
      case "Haze":
        return DayNight() === "day" ? "hazy weather day" : "hazy weather night";
      // break;
      case "Smoke":
        return DayNight() === "day"
          ? "smoke weather city"
          : "smokey city night";
      // break;
      case "Drizzle":
        return DayNight() === "day" ? "drizzle" : "drizzle night";
      // break;

      default:
        return weatherDesc;
    }
  };

  return { Wind, Temp, Round, DayNight, Time, updateTime, BackgroundImage };
};

export default TemperatureType;
