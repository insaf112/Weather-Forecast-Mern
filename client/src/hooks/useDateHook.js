import { useContext } from "react";
import { DateTime } from "luxon";
import { DataContext } from "../context/DataContext";
const useDateHook = () => {
  const { weatherData } = useContext(DataContext);
  let { timezone } = weatherData;

  const Time = (timestamp) => {
    let time = DateTime.fromSeconds(timestamp, { zone: timezone });

    let formattedTime = {
      hourMinuteSec: time.toFormat("hh:mm:ss a"),
      hourMinute: time.toFormat("hh:mm a"),
      weekdayDay: time.toFormat("ccc dd"),
      weekdayHour: time.toFormat("ccc hh a"),
    };
    return formattedTime;
  };
  return { Time };
};

export default useDateHook;
