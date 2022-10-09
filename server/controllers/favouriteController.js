const { favouriteModel } = require("../Models/ModelSchemas");

// Create Favourites

const createFavourite = async (req, res) => {
  const { location, finalData, user_id } = req.body;

  const { name: city, state, country } = location[0];
  const { temp, high, low, description, wind, precipitation, photoUrl } =
    finalData;
  try {
    let cityAdded = await favouriteModel.create({
      city,
      state,
      country,
      user_id,
      temp,
      high,
      low,
      description,
      precipitation,
      wind,
      photoUrl,
    });

    res.status(200).json(cityAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET/Fetch Favourites

const getFavourites = async (req, res) => {
  let { _id: user_id } = req.user;

  let cities = await favouriteModel.find({ user_id });

  if (cities) {
    res.status(200).json(cities);
  } else {
    res.status(400).json({ message: "No Cities Found, First Add Cities" });
  }
};

// Delete Favourite

const deleteFavourite = async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   res.status(404).json("No Workout found");
  // }

  const cityFound = await favouriteModel.findOneAndDelete({ _id: id });

  if (cityFound) {
    res.status(200).json(cityFound);
  } else {
    res.status(404).json("No Workout found");
  }
};

// Update Favourite

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const { newData } = req.body;

  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     res.status(404).json({ error: "Item Not Found" });
  //   }

  let updateCity = await favouriteModel.findOneAndUpdate(
    { _id: id },
    {
      ...newData,
    },
    { new: true }
  );
  if (updateCity) {
    res.status(200).json({ message: "City Updated Successfully", updateCity });
  } else {
    res.status(404).status({ error: "City Not Found" });
  }
};

module.exports = {
  createFavourite,
  getFavourites,
  deleteFavourite,
  updateFavourite,
};
