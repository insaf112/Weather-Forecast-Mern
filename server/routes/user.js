const express = require("express");
const {
  userSignup,
  userSignin,
  userLogout,
} = require("../controllers/userController");
const router = express.Router();

// User SignUp
router.post("/signup", userSignup);
 
// User SignIn
router.post("/signin", userSignin);

// User LogOut
router.get("/logout", userLogout);

module.exports = router;
