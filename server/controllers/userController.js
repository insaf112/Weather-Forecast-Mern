const { User } = require("../Models/ModelSchemas");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../JWT/Jwt");
const validator = require("validator");

// User Sign Up
const userSignup = (req, res) => {
  const { config: avatar, user } = req.body;
  const { name, email, password } = user;
  // Validation If fields(inputs) are empty
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the required Inputs", emptyFields });
  }
  // Validation
  if (!validator.isEmail(email)) {
    return res.status(401).json({ error: "Email is not Authentic/Valid" });
  } else if (!validator.isStrongPassword(password)) {
    return res.status(401).json({
      error:
        "Password must be minimum 8 characters and contains a Cap, a Num and a Special character",
    });
  }

  let lowerCaseEmail = email.toLowerCase();

  User.findOne({ email: lowerCaseEmail }, (err, user) => {
    if (user) {
      res.status(400).json({ error: "User Already Registered..." });
    } else {
      const salt = 10;
      bcrypt.hash(password, salt, function (err, hashPassword) {

        const user = new User({
          name,
          email: lowerCaseEmail,
          password: hashPassword,
          avatar
        });
        user.save((err) => {
          if (err) {
            res.status(400).json({ message: err });
          } else {
            res.status(200).json({
              message: "User Registered Successfully",

              // token: generateToken(user._id),
            });
          }
        });
      });
    }
  });
};

// User Login

const userSignin = (req, res) => {
  let { email, password } = req.body;
  let emptyFields = [];

  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "All Fields Required", emptyFields });
  }

  let lowerCaseEmail = email.toLowerCase();
  User.findOne({ email: lowerCaseEmail }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, foundUser) {

        if (foundUser) {
          let token = generateToken(user._id);
          // Set Cookie
          const cookie = {
            name: "jwToken",
            token,
            options: {
              maxAge: 60 * 60 * 24 * 30 * 1000,
              httpOnly: false,
            },
          };
          res.cookie(cookie.name, cookie.token, cookie.options);

          res.status(200).json({
            message: "Logged in Successfully",
            user,
            token,
          });
        } else {
          res.status(400).json({ error: "Wrong Credentials!" });
        }
      });
    } else {
      res.status(400).json({ error: "Wrong Credentials!" });
    }
  });
};
// Logout User
const userLogout = (req, res) => {
  res.clearCookie("jwToken");
  res.status(200).json({ message: "Logged Out Successfully", loggedIn: false });
};

module.exports = { userSignup, userSignin, userLogout };
