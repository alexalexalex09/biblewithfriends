var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  //console.log('response',response);
  const data = await response.json();
  console.log("data", data);
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectURL = "http://localhost:5000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const oAuth2TokenResponse = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(oAuth2TokenResponse.tokens);
    console.info("Tokens acquired.");
    const user = oAuth2Client.credentials;
    await getUserData(oAuth2Client.credentials.access_token);
    console.log("isAuthenticated: " + req.session.isAuthenticated);
    console.log("function:" + req.isAuthenticated);
  } catch (err) {
    console.log("Error logging in with OAuth2 user:", err);
  }

  res.redirect(303, "http://localhost:5000/home");
});

module.exports = router;
