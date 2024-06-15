const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile"],
      state: true,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: process.env.CLIENT_REDIRECT,
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
