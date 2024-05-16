const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
});

router.get("/logout", (req, res) => {
  console.log("Logging out");
  req.logout((err) => {
    console.log({ err });
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_REDIRECT,
    failureRedirect: "/",
  })
);

router.get("/user", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
});

module.exports = router;
