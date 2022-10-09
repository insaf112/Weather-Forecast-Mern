import React, { useContext, useState } from "react";
import L from "leaflet";
import { DataContext } from "../../context/DataContext";
import "../MainContent/MergeStyles.css";
import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
const Map = () => {
  const { location, weatherData } = useContext(DataContext);
  const [layer, setLayer] = useState("");

  const markerIcon = new L.Icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/768px-Location_dot_black.svg.png",
    iconSize: [15, 15],
  });

  let { lat, lon } = location[0];
  const handleLayer = (e) => {
    setLayer(e.target.value);
  };
  // useEffect(() => {
  //   handleLayer();
  // }, [layer]);
  if (!layer) {
    setLayer("temp_new");
  }

  const layerURL = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  return (
    <>
      <div className="map sidebar-open default-styles">
        {/* <div className="leaflet-container"> */}
          <MapContainer
            center={[lat, lon]}
            key={lat}
            zoom={10}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // url={layerURL}
            />
            {/* Weather Layer */}

            <TileLayer url={layerURL} key={layer} maxZoom={18} opacity={1} />

            {/* <TileLayer
            url="https://maps.openweathermap.org/maps/2.0/weather/1h/temp_new/{z}/{x}/{y}?appid=c92c71b636845f60f631c6c9d55bb023"
            maxZoom={18}
            opacity={1}
          /> */}

            <Marker position={[lat, lon]} icon={markerIcon}>
              <Tooltip
                className="tooltip"
                direction="right"
                opacity={1}
                permanent
              >
                <div className="tooltip-div">
                  <p className="temp-tooltip">
                    {Math.round(weatherData.current.temp)}&deg;C
                  </p>
                  <p className="city-name">{location[0].name}</p>
                </div>
              </Tooltip>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          <div className="add-layers">
            <p className="title">Select Layers</p>
            <select onChange={handleLayer} className="select-layers">
              <option className="option" value="temp_new">
                Temperature
              </option>
              <option className="option" value="precipitation_new">
                Precipitation
              </option>
              <option className="option" value="wind_new">
                Wind
              </option>
              <option className="option" value="clouds_new">
                Clouds
              </option>
              <option className="option" value="rain">
                Rain
              </option>
            </select>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Map;
