import React, { useContext } from "react";
// Import All Pages
import Home from "./pages/Home";
import Map from "./pages/Map";
import News from "./pages/News";
import Favourites from "./pages/Favourites";
import Header from "../components/MainContent/Header";
import Topbar from "../components/MainContent/Topbar";
import HourlyAnalysis from "./MainContent/Forecast/HourlyAnalysis";
import DailyAnalysis from "./MainContent/Forecast/DailyAnalysis";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
// Import Contexts
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// React Router
import { Routes, Route } from "react-router-dom";
// Import Styles
import "./App.css";
import "../components/MainContent/MergeStyles.css";

let App = () => {
  // Access Global State/Context
  const { user } = useContext(AuthContext);
  const { weatherData } = useContext(DataContext);
  return (
    <div>
      <>
        <Header />
        <Topbar />

        {weatherData && (
          <>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/news" element={<News />} />
              <Route path="/hourly-details" element={<HourlyAnalysis />} />
              <Route path="/daily-details" element={<DailyAnalysis />} />

              {user && <Route path="/favourites" element={<Favourites />} />}
              {!user && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        ) }
      </>
      {/* Called Toast Container here so we can access the toast message inside every Component/Page */}
      <ToastContainer
        autoClose={5000}
        theme="dark"
        newestOnTop={true}
        style={{ height: ".5rem" }}
      />
    </div>
  );
};

export default App;
