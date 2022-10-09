const express = require("express");
const {
  createFavourite,
  getFavourites,
  deleteFavourite,
  updateFavourite,
} = require("../controllers/favouriteController");
const { authenticate } = require("../JWT/Jwt");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// Require Authentication/ Middleware for all Routes Below
router.use(requireAuth);

// Add Favourite
router.post("/", createFavourite);

// Get Favourites
router.get("/",  getFavourites);

// Delete Favourite
router.delete("/:id", deleteFavourite);

// Update City Items
router.patch("/:id", updateFavourite);

module.exports = router;
