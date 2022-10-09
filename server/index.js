require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const favouriteRoutes = require("./routes/favourite");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

// app.set("trust proxy", process.env.NODE_ENV !== "production");

const PORT = process.env.PORT || 5000;

// MongoDB Connectivity
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful...");
  })
  .catch((err) => {
    console.log("No Connection : " + err);
  });

// Routes
app.use("/api/user", userRoutes);
app.use("/api/favourites", favouriteRoutes);

// App Listening on PORT
app.listen(PORT, () => {
  console.log(`Server Live on Port ${PORT}...`);
});
