import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import AuthContextProvider from "./context/AuthContext";
import FavouriteContextProvider from "./context/FavouriteContext";
import DataContextProvider from "./context/DataContext";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <> 
    <Router>
      <FavouriteContextProvider>
        <DataContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </DataContextProvider>
      </FavouriteContextProvider>
    </Router>
  </>
);
