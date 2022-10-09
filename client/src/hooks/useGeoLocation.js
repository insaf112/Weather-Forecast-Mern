import { toast } from "react-toastify";
const useGeoLocation = () => {
  const getUserLocation = (setCityName) => {
    navigator.geolocation.getCurrentPosition(async (position, err) => {
      if (navigator.geolocation) {
        const { latitude, longitude } = position.coords;

        // API To convert user coordinates to A CITY
        const reverseGeoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

        const response = await fetch(reverseGeoUrl);
        let data = await response.json();

        if (!response.ok) {
          toast.error("Error. Try Again");
        } else {
          const oneWordCity = data[0].name.split(" ")[0];
          console.log("CITY LOCATION : ", oneWordCity);
          setCityName(oneWordCity);
          toast.success(`Location ${data[0].name} Fetched`);
        }
      }
    });
  };

  return { getUserLocation };
};

export default useGeoLocation;
