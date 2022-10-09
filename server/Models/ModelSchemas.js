const mongoose = require("mongoose");

// Favourite Schema
const favouriteSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    temp: {
      type: String,
      required: false,
    },
    high: {
      type: Number,
      required: false,
    },
    low: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    precipitation: {
      type: Number,
      required: false,
    },
    wind: {
      type: String,
      required: false,
    },
    photoUrl: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const favouriteModel = mongoose.model("Favourite", favouriteSchema);

//  User SignUp Schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object
  }
});
const User = mongoose.model("User", userSchema);

module.exports = { favouriteModel, User };
