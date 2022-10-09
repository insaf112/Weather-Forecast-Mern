import React, { useContext } from "react";
import Currently from "./Forecast/Currently";
import DailyHourly from "./Forecast/DailyHourly";
import WeatherDetails from "./Forecast/WeatherDetails";
import BackgroundImage from "../DryComponents/BackGroundImage";
import { DataContext } from "../../context/DataContext";
import "./MainContent.css";
import "./MergeStyles.css";

const MainContent = () => {
  // const [offset, setOffset] = useState(0);
  const { weatherData, location, newsData, isLoading, author } =
    useContext(DataContext);
  let { hourly, daily } = weatherData;

  // Parallax Re renders Everything. Not working!!!

  // const ref = useRef();
  // const handleScroll = function () {
  //   setOffset(this.scrollTop);
  // };
  // useEffect(() => {
  //   const div = ref.current;
  //   div.addEventListener("scroll", handleScroll);
  //   return () => {
  //     div.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div
        style={{
          // backgroundPositionY: `${-offset * 0.05}px`,
          // transform: `translateY(${offsetY * 0.05}px)`,

          backgroundPosition: BackgroundImage().position,
          backgroundImage: BackgroundImage().image,
          backgroundSize: BackgroundImage().size,
        }}
        className="main-content sidebar-open default-styles"
        // ref={ref}
      >
        <Currently
          author={author}
          location={location}
          weatherData={weatherData}
        />
        <DailyHourly
          isLoading={isLoading}
          hourlyData={hourly}
          dailyData={daily}
        />
        <WeatherDetails newsData={newsData} weatherData={weatherData} />
      </div>
    </>
  );
};

export default MainContent;
